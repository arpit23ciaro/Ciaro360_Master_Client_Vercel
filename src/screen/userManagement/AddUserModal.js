import React, { useEffect, useState } from "react";
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
  CustomTextField,
} from "../../Style/GlobalStyle";
import Sheet from "@mui/joy/Sheet";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import AsyncSelect from "react-select/async";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useParams } from "react-router";
import UploadIcon from "../../assest/upload-icon.svg";
import dayjs from "dayjs";
import { AddUser } from "../../services/user/AddUser";
import { UpdateUser } from "../../services/user/UpdateUser";
import { GetUserRoleList } from "../../services/user/GetUserRoleList";
import { useToast } from "../../context/ToastProvider";

const AddUserModal = ({
  open,
  onClose,
  refreshList,
  data = null,
  isEdit,
  roleList,
}) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [roleData, setRoleData] = useState([]);
  const { showToast } = useToast();
  const validationSchema = Yup.object({
    firstName: Yup.string().trim().required("First Name is required"),
    lastName: Yup.string().trim().required("Last Name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Personal Email is required"),

    role: Yup.object().nullable().required("User role is required"),
  });

  useEffect(() => {
    const data = roleList?.map((item) => ({
      label: item?.name,
      value: item?._id,
    }));
    setRoleData(data);
  }, [roleList]);

  const loadRole = async (inputValue) => {
    try {
      const res = await GetUserRoleList();
      const roles = res?.data?.roles;
      return roles?.map((fw) => ({
        value: fw?._id,
        label: fw?.name,
      }));
    } catch (error) {
      console.error("Error fetching frameworks:", error);
      return [];
    }
  };

  const handleSubmit = async (values) => {
    setBtnLoading(true);
    try {
      const response = isEdit
        ? await UpdateUser(data?._id, values)
        : await AddUser(values);
      if (response?.status) {
        showToast(response?.msg, "success");
        refreshList();
        onClose();
      } else {
        showToast(response?.error, "error");
      }
    } catch (error) {
      console.error("Error creating evidence requirement:", error);
    } finally {
      setBtnLoading(false);
    }
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
              {isEdit ? "Update User" : "Add User"}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Formik
            initialValues={{
              firstName: data?.firstname ? data?.firstname : "",
              lastName: data?.lastname ? data?.lastname : "",
              email: data?.email ? data?.email : "",
              role: data?.role
                ? { label: data?.role?.name, value: data?.role?._id }
                : null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              setFieldValue,
              errors,
              touched,
              handleChange,
              handleBlur,
              isValid,
              dirty,
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

                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">
                      Role<span className="required-icon">*</span>
                    </label>
                    <AsyncSelect
                      name="role"
                      placeholder="Select Role"
                      menuPlacement="top"
                      styles={customStyles}
                      defaultOptions={roleData}
                      // loadOptions={loadRole}
                      value={values.role}
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
                    disabled={btnLoading || !isValid || !dirty}
                    loading={btnLoading}
                  >
                    {isEdit ? "Update User" : "Add User"}
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
