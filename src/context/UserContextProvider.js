import React, { useState } from "react";
import UserContext from "./UserContext";

export default function USerContextProvider({ children }) {
  const [superAdminUsername, setSuperAdminUsername] = useState(
    localStorage.getItem("superAdminUsername") || null,
  );
  const [superAdminEmail, setSuperAdminEmail] = useState(
    localStorage.getItem("superAdminEmail") || null,
  );
  const [firstName, setFirstName] = useState(
    localStorage.getItem("firstName") || null,
  );
  const [email, setEmail] = useState(localStorage.getItem("email") || null);
  const [empEmail, setEmpEmail] = useState(
    localStorage.getItem("empEmail") || null,
  );
  const [isFirstLogin, setIsFirstLogin] = useState(
    JSON.parse(localStorage.getItem("isFirstLogin")) || null,
  );
  const [tpEmail, setTpEmail] = useState({
    email: null,
    name: null,
  });
  const [orgID, setOrgID] = useState(null);
  const [isSA, setIsSA] = useState(localStorage.getItem("isSA") || null);

  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [genrateQR, setGenrateQR] = useState(null);
  const [access, setAccess] = useState(null);
  const [answeredByClient, setAnsweredByClient] = useState(null);

  const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [allFrameworks, setAllFrameworks] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [notificationCount, setNotificationCount] = useState(
    localStorage.getItem("notification") || 0,
  );
  const [activeStepContext, setActiveStepContext] = useState(0);
  const [tpData, setTpData] = useState(null);

  const [isThirdParty, setIsThirdParty] = useState(
    localStorage.getItem("isThirdParty") || null,
  );

  const resetUserContext = () => {
    setEmail(null)
    setSuperAdminUsername(null);
    setSuperAdminEmail(null);
    setFirstName(null);
    setEmpEmail(null);
    setIsFirstLogin(null);
    setTpEmail({ email: null, name: null });
    setOrgID(null);
    setIsSA(null);
    setToggleDrawer(false); 
    setGenrateQR(null);
    setAccess(null);
    setAnsweredByClient(null);
    setAccessToken(null);
    setIsAdmin(null);
    setRole(null);
    setAllFrameworks([]);
    setProjectList([]);
    setNotificationCount(0);
    setActiveStepContext(0);
    setTpData(null);
    setIsThirdParty(null);
  };

  return (
    <UserContext.Provider
      value={{
        accessToken,
        setAccessToken,
        role,
        setRole,
        superAdminUsername,
        setSuperAdminUsername,
        firstName,
        setFirstName,
        superAdminEmail,
        setSuperAdminEmail,
        empEmail,
        setEmpEmail,
        tpEmail,
        setTpEmail,
        isAdmin,
        setIsAdmin,
        orgID,
        setOrgID,
        isSA,
        setIsSA,
        genrateQR,
        setGenrateQR,
        allFrameworks,
        setAllFrameworks,
        projectList,
        setProjectList,
        notificationCount,
        setNotificationCount,
        access,
        setAccess,
        toggleDrawer,
        setToggleDrawer,
        answeredByClient,
        setAnsweredByClient,
        tpData,
        setTpData,
        isFirstLogin,
        setIsFirstLogin,
        activeStepContext,
        setActiveStepContext,
        resetUserContext,
        isThirdParty,
        setIsThirdParty,
        email,
        setEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
