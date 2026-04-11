import React, { useState } from "react";
// import { Box, Typography } from "@mui/material";
// import CustomeInput from "../../component/CutomeInput";
// import CustomeButton from "../../component/CustomeButton";
// import { GlobleStyle } from "../../Style/GlobalStyle";
// import logo from '../../assest/logo.png'

export default function ForgotPassword() {
  const storedMail = localStorage.getItem('email')
  const [defualtMail, setDefaultMail] = useState(storedMail)
  const onInputChange = (e) =>{
    setDefaultMail(e.target.value)
  }
  return (
    <>
      {/* <GlobleStyle>
        <Box className="parent-container">
          <Box className="main-container">
            <Box>
              <img src={logo} alt="logo" loading="lazy" />
            </Box>
            <Box>
              <Typography className="login-heading">Login</Typography>
            </Box>
            <Box style={{ width: "100%" }}>
              <Box className="input-container">
                <CustomeInput
                  label={"Email"}
                  name="forgot password"
                  value={defualtMail}
                  changeHandler={onInputChange}
                />
                <CustomeButton label={"Generate New Password"} path="/new_password" />
              </Box>
            </Box>
          </Box>
        </Box>
      </GlobleStyle> */}
    </>
  );
}
