import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { fontSize, fontWeight, GlobleStyle } from "../Style/GlobalStyle";

import PropTypes from "prop-types";

AlertBanner.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onAccept: PropTypes.func,
  onDeny: PropTypes.func,
  color: PropTypes.oneOf(["success", "info", "error", "warning"]),
  msg: PropTypes.string,
};

export default function AlertBanner({
  open = true,
  isYesNoOptions = false,
  hideCloseIcon = false,
  onClose,
  onAccept,
  onDeny,
  color = "success" || "info" || "error" || "warning",
  msg,
  isShowOnlyMsg,
  isReviewNPublish,
  isReattempt = false,
  onReviewModalOpen,
  btnDisable = false,
  isPermanent = false,
  AcceptBtnLabel = "Accept",
  onlyAcceptBtn = false,
  btnName = "Update",
}) {
  return (
    <GlobleStyle>
      <Box sx={{ width: "100%", paddingBottom: "1%" }}>
        <Collapse in={open}>
          <Alert
            style={{ fontFamily: "Poppins", p: 0 }}
            severity={color}
            action={
              !isShowOnlyMsg ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    //   flexDirection: "column",
                  }}
                >
                  {!isShowOnlyMsg && !isPermanent && !isReattempt ? (
                    <>
                      <Button
                        color={color}
                        size="small"
                        style={{
                          fontWeight: fontWeight.medium,
                          fontSize: fontSize.p,
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                          width: "100%",
                          gap: "0.5rem",
                          border: "1px solid #fff",
                          borderRadius: "10px",
                        }}
                        onClick={onAccept}
                      >
                        {AcceptBtnLabel
                          ? AcceptBtnLabel
                          : isYesNoOptions
                            ? "Yes"
                            : "Accept"}
                      </Button>
                      {!onlyAcceptBtn ? (
                        <Button
                          color="error"
                          size="small"
                          style={{
                            fontWeight: fontWeight.medium,
                            fontSize: fontSize.p,
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            width: "100%",
                            gap: "0.5rem",
                            border: "1px solid #fff",
                            borderRadius: "10px",
                            whiteSpace: "nowrap",
                          }}
                          onClick={onDeny}
                        >
                          {isYesNoOptions ? "No" : "Deny"}
                        </Button>
                      ) : null}
                    </>
                  ) : (
                    !isReattempt &&
                    !isPermanent &&
                    !hideCloseIcon && (
                      <IconButton
                        aria-label="close"
                        color="default"
                        size="small"
                        onClick={onClose}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    )
                  )}

                  {isReattempt && !isPermanent && (
                    <Button
                      color="warning"
                      size="small"
                      style={{
                        fontWeight: fontWeight.medium,
                        fontSize: fontSize.p,
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        width: "100%",
                        gap: "0.5rem",
                        border: "1px solid #fff",
                        borderRadius: "10px",
                        whiteSpace: "nowrap",
                      }}
                      onClick={onAccept}
                      disabled={btnDisable}
                    >
                      Reattempt
                    </Button>
                  )}

                  {isReviewNPublish && !isPermanent && (
                    <Button
                      color={color}
                      size="small"
                      style={{
                        fontWeight: fontWeight.medium,
                        fontSize: fontSize.p,
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        width: "100%",
                        gap: "0.5rem",
                        border: "1px solid #01D9D1",
                        borderRadius: "10px",
                        whiteSpace: "nowrap",
                      }}
                      onClick={onReviewModalOpen}
                    >
                      {btnName ? btnName : "Update Data Retention Date"}
                    </Button>
                  )}
                </Box>
              ) : (
                isReviewNPublish &&
                !isPermanent && (
                  <Button
                    color={color}
                    size="small"
                    style={{
                      fontWeight: fontWeight.medium,
                      fontSize: fontSize.p,
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      width: "100%",
                      gap: "0.5rem",
                      border: "1px solid #01D9D1",
                      borderRadius: "10px",
                      whiteSpace: "nowrap",
                    }}
                    onClick={onReviewModalOpen}
                  >
                    {btnName ? btnName : "Update Data Retention Date"}
                  </Button>
                )
              )
            }
            // sx={{ mb: 2 }}
          >
            {msg}
          </Alert>
        </Collapse>
      </Box>
    </GlobleStyle>
  );
}
