import React, { useContext, useState } from "react";
import {
  bgColors,
  fontSize,
  fontWeight,
  GlobleStyle,
  Item,
} from "../../Style/GlobalStyle";
import { Box, Grid, styled, Typography } from "@mui/material";
import Input from "../../component/CustomeInput";
import CustomeButton from "../../component/CustomeButton";
import welcomeImage from "../../assest/welcome.png";
import { useLocation, useNavigate } from "react-router";
// import UserContext from "../../../context/UserContext";
// import { CheckEmployeeExist } from "../../../services/CheckEmployeeExist";
import { RegExp } from "../../utils/constants/constants";
// import { SSOLoginApi } from "../../../services/SSO";
// import { EmployeeEmailExist } from "../../../services/checkEmailExist";
import ciaroLogo from "../../assest/logo.png";
import CircularLoader from "../../component/CircularLoader";

export default function Login() {
  const navigate = useNavigate();
  // const { setEmpEmail, setFirstName, setOrgID, setIsSA } =
  // useContext(UserContext);

  const [empEmail, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  // Function Call If Employee is login for the first time
  // const firstTimeEmpLogin = async () => {
  //   if (empEmail.match(EmailRegExp)) {
  //     setLoading(true);
  //     const response = await CheckEmployeeExist(empEmail, token);
  //     if (response.error) {
  //       setLoading(false);
  //       setErrorMessage(response.error);
  //     } else {
  //       setLoading(false);
  //       setErrorMessage(null);
  //       await setOrgID(response?.organizationId);
  //       await setIsSA(response?.data?.isSuperAdmin);
  //       navigate("/set_password");
  //     }
  //   } else {
  //     return setErrorMessage("Invalid Email");
  //   }
  // };

  // Function Call on input chage
  const handleChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    if(value.trim() === ""){
      setErrorMessage("Email Required");
      setIsActive(false);
    }
    else{
      if(value.match(RegExp.mailRegEx)){
        setErrorMessage("")
        setIsActive(true)
      }
      else{
        setErrorMessage("Invalid Email")
        setIsActive(false);
      }
    }
    
  };

  // function call after click on continue button
  const handleLogin = async () => {
      // setLoading(true);
    //   const response = await EmployeeEmailExist(empEmail);
    //   if (response?.error) {
    //     setLoading(false);
    //     setErrorMessage(response.error);
    //   } else {
    //     setLoading(false);
    //     setErrorMessage(null);
    //     await setFirstName(response.data.name);
    //     navigate("/password");
    //   }
    // } else {
    //   return setErrorMessage("Invalid Email");
    // }
  };

  // function call after click on continue button
  const handleSSOClick = () => {
    // SSOLoginApi();
  };

  return (
    <GlobleStyle>
      <ContainerStyle>
        <Box className="main-container">
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
              <Item className="grid-item-style">
                <Box>
                  <img src={ciaroLogo} alt="ciaroLogo" width={200} />
                </Box>
                <Box className="login-container">
                  <Typography className="welcome-text">Login</Typography>
                  <Box className="login-input-container">
                    <Input
                      labelClassName="label-text"
                      label="Email"
                      placeholder="Enter Your Email"
                      value={empEmail}
                      changeHandler={handleChange}
                      errorMessage={errorMessage}
                    />
                    {errorMessage ? (
                      <Typography
                        className="error-msg"
                        sx={{ paddingLeft: "10%" }}
                      >
                        {errorMessage}
                      </Typography>
                    ) : null}
                    <Box style={{ margin: "auto", width: "100%" }}>
                      <CustomeButton
                        label="Continue"
                        className="continue-btn"
                        disable={!isActive}
                        onClick={handleLogin}
                      />
                    </Box>
                  </Box>
                  <Box style={{ width: "100%" }}>
                    {/* <Box style={{ width: "100%", margin: "auto" }}>
                      <CustomeButton
                        label="Use SSO"
                        className="continue-btn"
                        onClick={handleSSOClick}
                      />
                    </Box> */}
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
                    src={welcomeImage}
                    alt="welcomeImage"
                    style={{ width: "80%", margin: "auto" }}
                  />
                </Box>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </ContainerStyle>
    </GlobleStyle>
  );
}

const ContainerStyle = styled(Box)({
  "& .border-or-box": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "70%",
    margin: "auto",
    paddingTop: "2%",
  },
  "& .logo-container": {
    display: "flex",
    justifyContent: "space-evenly",
    alignProperty: "center",
    width: "40%",
    margin: "auto",
  },
  "& .logo-size": {
    width: "40px",
    height: "40px",
  },
  "& .sso-btn": {
    width: "66%",
    height: "28px",
  },
  "& .or-text": {
    fontSize: fontSize.p,
    fontWeight: fontWeight.semibold,
  },
  "& .or-text-border": {
    borderBottom: "1px solid black",
    width: "40%",
  },
});
