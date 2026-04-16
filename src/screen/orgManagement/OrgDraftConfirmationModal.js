import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import AddIcon from "@mui/icons-material/Add";

const OrgDraftConfirmationModal = ({
  open,
  onClose,
  organizationName = "Acme Corp",
  onAddSuperAdmin,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "14px",
          padding: "1.75rem",
          boxShadow: "0px 10px 40px rgba(0,0,0,0.12)",
        },
      }}
    >
      <DialogContent sx={{ padding: 0 }}>
        {/* ── Top Section ── */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "12px",
            mb: "1.5rem",
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(0,140,135,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckCircleOutlineIcon sx={{ color: "#008C86", fontSize: 28 }} />
          </Box>

          <Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "11px",
                fontWeight: 500,
                color: "#757575",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                mb: "4px",
              }}
            >
              Organization saved as draft
            </Typography>

            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "18px",
                fontWeight: 600,
                color: "#000",
              }}
            >
              {organizationName} has been created
            </Typography>
          </Box>
        </Box>

        {/* ── Warning Box ── */}
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
            backgroundColor: "rgba(255, 193, 7, 0.1)",
            border: "1px solid rgba(255, 193, 7, 0.4)",
            borderRadius: "10px",
            padding: "0.9rem 1rem",
            mb: "1.5rem",
          }}
        >
          <WarningAmberOutlinedIcon
            sx={{
              color: "#ED6C02",
              fontSize: 18,
              mt: "2px",
              flexShrink: 0,
            }}
          />

          <Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "13px",
                fontWeight: 600,
                color: "#ED6C02",
                mb: "4px",
              }}
            >
              One more step to activate
            </Typography>

            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "13px",
                color: "#5D4037",
                lineHeight: 1.5,
              }}
            >
              Add a super admin to activate this organization. Once added,
              status will change to{" "}
              <Box component="span" sx={{ fontWeight: 600 }}>
                Active
              </Box>{" "}
              and an invite email will be sent.
            </Typography>
          </Box>
        </Box>

        {/* ── Buttons ── */}
        <Box sx={{ display: "flex", gap: "12px" }}>
          {/* Secondary Button */}
          <Button
            fullWidth
            onClick={onClose}
            sx={{
              fontFamily: "Poppins",
              fontSize: "13px",
              fontWeight: 500,
              textTransform: "none",
              color: "#00736F",
              border: "1px solid #C3C3C3",
              borderRadius: "8px",
              padding: "10px",
              backgroundColor: "#fff",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                borderColor: "#00736F",
              },
            }}
          >
            Do it later
          </Button>

          {/* Primary Button */}
          <Button
            fullWidth
            onClick={onAddSuperAdmin}
            startIcon={<AddIcon />}
            sx={{
              fontFamily: "Poppins",
              fontSize: "13px",
              fontWeight: 600,
              textTransform: "none",
              color: "#fff",
              borderRadius: "8px",
              padding: "10px",
              background: "linear-gradient(90deg, #008C87, #00D9D2)",
              boxShadow: "0 4px 12px rgba(0,140,135,0.3)",
              "&:hover": {
                background: "linear-gradient(90deg, #00736F, #00BFB8)",
              },
            }}
          >
            Add Super Admin
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OrgDraftConfirmationModal;
