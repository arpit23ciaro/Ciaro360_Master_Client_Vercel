import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { Box } from "@mui/material";
import logo from "../../assest/logo.png";
import { useNavigate } from "react-router-dom";
import { GlobleStyle} from "../../Style/GlobalStyle";
import CustomeButton from "../../component/CustomeButton";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  return (
    <GlobleStyle>
      <Box className="parent-container">
        <Box className="main-container">
          <Box>
            <img src={logo} alt="logo" loading="lazy" />
          </Box>
          <Box style={{ width: "100%" }}>
            <Box className="input-container">
              <label htmlFor="email" className="label-text">
                Enter Your OTP
              </label>
              <OtpInput
                inputStyle={OtpInputStyle}
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
              <CustomeButton path="/dashboard" label="Continue" />
            </Box>
          </Box>
        </Box>
      </Box>
    </GlobleStyle>
  );
}

const OtpInputStyle = {
  width: "100%",
  height: "30px",
  borderRadius: "6px",
  border: "0.5px solid grey",
  marginTop: "2%",
};
