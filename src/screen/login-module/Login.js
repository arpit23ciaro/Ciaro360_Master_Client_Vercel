import React, { useContext, useState } from "react";
import { GlobleStyle, Item } from "../../Style/GlobalStyle";
import { Box, Grid, Typography } from "@mui/material";
import Input from "../../component/CustomeInput";
import CustomeButton from "../../component/CustomeButton";
import welcomeImage from "../../assest/welcome.png";
import { useLocation, useNavigate } from "react-router";
import { RegExp } from "../../utils/constants/constants";
import ciaroLogo from "../../assest/logo.png";
import CircularLoader from "../../component/CircularLoader";
import { VerifyUserEmail } from "../../services/auth/VerifyUserEmail";
import UserContext from "../../context/UserContext";
import { EmailRegExp } from "../../utils/constants/constants";

export default function Login() {
  const navigate = useNavigate();
  const { setFirstName, setEmail } = useContext(UserContext);

  const [empEmail, setEmpEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function Call on input chage
  const handleChange = (event) => {
    const value = event.target.value;
    setEmpEmail(value);
    if (value.trim() === "") {
      setErrorMessage("Email Required");
      setIsActive(false);
    } else {
      if (value.match(RegExp.mailRegEx)) {
        setErrorMessage("");
        setIsActive(true);
      } else {
        setErrorMessage("Invalid Email");
        setIsActive(false);
      }
    }
  };

  // function call after click on continue button
  const handleLogin = async () => {
    if (empEmail.match(EmailRegExp)) {
      setLoading(true);
      const response = await VerifyUserEmail(empEmail);
      if (response?.error) {
        setLoading(false);
        setErrorMessage(response.error);
      } else {
        setEmail(empEmail);
        // setFirstName(response.data.name);
        // localStorage.setItem("firstName", response?.data?.name);
        localStorage.setItem("email", empEmail);
        setLoading(false);
        setErrorMessage(null);

        navigate("/verify_otp");
      }
    } else {
      return setErrorMessage("Invalid Email");
    }
  };

  return (
    <GlobleStyle>
      <Box className="mai n-container">
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
                    placeholder="Enter your email"
                    value={empEmail}
                    changeHandler={handleChange}
                    errorMessage={errorMessage}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        console.log(isActive, loading);
                        if (isActive && !loading) {
                            handleLogin();
                        }
                      }
                    }}
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
                      disable={!isActive || loading}
                      onClick={handleLogin}
                      loading={loading}
                    />
                  </Box>
                </Box>
              </Box>
            </Item>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6 }} className="img-main-container">
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
    </GlobleStyle>
  );
}
