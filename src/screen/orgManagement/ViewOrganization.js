import { useEffect, useState } from "react";
import { GlobleStyle, fontSize, fontWeight } from "../../Style/GlobalStyle";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  capitalize,
} from "@mui/material";
import { useParams, useNavigate } from "react-router";
import { GetOrgDetails } from "../../services/organization/GetOrgDetails";
import { OnBoardOrganization } from "../../services/organization/OnBoardOrganization";
import { useToast } from "../../context/ToastProvider";
import { DownloadContractDetails } from "../../services/organization/DownloadContractDetails";
import AddOrganizationModal from "./AddOrganizationModal";
import OffboardOrganizationModal from "./Offboardorganizationmodal ";
import PageHeader from "../../component/PageHeader";

const POPPINS = "Poppins, sans-serif";

const ViewOrganization = ({ hasFullAccess = true, canEdit = true }) => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [orgDetails, setOrgDetails] = useState(null);
  const [statusChangeLoading, setStatusChangeLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openEditOrgModal, setOpenEditOrgModal] = useState(false);
  const [offboardModalOpen, setOffboardModalOpen] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getOrgData();
  }, []);

  const getOrgData = async () => {
    setLoading(true);
    const result = await GetOrgDetails(id);
    if (result?.status) {
      setOrgDetails(result?.data?.organization);
    }
    setLoading(false);
  };

  const cap = (str) => {
    if (!str) return "N/A";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getInitials = (name) => {
    if (!name) return "SA";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  };

  const isActive = orgDetails?.status?.toLowerCase() === "active";

  const handleStatusChange = async () => {
    setStatusChangeLoading(true);
    const response = await OnBoardOrganization(id);
    if (response?.status) {
      showToast(response?.msg, "success");
      getOrgData();
    } else {
      showToast(response?.error, "error");
    }
    setStatusChangeLoading(false);
  };

  const handleEdit = () => {
    setOpenEditOrgModal(true);
  };

  const downloadFile = async (orgId, fileId, mimeType = "application/pdf") => {
    try {
      setBtnLoading(true);
      const response = await DownloadContractDetails(orgId, fileId);
      if (!response || !response.data) {
        showToast("Failed To Download Evidence", "error");
        return;
      }
      let fileName = "exportedFile";
      const mimeType = response.headers["content-type"]
        ? response.headers["content-type"]
        : "application/pdf";
      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition && contentDisposition.includes("filename=")) {
        fileName = contentDisposition
          .split("filename=")[1]
          .replace(/['"]/g, "")
          .trim();
      }

      const blob = new Blob([response.data], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error downloading file:", error);
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading) {
    return (
      <GlobleStyle>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
        >
          <CircularProgress size={28} sx={{ color: "#1d9e75" }} />
        </Box>
      </GlobleStyle>
    );
  }

  return (
    <GlobleStyle>
      <Box className="parent-container">
        <PageHeader
          crumbs={[{ label: "Back", path: "/org_management" }]}
          backTo="/org_management"
        />
        <Box className="parent-container-box" sx={{ fontFamily: POPPINS }}>
          {/* ── Top Bar ── */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={2.5}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: POPPINS,
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#1a1a2e",
                  lineHeight: 1.3,
                }}
              >
                {cap(orgDetails?.organizationName)}
              </Typography>
              <StatusBadge status={orgDetails?.status} />
            </Box>

            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {(hasFullAccess || canEdit) && (
                <Button
                  onClick={handleEdit}
                  sx={{
                    fontFamily: POPPINS,
                    fontSize: "13px",
                    fontWeight: 500,
                    textTransform: "none",
                    px: "16px",
                    py: "7px",
                    borderRadius: "8px",
                    border: "1px solid #d0d0d0",
                    color: "#444",
                    background: "#fff",
                    "&:hover": { background: "#f7f7f7" },
                  }}
                >
                  ✎ &nbsp;Edit
                </Button>
              )}
              {hasFullAccess && orgDetails?.status !== "OnBoarded" && (
                <Button
                  onClick={handleStatusChange}
                  disabled={statusChangeLoading}
                  sx={{
                    fontFamily: POPPINS,
                    fontSize: "13px",
                    fontWeight: 500,
                    textTransform: "none",
                    px: "16px",
                    py: "7px",
                    borderRadius: "8px",
                    color: "#fff",
                    background: isActive ? "#e24b4a" : "#1d9e75",
                    "&:hover": { background: isActive ? "#c43b3a" : "#0f6e56" },
                    "&.Mui-disabled": { opacity: 0.6 },
                    minWidth: "100px",
                  }}
                >
                  {statusChangeLoading ? (
                    <CircularProgress size={14} sx={{ color: "#fff" }} />
                  ) : isActive ? (
                    "Offboard"
                  ) : (
                    "Activate"
                  )}
                </Button>
              )}
              {hasFullAccess && orgDetails?.status === "OnBoarded" && (
                <Button
                  onClick={() => setOffboardModalOpen(true)}
                  sx={{
                    fontFamily: POPPINS,
                    fontSize: "13px",
                    fontWeight: 500,
                    textTransform: "none",
                    px: "16px",
                    py: "7px",
                    borderRadius: "8px",
                    color: "#fff",
                    background: "#e24b4a",
                    "&:hover": { background: "#c43b3a" },
                    "&.Mui-disabled": { opacity: 0.6 },
                    minWidth: "100px",
                  }}
                >
                  Offboard
                </Button>
              )}
            </Box>
          </Box>

          {/* ── Two-Column Grid ── */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
              alignItems: "start",
            }}
          >
            {/* ── LEFT COLUMN ── */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Organization Info */}
              <SectionCard title="Organization Info">
                <FieldRow
                  label="License ID"
                  value={orgDetails?.licenseNumber}
                />
                <FieldRow
                  label="Organization Name"
                  value={cap(orgDetails?.organizationName)}
                />
                <FieldRow label="Location" value={orgDetails?.location} />
                <FieldRow
                  label="No. of Employees"
                  value={orgDetails?.employeeSize}
                />
                <FieldRow
                  label="Status"
                  value={<StatusBadge status={orgDetails?.status} />}
                />
              </SectionCard>

              {/* Subscriptions */}
              <SectionCard title="Subscriptions">
                <FieldRow
                  label="Frameworks"
                  value={
                    orgDetails?.frameworks?.length > 0 ? (
                      <Box
                        sx={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                      >
                        {orgDetails.frameworks.map((fw, i) => (
                          <Box
                            key={i}
                            sx={{
                              fontSize: "16px",
                              fontWeight: 500,
                              fontFamily: POPPINS,
                            }}
                          >
                            {fw?.name}
                            {orgDetails.frameworks?.length - 1 !== i && ", "}
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      "N/A"
                    )
                  }
                />
              </SectionCard>
            </Box>

            {/* ── RIGHT COLUMN ── */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Super Admin */}
              <SectionCard title="Super Admin Details">
                {/* Avatar + name header */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    pb: "10px",
                    mb: "2px",
                    borderBottom: "0.5px solid #f0f0f0",
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "#e1f5ee",
                      color: "#0f6e56",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: 600,
                      fontFamily: POPPINS,
                      flexShrink: 0,
                    }}
                  >
                    {getInitials(
                      orgDetails?.firstname + " " + orgDetails?.lastname,
                    )}
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: POPPINS,
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#1a1a2e",
                        lineHeight: 1.3,
                      }}
                    >
                      {capitalize(orgDetails?.firstname || "") +
                        " " +
                        capitalize(orgDetails?.lastname || "")}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: POPPINS,
                        fontSize: "13px",
                        color: "#aaa",
                        mt: "2px",
                      }}
                    >
                      Super Admin
                    </Typography>
                  </Box>
                </Box>

                <FieldRow label="Email" value={orgDetails?.saEmail} />
                <FieldRow
                  label="Username"
                  value={
                    <Typography
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "16px",
                        color: "#1a1a2e",
                      }}
                    >
                      {orgDetails?.username || "N/A"}
                    </Typography>
                  }
                />
              </SectionCard>

              {/* Dates & Contract */}
              <SectionCard title="Dates & Contract">
                <FieldRow
                  label="Onboarding Date"
                  value={orgDetails?.purchaseDate}
                />
                <FieldRow
                  label="Annual Review Date"
                  value={orgDetails?.expiryDate}
                />
                <FieldRow
                  label="Contract File"
                  value={
                    orgDetails?.contractDetails?.length > 0
                      ? orgDetails?.contractDetails?.map((item, index) => (
                          <Typography
                            component="a"
                            href={orgDetails.contractFile}
                            target="_blank"
                            rel="noreferrer"
                            sx={{
                              fontFamily: POPPINS,
                              fontSize: "16px",
                              color: "#1d9e75",
                              textDecoration: "none",
                              cursor: "pointer",
                              "&:hover": { textDecoration: "underline" },
                            }}
                            onClick={() => downloadFile(id, item?._id)}
                          >
                            {item?.name || "View File"}
                            {orgDetails?.contractDetails?.length - 1 !==
                              index && " ,  "}
                          </Typography>
                        ))
                      : "N/A"
                  }
                />
              </SectionCard>
            </Box>
          </Box>
        </Box>

        {openEditOrgModal && (
          <AddOrganizationModal
            open={openEditOrgModal}
            onClose={() => setOpenEditOrgModal(false)}
            data={orgDetails}
            refreshList={getOrgData}
            isEdit={true}
          />
        )}

        {offboardModalOpen && (
          <OffboardOrganizationModal
            open={offboardModalOpen}
            onClose={() => {
              setOffboardModalOpen(false);
            }}
            refreshList={getOrgData}
            organizationData={orgDetails}
          />
        )}
      </Box>
    </GlobleStyle>
  );
};

