import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import {
  GlobleStyle,
  CustomeModal,
  colors,
  fontWeight,
  CustomTextField,
  CustomTextArea,
} from "../../Style/GlobalStyle";
import Sheet from "@mui/joy/Sheet";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { OffBoardOrganization } from "../../services/organization/OffBoardOrganization";
import { useParams } from "react-router-dom";
import { UpdateDataRetentionDate } from "../../services/organization/UpdateDataRetentionDate";

const OffboardOrganizationModal = ({
  open,
  onClose,
  refreshList,
  organizationData = null,
}) => {
  const { id } = useParams();
  const [btnLoading, setBtnLoading] = useState(false);

  const validationSchema = Yup.object({
    offboardDate: Yup.date()
      .nullable()
      .required("Offboarding date is required"),

    offboardReason: Yup.string().trim().required("Offboard reason is required"),
  });

  const handleSubmit = async (values) => {
    setBtnLoading(true);
    try {
      const payload = {
        ...values,
        offboardDate: values.offboardDate
          ? dayjs(values.offboardDate).toISOString()
          : null,
      };

      const retentionDate = values.retentionDate
        ? dayjs(values.retentionDate).toISOString()
        : null;

      const response1 = await OffBoardOrganization(id, payload);
      const response2 = await UpdateDataRetentionDate(id, retentionDate);

      if (response1?.status) {
        refreshList();
        onClose();
      }
    } catch (error) {
      console.error("Error offboarding organization:", error);
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
          {/* Header */}
          <Box className="modal-header">
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <WarningAmberIcon sx={{ color: "#D32F2F", fontSize: "22px" }} />
              <Typography
                className="create-modal-heading"
                sx={{ color: "#D32F2F" }}
              >
                Offboard Organization
              </Typography>
            </Box>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Formik
            initialValues={{
              offboardDate: null,
              offboardReason: "",
              retentionDate: null,
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
              <Form style={{ width: "100%" }}>
                <Box className="modal-body">
                  {/* Warning Banner */}
                  <Box
                    sx={{
                      mt: 1,
                      mb: 2,
                      p: 1.5,
                      backgroundColor: "#FFF3F3",
                      border: "1px solid #FFCDD2",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "13px",
                        color: "#B71C1C",
                        fontWeight: 500,
                      }}
                    >
                      This action will:
                    </Typography>
                    <Box
                      component="ul"
                      sx={{
                        mt: 0.5,
                        pl: 2,
                        mb: 0,
                        fontFamily: "Poppins",
                        fontSize: "12px",
                        color: "#C62828",
                      }}
                    >
                      <li>Deactivate the super admin account</li>
                      <li>Revoke access to all subscribed frameworks</li>
                      <li>Mark the organization as offboarded</li>
                      <li>
                        Preserve contract details and audit logs for records
                      </li>
                    </Box>
                  </Box>

                  {/* Org Summary */}
                  {organizationData && (
                    <Box
                      sx={{
                        mb: 2,
                        p: 1.5,
                        backgroundColor: "#F5F5F5",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "13px",
                          fontWeight: 600,
                        }}
                      >
                        {organizationData?.organizationName}
                      </Typography>
                      <Typography sx={{ fontSize: "12px", color: "#666" }}>
                        Super Admin: {organizationData?.saEmail || "N/A"}
                      </Typography>
                      <Typography sx={{ fontSize: "12px", color: "#666" }}>
                        Frameworks:{" "}
                        {organizationData?.frameworks
                          ?.map((f) => f?.name || f)
                          .join(", ") || "N/A"}
                      </Typography>
                    </Box>
                  )}

                  {/* ✅ Offboarding Date */}
                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">
                      Offboarding Date
                      <span className="required-icon">*</span>
                    </label>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={values.offboardDate}
                        onChange={(date) => setFieldValue("offboardDate", date)}
                        disableFuture
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            size: "small",
                            error:
                              touched.offboardDate && !!errors.offboardDate,
                            helperText:
                              touched.offboardDate && errors.offboardDate,
                          },
                        }}
                        format="DD/MM/YYYY"
                      />
                    </LocalizationProvider>
                  </Box>

                  {/* Reason */}
                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">
                      Reason for Offboarding
                      <span className="required-icon">*</span>
                    </label>
                    <CustomTextArea
                      name="offboardReason"
                      minRows={3}
                      maxRows={4}
                      placeholder="Enter reason..."
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
                      value={values.offboardReason}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.offboardReason && errors.offboardReason && (
                      <Typography color="error" variant="caption">
                        {errors.offboardReason}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">
                      Retention Expiry Date
                      <span className="required-icon">*</span>
                    </label>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={values.retentionDate}
                        onChange={(date) =>
                          setFieldValue("retentionDate", date)
                        }
                        disableFuture
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            size: "small",
                            error:
                              touched.retentionDate && !!errors.retentionDate,
                            helperText:
                              touched.retentionDate && errors.retentionDate,
                          },
                        }}
                        format="DD/MM/YYYY"
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>

                {/* Footer */}
                <Box className="modal-footer" sx={{ gap: "10px" }}>
                  <Button
                    type="button"
                    onClick={onClose}
                    className="policy-btn"
                    sx={{
                      border: "1px solid #DADCE0",
                      background: colors.white,
                      color: colors.black,
                      textTransform: "none",
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    className="policy-btn"
                    disabled={btnLoading || !isValid || !dirty}
                    sx={{
                      background: "#D32F2F",
                      color: "#fff",
                      textTransform: "none",
                    }}
                  >
                    Confirm Offboard
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

export default OffboardOrganizationModal;
