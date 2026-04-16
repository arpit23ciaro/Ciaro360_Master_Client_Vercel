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

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/login" Component={Login} />

      <Route path="/verify_otp" Component={VerifyOtp} />
      <Route path="/dashboard" Component={Home} />

      <Route element={<ProtectedRoute />}>
        <Route
          element={
            <>
              <Header />
              <Sidebar />
            </>
          }
        >
          <Route path="/user_management" Component={UserMangement} />
          <Route path="/org_management" Component={OrganizationManagement} />
          <Route path="/org_management/:id" Component={ViewOrganization} />

        </Route>
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
