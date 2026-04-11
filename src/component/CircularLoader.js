import React from "react";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import { bgColors } from "../Style/GlobalStyle";
import { Box } from "@mui/material";

const CircularLoader = ({size=40}) => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%", 
        height: "100%",
        position: "absolute", 
        top: 0,
        left: 0,
      }}
    >
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={(theme) => ({
          color: bgColors?.darkgreen,
          animationDuration: "550ms",
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
          ...theme.applyStyles("dark", {
            color: "#308fe8",
          }),
        })}
        size={size}
        thickness={4}
      />
    </Box>
  );
};

export default CircularLoader;
