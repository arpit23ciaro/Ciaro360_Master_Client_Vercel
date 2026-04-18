import React, { useCallback, useEffect, useState } from "react";
import {
  bgColors,
  fontSize,
  fontWeight,
  GlobleStyle,
  Item,
} from "../../Style/GlobalStyle";
import {
  Box,
  styled,
  Grid,
  Typography,
  Link,
  Button,
  Snackbar,
} from "@mui/material";
import OTPInput from "react-otp-input";
import CustomeButton from "../../component/CustomeButton";
import { useNavigate } from "react-router";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import ciaroLogo from "../../assest/logo.png";
import welcomeImage from "../../assest/welcome.png";

import { SendUserOtp } from "../../services/auth/SendUserOtp";

import { LoginAPI } from "../../services/auth/LoginAPI";

export default function VerifyOtp() {
  const { email, firstName, setFirstName, setAccessToken, setAccess } =
    useContext(UserContext);

  const navigate = useNavigate();
  const [OTP, setOTP] = useState("");
  const [isResendLinkDisabled, setIsResendLinkDisabled] = useState(false);
  const [isOTPLength, setIsOTPLength] = useState(true);
  const [otpError, setOtpError] = useState(null);
  const [resendTimer, setResendTimer] = useState(30);
  const [open, setOpen] = useState(false);
  const [tokenToastMsg, setTokenToastMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resendTimer > 0 && isResendLinkDisabled) {
      const timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (resendTimer === 0) {
      setIsResendLinkDisabled(false);
    }
  }, [resendTimer, isResendLinkDisabled]);

  const SendOtp = useCallback(async () => {
    if (!email) return;

    const otpSendResponse = await SendUserOtp(email);

    if (otpSendResponse?.error) {
      setOtpError(otpSendResponse.error);
    } else {
      setOtpError("");
    }

    return otpSendResponse;
  }, [email]);

  useEffect(() => {
    if (!email) return;

    const otpKey = `otpSent_${email}`;
    const otpSent = sessionStorage.getItem(otpKey);

    if (!otpSent) {
      SendOtp();
      sessionStorage.setItem(otpKey, "true");
    }
  }, [email]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem(`otpSent_${email}`);
    };
  }, []);
  const onOtpChange = (otp) => {
    setOTP(otp);
    setOtpError("");
    otp.trim(" ") && otp.length === 6
      ? setIsOTPLength(false)
      : setIsOTPLength(true);
  };

  const verifyOTP = async () => {
    setLoading(true);
    const checkOTPResponse = await LoginAPI(email, OTP);
    if (checkOTPResponse?.error) {
      setLoading(false);
      setOtpError(checkOTPResponse?.error);
    } else {
      setLoading(false);
      setOtpError("");
      const accessToken = await checkOTPResponse?.accessToken;
      setAccessToken(accessToken);
      localStorage?.setItem("token", accessToken);

      const firstname = await checkOTPResponse?.data?.name;
      const access = await checkOTPResponse?.data?.access;
      localStorage.setItem("userAccess", JSON.stringify(access));

      setFirstName(firstname);
      localStorage.setItem("firstName", firstname);

      setTimeout(() => navigate("/org_management"), 0);
    }
  };

  const handleResendOTPclick = async () => {
    setIsResendLinkDisabled(true);
    setResendTimer(30);
    const otpSendResponse = await SendOtp();
    if (otpSendResponse?.error) {
      setOtpError(otpSendResponse?.error);
    } else {
      setOtpError("");
    }
  };
  var firstThreeLetter = email?.slice(0, 3);
  var Email = firstThreeLetter + "*".repeat(email?.length - 3);

  return (
    <GlobleStyle>
      <OtpScreenStyle>
        <Box className="main-container">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
              <Item className="grid-item-style">
                <Box>
                  <img src={ciaroLogo} alt="ciaroLogo" width={200} />
                </Box>
                <Box className="login-container">
                  <Box sx={{ width: "100%" }}>
                    <Typography className="welcome-text">
                      Welcome {firstName || ""}
                    </Typography>
                    <Typography className="sub-heading-text">
                      An otp has been sent to {email ? Email : "your email"}
                    </Typography>
                  </Box>
                  <Box className="box-align-center">
                    <Box className="otp-input">
                      <Typography
                        sx={{ textAlign: "start", marginLeft: "13.5%" }}
                      >
                        Enter OTP
                      </Typography>
                      <OTPInput
                        value={OTP}
                        onChange={onOtpChange}
                        numInputs={6}
                        renderSeparator={
                          <span style={{ width: "10px" }}></span>
                        }
                        otpType="number"
                        className="otp-input-style"
                        containerStyle={{
                          display: " flex",
                          alignItems: " center",
                          width: "100%",
                          justifyContent: " center",
                        }}
                        shouldAutoFocus={true}
                        inputType="number"
                        inputStyle={{
                          border: `1px solid ${otpError ? "red" : "black"}`,
                          borderRadius: "15px",
                          width: "11%",
                          height: "50px",
                          fontSize: "12px",
                          color: "#000",
                          fontWeight: "400",
                          caretColor: "blue",
                        }}
                        focusStyle={{
                          border: "1px solid #CFD3DB",
                          outline: "none",
                        }}
                        renderInput={(props) => (
                          <input
                            {...props}
                            inputMode="numeric"
                            onKeyDown={(e) => {
                              if (loading) return;
                              else if (e.key === "Enter") {
                                verifyOTP();
                              }
                            }}
                          />
                        )}
                      />
                      <Snackbar
                        open={open}
                        autoHideDuration={5000}
                        message={tokenToastMsg}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                      />
                      {otpError ? (
                        <Typography
                          className="error-msg"
                          style={{ paddingLeft: "13.5%" }}
                        >
                          {otpError}
                        </Typography>
                      ) : null}
                      <Box className="link-box">
                        <Typography className="resend-code">
                          Didn’t get a code?
                        </Typography>
                        <Link
                          className="link-tag"
                          component={Button}
                          disabled={isResendLinkDisabled}
                          onClick={handleResendOTPclick}
                        >
                          <Typography className="link-text resend-code px-1">
                            {isResendLinkDisabled
                              ? `Resend in ${resendTimer}s`
                              : "Click to resend"}
                          </Typography>
                        </Link>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ width: "76%" }}>
                    <CustomeButton
                      label="Verify"
                      className="verify-btn"
                      disable={isOTPLength}
                      onClick={verifyOTP}
                      loading={loading}
                    />
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
      </OtpScreenStyle>
    </GlobleStyle>
  );
}

