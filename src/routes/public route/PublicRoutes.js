import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../screen/login/Login";
import Password from "../../screen/password/Password";
import VerifyOtp from "../../screen/verifyOtp/VerifyOtp";
import Home from "../../screen/dashboard/Dashboard";
import ForgotPassword from "../../screen/forgotPassword/ForgotPassword";
import NewPassword from "../../screen/newPassword/NewPassword";
import Sidebar from "../../component/Sidebar";
import UserMangement from "../../screen/userManagement/UserMangement";
import OrganizationManagement from "../../screen/orgManagement/OrganizationManagement";
import Header from "../../component/Header";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/login" Component={Login} />
      <Route path="/password" Component={Password} />
      <Route path="/verify_otp" Component={VerifyOtp} />
      <Route path="/dashboard" Component={Home} />
      <Route path="/forgot_password" Component={ForgotPassword} />
      <Route path="/new_password" Component={NewPassword} />
      <Route
        element={
          <>
            <Header />
            <Sidebar />
          </>
        }
      >
        <Route path="user_management" Component={UserMangement} />
        <Route path="org_management" Component={OrganizationManagement} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
