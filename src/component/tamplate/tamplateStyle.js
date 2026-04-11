import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { fontSize, fontWeight, color } from "../../Style/GlobalStyle";

export const TemplateStyle = styled(Box)({
  "& .main-img": {
    height: "100vh",
    width: "100%",
    "@media(max-width: 599px)": {
      display: "none",
    },
  },
 


});