const OtpScreenStyle = styled(Box)({
  "& .link-tag": {
    textDecoration: "none",
    cursor: "pointer",
    textTransform: "none",
    fontFamily: "Poppins",
  },
  "& input::-webkit-inner-spin-button": {
    webkitAppearance: "none",
    margin: 0,
  },
  "& .link-box": {
    display: "flex",
    alignItems: "baseline",
    paddingLeft: "13.5%",
    fontFamily: "Poppins",
  },
  "& .resend-code": {
    fontSize: fontSize.h6,
    color: "black",
    // fontWeight: fontWeight.semibold,
    fontFamily: "Poppins",
  },
  "& .link-text": {
    textDecoration: "none",
    color: bgColors.skyBlue,
    fontFamily: "Poppins",
  },
  "& .verify-btn": {
    width: "35%",
    height: "7vh",
  },
  "& .verify-otp-heading": {
    fontWeight: fontWeight.bold,
    fontSize: fontSize.h4,
    fontFamily: "Poppins",
  },
  "& .sub-heading-text": {
    fontWeight: fontWeight.medium,
    fontFamily: "Poppins",
  },
  "& .otp-input-style": {
    display: " flex",
    alignItems: " center",
    width: "100%",
    justifyContent: " center",
    fontFamily: "Poppins",
  },

  "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button":
    {
      display: "none",
      WebkitAppearance: "none",
    },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "& .img-grid": {
    "@media(max-width: 600px)": {
      display: "none",
    },
  },
  "& .otp-input": {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    fontFamily: "Poppins",
  },
});
