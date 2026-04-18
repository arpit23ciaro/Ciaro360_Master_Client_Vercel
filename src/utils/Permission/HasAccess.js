const useAccess = () => {
  const stored = localStorage.getItem("userAccess");

  const userAccess = stored && stored !== "undefined" ? JSON.parse(stored) : {};

  const hasPermission = (module, permission) => {
    if (!userAccess || !userAccess?.[module]) return false;
    return userAccess?.[module]?.[permission] || false;
  };

  return {
    hasPermission,
  };
};

export default useAccess;
