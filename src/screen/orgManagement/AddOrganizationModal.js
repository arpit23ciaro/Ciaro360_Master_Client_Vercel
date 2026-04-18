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
  CustomTextField,
  CustomTextArea,
} from "../../Style/GlobalStyle";
import Sheet from "@mui/joy/Sheet";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import AsyncSelect from "react-select/async";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate, useParams } from "react-router";

import UploadIcon from "../../assest/upload-icon.svg";
import dayjs from "dayjs";
import { AddOrganization } from "../../services/organization/AddOrganization";

import { UploadContractDetailsFile } from "../../services/organization/UploadContractDetailsFile";
import { RemoveContractDetailsFile } from "../../services/organization/RemoveContractDetailsFile";
import { UpdateOrganization } from "../../services/organization/UpdateOrganization";
import { useToast } from "../../context/ToastProvider";
import OrgDraftConfirmationModal from "./OrgDraftConfirmationModal";
import AddSuperAdminModal from "./AddSuperAdminModal";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const AddOrganizationModal = ({
  open,
  onClose,
  refreshList,
  data = null,
  isEdit = false,
}) => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const frameworks = [
    { label: "ISO 27001:2022", value: "ISO 27001:2022" },
    // { label: "SOC 2", value: "SOC 2" },
    // {
    //   label: "Organization Identified Controls (OIC)",
    //   value: "Organization Identified Controls (OIC)",
    // },
  ];
  const [showDraftConfirm, setShowDraftConfirm] = useState(false);
  const [openSuperAdminModal, setOpenSuperAdminModal] = useState(false);
  const [createdOrgName, setCreatedOrgName] = useState("");
  const [orgId, setOrgId] = useState("");
  const [isFileRemove, setIsFileRemove] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]); // new files
  const [removedFileIds, setRemovedFileIds] = useState([]); // files to delete (edit mode)

  const validationSchema = Yup.object({
    organizationName: Yup.string()
      .trim()
      .required("Organization Name is required"),

    superAdminFirstName: Yup.string().trim().required("First Name is required"),

    superAdminLastName: Yup.string().trim().required("Last Name is required"),

    superAdminUsername: Yup.string().trim().required("Username is required"),

    superAdminEmail: Yup.string()
      .email("Invalid email format")
      .required("Super Admin Email is required"),

    employeeSize: Yup.number()
      .typeError("Employee size must be a number")
      .min(1, "Employee size must be at least 1")
      .required("Employee size is required"),

    subscribeFramework: Yup.array()
      .min(1, "At least one framework must be selected")
      .required("Framework is required"),

    onboardingDate: Yup.date()
      .typeError("Onboarding date is required")
      .required("Onboarding date is required"),
  });

  const EditValidationSchema = Yup.object({
    organizationName: Yup.string()
      .trim()
      .required("Organization Name is required"),

    employeeSize: Yup.number()
      .typeError("Employee size must be a number")
      .min(1, "Employee size must be at least 1")
      .required("Employee size is required"),

    // subscribeFramework: Yup.array()
    //   .min(1, "At least one framework must be selected")
    //   .required("Framework is required"),

    onboardingDate: Yup.date()
      .typeError("Onboarding date is required")
      .required("Onboarding date is required"),
  });

  const handleSubmit = async (values) => {
    setBtnLoading(true);
    if (!isEdit) {
      try {
        const response = await AddOrganization(values);
        const id = await response?._id;
        setOrgId(id);
        if (response?.status) {
          if (uploadedFiles?.length > 0) {
            const res = await UploadContractDetailsFile(
              response?._id,
              uploadedFiles,
            );
          }
          showToast(response?.msg, "success");
          navigate(`/org_management/${id}`);
        }
      } catch (error) {
        console.error("Error creating evidence requirement:", error);
      } finally {
        setBtnLoading(false);
      }
    } else {
      try {
        const response = await UpdateOrganization(data?._id, values);
        if (response?.status) {
          //  UPLOAD new files
          if (uploadedFiles?.length > 0) {
            const res = await UploadContractDetailsFile(
              data._id,
              uploadedFiles,
            );
            if (!res?.status) {
              showToast(res?.error, "error");
            }
          }

          //  DELETE removed files
          for (let fileId of removedFileIds) {
            const res = await RemoveContractDetailsFile(data._id, fileId);
            if (!res?.status) {
              showToast(res?.error, "error");
            }
          }

          showToast(response?.msg, "success");
          refreshList();
          onClose();
        }
      } catch (error) {
        console.error("Error creating evidence requirement:", error);
      } finally {
        setBtnLoading(false);
      }
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
    <>
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
                {isEdit
                  ? "Edit Organization Details"
                  : "Add Organization Details"}
              </Typography>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Formik
              enableReinitialize
              initialValues={{
                organizationName: data?.organizationName ?? "",
                superAdminFirstName: data?.firstname ?? "",
                superAdminLastName: data?.lastname ?? "",
                superAdminUsername: data?.username ?? "",
                superAdminEmail: data?.saEmail ?? "",
                location: data?.location ?? "",
                employeeSize:
                  data?.employeeSize != null ? String(data.employeeSize) : "",
                subscribeFramework:
                  data?.frameworks?.length > 0
                    ? frameworks.filter((fw) =>
                        data.frameworks.some((item) => item.name === fw.value),
                      )
                    : [],
                contractDetails: data?.contractDetails || [],
                onboardingDate: (() => {
                  const d = dayjs(data?.purchaseDate, "DD-MM-YYYY", true);
                  return d.isValid()
                    ? d.tz("UTC", true).startOf("day").utc().toISOString()
                    : null;
                })(),
                expireDate: (() => {
                  const d = dayjs(data?.expiryDate, "DD-MM-YYYY", true);
                  return d.isValid()
                    ? d.tz("UTC", true).startOf("day").utc().toISOString()
                    : null;
                })(),
              }}
              validationSchema={
                isEdit ? EditValidationSchema : validationSchema
              }
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
                setFieldTouched,
              }) => (
                <Form style={{ width: "100%" }}>
                  {/* Scrollable Body */}
                  <Box className="modal-body">
                    {/* Organization Name */}
                    <Box sx={{ mb: 2 }}>
                      <label className="policy-form-label">
                        Organization Name
                        <span className="required-icon">*</span>
                      </label>
                      <CustomTextField
                        name="organizationName"
                        placeholder="Enter Organization Name"
                        value={values.organizationName}
                        autoComplete="off"
                        onBlur={handleBlur}
                        fullWidth
                        size="small"
                        onChange={(e) =>
                          setFieldValue(
                            "organizationName",
                            e.target.value.replace(/^\s+/, ""),
                          )
                        }
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

                    {/* Super Admin — First Name & Last Name (side by side) */}
                    {!isEdit && (
                      <Box
                        sx={{
                          mb: 2,
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "12px",
                        }}
                      >
                        <Box>
                          <label className="policy-form-label">
                            First Name<span className="required-icon">*</span>
                          </label>
                          <CustomTextField
                            name="superAdminFirstName"
                            placeholder="Enter First Name"
                            value={values.superAdminFirstName}
                            autoComplete="off"
                            onBlur={handleBlur}
                            fullWidth
                            size="small"
                            onChange={(e) =>
                              setFieldValue(
                                "superAdminFirstName",
                                e.target.value.replace(/^\s+/, ""),
                              )
                            }
                          />
                          {touched.superAdminFirstName &&
                            errors.superAdminFirstName && (
                              <Typography
                                color="error"
                                variant="caption"
                                sx={{ fontFamily: "Poppins" }}
                              >
                                {errors.superAdminFirstName}
                              </Typography>
                            )}
                        </Box>

                        <Box>
                          <label className="policy-form-label">
                            Last Name<span className="required-icon">*</span>
                          </label>
                          <CustomTextField
                            name="superAdminLastName"
                            placeholder="Enter Last Name"
                            value={values.superAdminLastName}
                            autoComplete="off"
                            onBlur={handleBlur}
                            fullWidth
                            size="small"
                            onChange={(e) =>
                              setFieldValue(
                                "superAdminLastName",
                                e.target.value.replace(/^\s+/, ""),
                              )
                            }
                          />
                          {touched.superAdminLastName &&
                            errors.superAdminLastName && (
                              <Typography
                                color="error"
                                variant="caption"
                                sx={{ fontFamily: "Poppins" }}
                              >
                                {errors.superAdminLastName}
                              </Typography>
                            )}
                        </Box>
                      </Box>
                    )}

                    {/* Username */}
                    {!isEdit && (
                      <Box sx={{ mb: 2 }}>
                        <label className="policy-form-label">
                          Username<span className="required-icon">*</span>
                        </label>
                        <CustomTextField
                          name="superAdminUsername"
                          placeholder="Enter Username"
                          value={values.superAdminUsername}
                          autoComplete="off"
                          onBlur={handleBlur}
                          fullWidth
                          size="small"
                          onChange={(e) =>
                            setFieldValue(
                              "superAdminUsername",
                              e.target.value.replace(/^\s+/, ""),
                            )
                          }
                        />
                        {touched.superAdminUsername &&
                          errors.superAdminUsername && (
                            <Typography
                              color="error"
                              variant="caption"
                              sx={{ fontFamily: "Poppins" }}
                            >
                              {errors.superAdminUsername}
                            </Typography>
                          )}
                      </Box>
                    )}

                    {/* Super Admin Email */}
                    {!isEdit && (
                      <Box sx={{ mb: 2 }}>
                        <label className="policy-form-label">
                          Super Admin Email
                          <span className="required-icon">*</span>
                        </label>
                        <CustomTextField
                          name="superAdminEmail"
                          placeholder="Enter Super Admin Email"
                          value={values.superAdminEmail}
                          autoComplete="off"
                          onBlur={handleBlur}
                          fullWidth
                          size="small"
                          onChange={(e) =>
                            setFieldValue(
                              "superAdminEmail",
                              e.target.value.replace(/^\s+/, ""),
                            )
                          }
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
                    )}

                    {/* Location */}
                    <Box sx={{ mb: 2 }}>
                      <label className="policy-form-label">Location</label>
                      <CustomTextArea
                        id="location"
                        name="location"
                        minRows={3}
                        className="text-area-style"
                        placeholder="Enter Location"
                        style={{
                          width: "100%",
                          padding: "8px",
                          fontSize: "16px",
                          border: "1px solid rgba(0, 0, 0, .2)",
                          webkitBackgroundClip: "padding-box",
                          backgroundClip: "padding-box",
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

                    {/* Employee Size */}
                    <Box sx={{ mb: 2 }}>
                      <label className="policy-form-label">
                        Employee Size<span className="required-icon">*</span>
                      </label>
                      <CustomTextField
                        name="employeeSize"
                        placeholder="Enter Employee Size"
                        autoComplete="off"
                        onBlur={handleBlur}
                        fullWidth
                        size="small"
                        value={values.employeeSize}
                        onChange={(e) =>
                          setFieldValue(
                            "employeeSize",
                            e.target.value.replace(/^\s+/, ""),
                          )
                        }
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

                    {/* Subscribed Framework */}
                    {!isEdit && (
                      <Box sx={{ mb: 2 }}>
                        <label className="policy-form-label">
                          Subscribed Framework
                          <span className="required-icon">*</span>
                        </label>
                        <AsyncSelect
                          isMulti
                          name="subscribeFramework"
                          placeholder="Select Framework"
                          styles={customStyles}
                          defaultOptions={frameworks}
                          value={values.subscribeFramework}
                          onChange={(selectedOption) =>
                            setFieldValue("subscribeFramework", selectedOption)
                          }
                          onBlur={() =>
                            setFieldTouched("subscribeFramework", true)
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
                    )}

                    {/* Onboarding Date */}
                    <Box sx={{ mb: 2 }}>
                      <label className="policy-form-label">
                        Onboarding Date<span className="required-icon">*</span>
                      </label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          key={values.onboardingDate?.toString()}
                          value={
                            values.onboardingDate
                              ? dayjs(values.onboardingDate)
                              : null
                          }
                          onChange={(date) => {
                            if (dayjs(date).isValid()) {
                              const utcDate = dayjs(date)
                                .tz("UTC", true)
                                .startOf("day")
                                .utc();
                              setFieldValue(
                                "onboardingDate",
                                utcDate.toISOString(),
                              );
                            }
                          }}
                          maxDate={
                            values.expireDate ? dayjs(values?.expireDate) : null
                          }
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              onBlur: () =>
                                setFieldTouched("onboardingDate", true),
                              sx: {
                                "*": { fontFamily: "Poppins !important" },
                                "& .MuiInputBase-root": { height: "36px" },
                                "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                                  { borderColor: "#d9d9d9" },
                                "& .MuiOutlinedInput-root": {
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    { borderColor: "black" },
                                },
                              },
                            },
                            desktopPaper: {
                              sx: { "*": { fontFamily: "Poppins !important" } },
                            },
                            mobilePaper: {
                              sx: { "*": { fontFamily: "Poppins !important" } },
                            },
                          }}
                          format="DD/MM/YYYY"
                        />
                      </LocalizationProvider>
                      {touched.onboardingDate && errors.onboardingDate && (
                        <Typography
                          color="error"
                          variant="caption"
                          sx={{ fontFamily: "Poppins" }}
                        >
                          {errors.onboardingDate}
                        </Typography>
                      )}
                    </Box>

                    {/* Annual Renewal Date */}
                    <Box sx={{ mb: 2 }}>
                      <label className="policy-form-label">
                        Annual Renewal Date
                      </label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          key={values.expireDate?.toString()}
                          value={
                            values.expireDate ? dayjs(values.expireDate) : null
                          }
                          onChange={(date) => {
                            if (dayjs(date).isValid()) {
                              const utcDate = dayjs(date)
                                .tz("UTC", true)
                                .startOf("day")
                                .utc();
                              setFieldValue(
                                "expireDate",
                                utcDate.toISOString(),
                              );
                            }
                          }}
                          minDate={
                            values.onboardingDate
                              ? dayjs(values?.onboardingDate)
                              : null
                          }
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              onBlur: () => setFieldTouched("expireDate", true),
                              sx: {
                                "*": { fontFamily: "Poppins !important" },
                                "& .MuiInputBase-root": { height: "36px" },
                                "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                                  { borderColor: "#d9d9d9" },
                                "& .MuiOutlinedInput-root": {
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    { borderColor: "black" },
                                },
                              },
                            },
                            desktopPaper: {
                              sx: { "*": { fontFamily: "Poppins !important" } },
                            },
                            mobilePaper: {
                              sx: { "*": { fontFamily: "Poppins !important" } },
                            },
                          }}
                          format="DD/MM/YYYY"
                        />
                        {touched.expireDate && errors.expireDate && (
                          <Typography
                            color="error"
                            variant="caption"
                            sx={{ fontFamily: "Poppins" }}
                          >
                            {errors.expireDate}
                          </Typography>
                        )}
                      </LocalizationProvider>
                    </Box>

                    {/* Contract Details */}
                    <Box sx={{ mb: 2 }}>
                      <label className="policy-form-label">
                        Contract Details
                      </label>
                      <input
                        type="file"
                        multiple
                        accept=".doc,.docx,.pdf"
                        onChange={(e) => {
                          const files = Array.from(e.target.files);

                          const updatedFiles = [
                            ...(values.contractDetails || []),
                            ...files,
                          ];

                          setFieldValue("contractDetails", updatedFiles);
                          setUploadedFiles((prev) => [...prev, ...files]);
                        }}
                        style={{ display: "none" }}
                        id="file-input"
                      />
                      <Box mt={2}>
                        {values.contractDetails?.map((file, index) => {
                          const isExisting = file?._id; // from backend

                          return (
                            <Box
                              key={index}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: 1,
                                border: "1px solid #eee",
                                borderRadius: "6px",
                                px: 1,
                                py: 0.5,
                              }}
                            >
                              <Typography
                                sx={{ fontSize: "12px", fontFamily: "Poppins" }}
                              >
                                {file.name || file.fileName}
                              </Typography>

                              <IconButton
                                onClick={() => {
                                  const updated = values.contractDetails.filter(
                                    (_, i) => i !== index,
                                  );
                                  setFieldValue("contractDetails", updated);

                                  // Track removed existing file
                                  if (isExisting) {
                                    setRemovedFileIds((prev) => [
                                      ...prev,
                                      file._id,
                                    ]);
                                  } else {
                                    // remove from new upload list
                                    setUploadedFiles((prev) =>
                                      prev.filter((f) => f.name !== file.name),
                                    );
                                  }
                                }}
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          );
                        })}
                      </Box>

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
                        <Typography style={{ fontFamily: "Poppins" }}>
                          Upload File
                        </Typography>
                      </button>
                    </Box>
                  </Box>

                  <Box className="modal-footer">
                    <Button
                      type="submit"
                      className="policy-btn policy-submit-btn"
                      loading={btnLoading}
                      disabled={btnLoading || !isValid || !dirty}
                    >
                      {isEdit ? "Update Organization" : "Add Organization"}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </GlobleStyle>
        </Sheet>
      </CustomeModal>
    </>
  );
};

export default AddOrganizationModal;
