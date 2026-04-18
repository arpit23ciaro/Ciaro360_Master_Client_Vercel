import React, { useState } from "react";
import { Modal, Typography, Box, Button } from "@mui/material";
import { CustomeModal, GlobleStyle } from "../Style/GlobalStyle";

const DeleteModal = ({
  open,
  onClose,
  onDelete,
  refreshList,
  message = "Are you sure you want to delete?",
  btnDisable = false,
  isRemove = false,
  btnName = "Delete",
}) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const deleteItem = async () => {
    setBtnLoading(true);
    const res = await onDelete();
    if (res?.status) {
      await refreshList();
      onClose();
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
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.2) !important",
          },
        },
      }}
    >
      <Box variant="outlined" className="delete-modal-container">
        <GlobleStyle>
          <Typography
            id="modal-title"
            textColor="inherit"
            className={
              isRemove ? "remove-modal-center-heading" : "modal-center-heading"
            }
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
              className={isRemove ? "remove-btn" : "delete-btn"}
              type="submit"
              disabled={btnDisable || btnLoading}
              onClick={deleteItem}
              loading={btnDisable || btnLoading}
            >
              {btnName}
            </Button>
          </Box>
        </GlobleStyle>
      </Box>
    </CustomeModal>
  );
};

export default DeleteModal;
