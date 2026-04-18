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
import { AddFramework } from "../../services/organization/AddFramework";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const UpdateFrameworkModal = ({
  open,
  onClose,
  refreshList,
  data = [],
  isEdit = false,
}) => {
  const { id } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isFrameworkFocused, setIsFrameworkFocused] = useState(false);
  const frameworks = [
    { label: "ISO 27001:2022", value: "ISO 27001:2022" },
    // { label: "SOC 2", value: "SOC 2" },
  ];
  const existingFrameworkValues = data?.map((item) => item?.name) || [];

  const availableFrameworks = frameworks.filter(
    (framework) => !existingFrameworkValues.includes(framework.value),
  );
  const [showDraftConfirm, setShowDraftConfirm] = useState(false);
  const [openSuperAdminModal, setOpenSuperAdminModal] = useState(false);
  const [createdOrgName, setCreatedOrgName] = useState("");
  const [orgId, setOrgId] = useState("");
  const [isFileRemove, setIsFileRemove] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]); // new files
  const [removedFileIds, setRemovedFileIds] = useState([]); // files to delete (edit mode)

  const validationSchema = Yup.object({
    subscribeFramework: Yup.array()
      .min(1, "At least one framework must be selected")
      .required("Framework is required"),
  });

  const handleSubmit = async (values) => {
    setBtnLoading(true);

    try {
      const response = await AddFramework(id, values);

      if (response?.status) {
        refreshList();
        onClose();
        showToast(response?.msg, "success");
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
                Add Subscribed Frameworks
              </Typography>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Formik
              enableReinitialize
              initialValues={{
                subscribeFramework: [],
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
                  {/* Scrollable Body */}
                  <Box
                    className="modal-body"
                    sx={{
                      minHeight: isFrameworkFocused
                        ? isFrameworkFocused && values.framework?.length === 0
                          ? "40vh"
                          : "35vh"
                        : "auto",
                      transition: "min-height 0.3s ease-in-out",
                    }}
                  >
                    {/* Subscribed Framework */}
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
                        defaultOptions={availableFrameworks}
                        value={values.subscribeFramework}
                        onChange={(selectedOption) =>
                          setFieldValue("subscribeFramework", selectedOption)
                        }
                        onBlur={() =>
                          setFieldTouched("subscribeFramework", true)
                        }
                        onMenuOpen={() => {
                          setIsFrameworkFocused(true);
                        }}
                        onMenuClose={() => {
                          setIsFrameworkFocused(false);
                        }}
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
                  </Box>

                  <Box className="modal-footer">
                    <Button
                      type="submit"
                      className="policy-btn policy-submit-btn"
                      loading={btnLoading}
                      disabled={btnLoading || !isValid || !dirty}
                    >
                      Add
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

export default UpdateFrameworkModal;
