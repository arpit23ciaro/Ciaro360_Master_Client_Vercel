import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";

const deserializeFilters = (obj) => {
  if (!obj) return obj;
  if (Array.isArray(obj)) return obj.map(deserializeFilters);
  if (typeof obj === "object") {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (typeof value === "string" && !isNaN(Date.parse(value))) {
        newObj[key] = dayjs(value);
      } else {
        newObj[key] = deserializeFilters(value);
      }
    });
    return newObj;
  }
  return obj;
};

const serializeFilters = (obj) => {
  if (!obj) return obj;
  if (Array.isArray(obj)) return obj.map(serializeFilters);
  if (typeof obj === "object") {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (value?.$d) {
        newObj[key] = value.toISOString();
      } else {
        newObj[key] = serializeFilters(value);
      }
    });
    return newObj;
  }
  return obj;
};

const countFilters = (obj) => {
  let count = 0;
  Object.values(obj).forEach((value) => {
    if (Array.isArray(value)) {
      count += value.length;
    } else if (dayjs.isDayjs(value)) {
      count += 1;
    } else if (value && typeof value === "object") {
      count += countFilters(value);
    } else if (value !== null && value !== undefined && value !== "") {
      count += 1;
    }
  });
  return count;
};

export const usePersistedFilter = (
  storageKey,
  countKey,
  defaultState,
  originalData = [],
  filterFunction,
  setOpen,
) => {
  // ── Ref always holds the latest originalData — no stale closures ──
  const originalDataRef = useRef(originalData);
  useEffect(() => {
    originalDataRef.current = originalData;
  }, [originalData]);

  const [filterState, setFilterState] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? deserializeFilters(JSON.parse(saved)) : defaultState;
  });

  const [appliedFilterCount, setAppliedFilterCount] = useState(
    Number(localStorage.getItem(countKey)) || 0,
  );

  const [filteredData, setFilteredData] = useState(originalData);

  // ── Re-run whenever originalData arrives or changes ──────────────
  useEffect(() => {
    if (
      !originalData ||
      (Array.isArray(originalData) && originalData.length === 0)
    )
      return;

    const savedFilters = localStorage.getItem(storageKey);

    if (savedFilters) {
      const restoredFilters = deserializeFilters(JSON.parse(savedFilters));
      setFilterState(restoredFilters);
      setFilteredData(filterFunction(restoredFilters, originalData));
    } else {
      setFilteredData(filterFunction(defaultState, originalData));
    }
  }, [originalData]); // eslint-disable-line react-hooks/exhaustive-deps

  const applyFilter = (overrideState) => {
    const stateToApply = overrideState ?? filterState;
    const data = originalDataRef.current;

    const count = countFilters(stateToApply);
    const safeFilters = serializeFilters(stateToApply);

    localStorage.setItem(storageKey, JSON.stringify(safeFilters));
    localStorage.setItem(countKey, count);

    setAppliedFilterCount(count);
    if (overrideState) setFilterState(overrideState);
    setFilteredData(filterFunction(stateToApply, data));
    setOpen(false);
  };
  const clearFilter = () => {
    const data = originalDataRef.current; // always the latest value

    localStorage.removeItem(storageKey);
    localStorage.removeItem(countKey);

    setFilterState(defaultState);
    setAppliedFilterCount(0);
    setFilteredData(filterFunction(defaultState, data));
  };

  return {
    filterState,
    setFilterState,
    appliedFilterCount,
    filteredData,
    setFilteredData,
    applyFilter,
    clearFilter,
  };
};
