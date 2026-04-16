import { Box, Button, styled } from "@mui/material";
import React from "react";
import {
  bgColors,
  fontSize,
  fontWeight,
  colors,
  GlobleStyle,
} from "../Style/GlobalStyle";

export default function CustomButton(props) {
  const {
    label,
    className,
    onClick,
    disable = false,
    type = "button",
    style = {},
    containerStyle = {},
    variant = "contained",
    loading = false,
  } = props;

  return (
    <CustomButtonWrapper style={containerStyle}>
      <Button
        className={`custom-button ${className}`}
        onClick={onClick}
        disabled={disable}
        type={type}
        style={style}
        variant={variant}
        loading={loading}
      >
        {label}
      </Button>
    </CustomButtonWrapper>
  );
}

const CustomButtonWrapper = styled(Box)({
  // marginLeft: "auto",
  // marginRight: "auto",
  "& .custom-button": {
    "& Button": {
      borderRadius: "20px",
      textTransform: "none",
      color: colors,
      fontWeight: fontWeight.semibold,
      fontSize: fontSize.h6,
      fontFamily: "Poppins",
      "&:disabled": {
        opacity: "80%",
      },
    },
    width: "100%",
    borderRadius: "20px",
    textTransform: "none",
    margin: "auto",
    color: colors.white,
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.h6,
    fontFamily: "Poppins",
    backgroundColor: colors.aquasky,
    "&:disabled": {
      // opacity: "60%",
      backgroundColor: "#C3C3C3",
    },
    "&:hover": {
      backgroundColor: colors.aquasky,
    },
  },
});