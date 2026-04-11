import React from "react";
import logo from "../../assest/logo.png";
import { Box, Button, Typography } from "@mui/material";
import { TemplateStyle } from "./tamplateStyle";
import { Link, useNavigate } from "react-router-dom";
import CustomeButton from "../CustomeButton";

export default function Template(props) {
  const { label, path, name, changeHandler, value, flag, heading='Login' } = props;
  const navigate = useNavigate();
  return (
    <TemplateStyle>
      <Box
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#EDFFFF",
          display: "flex",
        }}
      >
        <Box className="main-container">
          <Box>
            <img src={logo} alt="logo" loading="lazy" />
          </Box>
          <Box>
            <Typography className="login-heading">{heading}</Typography>
          </Box>
          <Box style={{ width: "100%" }}>
            <Box className="input-container">
              <label htmlFor={name} className="label-text">
                {label}
              </label>
              <input
                name={name}
                className="input-style"
                value={value}
                onChange={changeHandler}
              />
              {flag === false ? (
                <span className="error-msg">Email is not valid</span>
              ) : (
                <></>
              )}

              <CustomeButton
                className="continue-btn"
                onClick={() => {
                  navigate(path);
                }}
              >
                Continue
              </CustomeButton>
            </Box>
            {name == "password" ? (
              <Link to="/forgot_password">
                <Typography className="forgot-pass">
                  Forgot Password ?
                </Typography>
              </Link>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
    </TemplateStyle>
  );
}