/* ────────────────────────────────────────────
   Reusable Sub-components
──────────────────────────────────────────── */

const SectionCard = ({ title, children }) => (
  <Box
    sx={{
      background: "#fff",
      border: "0.5px solid #e4e4e4",
      borderRadius: "12px",
      p: "1rem 1.25rem",
    }}
  >
    <Typography
      sx={{
        fontFamily: POPPINS,
        fontSize: "12px",
        fontWeight: 600,
        color: "#aaa",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        mb: "10px",
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

const FieldRow = ({ label, value }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      py: "8px",
      borderBottom: "0.5px solid #f5f5f5",
      "&:last-child": { borderBottom: "none" },
    }}
  >
    <Typography
      sx={{
        fontFamily: POPPINS,
        fontSize: "16px",
        color: "#999",
        width: "180px",
        minWidth: "120px",
        flexShrink: 0,
      }}
    >
      {capitalize(label || "N/A")}
    </Typography>
    <Box sx={{ flex: 1 }}>
      {typeof value === "string" || typeof value === "number" ? (
        <Typography
          sx={{
            fontFamily: POPPINS,
            fontSize: "16px",
            color: "#1a1a2e",
            fontWeight: 500,
          }}
        >
          {capitalize(String(value) || "N/A")}
        </Typography>
      ) : (
        (value ?? (
          <Typography
            sx={{ fontFamily: POPPINS, fontSize: "16px", color: "#1a1a2e" }}
          >
            N/A
          </Typography>
        ))
      )}
    </Box>
  </Box>
);

const STATUS_CONFIG = {
  "Ready To Onboard": {
    bg: "#e3f2fd",
    dot: "#1e88e5",
    text: "#1565c0",
  },
  OnBoarded: {
    bg: "#e1f5ee",
    dot: "#1d9e75",
    text: "#0f6e56",
  },
  "Ready To OffBoard": {
    bg: "#fff4e5",
    dot: "#fb8c00",
    text: "#ef6c00",
  },
  OffBoarded: {
    bg: "#fbe9e7",
    dot: "#e53935",
    text: "#b71c1c",
  },
};

export const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || {
    bg: "#f1efe8",
    dot: "#888780",
    text: "#5f5e5a",
  };

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        mt: "5px",
        px: "10px",
        py: "3px",
        borderRadius: "20px",
        background: config.bg,
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: config.dot,
        }}
      />
      <Typography
        sx={{
          fontFamily: POPPINS,
          fontSize: "12px",
          fontWeight: 600,
          color: config.text,
        }}
      >
        {status || "N/A"}
      </Typography>
    </Box>
  );
};

export default ViewOrganization;
