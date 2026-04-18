import React, { useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import { CustomeModal, GlobleStyle } from "../Style/GlobalStyle";
import { useToast } from "../context/ToastProvider";

const UpdateUserStatusModal = ({
  open,
  onClose,
  onSubmit,
  refreshList,
  isActive,
  message = "",
  btnDisable = false,
  btnName = "Activate",
  loading = false,
}) => {
  const { showToast } = useToast();
  const [btnLoading, setBtnLoading] = useState(false);

  const activateItem = async () => {
    setBtnLoading(true);
    const res = await onSubmit();
    if (res?.status) {
      showToast(res?.msg, "success");
      onClose();
      refreshList();
    } else {
      showToast(res?.error, "error");
    }
    setBtnLoading(false);
  };

  return (
    <CustomeModal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={onClose}
      className="modal-style"
    >
      <Box variant="outlined" className="delete-modal-container">
        <GlobleStyle>
          <Typography
            id="modal-title"
            textColor="inherit"
            className="modal-center-heading"
          >
            {message}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <Button
              onClick={onClose}
              type="button"
              className="policy-cancel-btn"
            >
              Cancel
            </Button>
            <Button
              className="submit-btn"
              type="submit"
              disabled={btnDisable || btnLoading}
              loading={loading || btnLoading}
              onClick={activateItem}
            >
              {btnName}
            </Button>
          </Box>
        </GlobleStyle>
      </Box>
    </CustomeModal>
  );
};

export default UpdateUserStatusModal;
