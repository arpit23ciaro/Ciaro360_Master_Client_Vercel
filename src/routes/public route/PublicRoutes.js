import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../screen/login-module/Login";
import VerifyOtp from "../../screen/login-module/VerifyOtp";
import Home from "../../screen/dashboard/Dashboard";
import Sidebar from "../../component/Sidebar";
import UserMangement from "../../screen/userManagement/UserMangement";
import OrganizationManagement from "../../screen/orgManagement/OrganizationManagement";
import Header from "../../component/Header";
import ProtectedRoute from "../protected route/ProtectedRoute";
import ViewOrganization from "../../screen/orgManagement/ViewOrganization";
import useAccess from "../../utils/Permission/HasAccess";
import NotAuth from "../../component/NoAuth";

const PublicRoutes = () => {
  const { hasPermission } = useAccess();
  return (
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/login" Component={Login} />

      <Route path="/verify_otp" Component={VerifyOtp} />
      <Route path="/dashboard" Component={Home} />
      <Route path="/unauthorized" element={<NotAuth />} />

      <Route element={<ProtectedRoute />}>
        <Route
          element={
            <>
              <Header />
              <Sidebar />
            </>
          }
        >
          {(hasPermission("userManagement", "fullAccess") ||
            hasPermission("userManagement", "edit") ||
            hasPermission("userManagement", "view")) && (
            <Route
              path="/user_management"
              element={
                <UserMangement
                  canEdit={hasPermission("userManagement", "edit")}
                  hasFullAccess={hasPermission("userManagement", "fullAccess")}
                />
              }
            />
          )}
          {(hasPermission("orgManagement", "fullAccess") ||
            hasPermission("orgManagement", "edit") ||
            hasPermission("orgManagement", "view")) && (
            <>
              <Route
                path="/org_management"
                element={
                  <OrganizationManagement
                    canEdit={hasPermission("orgManagement", "edit")}
                    hasFullAccess={hasPermission("orgManagement", "fullAccess")}
                  />
                }
              />
              <Route
                path="/org_management/:id"
                element={
                  <ViewOrganization
                    canEdit={hasPermission("orgManagement", "edit")}
                    hasFullAccess={hasPermission("orgManagement", "fullAccess")}
                  />
                }
              />
            </>
          )}
        </Route>
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
