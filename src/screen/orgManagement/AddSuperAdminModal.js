import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import {
  GlobleStyle,
  CustomeModal,
  colors,
  fontWeight,
  CustomTextField,
} from "../../Style/GlobalStyle";
import Sheet from "@mui/joy/Sheet";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useToast } from "../../context/ToastProvider";
import { UpdateSuperAdminDetails } from "../../services/organization/UpdateSuperAdminDetails";
import { useParams } from "react-router-dom";
// import { AddSuperAdmin } from "../../services/organization/AddSuperAdmin";

const AddSuperAdminModal = ({ open, onClose, data, refreshList }) => {
  const { id } = useParams();
  const { showToast } = useToast();
  const [btnLoading, setBtnLoading] = useState(false);

  // ✅ Validation
  const validationSchema = Yup.object({
    username: Yup.string().trim().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    firstName: Yup.string().trim().required("First name is required"),
    lastName: Yup.string().trim().required("Last name is required"),
  });

  const handleSubmit = async (values) => {
    try {
      setBtnLoading(true);

      const response = await UpdateSuperAdminDetails(id, values);
      if (response?.status) {
        showToast("Super admin added successfully", "success");
        refreshList?.();
        onClose();
      }
    } catch (error) {
      console.error(error);
      showToast("Something went wrong", "error");
    } finally {
      setBtnLoading(false);
    }
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
          {/* ── Header ── */}
          <Box className="modal-header">
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Typography className="create-modal-heading">
                Update Super Admin
              </Typography>
            </Box>

            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* ── Form ── */}
          <Formik
            initialValues={{
              username: data?.username ? data?.username : "",
              email: data?.saEmail ? data?.saEmail : "",
              firstName: data?.firstname ? data?.firstname : "",
              lastName: data?.lastname ? data?.lastname : "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              setFieldValue,
              errors,
              touched,
              handleBlur,
              isValid,
              dirty,
            }) => (
              <Form>
                <Box className="modal-body">
                  {/* Username */}
                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">
                      Username<span className="required-icon">*</span>
                    </label>
                    <CustomTextField
                      name="username"
                      placeholder="Enter username"
                      value={values.username}
                      onBlur={handleBlur}
                      fullWidth
                      size="small"
                      onChange={(e) =>
                        setFieldValue(
                          "username",
                          e.target.value.replace(/^\s+/, ""),
                        )
                      }
                    />
                    {touched.username && errors.username && (
                      <Typography color="error" variant="caption">
                        {errors.username}
                      </Typography>
                    )}
                  </Box>

                  {/* Email */}
                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">
                      Email<span className="required-icon">*</span>
                    </label>
                    <CustomTextField
                      name="email"
                      placeholder="Enter email"
                      value={values.email}
                      onBlur={handleBlur}
                      fullWidth
                      size="small"
                      onChange={(e) =>
                        setFieldValue(
                          "email",
                          e.target.value.replace(/^\s+/, ""),
                        )
                      }
                    />
                    {touched.email && errors.email && (
                      <Typography color="error" variant="caption">
                        {errors.email}
                      </Typography>
                    )}
                  </Box>

                  {/* First Name */}
                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">
                      First Name<span className="required-icon">*</span>
                    </label>
                    <CustomTextField
                      name="firstName"
                      placeholder="Enter first name"
                      value={values.firstName}
                      onBlur={handleBlur}
                      fullWidth
                      size="small"
                      onChange={(e) =>
                        setFieldValue(
                          "firstName",
                          e.target.value.replace(/^\s+/, ""),
                        )
                      }
                    />
                    {touched.firstName && errors.firstName && (
                      <Typography color="error" variant="caption">
                        {errors.firstName}
                      </Typography>
                    )}
                  </Box>

                  {/* Last Name */}
                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">
                      Last Name<span className="required-icon">*</span>
                    </label>
                    <CustomTextField
                      name="lastName"
                      placeholder="Enter last name"
                      value={values.lastName}
                      onBlur={handleBlur}
                      fullWidth
                      size="small"
                      onChange={(e) =>
                        setFieldValue(
                          "lastName",
                          e.target.value.replace(/^\s+/, ""),
                        )
                      }
                    />
                    {touched.lastName && errors.lastName && (
                      <Typography color="error" variant="caption">
                        {errors.lastName}
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* ── Footer ── */}
                <Box className="modal-footer" sx={{ gap: "10px" }}>
                  <Button
                    type="submit"
                    disabled={!isValid || !dirty || btnLoading}
                    className="policy-btn policy-submit-btn"
                    loading={btnLoading}
                  >
                    Update
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

export default AddSuperAdminModal;
