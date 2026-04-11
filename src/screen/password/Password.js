import React, { useContext, useState } from "react";
import {
  bgColors,
  fontSize,
  fontWeight,
  GlobleStyle,
  Item,
} from "../../Style/GlobalStyle";
import { Box, styled, Grid, Typography, Link } from "@mui/material";

import secondImg from "../../assest/image02.png";

import Input from "../../component/CustomeInput";
import CustomeButton from "../../component/CustomeButton";
import ciaroLogo from "../../assest/logo.png";
// import { LoginPostData } from "../../services/LoginAPI";
// import UserContext from "../../../context/UserContext";
import { useNavigate } from "react-router";
// import { setupMfa } from "../../../services/setupMfa";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CircularLoader from "../../component/CircularLoader";

export default function Password() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onPasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setIsEmpty(value.trim() === "");
    setLoginError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLink = () => {
    // isSA ? navigate("/forgot_password/sa") : navigate("/forgot_password");
  };

  // const {
  //   superAdminUsername,
  //   firstName,
  //   empEmail,
  //   isSA,
  //   setGenrateQR,
  //   setAccessToken,
  //   setIsAdmin,
  //   setNotificationCount
  // } = useContext(UserContext);

  const handleDataSubmit = async () => {
    // setLoading(true);
    // if (superAdminUsername === null && empEmail) {
    //   const response = await LoginPostData(empEmail, password, isSA);
    //   const isMFAEnable = await response?.data?.ThirdParty;
    //   const isEmailMFA = await response?.data?.emailMfa;
    //   if (response?.error) {
    //     setLoading(false);
    //     setLoginError(response.error);
    //   } else {
    //     setLoading(false);
    //     const accessToken = response?.accessToken;
    //     const isRoleAdmin = JSON.stringify(response?.isAdmin);
    //     sessionStorage.setItem("token", accessToken);
    //     sessionStorage.setItem("isAdmin", isRoleAdmin);
    //     sessionStorage.setItem(
    //       "userAccess",
    //       JSON.stringify(response?.data?.access)
    //     );
    //     setNotificationCount(response?.data?.notifyCount);
    //     // sessionStorage.setItem("role", response?.data?.access?.name);
    //     setIsAdmin(JSON.parse(sessionStorage.getItem("isAdmin")));
    //     if (isMFAEnable) {
    //       const QRresponse = await setupMfa(empEmail, password);
    //       setGenrateQR(QRresponse?.data);
    //       navigate("/auth_mfa");
    //     } else if (isEmailMFA) {
    //       navigate("/verify_email_otp");
    //     } else if (response?.data?.mfaMethod === "authenticator") {
    //       navigate("/verify_mfa_otp");
    //     } else if (response?.data?.mfaMethod === "emailMFA") {
    //       navigate("/verify_email_otp");
    //     } else {
    //       navigate("/user_management");
    //     }
    //   }
    // } else if (superAdminUsername && empEmail === null) {
    //   const response = await LoginPostData(superAdminUsername, password, isSA);
    //   if (response?.error) {
    //     setLoading(false);
    //     setLoginError(response.error);
    //   } else {
    //     setLoading(false);
    //     const accessToken = await response?.accessToken;
    //     sessionStorage.setItem("token", accessToken);
    //     sessionStorage.setItem(
    //       "userAccess",
    //       JSON.stringify(response?.data?.access)
    //     );
    //     setNotificationCount(response?.data?.notifyCount);
    //     await setAccessToken(response?.accessToken);
    //     // sessionStorage.setItem("role", response?.data?.access?.name);
    //     (await response.isFirstLogin)
    //       ? navigate("/home")
    //       : navigate("/dashboard");
    //   }
    // }
  };

  return (
    <GlobleStyle>
      <PasswordBoxStyle>
        <Box className="main-container">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
              <Item className="grid-item-style">
                <Box>
                  <img src={ciaroLogo} alt="ciaroLogo" width={200} />
                </Box>
                <Box className="login-container">
                  <Typography className="welcome-text"> Welcome</Typography>
                  <Box className="login-input-container">
                    <>
                      <Input
                        placeholder="Enter your password"
                        value={password}
                        changeHandler={onPasswordChange}
                        type={showPassword ? "password" : "text"}
                      />
                      <Box
                        onClick={togglePasswordVisibility}
                        className="password-screen-toggle"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </Box>
                    </>
                    {loginError ? (
                      <Typography
                        className="error-msg"
                        style={{ paddingLeft: "10%" }}
                      >
                        {loginError}
                      </Typography>
                    ) : null}

                    <Box className="link-box">
                      <Link onClick={handleLink} className="link-tag">
                        <Typography className="link-text extra-margin">
                          Forgot password
                        </Typography>
                      </Link>
                    </Box>
                    <Box style={{ width: "100%" }}>
                      <CustomeButton
                        label="Login"
                        className="continue-btn"
                        // onClick={handleDataSubmit}
                        disable={isEmpty}
                      />
                    </Box>
                    {loading && (
                      <Box
                        sx={{
                          position: "relative",
                          display: "flex",
                          height: "50px",
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CircularLoader />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Item>
            </Grid>
            <Grid
              size={{ xs: 12, sm: 6, md: 6 }}
              className="img-main-container"
            >
              <Item
                sx={{
                  backgroundColor: "initial",
                  padding: "0px",
                  marginTop: "0px",
                }}
              >
                <Box>
                  <img
                    src={secondImg}
                    alt="welcomeImage"
                    style={{ width: "80%", margin: "auto" }}
                  />
                </Box>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </PasswordBoxStyle>
    </GlobleStyle>
  );
}

const PasswordBoxStyle = styled(Box)({
  "& .link-tag": {
    textDecoration: "none",
    cursor: "pointer",
  },
  "& .link-text": {
    textDecoration: "none",
    color: bgColors.skyBlue,
    fontSize: fontSize.h6,
    textAlign: "end",
  },
  "& .extra-margin": {
    marginRight: "10%",
  },
  "& .link-box": {
    width: "100%",
    display: "grid",
    gap: "15px",
    // padding: "5% 8%",
  },
  "& .login-btn": {
    height: "45px",
    width: "180px",
  },
});
