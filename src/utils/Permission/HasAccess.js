import { useContext } from "react";
import UserContext from "../../context/UserContext";

const useAccess = () => {
  const stored = localStorage.getItem("userAccess");

  // const userAccess = stored && stored !== "undefined" ? JSON.parse(stored) : {};
  const { access } = useContext(UserContext);

  const hasPermission = (module, permission) => {
    if (!access || !access?.[module]) return false;
    return access?.[module]?.[permission] || false;
  };

  return {
    hasPermission,
  };
};

export default useAccess;
