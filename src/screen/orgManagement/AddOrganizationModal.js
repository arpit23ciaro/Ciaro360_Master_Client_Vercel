import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextareaAutosize,
  Tooltip,
  IconButton,
  TextField,
} from "@mui/material";
import {
  GlobleStyle,
  CustomeModal,
  colors,
  fontWeight,
} from "../../Style/GlobalStyle";
import Sheet from "@mui/joy/Sheet";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import AsyncSelect from "react-select/async";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { GetAllFrameworks } from "../../../services/governance services/policies services/GetAllFrameworks";
// import { AddEvidenceRequirement } from "../../../services/complinces/evidences/AddEvidenceRequirement";
// import { AllUserSearchAPI } from "../../../services/governance services/policies services/AllUserSearchAPI";
// import { GetEvidenceCategoryList } from "../../../services/complinces/evidences/GetEvidenceCategoryList";
import { useParams } from "react-router";
// import toolTip from "../../../assest/dashborad-assest/info-button.svg";
import UploadIcon from "../../assest/upload-icon.svg";
import dayjs from "dayjs";

const AddOrganizationModal = ({
  open,
  onClose,
  refreshList,
  evidenceData = null,
}) => {
  const [uplaodedFile, setUploadedFile] = useState(null);
  const validationSchema = Yup.object({
    organizationName: Yup.string()
      .trim()
      .required("Organization Name is required"),

    superAdminEmail: Yup.string()
      .email("Invalid email format")
      .required("Super Admin Email is required"),

    location: Yup.object().nullable().required("Location is required"),

    employeeSize: Yup.number()
      .typeError("Employee size must be a number")
      .min(1, "Employee size must be at least 1")
      .required("Employee size is required"),

    subscribeFramework: Yup.object()
      .nullable()
      .required("Subscribed Framework is required"),

    contractDetails: Yup.string()
      .trim()
      .required("Contract Details are required"),

    onboardingDate: Yup.date()
      .typeError("Onboarding date is required")
      .required("Onboarding date is required"),
  });

  const trimEmail = (email) => {
    if (!email) return "";
    return email.split("@")[0];
  };

  const loadCategoryOptions = async (inputValue) => {
    // try {
    //   const res = await GetEvidenceCategoryList(inputValue);
    //   const categories = res?.data?.category;
    //   return categories?.map((cat) => ({
    //     value: cat?._id,
    //     label: cat?.name,
    //   }));
    // } catch (error) {
    //   console.error("Error fetching categories:", error);
    //   return [];
    // }
  };
  function handleFileUpload() {}

  const loadFrameworkOptions = async (inputValue) => {
    // try {
    //   const res = await GetAllFrameworks(inputValue);
    //   const frameworks = res?.data?.groups;
    //   return frameworks?.map((fw) => ({
    //     value: fw?._id,
    //     label: fw?.name,
    //   }));
    // } catch (error) {
    //   console.error("Error fetching frameworks:", error);
    //   return [];
    // }
  };

  const loadUserOptions = async (inputValue) => {
    // if (!inputValue || inputValue.length < 3) {
    //   return [];
    // }
    // try {
    //   const response = await AllUserSearchAPI(inputValue);
    //   const users = response?.data?.reviewer || [];
    //   return users?.map((user) => ({
    //     value: user?._id,
    //     email: user?.fullName,
    //     label: (
    //       <Typography
    //         sx={{ display: "flex", alignItems: "center", gap: "5px" }}
    //       >
    //         {user?.fullName}{" "}
    //         <Typography sx={{ fontSize: "10px" }}>
    //           ({trimEmail(user?.email)})
    //         </Typography>
    //       </Typography>
    //     ),
    //   }));
    // } catch (error) {
    //   console.error("Error fetching users:", error);
    //   return [];
    // }
  };

  const handleCreateEvidence = async (values) => {
    // try {
    //   const response =
    //     evidenceData === null ? await AddEvidenceRequirement(values) : "";
    //   if (response) {
    //     refreshList();
    //     onClose();
    //   }
    // } catch (error) {
    //   console.error("Error creating evidence requirement:", error);
    // }
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "black" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px black" : "none",
      "&:hover": {
        borderColor: "black",
      },
    }),
  };

  return (
    <CustomeModal
      open={open}
      onClose={onClose}
      BackdropProps={{ className: "blur-backdrop" }}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet variant="outlined" className="modal-container">
        <GlobleStyle>
          <Box className="modal-header">
            <Typography className="create-modal-heading">
              Add Organization Details
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Formik
            initialValues={{
              // organization name, super admin email,location, emp size, subscribe framework,contract details, onboardig details
              organizationName: "",
              superAdminEmail: "",
              location: null,
              employeeSize: "",
              subscribeFramework: null,
              contractDetails: null,
              onboardingDate: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleCreateEvidence}
          >
            {({
              values,
              setFieldValue,
              errors,
              touched,
              handleChange,
              handleBlur,
            }) => (
              <Form
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                {/*  Scrollable Body */}
                <Box className="modal-body">
                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">
                      Organization Name<span className="required-icon">*</span>
                    </label>
                    <Field
                      name="evidenceName"
                      placeholder="Enter Organization Name"
                      className="modal-input"
                      // style={{
                      //   width: "100%",
                      //   padding: "8px",
                      //   marginTop: "4px",
                      //   border: "1px solid rgba(0,0,0, .2)",
                      //   borderRadius: "0.6rem",
                      //   fontFamily: "Poppins",
                      //   boxSizing: "border-box",
                      //   outline: "none",
                      //   "&:focus": {
                      //     borderColor: "black",
                      //     boxShadow: "0 0 0 1px black",
                      //   },
                      //   "&:hover": {
                      //     borderColor: "black",
                      //   },
                      //   "&::placeholder": {
                      //     fontWeight: 600,
                      //     fontFamily: "Poppins",
                      //     // color:'rgba(0, 0, 0, .5)",'
                      //     color: "black",
                      //     opacity: "50%",
                      //   },
                      // }}
                      autoComplete="off"
                    />
                    {touched.organizationName && errors.organizationName && (
                      <Typography
                        color="error"
                        variant="caption"
                        sx={{ fontFamily: "Poppins" }}
                      >
                        {errors.organizationName}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">
                      Super Admin Email<span className="required-icon">*</span>
                    </label>
                    <Field
                      name="superAdminEmail"
                      placeholder="Enter Super Admin Email"
                      className="modal-input"
                      // style={{
                      //   width: "100%",
                      //   padding: "8px",
                      //   marginTop: "4px",
                      //   border: "1px solid rgba(0,0,0, .2)",
                      //   borderRadius: "0.6rem",
                      //   fontFamily: "Poppins",
                      //   boxSizing: "border-box",
                      //   outline: "none",
                      //   "&:focus": {
                      //     borderColor: "black",
                      //     boxShadow: "0 0 0 1px black",
                      //   },
                      //   "&:hover": {
                      //     borderColor: "black",
                      //   },
                      //   "&::placeholder": {
                      //     fontWeight: 600,
                      //     fontFamily: "Poppins",
                      //     // color:'rgba(0, 0, 0, .5)",'
                      //     color: "black",
                      //     opacity: "50%",
                      //   },
                      // }}
                      autoComplete="off"
                    />
                    {touched.superAdminEmail && errors.superAdminEmail && (
                      <Typography
                        color="error"
                        variant="caption"
                        sx={{ fontFamily: "Poppins" }}
                      >
                        {errors.superAdminEmail}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">Location</label>
                    <TextareaAutosize
                      id="location"
                      name="location"
                      minRows={3}
                      className="text-area-style"
                      style={{
                        width: "100%",
                        // minHeight: "1.5rem",
                        padding: "8px",
                        fontSize: "16px",
                        border: "1px solid rgba(0, 0, 0, .2)",
                        webkitBackgroundClip: "padding-box",
                        backgroundClip: " padding-box",
                        borderRadius: "0.5rem",
                        resize: "none",
                        boxSizing: "border-box",
                        fontFamily: "Poppins",
                      }}
                      value={values.location}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.location && errors.location && (
                      <Typography
                        color="error"
                        variant="caption"
                        sx={{ fontFamily: "Poppins" }}
                      >
                        {errors.location}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">
                      Employee Size<span className="required-icon">*</span>
                    </label>
                    <Field
                      name="employeeSize"
                      placeholder="Enter Employee Size"
                      className="modal-input"
                      // as={TextField}
                      // style={{
                      //   width: "100%",
                      //   padding: "8px",
                      //   marginTop: "4px",
                      //   border: "1px solid rgba(0,0,0, .2)",
                      //   borderRadius: "0.6rem",
                      //   fontFamily: "Poppins",
                      //   boxSizing: "border-box",
                      //   outline: "none",
                      //   "&:focus": {
                      //     borderColor: "black",
                      //     boxShadow: "0 0 0 1px black",
                      //   },
                      //   "&:hover": {
                      //     borderColor: "black",
                      //   },
                      //   "&::placeholder": {
                      //     fontWeight: 600,
                      //     fontFamily: "Poppins",
                      //     // color:'rgba(0, 0, 0, .5)",'
                      //     color: "black",
                      //     opacity: "50%",
                      //   },
                      // }}
                      autoComplete="off"
                    />
                    {touched.employeeSize && errors.employeeSize && (
                      <Typography
                        color="error"
                        variant="caption"
                        sx={{ fontFamily: "Poppins" }}
                      >
                        {errors.employeeSize}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">
                      Subscribed Framework
                    </label>
                    <AsyncSelect
                      isMulti
                      name="subscribeFramework"
                      placeholder="Select Framework"
                      styles={customStyles}
                      loadOptions={loadFrameworkOptions}
                      value={values.framework}
                      onChange={(selectedOption) =>
                        setFieldValue("framework", selectedOption)
                      }
                    />
                    {touched.subscribeFramework &&
                      errors.subscribeFramework && (
                        <Typography
                          color="error"
                          variant="caption"
                          sx={{ fontFamily: "Poppins" }}
                        >
                          {errors.subscribeFramework}
                        </Typography>
                      )}
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">
                      Contract Details
                    </label>

                    <input
                      type="file"
                      accept=".doc,.docx,.pdf"
                      multiple
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFieldValue("contractDetails", file);
                      }}
                      style={{ display: "none" }}
                      id="file-input"
                    />
                    {values.contractDetails !== null ? (
                      <Box mt={2} sx={{ diplay: "flex", flexWrap: "wrap" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            mt: 1,
                          }}
                        >
                          {values.contractDetails?.name}
                          <span>
                            <IconButton
                              onClick={() =>
                                setFieldValue("contractDetails", null)
                              }
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Box>
                      </Box>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("file-input").click()
                        }
                        style={{
                          background: colors.white,
                          marginTop: "10px",
                          borderRadius: "20px",
                          width: "12rem",
                          height: "2.5rem",
                          color: colors.black,
                          fontWeight: fontWeight.medium,
                          lineHeight: "10px",
                          textTransform: "none",
                          border: "1px solid #DADCE0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          gap: "1rem",
                        }}
                      >
                        <img src={UploadIcon} />
                        <Typography
                          style={{
                            fontFamily: "Poppins",
                          }}
                        >
                          Upload File
                        </Typography>
                      </button>
                    )}
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">Onboarding Date</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Box className="filter-date-box">
                        <DatePicker
                          value={
                            values.onboardingDate
                              ? dayjs(values.onboardingDate)
                              : null
                          }
                          onChange={(date) =>
                            setFieldValue(
                              "onboardingDate",
                              date ? date.toISOString() : null
                            )
                          }
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error:
                                touched.onboardingDate &&
                                !!errors.onboardingDate,
                              helperText:
                                touched.onboardingDate && errors.onboardingDate,
                              sx: {
                                "& .MuiInputBase-root": {
                                  height: "36px", // Adjust height here
                                },
                                "& .MuiOutlinedInput-root": {
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      borderColor: "black", // Focus border color
                                    },
                                },
                                fontFamily: "Poppins",
                              },
                            },
                          }}
                          format="DD/MM/YYYY"
                        />
                      </Box>
                    </LocalizationProvider>
                  </Box>
                </Box>

                <Box className="modal-footer">
                  <Button
                    type="submit"
                    className="policy-btn policy-submit-btn"
                  >
                    Add Organization
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </GlobleStyle>
      </Sheet>
    </CustomeModal>
  );
};

export default AddOrganizationModal;
