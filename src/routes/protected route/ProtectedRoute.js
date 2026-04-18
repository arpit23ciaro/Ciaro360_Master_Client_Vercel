import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../../context/UserContext";
import useAccess from "../../utils/Permission/HasAccess";

const permissions = ["orgManagement", "userManagement"];

const ProtectedRoute = () => {
  const { accessToken, setAccess } = useContext(UserContext);
  const { hasPermission } = useAccess();

  const hasAnyAccess = permissions.some(
    (item) =>
      hasPermission(item, "view") ||
      hasPermission(item, "edit") ||
      hasPermission(item, "fullAccess"),
  );
  setAccess(hasAnyAccess);
  return hasAnyAccess ? (
    <Outlet />
  ) : accessToken ? (
    <Navigate to="/unauthorized" replace />
  ) : (
    <Navigate to="/login" replace />
  );

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
