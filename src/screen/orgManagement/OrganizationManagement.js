import {
  Box,
  Button,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomeDataGrid, GlobleStyle } from "../../Style/GlobalStyle";
import CustomeLinearProgress from "../../component/CustomeLinearProgress";
import addPolicy from "../../assest/add-policy.svg";
import AddOrganizationModal from "./AddOrganizationModal";
import OffboardOrganizationModal from "./Offboardorganizationmodal ";
import { GetOrganization } from "../../services/organization/GetOrganization";
import { TruncatedList } from "../../component/TruncateList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
// ── new imports ──
import SearchBar from "../../component/SearchBar";
import filter from "../../assest/filter.svg";
import CustomeButton from "../../component/CustomeButton";
import { colors, fontSize, fontWeight } from "../../Style/GlobalStyle";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useDebounce from "../../hooks/useDebounce";
import { usePersistedFilter } from "../../hooks/usePersistedFilter";
import { DownloadContractDetails } from "../../services/organization/DownloadContractDetails";
import { useToast } from "../../context/ToastProvider";
import AddSuperAdminModal from "./AddSuperAdminModal";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "./ViewOrganization";

const OrganizationManagement = ({ hasFullAccess, canEdit }) => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [originalOrganizationList, setOriginalOrganizationList] = useState([]);
  const [orgModalOpen, setOrgModalOpen] = useState(false);
  const [openSuperAdminModal, setOpenSuperAdminModal] = useState(false);
  const [offboardModalOpen, setOffboardModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [openEditOrgModal, setOpenEditOrgModal] = useState(false);

  // Per-row menu state: { anchorEl, rowId }
  const [menuState, setMenuState] = useState({ anchorEl: null, rowId: null });

  const handleMenuOpen = (event, rowId) => {
    setMenuState({ anchorEl: event.currentTarget, rowId });
  };

  const handleMenuClose = () => {
    setMenuState({ anchorEl: null, rowId: null });
  };

  const handleOffboardClick = (row) => {
    handleMenuClose();
    setSelectedOrg(row);
    setOffboardModalOpen(true);
  };

  const handleEditClick = (row) => {
    handleMenuClose();
    setSelectedOrg(row);
    setOpenEditOrgModal(true);
  };

  const handleCreateSuperAdminClick = (row) => {
    handleMenuClose();
    setSelectedOrg(row);
    setOpenSuperAdminModal(true);
  };

  // ── filter config ──
  const defaultFilterState = {
    onboardingDate: {
      startDate: null,
      endDate: null,
    },
    status: [],
  };

  const parseDDMMYYYY = (str) => {
    if (!str) return null;
    const [day, month, year] = str.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const filterFunction = (filters) => {
    const { onboardingDate, status } = filters;

    const noFiltersApplied =
      !onboardingDate?.startDate &&
      !onboardingDate?.endDate &&
      status?.length === 0;

    if (noFiltersApplied) {
      return originalOrganizationList;
    }

    return originalOrganizationList.filter((item) => {
      const dateMatch = (() => {
        const startDate = onboardingDate?.startDate
          ? dayjs(onboardingDate.startDate).toDate()
          : null;
        const endDate = onboardingDate?.endDate
          ? dayjs(onboardingDate.endDate).toDate()
          : null;
        const itemDate = parseDDMMYYYY(item?.purchaseDate);

        if (startDate && !endDate) return itemDate >= startDate;
        if (!startDate && endDate) return itemDate <= endDate;
        if (startDate && endDate)
          return itemDate >= startDate && itemDate <= endDate;
        return true;
      })();

      const statusMatch =
        status?.length > 0 ? status.includes(item?.status) : true;

      return dateMatch && statusMatch;
    });
  };

  const {
    filterState: filterOrgData,
    setFilterState: setFilterOrgData,
    filteredData: organizationList,
    setFilteredData: setOrganizationList,
    appliedFilterCount,
    applyFilter,
    clearFilter,
  } = usePersistedFilter(
    "orgManagementFilterState",
    "orgManagementFilterCount",
    defaultFilterState,
    originalOrganizationList,
    filterFunction,
    setOpen,
  );

  // ── search ──
  useEffect(() => {
    if (debouncedSearchTerm.length >= 0) {
      getAllOrganization(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const onDateChange = (field, date, type) => {
    setFilterOrgData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: date ?? null,
      },
    }));
  };

  const handleStatusSelect = (item) => {
    setFilterOrgData((prevState) => {
      const currentStatus = prevState.status || [];
      return {
        ...prevState,
        status: currentStatus.includes(item)
          ? currentStatus.filter((data) => data !== item)
          : [...currentStatus, item],
      };
    });
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getAllOrganization = async (input) => {
    setLoading(true);
    const response = await GetOrganization(searchTerm);
    if (response?.data?.status) {
      const list = response?.data?.organization || [];
      setOriginalOrganizationList(list);
      setOrganizationList(list);
    }
    setLoading(false);
  };

  const columns = [
    {
      field: "licenseNumber",
      headerName: "License Number",
      headerAlign: "start",
      flex: 1,
      align: "center",
      renderCell: (params) => (
        <Box>
          {!params?.row?.editable && (
            <span>
              {capitalizeFirstLetter(params?.row?.licenseNumber || "N/A")}
            </span>
          )}
        </Box>
      ),
    },
    {
      field: "Organization Name",
      headerName: "Organization Name",
      headerAlign: "start",
      flex: 2,
      align: "center",
      renderCell: (params) => (
        <Box>
          {!params?.row?.editable && (
            <span>
              {capitalizeFirstLetter(params?.row?.organizationName || "N/A")}
            </span>
          )}
        </Box>
      ),
    },
    {
      field: "Super Admin Email",
      headerName: "Super Admin Email",
      flex: 2,
      align: "start",
      headerAlign: "start",
      renderCell: (params) => (
        <Box>
          {!params?.row?.editable && (
            <span>{params?.row?.saEmail || "N/A"}</span>
          )}
        </Box>
      ),
    },
    {
      field: "Subscribe Frameworks",
      headerName: "Subscribe Frameworks",
      flex: 1.5,
      headerAlign: "start",
      align: "center",
      renderCell: (params) =>
        !params?.row?.editable ? (
          <TruncatedList data={params?.row?.frameworks} />
        ) : null,
    },
    {
      field: "Onboarding Date",
      headerName: "Onboarding Date",
      flex: 1,
      headerAlign: "start",
      renderCell: (params) => (
        <Box>
          {!params?.row?.editable && (
            <span>{params?.row?.purchaseDate ?? "N/A"}</span>
          )}
        </Box>
      ),
    },
    {
      field: "expiryDate",
      headerName: "Annual Renewal Date",
      flex: 1,
      headerAlign: "start",
      renderCell: (params) => (
        <Box>
          {!params?.row?.editable && (
            <span>{params?.row?.expiryDate ?? "N/A"}</span>
          )}
        </Box>
      ),
    },
    // {
    //   field: "fileName",
    //   headerName: "Contract Details",
    //   flex: 1,
    //   headerAlign: "start",
    //   renderCell: (params) => (
    //     <Box
    //       className={`title-style ${params?.row?.fileName ? "table-row-hover" : ""}`}
    //       sx={{
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "flex-start",
    //       }}
    //       onClick={() => {
    //         if (!btnLoading && params?.row?.fileName)
    //           downloadFile(params?.row?._id);
    //       }}
    //     >
    //       {params?.row?.fileName || "N/A"}
    //     </Box>
    //   ),
    // },
    {
      field: "status",
      headerName: "Status",
      flex: 2,
      headerAlign: "start",
      align: "center",
      renderCell: (params) => {
        return params?.row?.status ? (
          <StatusBadge status={params?.row?.status} />
        ) : (
          <span>N/A</span>
        );
      },
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   flex: 0.8,
    //   headerAlign: "center",
    //   align: "center",
    //   sortable: false,
    //   renderCell: (params) => {
    //     const isOffboarded = params?.row?.status === "offboarded";
    //     const isMenuOpen =
    //       menuState.anchorEl !== null && menuState.rowId === params?.row?._id;

    //     return (
    //       <Box
    //         onClick={(e) => {
    //           e.stopPropagation();
    //         }}
    //       >
    //         <Tooltip title="More actions">
    //           <span>
    //             <IconButton
    //               size="small"
    //               disabled={isOffboarded}
    //               onClick={(e) => handleMenuOpen(e, params?.row?._id)}
    //             >
    //               <MoreVertIcon fontSize="small" />
    //             </IconButton>
    //           </span>
    //         </Tooltip>

    //         <Menu
    //           anchorEl={menuState.anchorEl}
    //           open={isMenuOpen}
    //           onClose={handleMenuClose}
    //           PaperProps={{
    //             sx: {
    //               boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
    //               borderRadius: "8px",
    //               minWidth: "160px",
    //             },
    //           }}
    //         >
    //           <MenuItem
    //             onClick={() => handleEditClick(params?.row)}
    //             sx={{
    //               fontFamily: "Poppins",
    //               fontSize: "13px",

    //               gap: "8px",
    //             }}
    //           >
    //             Edit
    //           </MenuItem>
    //           {/* <MenuItem
    //             onClick={() => handleOffboardClick(params?.row)}
    //             sx={{
    //               fontFamily: "Poppins",
    //               fontSize: "13px",
    //               color: "#D32F2F",
    //               gap: "8px",
    //               "&:hover": { backgroundColor: "#FFF3F3" },
    //             }}
    //           >
    //             Offboard
    //           </MenuItem> */}
    //         </Menu>
    //       </Box>
    //     );
    //   },
    // },
  ];

  const downloadFile = async (orgId, mimeType = "application/pdf") => {
    try {
      setBtnLoading(true);
      const response = await DownloadContractDetails(orgId);
      if (!response || !response.data) {
        showToast("Failed To Download Evidence", "error");
        return;
      }
      let fileName = "exportedFile";
      const mimeType = response.headers["content-type"]
        ? response.headers["content-type"]
        : "application/pdf";
      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition && contentDisposition.includes("filename=")) {
        fileName = contentDisposition
          .split("filename=")[1]
          .replace(/['"]/g, "")
          .trim();
      }

      const blob = new Blob([response.data], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error downloading file:", error);
    } finally {
      setBtnLoading(false);
    }
  };

  const handleRowClicked = (id, name) => {
    navigate(`/org_management/${id}`);
  };

  return (
    <GlobleStyle>
      <Box className="parent-container">
        <Box className="policies-container">
          <Typography className="policies-text">
            Organization Management
          </Typography>

          {(hasFullAccess || canEdit) && (
            <Button
              className="create-policy"
              onClick={() => setOrgModalOpen(true)}
            >
              <Box className="create-policy-label">
                <img src={addPolicy} alt="icon" className="add-svg-icon" />
                Add Organization
              </Box>
            </Button>
          )}
        </Box>

        {/* ── search + filter bar ── */}
        <Box style={{ paddingTop: "2%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Box className="only-filter-container">
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <SearchBar
                  className="searchbar-style"
                  placeholder="Search Organization"
                  onChange={handleSearch}
                  value={searchTerm}
                />

                {appliedFilterCount > 0 && (
                  <Tooltip
                    placement="top"
                    title={"Clear Filters"}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          fontFamily: "Poppins",
                          fontSize: fontSize.p,
                        },
                      },
                    }}
                  >
                    <IconButton onClick={clearFilter} size="small">
                      <FilterAltOffOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                )}

                <CustomeButton
                  className="manage-btn"
                  onClick={toggleDrawer(true)}
                  label={
                    <Box
                      className="manage-btn-label"
                      sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img src={filter} alt="icon" />

                      {appliedFilterCount > 0 && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: -6,
                            right: -10,
                            background: colors.red,
                            color: "white",
                            borderRadius: "50%",
                            minWidth: "18px",
                            height: "18px",
                            fontSize: "11px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 500,
                          }}
                        >
                          {appliedFilterCount > 9 ? "9+" : appliedFilterCount}
                        </Box>
                      )}

                      <p>Filter</p>
                    </Box>
                  }
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ overflowX: "auto", width: "100%" }}>
            <CustomeDataGrid
              rows={organizationList}
              columns={columns}
              loading={loading}
              disableColumnSorting
              disableColumnMenu
              hideFooterSelectedRowCount
              slots={{
                loadingOverlay: () => <CustomeLinearProgress />,
              }}
              pageSize={5}
              getRowHeight={() => "auto"}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              onRowClick={(params, event) => {
                if (event.target.closest(".MuiDataGrid-cellCheckbox")) return;

                if (event.target.closest(".MuiDataGrid-actionsCell")) return;

                handleRowClicked(params.row._id);
              }}
              getRowId={(row) => row._id}
              rowsPerPageOptions={[5]}
              disableColumnFilter
              sx={{
                "& .MuiDataGrid-row": {
                  minHeight: "100px !important",
                  maxHeight: "auto !important",
                  cursor: "pointer",
                },
              }}
            />
          </Box>
        </Box>

        {/* ── filter drawer ── */}
        <Drawer
          open={open}
          anchor="right"
          onClose={toggleDrawer(false)}
          style={{ overflow: "hidden" }}
        >
          <GlobleStyle>
            <Box>
              <form>
                <Box className="drawer-container" role="presentation">
                  <Box className="filter-box">
                    <Box>
                      <Box className="item-baseline">
                        <Typography className="edit-text">
                          Edit Filters
                        </Typography>
                        <Typography className="clear-btn" onClick={clearFilter}>
                          Clear all filters
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box className="mfa-parent-container">
                    {/* Status filter */}
                    <Box>
                      <Typography className="font-semibold filter-type">
                        Status
                      </Typography>
                      <Box style={{ paddingBottom: "2%" }}>
                        {[
                          "Ready To Onboard",
                          "OnBoarded",
                          "Ready To OffBoard",
                          "OffBoarded",
                        ].map((item, index) => (
                          <Box key={index} className="role-checkbox-container">
                            <input
                              type="checkbox"
                              autoComplete="off"
                              name={item}
                              id={`org-status-${item}`}
                              checked={filterOrgData.status.includes(item)}
                              onChange={() => handleStatusSelect(item)}
                            />
                            <label
                              htmlFor={`org-status-${item}`}
                              style={{ marginLeft: "2%" }}
                            >
                              {item}
                            </label>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    {/* Onboarding date range filter */}
                    <Box>
                      <Typography className="font-semibold filter-type">
                        Onboarding Date
                      </Typography>
                      <Box style={{ paddingBottom: "2%" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <Box className="filter-date-box">
                            <DatePicker
                              label="Start Date"
                              value={
                                filterOrgData?.onboardingDate?.startDate
                                  ? dayjs(
                                      filterOrgData.onboardingDate.startDate,
                                    )
                                  : null
                              }
                              onChange={(date) =>
                                onDateChange(
                                  "startDate",
                                  date,
                                  "onboardingDate",
                                )
                              }
                              maxDate={
                                filterOrgData?.onboardingDate?.endDate
                                  ? dayjs(filterOrgData.onboardingDate.endDate)
                                  : null
                              }
                              format="DD/MM/YYYY"
                              slotProps={{
                                textField: {
                                  sx: {
                                    "*": { fontFamily: "Poppins !important" },
                                  },
                                },
                                desktopPaper: {
                                  sx: {
                                    "*": { fontFamily: "Poppins !important" },
                                  },
                                },
                                mobilePaper: {
                                  sx: {
                                    "*": { fontFamily: "Poppins !important" },
                                  },
                                },
                              }}
                            />
                            <DatePicker
                              label="End Date"
                              value={
                                filterOrgData?.onboardingDate?.endDate
                                  ? dayjs(filterOrgData.onboardingDate.endDate)
                                  : null
                              }
                              onChange={(date) =>
                                onDateChange("endDate", date, "onboardingDate")
                              }
                              minDate={
                                filterOrgData?.onboardingDate?.startDate
                                  ? dayjs(
                                      filterOrgData.onboardingDate.startDate,
                                    )
                                  : null
                              }
                              format="DD/MM/YYYY"
                              slotProps={{
                                textField: {
                                  sx: {
                                    "*": { fontFamily: "Poppins !important" },
                                  },
                                },
                                desktopPaper: {
                                  sx: {
                                    "*": { fontFamily: "Poppins !important" },
                                  },
                                },
                                mobilePaper: {
                                  sx: {
                                    "*": { fontFamily: "Poppins !important" },
                                  },
                                },
                              }}
                            />
                          </Box>
                        </LocalizationProvider>
                      </Box>
                    </Box>
                  </Box>

                  <Box className="filter-btn-container">
                    <Button
                      className="policy-cancel-btn"
                      onClick={() => setOpen(false)}
                      fullWidth
                    >
                      Cancel
                    </Button>
                    <Button
                      className="apply-filter-btn"
                      onClick={() => applyFilter()}
                    >
                      Apply
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </GlobleStyle>
        </Drawer>

        <AddOrganizationModal
          open={orgModalOpen}
          onClose={() => setOrgModalOpen(false)}
          refreshList={getAllOrganization}
        />

        {openEditOrgModal && (
          <AddOrganizationModal
            open={openEditOrgModal}
            onClose={() => setOpenEditOrgModal(false)}
            data={selectedOrg}
            refreshList={getAllOrganization}
            isEdit={true}
          />
        )}

        {offboardModalOpen && (
          <OffboardOrganizationModal
            open={offboardModalOpen}
            onClose={() => {
              setOffboardModalOpen(false);
              setSelectedOrg(null);
            }}
            refreshList={getAllOrganization}
            organizationData={selectedOrg}
          />
        )}

        <AddSuperAdminModal
          open={openSuperAdminModal}
          onClose={() => setOpenSuperAdminModal(false)}
          organizationId={selectedOrg?._id}
          refreshList={getAllOrganization}
        />
      </Box>
    </GlobleStyle>
  );
};

export default OrganizationManagement;
