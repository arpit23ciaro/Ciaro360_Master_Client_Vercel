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
    type = 'button',
    style = {},
    containerStyle = {},
    variant = "contained", 
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
    width:"100%",
    borderRadius: "20px",
    textTransform: "none",
    margin: "auto",
    color: colors.white,
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.h6,
    fontFamily: "Poppins",
    backgroundColor: colors.aquasky,
    "&:disabled": {
      opacity: "60%",
      backgroundColor: colors.aquasky,
    },
    "&:hover": {
      backgroundColor: colors.aquasky,
    },
  },
});

// import { Box, Button, styled } from "@mui/material";
// import React from "react";
// import {
//   bgColors,
//   fontSize,
//   fontWeight,
//   colors,
// } from "../styles/dashboard style/DashboardTheme";

// export default function CustomeButton(props) {
//   const { label, className, onClick, disable, type, style } = props;
//   return (
//     <ButtonStyle>
//       <Box className="btn-container">
//         <Button
//           style={style}
//           className={className}
//           onClick={onClick}
//           disabled={disable}
//           type={type}
//         >
//           {label}
//         </Button>
//       </Box>
//     </ButtonStyle>
//   );
// }

// const ButtonStyle = styled(Box)({
//   "& Button": {
//     borderRadius: "20px",
//     textTransform: "none",
//     color: colors,
//     fontWeight: fontWeight.semibold,
//     fontSize: fontSize.h6,
//     fontFamily: "Poppins",
//     "&:disabled": {
//       opacity: "80%",
//     },
//   },
// });

// import { Box, Button, styled } from "@mui/material";
// import React from "react";
// import { bgColors, colors, fontSize, fontWeight } from "../styles/Theme";

// export default function CustomeButton(props) {
//   const { label, className, onClick, disable } = props;
//   return (
//     <CustomeBtnStyle>
// <Box className="btn-container">
//         <Button className={className} onClick={onClick} disabled={disable}>
//           {label}
//         </Button>
//       </Box>
//     </CustomeBtnStyle>
//   );
// }

// const CustomeBtnStyle = styled(Box)({
//   "& .btn-container": {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     margin: "8%",
//   },
//   "& .btn-style": {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     margin: "8%",
//   },
//   "& Button": {
//     borderRadius: "20px",
//     backgroundColor: bgColors.darkgreen,
//     color: colors.white,
//     fontWeight: fontWeight.semibold,
//     fontSize: fontSize.h6,
//     fontFamily: "Poppins",
//     "&:disabled": {
//       opacity:'80%'
//     },
//     "&:hover": {
//       backgroundColor: bgColors.darkgreen,
//     },
//   },
// });
