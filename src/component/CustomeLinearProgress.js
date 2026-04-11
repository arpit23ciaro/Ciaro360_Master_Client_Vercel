import { LinearProgress } from "@mui/material";
import React from "react";
import {
  bgColors,
} from "../Style/GlobalStyle";

const CustomeLinearProgress = () => {
  return (
    <LinearProgress
      sx={{
        backgroundColor: bgColors?.skyBlue,
        opacity: "40%",
        "& .MuiLinearProgress-bar": { backgroundColor: bgColors?.darkgreen },
      }}
    />
  );
};

export default CustomeLinearProgress;
