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
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * OffboardOrganizationModal
 *
 * Props:
 *  - isOffboarded: boolean
 *      false → Full form (all fields editable). Triggered by the "Offboard" button
 *              on an OnBoarded org. Submits offboard request → status becomes
 *              "Ready To OffBoard".
 *      true  → Retention-date-only mode. Triggered from the alert banner for orgs
 *              already in "Ready To OffBoard" or "OffBoarded" status. Offboard date
 *              and reason are locked; only the retention date can be updated.
 */
const OffboardOrganizationModal = ({
  open,
  onClose,
  refreshList,
  organizationData = null,
  isOffboarded = false,
}) => {
  const { id } = useParams();
  const [btnLoading, setBtnLoading] = useState(false);

  // When isOffboarded=true we only validate + submit the retention date.
  const validationSchema = isOffboarded
    ? Yup.object({
        retentionDate: Yup.date()
          .nullable()
          .required("Retention date is required"),
        // offboardDate and offboardReason are not validated — they're disabled
        offboardDate: Yup.date().nullable(),
        offboardReason: Yup.string(),
      })
    : Yup.object({
        offboardDate: Yup.date()
          .nullable()
          .required("Offboarding date is required"),
        retentionDate: Yup.date()
          .nullable()
          .required("Retention date is required"),
        offboardReason: Yup.string()
          .trim()
          .required("Offboard reason is required"),
      });

  const handleSubmit = async (values) => {
    setBtnLoading(true);
    try {
      if (isOffboarded) {
        // ── Retention-date-only update ──
        // Only update the retention/data-deletion date.
        const retentionDate = values.retentionDate
          ? dayjs(values.retentionDate).toISOString()
          : null;

        const response = await UpdateDataRetentionDate(id, retentionDate);
        if (response?.status) {
          refreshList();
          onClose();
        }
      } else {
        // ── Full offboard flow ──
        // 1. Offboard the org → status becomes "Ready To OffBoard"
        // 2. Set the data retention/deletion date
        const payload = {
          ...values,
          offboardDate: values.offboardDate
            ? dayjs(values.offboardDate).toISOString()
            : null,
          retentionDate: values.retentionDate
            ? dayjs(values.retentionDate).toISOString()
            : null,
        };

        const response1 = await OffBoardOrganization(id, payload);

        if (response1?.status) {
          refreshList();
          onClose();
        }
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
          {/* ── Header ── */}
          <Box className="modal-header">
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Typography className="create-modal-heading">
                {isOffboarded
                  ? "Update Retention Date"
                  : "Offboard Organization Details"}
              </Typography>
            </Box>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Formik
            initialValues={{
              offboardReason: organizationData?.offboardingReason
                ? organizationData?.offboardingReason
                : "",
              offboardDate: (() => {
                const d = dayjs(
                  organizationData?.offboardingDate,
                  "DD-MM-YYYY",
                  true,
                );
                return d.isValid()
                  ? d.tz("UTC", true).startOf("day").utc().toISOString()
                  : null;
              })(),
              retentionDate: (() => {
                const d = dayjs(
                  organizationData?.dataDeletionDate,
                  "DD-MM-YYYY",
                  true,
                );
                return d.isValid()
                  ? d.tz("UTC", true).startOf("day").utc().toISOString()
                  : null;
              })(),
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
              setFieldTouched,
            }) => (
              <Form style={{ width: "100%" }}>
                <Box className="modal-body">
                  {/* ── Offboarding Date (locked when isOffboarded) ── */}
                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">
                      Offboarding Date
                      {!isOffboarded && (
                        <span className="required-icon">*</span>
                      )}
                    </label>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        key={values.offboardDate?.toString()}
                        value={
                          values?.offboardDate
                            ? dayjs(values?.offboardDate)
                            : null
                        }
                        onChange={(date) => {
                          if (dayjs(date).isValid()) {
                            const utcDate = dayjs(date)
                              .tz("UTC", true)
                              .startOf("day")
                              .utc();
                            setFieldValue(
                              "offboardDate",
                              utcDate.toISOString(),
                            );
                          }
                        }}
                        // Always locked once offboarding has been initiated
                        disabled={isOffboarded}
                        maxDate={
                          values.retentionDate
                            ? dayjs(values.retentionDate)
                            : undefined
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            onBlur: () => setFieldTouched("offboardDate", true),
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
                    {touched.offboardDate && errors.offboardDate && (
                      <Typography color="error" variant="caption">
                        {errors.offboardDate}
                      </Typography>
                    )}
                  </Box>

                  {/* ── Reason for Offboarding (locked when isOffboarded) ── */}
                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">
                      Reason for Offboarding
                      {!isOffboarded && (
                        <span className="required-icon">*</span>
                      )}
                    </label>
                    <CustomTextArea
                      name="offboardReason"
                      minRows={3}
                      maxRows={4}
                      placeholder="Enter reason..."
                      className="text-area-style"
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
                        // Visual cue that this field is locked
                        background: isOffboarded ? "#f5f5f5" : undefined,
                        color: isOffboarded ? "#999" : undefined,
                        cursor: isOffboarded ? "not-allowed" : undefined,
                      }}
                      value={values.offboardReason}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // Always locked once offboarding has been initiated
                      disabled={isOffboarded}
                    />
                    {touched.offboardReason && errors.offboardReason && (
                      <Typography color="error" variant="caption">
                        {errors.offboardReason}
                      </Typography>
                    )}
                  </Box>

                  {/* ── Retention Expiry Date (always editable) ── */}
                  <Box sx={{ mb: 2 }}>
                    <label className="policy-form-label">
                      Retention Expiry Date
                      <span className="required-icon">*</span>
                    </label>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        key={values.retentionDate?.toString()}
                        value={
                          values?.retentionDate
                            ? dayjs(values?.retentionDate)
                            : null
                        }
                        onChange={(date) => {
                          if (dayjs(date).isValid()) {
                            const utcDate = dayjs(date)
                              .tz("UTC", true)
                              .startOf("day")
                              .utc();
                            setFieldValue(
                              "retentionDate",
                              utcDate.toISOString(),
                            );
                          }
                        }}
                        // Must be on or after the offboard date
                        minDate={
                          values.offboardDate
                            ? dayjs(values.offboardDate)
                            : undefined
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            onBlur: () =>
                              setFieldTouched("retentionDate", true),
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
                    {touched.retentionDate && errors.retentionDate && (
                      <Typography color="error" variant="caption">
                        {errors.retentionDate}
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* ── Footer ── */}
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
                      "&:hover": {
                        backgroundColor: `${colors.white} !important`,
                      },
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    loading={btnLoading}
                    type="submit"
                    className="policy-btn policy-submit-btn"
                    disabled={btnLoading || !isValid || !dirty}
                    // sx={{
                    //   background: "#D32F2F",
                    //   color: "#fff",
                    //   textTransform: "none",
                    //   "&:hover": {
                    //     backgroundColor: `#D32F2F !important`,
                    //   },
                    // }}
                  >
                    {isOffboarded ? "Update Retention Date" : "Submit"}
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
