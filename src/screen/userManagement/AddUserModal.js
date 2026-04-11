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

const AddUserModal = ({ open, onClose, refreshList, evidenceData = null }) => {
  const [uplaodedFile, setUploadedFile] = useState(null);
  const validationSchema = Yup.object({
    name: Yup.string().trim().required("User Name is required"),

    personalEmail: Yup.string()
      .email("Invalid email format")
      .required("Personal Email is required"),

    ciaroEmail: Yup.string()
      .email("Invalid email format")
      .required("CIARO Email is required"),

    role: Yup.object().nullable().required("User role is required"),

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
            <Typography className="create-modal-heading">Add User</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Formik
            initialValues={{
              // organization name, super admin email,location, emp size, subscribe framework,contract details, onboardig details
              name: "",
              ciaroEmail: "",
              personalEmail: "",
              onboardingDate: null,
              role: null,
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
                      Full Name<span className="required-icon">*</span>
                    </label>
                    <Field
                      name="name"
                      placeholder="Enter User Name"
                      className="modal-input"
                      autoComplete="off"
                    />
                    {touched.name && errors.name && (
                      <Typography
                        color="error"
                        variant="caption"
                        sx={{ fontFamily: "Poppins" }}
                      >
                        {errors.name}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">
                      Personal Email<span className="required-icon">*</span>
                    </label>
                    <Field
                      name="personalEmail"
                      placeholder="Enter Personal Email"
                      className="modal-input"
                      autoComplete="off"
                    />
                    {touched.personalEmail && errors.personalEmail && (
                      <Typography
                        color="error"
                        variant="caption"
                        sx={{ fontFamily: "Poppins" }}
                      >
                        {errors.personalEmail}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">CIARO Email</label>
                    <Field
                      name="ciaroEmail"
                      placeholder="Enter CIARO Email"
                      className="modal-input"
                      autoComplete="off"
                    />
                    {touched.ciaroEmail && errors.ciaroEmail && (
                      <Typography
                        color="error"
                        variant="caption"
                        sx={{ fontFamily: "Poppins" }}
                      >
                        {errors.ciaroEmail}
                      </Typography>
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

                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">Role</label>
                    <AsyncSelect
                      isMulti
                      name="role"
                      placeholder="Select Role"
                      styles={customStyles}
                      loadOptions={loadFrameworkOptions}
                      value={values.framework}
                      onChange={(selectedOption) =>
                        setFieldValue("role", selectedOption)
                      }
                    />
                    {touched.role && errors.role && (
                      <Typography
                        color="error"
                        variant="caption"
                        sx={{ fontFamily: "Poppins" }}
                      >
                        {errors.role}
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Box className="modal-footer">
                  <Button
                    type="submit"
                    className="policy-btn policy-submit-btn"
                  >
                    Add User
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

export default AddUserModal;
