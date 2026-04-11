import { Box, Modal, Paper, styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const bgColors = {
  lightBlue: "#A4ECDA",
  darkgreen: "#008C87",
  skyBlue: "#00D9D2",
  LightMossGreen: "#CBFFB2",
  sunsetRed: "#F55D5D",
  borderLinear:
    "linear-gradient(180deg, rgba(0,140,135,1) 0%, rgba(0,140,135,1) 0%, rgba(0,212,255,1) 100%)",
  // lightSilver:'#D9D9D9'
  lightSilver: "#C3C3C3",
};
const colors = {
  black: "#000000",
  white: "#FFFFFF",
  red: "#FF0000",
  darkgreen: "#00736F",
  aquasky: "#01D9D1",
  bluishGreen: "#008C86",
  gray: "#757575",
};
const fontSize = {
  h1: "3rem",
  h2: "2.25rem", //36px
  h3: "1.875rem", //30px
  h24: "1.5rem", //24px
  h4: "1.25rem", //20px
  h18: "1.125rem", //18px
  h5: "1rem", //16px
  h6: "0.9rem", //14px
  h7: "0.8rem", //12px
  p: "0.75rem",
};
const fontWeight = {
  extrabold: 800,
  bold: 700,
  semibold: 600,
  medium: 500,
  p1: 400,
};
const GlobleStyle = styled(Box)(({ open }) => ({
  //   "& .parent-container": {
  //     fontFamily:"Poppins",
  //     width: "100%",
  //     height: "100vh",
  //     backgroundColor: "#EDFFFF",
  //     display: "flex",
  //   },
  "& ": {
    fontFamily: "Poppins",
  },
  "& .css-1edfpdg-MuiTypography-root": {
    fontFamily: "Poppins",
  },
  "& .css-rizt0-MuiTypography-root ": {
    fontFamily: "Poppins",
  },
  "& input[type=checkbox]": {
    cursor: "pointer",
    appearance: "none",
    minWidth: "16px",
    minHeight: "16px",
    backgroundColor: "#fff",
    border: "1px solid black",
    borderRadius: "2px",
    display: "inline-block",
  },
  "& .continue-btn": {
    backgroundColor: colors.darkGreen,
    color: colors.secondary,
    textTransform: "none",
    width: "100%",
    marginTop: "5%",
  },
  "& .continue-btn:hover ": {
    backgroundColor: colors.darkCyan,
  },
  "& .main-container": {
    backgroundColor: colors.neutralGrey,
    height: "400px",
    width: "400px",
    border: "1px solid black",
    display: "flex",
    alignItems: "center",
    margin: "auto",
    flexDirection: "column",
  },
  "& .input-container": {
    width: "80%",
    padding: "5%",
    margin: "auto",
  },
  "& .input-style": {
    // marginTop: "5%",
    width: "100%",
    height: "30px",
    borderRadius: "6px",
    border: "0.5px solid grey",
    display: "flex",
    boxSizing: "border-box",
    fontFamily: "Poppins",
  },
  "& .login-heading": {
    fontSize: fontSize.h5,
    fontWeight: fontWeight.semibold,
  },
  "& .error-msg": {
    color: colors.red,
    textTransform: "none",
    width: "100%",
    marginLeft: "5%",
    display: "flex",
  },
  "& .label-text": {
    fontSize: fontSize.h5,
    fontWeight: fontWeight.semibold,
  },
  "& .forgot-pass": {
    width: "50%",
    marginLeft: "10%",
    fontSize: fontSize.h6,
    fontWeight: fontWeight.semibold,
  },
  "& ul": {
    listStyleType: "none",
    paddingInlineStart: "0px",
  },
  "& li": {
    width: "max-content",
  },
  "& .parent-container": {
    fontFamily: "Poppins",
    padding: "2%",
    borderRadius: "1rem",
    border: "1px solid #00D9D2",
    fontFamily: "Poppins",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: `calc(100vw - ${open ? "260px" : "80px"})`,
    // margin: 'auto',
    overflowX: "hidden",
    // marginLeft: "-2%",
    boxSizing: "border-box",
  },
  "& .policies-container": {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingBottom: "3%",
  },
  "& .policies-text": {
    fontSize: fontSize.h24,
    fontWeight: fontWeight.semibold,
    paddingBottom: "1%",
    fontFamily: "Poppins",
  },
  "& .create-policy": {
    backgroundColor: bgColors.skyBlue,
    color: colors.white,
    width: "fit-content",
    padding: "0.8rem",
    maxHeight: "fit-content",
    boxSizing: "border-box",
    fontFamily: "Poppins",
    borderRadius: "1rem",
  },
  "& .create-policy-label": {
    color: colors.white,
    backgroundColor: bgColors.skyBlue,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: "0.5rem",
    boxSizing: "border-box",
    fontFamily: "Poppins",
  },
  "& .main-container": {
    width: "100%",
    height: "100vh",
    margin: "auto",
    overflow: "hidden",
    fontFamily: "Poppins, Arial, sans-serif",
  },
  "& .login-container": {
    width: "100%",
    height: "50vh",
    gap: "3rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginLeft: "3%",
    boxSizing: "border-box",
    fontFamily: "Poppins",
  },
  "& .login-input-container": {
    display: "flex",
    position: "relative",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "100%",
    gap: "0.7rem",
    // marginTop: "10%",
    boxSizing: "border-box",
    fontFamily: "Poppins",
  },
  "& .grid-item-style": {
    width: "100%",
    alignItems: "start",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingLeft: "70px",
    gap: "100px",
    boxSizing: "border-box",
    fontFamily: "Poppins",
  },
  "& img": {
    loading: "lazy",
  },
  "& .img-container": {
    width: "50%",
    // height: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    objectFit: "cover",
    backgroundColor: "#01D9D114",
  },
  "& .continue-btn": {
    cursor: "pointer",
    width: "80% !important",
    height: "45px !important",
    marginTop: "5% !important",
    marginLeft: "auto!important",
    "&:disabled": {
      opacity: "60%",
      backgroundColor: bgColors.brightCyan,
    },
  },
  "& .centered-box": {
    backgroundColor: "#FFFFFF",
    width: "80%",
    borderRadius: "5%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  "& .try-text": {
    fontSize: fontSize.h6,
    fontWeight: fontWeight.medium,
    cursor: "pointer",
    color: bgColors.darkgreen,
    position: "relative",
    marginTop: "10%",
  },
  "& .box-align-center": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  "& .eclipse-style": {
    backgroundColor: "white",
    width: "100%",
    height: "100vh",
    borderRight: "1px inset #008C87",
    borderRadius: "0 50% 50% 0",
    boxShadow: " 25px -4px 0px 0px #008C87",
    transform: "scaleY(1.2)",
    position: " relative",
    right: "20%",
  },

  "& .error-msg": {
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.h7,
    color: "#FF0000",
    width: "100%",
    textAlign: "start",
    // paddingLeft:"13.5%"
  },
  "& .label-text": {
    fontWeight: fontWeight.medium,
    fontSize: fontSize.h6,
    textAlign: "left",
    // marginBottom: '2%',
    color: "#666666",
  },

  "& .welcome-text": {
    fontWeight: fontWeight.medium,
    fontSize: fontSize.h2,
    color: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "0.8",
    fontFamily: "Poppins",
  },
  "& .centered-box-container": {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "537px",
    height: "100vh",
  },
  "& .welcome-img": {
    position: "absolute",
    zIndex: 1,
    height: "60%",
    width: "40%",
    margin: "auto",
    // top: "28vh",
  },
  "& .password-toggle-style": {
    cursor: "pointer",
    position: "absolute",
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 10,
    right: "4.5rem",
    top: "35%",
  },
  "& .password-screen-toggle": {
    cursor: "pointer",
    position: "absolute",
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 10,
    right: "5rem",
    top: "10%",
  },
  "& .get-link-btn": {
    height: "45px",
    width: "100%",
    fontSize: fontSize.h6,
    fontWeight: fontWeight.semibold,
    textTransform: "none",
  },
  "& .img-main-container": {
    backgroundColor: "#01D9D114",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    objectFit: "cover",
    height: "100vh",
  },
  "& .create-modal-heading": {
    fontSize: "1.25rem",
    fontFamily: "Poppins",
    fontWeight: "600",
    textAlign: "Left",
  },
  "& .policy-form-label": {
    display: "flex",
    gap: "4px",
    fontFamily: "Poppins",
    alignItems: "center",
  },
  "& .required-icon": {
    color: "red",
    fontWeight: fontWeight.medium,
    marginLeft: "4px",
  },
  "& .policy-btn": {
    marginTop: "10px",
    borderRadius: "20px",
    width: "fit-content",
    height: "3rem",
    lineHeight: "10px",
    textTransform: "none",
    padding: "0px 2%",
    fontFamily: "Poppins",
    background: colors.aquasky,
    color: colors.white,
    "&:hover": {
      backgroundColor: "#00b8a9",
    },
  },
  "& .policy-submit-btn": {
    background: colors.aquasky,
    color: colors.white,
    borderRadius: "20px",
    width: "fit-content",
    maxHeight: "3rem",
    lineHeight: "10px",
    textTransform: "none",
    padding: "0px 4%",
  },
  "& .modal-input": {
    width: "100%",
    padding: "8px",
    marginTop: "4px",
    border: "1px solid rgba(0,0,0, .2)",
    borderRadius: "0.6rem",
    outline: "none",
    boxSizing:"border-box",
    fontFamily:"Poppins",
    "&:focus": {
      borderColor: "black",
      boxShadow: "0 0 0 1px black",
    },
    "&:hover": {
      borderColor: "black",
    },
    "&::placeholder": {
      fontWeight: 500,
      fontFamily: "Poppins",
      // color:'rgba(0, 0, 0, .5)",'
      color: "black",
      opacity: "50%",
    },
  },
}));

const CustomeDataGrid = styled(DataGrid)(() => ({
  "& .MuiDataGrid-cell": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
    backgroundColor: "red !impotant",
  },

  "& .MuiDataGrid-virtualScroller": {
    overflowX: "auto !important",
  },
  "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
    whiteSpace: "nowrap",
  },

  // /* Sticky columns */
  // "& .MuiDataGrid-cell[data-field='Risk ID'], & .MuiDataGrid-columnHeader[header-name='evidenceId']":
  //   {
  //     position: "sticky",
  //     left: 0,
  //     backgroundColor: "#f0f0f0",
  //     zIndex: 1,
  //     boxShadow: "2px 0 5px -2px rgba(0, 0, 0, 0.2)",
  //     backgroundColor:'red !important',
  //   },
  // "& .MuiDataGrid-cell[data-field='category'], & .MuiDataGrid-columnHeader[data-field='category']":
  //   {
  //     position: "sticky",
  //     left: 100,
  //     backgroundColor: "#f0f0f0",
  //     zIndex: 1,
  //     boxShadow: "2px 0 5px -2px rgba(0, 0, 0, 0.2)",
  //   },
  // "& .MuiDataGrid-cell[data-field='custom'], & .MuiDataGrid-columnHeader[data-field='custom']":
  //   {
  //     position: "sticky",
  //     left: 300,
  //     backgroundColor: "#f0f0f0",
  //     zIndex: 1,
  //     boxShadow: "2px 0 5px -2px rgba(0, 0, 0, 0.2)",
  //   },

  // /* General Styles */
  // "&": {
  //   width: "100%",
  //   fontFamily: "Poppins",
  // },
  // "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
  //   outline: "none",
  // },
  // "& .MuiDataGrid-cell:focus-within": {
  //   outline: "none",
  // },

  // /* Checkbox Customization */
  // "& .MuiDataGrid-checkboxInput": {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   cursor: "pointer",
  //   width: "18px",
  //   height: "18px",
  //   borderRadius: "4px",
  //   backgroundColor: "#fff",
  //   position: "relative",
  // },

  // /* Checked Checkbox Styles */
  // "& .Mui-checked .MuiDataGrid-checkboxInput": {
  //   backgroundColor: "#C1E4E2 !important",
  //   borderColor: "#008C87 !important",
  // },

  // /* Avatar Group Styling */
  // "& .MuiAvatarGroup-avatar": {
  //   fontSize: "1rem", // Adjust font size
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: "#008C87", // Example color
  //   color: "#fff", // Example text color
  //   textAlign: "right",
  // },

  // /* Row Styling */
  // "& .MuiDataGrid-row": {
  //   display: "flex",
  //   alignItems: "center",
  //   paddingBottom: "5px",
  //   borderBottom: "1px solid #b3b3b3", // Adjust border color
  // },

  // /* Column Header Styling */
  // "& .MuiDataGrid-columnHeader": {
  //   padding: "10px",
  //   color: "#333", // Text color
  //   fontSize: "1rem", // Adjust font size
  //   textAlign: "left",
  //   backgroundColor: "#f9f9f9", // Background color
  //   borderCollapse: "collapse",
  // },

  // /* Cell Styling */
  // "& .MuiDataGrid-cell": {
  //   color: "#333", // Text color
  //   justifyContent: "flex-start", // Align text to start
  //   maxWidth: "100%",
  //   whiteSpace: "normal", // Allow wrapping of text
  //   wordBreak: "break-word", // Break long words
  //   display: "flex",
  //   alignItems: "center",
  //   lineHeight: "normal", // Adjust line height
  //   borderTop: "none", // Remove top border
  // },

  // New CSS ENds
  "& ": {
    fontFamily: "Poppins",
  },
  "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
    outline: "none",
  },
  "& .MuiDataGrid-cell:focus-within": {
    outline: "none",
  },
  "& .MuiDataGrid-checkboxInput": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    width: "18px",
    height: "18px",
    borderRadius: "4px",
    backgroundColor: "#fff",
    position: "relative",
  },
  "& .MuiDataGrid-virtualScroller": {
    overflowX: "auto !important",
  },
  "& .Mui-checked .MuiDataGrid-checkboxInput": {
    backgroundColor: "#C1E4E2 !important",
    borderColor: "#008C87 !important",
  },
  "& .Mui-checked .MuiSvgIcon-root": {
    color: "#008C87 !important",
  },
  "& .MuiCheckbox-root": {
    color: "#008C87 !important",
  },
  "& .MuiCheckbox-root.Mui-checked": {
    backgroundColor: "#C1E4E2 !important",
    borderColor: "#008C87 !important",
  },
  "& .MuiButtonBase-root-MuiButton-root": {
    fontFamily: "Poppins",
    height: "33px",
    border: "2px solid #01D9D1",
    minWidth: "100px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    borderRadius: "20px",
    color: "black",
  },
  "& .MuiDataGrid-columnHeader:hover .MuiDataGrid-sortIcon": {
    opacity: "0 !important",
    pointerEvents: "none",
    display: "none",
  },
  "& .MuiDataGrid-columnHeader .MuiDataGrid-sortIcon": {
    opacity: "0 !important",
    pointerEvents: "none",
    display: "none",
  },
  "& .MuiAvatarGroup-avatar": {
    fontSize: fontSize.h6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors?.aquasky,
    color: "white",
    textAlign: "right",
  },
  "& .avatar-group": {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row-reverse",
    fontSize: fontSize.h4,
  },
  "& .datagrid-column-style": {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
  },

  "& .avatar-group2": {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row-reverse",
    fontSize: fontSize.h4,
  },
  "& .MuiAvatarGroup-avatar.MuiAvatar-root": {
    fontSize: "0.9rem",
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
  },

  "& .MuiDataGrid-row": {
    display: "flex",
    alignItems: "center",
    paddingBottom: "5px",
    borderBottom: "1px solid black",
  },
  "& .datagrid-column-title": {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    cursor: "pointer",
  },
  "& .framework-column": {
    display: "flex",
    alignItems: "center",
    gap: 2,
    fontFamily: "Poppins",
  },

  "& .css-1fgl3fb-MuiDataGrid-root": {
    border: "none",
  },
  "& .MuiDataGrid-root": {
    borderRadius: "5px",
    textAlign: "start",
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#f0f0f0",
  },
  "& .MuiDataGrid-columnHeader": {
    padding: "10px",
    color: "#333",
    fontSize: fontSize.h5,
    textAlign: "left",
    backgroundColor: "#f0f0f0",
    borderCollapse: "collapse",
  },

  "& .MuiDataGrid-cell": {
    color: "#333",
    borderTop: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  "& .MuiCheckbox-root": {
    padding: "0",
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: "1px solid #b3b3b3",
  },
  "& .MuiDataGrid-cellCheckbox": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "& .MuiDataGrid-cell": {
    justifyContent: "flex-start",
    maxWidth: "100%",
    whiteSpace: "normal",
    wordBreak: "break-word",
    display: "flex",
    alignItems: "center",
    lineHeight: "normal",
    borderTop: "none",
  },
  "& .datagrid-row-data-start": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  "& .active-text": {
    backgroundColor: "#D9F6D3",
    fontSize: "12px",
    padding: "5px 10px",
    borderRadius: "20px",
    textAlign: "center",
  },
  "& .inactive-text": {
    backgroundColor: "#F1D0D6",
    padding: "5px 10px",
    borderRadius: "20px",
    textAlign: "center",
  },
  "& .title-style": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    position: "relative",
    ":hover": {
      "& .hover-image": {
        display: "block",
      },
    },
  },
  "& .title-start": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  "& .sub-text": {
    fontWeight: fontWeight.medium,
    fontSize: fontSize.p,
    color: "grey",
    marginTop: "5px",
    marginBottom: "2%",
  },
  "& .doc-type-style": {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontFamily: "Poppins",
  },
  "& .project-name": {
    marginBottom: "4px",
    fontFamily: "Poppins",
    textAlign: "start",
  },
  "& .filter-container-style": {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "end",
    paddingBottom: "1%",
  },

  "& .project-name": {
    marginBottom: "4px",
    fontFamily: "Poppins",
    textAlign: "start",
  },
  "& .hover-image": {
    display: "none",
    cursor: "pointer",
    transform: "translateY(-50%)",
    ":hover": {
      "& .hover-image": {
        display: "flex",
        alignItems: "center",
      },
    },
  },
  "& .table-row-hover": {
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      color: colors.aquasky,
    },
  },
  "& .edit-icon": {
    filter: "brightness(0) invert(0)",
    cursor: "pointer",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  paddingTop: "8%",
  boxShadow: "none",
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const CustomeModal = styled(Modal)({
  "& ": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "& .modal-container": {
    width: "35%",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    bgcolor: "white",
    border: "1px solid #01D9D1",
    boxShadow: "md",
    padding: "2%",
  },
  "& .modal-header": {
    flexShrink: 0,
    padding: "1%",
    paddingBottom: "5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "& .modal-body": {
    flexGrow: 1,
    overflowY: "auto",
    maxHeight: "60vh",
    padding: "1%",
  },
  "& .modal-footer": {
    flexShrink: 0,
    padding: "1%",
    display: "flex",
    justifyContent: "flex-start",
    gap: "1rem",
  },
  "& .control-mapping-container": {
    width: "40%",
    padding: "2%",
    boxShadow: "md",
    border: "1px solid #01D9D1",
    marginBottom: "1%",
    maxHeight: "92vh",
    overflowY: "auto",
    borderRadius: "20px",
  },
  "& .control-mapping-container-extra-width": {
    width: "40%",
    padding: "2%",
    boxShadow: "md",
    border: "1px solid #01D9D1",
    marginBottom: "1%",
    maxHeight: "92vh",
    overflowY: "auto",
    borderRadius: "20px",
  },
  "& .modal-container-style": {
    width: "40%",
    padding: "2%",
    boxShadow: "md",
    border: "1px solid #01D9D1",
    borderRadius: "20px",
    backgroundColor: "white",
  },
  "& .compare-doc-modal-style": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "92vh",
    marginTop: "8vh",
    borderRadius: "20px",
  },
  "& .create-control-modal-container": {
    padding: "2%",
    boxShadow: "md",
    border: "1px solid #01D9D1",
    borderRadius: "20px",
    backgroundColor: "white",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  "& .objective-modal-container": {
    width: "40%",
    padding: "2%",
    boxShadow: "md",
    border: "1px solid #01D9D1",
    borderRadius: "1rem",
  },
  "& .delete-modal-container": {
    padding: "2%",
    width: "30%",
    boxShadow: "md",
    border: "1px solid #01D9D1",
    borderRadius: "20px",
    backgroundColor: "white",
    maxHeight: "85vh",
  },
  "& .download-modal-container": {
    padding: "2%",
    width: "30%",
    boxShadow: "md",
    border: "1px solid #01D9D1",
    borderRadius: "20px",
    backgroundColor: "white",
    maxHeight: "85vh",
  },
  "& .kpi-modal-container": {
    width: "40%",
    height: "85vh",
    padding: "2%",
    boxShadow: "md",
    borderRadius: "0.8rem",
    border: "1px solid #01D9D1",
    // "&::-webkit-scrollbar": {
    //   width: "1rem",
    // },
    // "&::-webkit-scrollbar-thumb": {
    //   backgroundColor: "#888888",
    //   borderRadius: "1rem",
    //   opacity: 90
    // },
    // "&::-webkit-scrollbar-thumb:hover": {
    //   backgroundColor: "#555",
    // },
    // "&::-webkit-scrollbar-track": {
    //   background: "#f1f1f1",
    // },  },
  },
});
export {
  fontSize,
  fontWeight,
  colors,
  GlobleStyle,
  bgColors,
  CustomeDataGrid,
  Item,
  CustomeModal,
};
