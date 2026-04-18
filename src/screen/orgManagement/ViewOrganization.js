import { useEffect, useState } from "react";
import { GlobleStyle, fontSize, fontWeight } from "../../Style/GlobalStyle";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  capitalize,
  Menu,
  MenuItem,
  Collapse,
} from "@mui/material";
import { useParams, useNavigate } from "react-router";
import { GetOrgDetails } from "../../services/organization/GetOrgDetails";
import { OnBoardOrganization } from "../../services/organization/OnBoardOrganization";
// import { ConfirmOffboardOrganization } from "../../services/organization/ConfirmOffboardOrganization"; // NEW IMPORT
import { useToast } from "../../context/ToastProvider";
import { DownloadContractDetails } from "../../services/organization/DownloadContractDetails";
import AddOrganizationModal from "./AddOrganizationModal";
import OffboardOrganizationModal from "./Offboardorganizationmodal ";
import PageHeader from "../../component/PageHeader";
import AddSuperAdminModal from "./AddSuperAdminModal";
import UpdateFrameworksModal from "./UpdateFramework";
import AlertBanner from "../../component/AlertBanner";
import { RemoveFramework } from "../../services/organization/RemoveFramework";
import DeleteModal from "../../component/DeleteModal";
import { UpdateDataRetentionDate } from "../../services/organization/UpdateDataRetentionDate";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const POPPINS = "Poppins, sans-serif";

const ViewOrganization = ({ hasFullAccess, canEdit }) => {
  const { id } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [orgDetails, setOrgDetails] = useState(null);
  const [statusChangeLoading, setStatusChangeLoading] = useState(false);
  const [confirmOffboardLoading, setConfirmOffboardLoading] = useState(false); // NEW
  const [loading, setLoading] = useState(false);
  const [openEditOrgModal, setOpenEditOrgModal] = useState(false);
  const [offboardModalOpen, setOffboardModalOpen] = useState(false);
  const [cofirmOffboardModalOpen, setConfirmOffboardModalOpen] =
    useState(false);

  const [openSAModal, setOpenSAModal] = useState(false);
  const [openFrameworkModal, setOpenFrameworkModal] = useState(false);
  const [openBanner, setOpenBanner] = useState(true);
  const [showComment, setShowComment] = useState(false);
  const [openDeleteFrameworkModal, setOpenDeleteFrameworkModal] =
    useState(false);
  const [selectedFramework, setSelectedFramework] = useState(null);

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const menuOpen = Boolean(menuAnchorEl);

  useEffect(() => {
    getOrgData();
  }, []);

  const getOrgData = async () => {
    setLoading(true);
    const result = await GetOrgDetails(id);
    if (result?.status) {
      setOrgDetails({
        ...result?.data?.organization,
        // status: "Ready To OffBoard",
      });
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

  // NEW: Confirm Offboard handler — moves status from "Ready To OffBoard" → "OffBoarded"
  const handleConfirmOffboard = async () => {
    setConfirmOffboardLoading(true);

    const retentionDate = orgDetails.dataDeletionDate
      ? dayjs(orgDetails.dataDeletionDate, "DD-MM-YYYY")
          .startOf("day")
          .format("YYYY-MM-DDTHH:mm:ss.SSS")
      : null;

    const response = await UpdateDataRetentionDate(id, retentionDate);

    if (response?.status) {
      showToast(
        response?.msg || "Organization offboarded successfully",
        "success",
      );
    } else {
      showToast(response?.error || "Failed to offboard organization", "error");
    }
    setConfirmOffboardLoading(false);
    return response;
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

  if (!orgDetails?._id && loading) {
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

  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  const handleClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleRemoveFramework = async () => {
    setBtnLoading(true);
    const response = await RemoveFramework(id, selectedFramework?._id);
    if (response?.status) {
      showToast(response?.msg, "success");
    } else {
      showToast(response?.error, "error");
    }
    setBtnLoading(false);
    return response;
  };

  const sortedFrameworks = [...(orgDetails?.frameworks || [])].sort((a, b) => {
    const aIsDefault =
      a?.name?.toLowerCase().includes("organization identified controls") ||
      a?.isDefault === true;

    const bIsDefault =
      b?.name?.toLowerCase().includes("organization identified controls") ||
      b?.isDefault === true;

    return Number(bIsDefault) - Number(aIsDefault);
  });

  // Derive readability flags
  const isReadyToOffboard = orgDetails?.status === "Ready To OffBoard";
  const isOffboarded = orgDetails?.status === "OffBoarded";
  const isOffboardingInProgress = isReadyToOffboard || isOffboarded;

  return (
    <GlobleStyle>
      <Box className="parent-container">
        <PageHeader
          crumbs={[{ label: "Back", path: "/org_management" }]}
          backTo="/org_management"
        />

        {/* ── Alert Banner for offboarding statuses ── */}
        {isReadyToOffboard && (hasFullAccess || canEdit) && (
          <AlertBanner
            color="warning"
            open={openBanner}
            msg={
              <>
                {`This organization is currently in offboarding. Access will be removed on ${orgDetails?.offboardingDate || "N/A"}, and all retained data will be permanently deleted on ${orgDetails?.dataDeletionDate || "N/A"}.`}
                <Button
                  size="small"
                  onClick={() => setShowComment((prev) => !prev)}
                  style={{
                    color: "black",
                    fontWeight: fontWeight.medium,
                    fontSize: fontSize.h7,
                    textDecoration: "underLine",
                  }}
                >
                  {showComment ? "Hide Reason" : "View Reason"}
                </Button>
              </>
            }
            isShowOnlyMsg={true}
            isReviewNPublish={true}
            btnName="Update Offboarding Details"
            onClose={() => {
              setOpenBanner(false);
              setShowComment(false);
            }}
            // Opens modal in retention-date-only edit mode
            onReviewModalOpen={() => {
              setOffboardModalOpen(true);
            }}
          />
        )}

        {isOffboarded && (hasFullAccess || canEdit) && (
          <AlertBanner
            color="warning"
            open={openBanner}
            msg={
              <>
                {`This organization is currently in offboarding. Access will be removed on ${orgDetails?.offboardingDate || "N/A"}, and all retained data will be permanently deleted on ${orgDetails?.dataDeletionDate || "N/A"}.`}
                <Button
                  size="small"
                  onClick={() => setShowComment((prev) => !prev)}
                  style={{
                    color: "black",
                    fontWeight: fontWeight.medium,
                    fontSize: fontSize.h7,
                    textDecoration: "underLine",
                  }}
                >
                  {showComment ? "Hide Reason" : "View Reason"}
                </Button>
              </>
            }
            isShowOnlyMsg={true}
            isReviewNPublish={true}
            btnName="Update Data Retenction Date"
            onClose={() => {
              setOpenBanner(false);
              setShowComment(false);
            }}
            // Opens modal in retention-date-only edit mode
            onReviewModalOpen={() => {
              setOffboardModalOpen(true);
            }}
          />
        )}

        <Collapse in={showComment}>
          <Box
            sx={{
              padding: "2%",
              background: "#f9f9f9",
              padding: "8px",
              borderRadius: "4px",
              marginBottom: "2%",
            }}
          >
            <Typography variant="body2" sx={{ fontFamily: "Poppins" }}>
              {orgDetails?.offboardingReason || "No reason found"}
            </Typography>
          </Box>
        </Collapse>

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
              {/* ── Edit button: hidden once offboarding starts ── */}
              {!isOffboardingInProgress && (hasFullAccess || canEdit) && (
                <>
                  <Button
                    onClick={handleClick}
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
                  <Menu
                    id="menu-options"
                    anchorEl={menuAnchorEl}
                    open={menuOpen}
                    onClose={() => handleClose(null)}
                    MenuListProps={{ "aria-labelledby": "menu-button" }}
                  >
                    <Box className="custom-menu-box">
                      <MenuItem
                        onClick={() => {
                          handleClose(null);
                          handleEdit();
                        }}
                        sx={{ fontFamily: "Poppins", fontSize: "14px" }}
                      >
                        Update Org Details
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose(null);
                          setOpenSAModal(true);
                        }}
                        sx={{ fontFamily: "Poppins", fontSize: "14px" }}
                      >
                        Update Super Admin
                      </MenuItem>
                    </Box>
                  </Menu>
                </>
              )}

              {/* ── Activate button: only for non-OnBoarded, non-offboarding statuses ── */}
              {!isOffboardingInProgress &&
                hasFullAccess &&
                orgDetails?.status !== "OnBoarded" && (
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
                      "&:hover": {
                        background: isActive ? "#c43b3a" : "#0f6e56",
                      },
                      "&.Mui-disabled": { opacity: 0.6 },
                      minWidth: "100px",
                    }}
                  >
                    {statusChangeLoading ? (
                      <CircularProgress size={14} sx={{ color: "#fff" }} />
                    ) : (
                      "Activate"
                    )}
                  </Button>
                )}

              {/* ── Offboard button: only when OnBoarded ── */}
              {!isOffboardingInProgress &&
                hasFullAccess &&
                orgDetails?.status === "OnBoarded" && (
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
                    Initiate Offboarding
                  </Button>
                )}

              {/* ── NEW: Confirm Offboard button — appears when status is "Ready To OffBoard" ── */}
              {isReadyToOffboard && hasFullAccess && (
                <Button
                  onClick={() => setConfirmOffboardModalOpen(true)}
                  disabled={confirmOffboardLoading}
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
                    minWidth: "140px",
                  }}
                >
                  {confirmOffboardLoading ? (
                    <CircularProgress size={14} sx={{ color: "#fff" }} />
                  ) : (
                    "Confirm Offboard"
                  )}
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
                            key={index}
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

              {/* Subscriptions */}
              <SectionCard title="Subscriptions">
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
                >
                  {/* Header row with Add button */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: "4px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: POPPINS,
                        fontSize: "13px",
                        color: "#999",
                        fontWeight: 500,
                      }}
                    >
                      Frameworks
                    </Typography>
                    {!isOffboardingInProgress && (hasFullAccess || canEdit) && (
                      <Button
                        onClick={() => setOpenFrameworkModal(true)}
                        startIcon={
                          <span style={{ fontSize: "16px", lineHeight: 1 }}>
                            +
                          </span>
                        }
                        sx={{
                          fontFamily: POPPINS,
                          fontSize: "12px",
                          fontWeight: 600,
                          textTransform: "none",
                          px: "12px",
                          py: "4px",
                          borderRadius: "8px",
                          border: "1.5px solid #1d9e75",
                          color: "#1d9e75",
                          "&:hover": {
                            borderStyle: "solid",
                          },
                        }}
                      >
                        Add Framework
                      </Button>
                    )}
                  </Box>

                  {/* Framework list */}
                  {sortedFrameworks?.length > 0 ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      {sortedFrameworks?.map((fw, i) => {
                        const isDefaultFree =
                          fw?.name
                            ?.toLowerCase()
                            .includes("organization identified controls") ||
                          fw?.isDefault === true;

                        return (
                          <Box
                            key={i}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              px: "12px",
                              py: "8px",
                              borderRadius: "8px",
                              border: isDefaultFree
                                ? "1px solid #c8f0e0"
                                : "1px solid #ebebeb",
                              background: isDefaultFree ? "#f0fdf8" : "#fafafa",
                            }}
                          >
                            {/* Left: icon + name + badge */}
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <Box
                                sx={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: "6px",
                                  background: isDefaultFree
                                    ? "#1d9e75"
                                    : "#e8e8e8",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "13px",
                                    color: isDefaultFree ? "#fff" : "#666",
                                    fontWeight: 700,
                                    fontFamily: POPPINS,
                                  }}
                                >
                                  {fw?.name?.[0]?.toUpperCase() || "F"}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography
                                  sx={{
                                    fontFamily: POPPINS,
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: "#1a1a2e",
                                    lineHeight: 1.3,
                                  }}
                                >
                                  {fw?.name}
                                </Typography>
                                {isDefaultFree && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "4px",
                                      mt: "2px",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        px: "6px",
                                        py: "1px",
                                        borderRadius: "20px",
                                        background: "#e1f5ee",
                                        border: "1px solid #a7e5cc",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontFamily: POPPINS,
                                          fontSize: "10px",
                                          fontWeight: 700,
                                          color: "#0f6e56",
                                          textTransform: "uppercase",
                                          letterSpacing: "0.05em",
                                        }}
                                      >
                                        ✦ Complimentary
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        px: "6px",
                                        py: "1px",
                                        borderRadius: "20px",
                                        background: "#e3f2fd",
                                        border: "1px solid #bbdefb",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontFamily: POPPINS,
                                          fontSize: "10px",
                                          fontWeight: 700,
                                          color: "#1565c0",
                                          textTransform: "uppercase",
                                          letterSpacing: "0.05em",
                                        }}
                                      >
                                        Free
                                      </Typography>
                                    </Box>
                                  </Box>
                                )}
                              </Box>
                            </Box>

                            {/* Right: Remove button (hidden for default/free frameworks and offboarding orgs) */}
                            {!isDefaultFree &&
                              !isOffboardingInProgress &&
                              (hasFullAccess || canEdit) && (
                                <Button
                                  onClick={() => {
                                    setSelectedFramework(fw);
                                    setOpenDeleteFrameworkModal(true);
                                  }}
                                  sx={{
                                    fontFamily: POPPINS,
                                    fontSize: "11px",
                                    fontWeight: 500,
                                    textTransform: "none",
                                    px: "10px",
                                    py: "3px",
                                    minWidth: "auto",
                                    borderRadius: "6px",
                                    border: "1px solid #fcc",
                                    color: "#e24b4a",
                                    background: "#fff5f5",
                                    "&:hover": {
                                      background: "#ffeaea",
                                      borderColor: "#e24b4a",
                                    },
                                  }}
                                >
                                  Remove
                                </Button>
                              )}
                          </Box>
                        );
                      })}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        textAlign: "center",
                        py: "20px",
                        borderRadius: "8px",
                        border: "1px dashed #e0e0e0",
                        background: "#fafafa",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: POPPINS,
                          fontSize: "13px",
                          color: "#bbb",
                        }}
                      >
                        No frameworks assigned yet
                      </Typography>
                    </Box>
                  )}
                </Box>
              </SectionCard>
            </Box>
          </Box>
        </Box>

        {/* ── Modals ── */}
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
            // isOffboarded=true locks the offboard date + reason fields,
            // leaving only the retention date editable.
            // This applies for both "Ready To OffBoard" and "OffBoarded" statuses.
            isOffboarded={isOffboarded}
          />
        )}

        {openSAModal && (
          <AddSuperAdminModal
            open={openSAModal}
            onClose={() => setOpenSAModal(false)}
            data={orgDetails}
            refreshList={getOrgData}
          />
        )}

        {openFrameworkModal && (
          <UpdateFrameworksModal
            open={openFrameworkModal}
            onClose={() => setOpenFrameworkModal(false)}
            refreshList={getOrgData}
            data={orgDetails?.frameworks || []}
          />
        )}

        {openDeleteFrameworkModal ? (
          <DeleteModal
            open={openDeleteFrameworkModal}
            onClose={() => setOpenDeleteFrameworkModal(false)}
            onDelete={handleRemoveFramework}
            refreshList={getOrgData}
            loading={btnLoading}
            message="Are you sure you want to remove this framework?"
            btnDisable={btnLoading}
            btnName="Remove"
          />
        ) : null}

        {cofirmOffboardModalOpen ? (
          <DeleteModal
            open={cofirmOffboardModalOpen}
            onClose={() => setConfirmOffboardModalOpen(false)}
            onDelete={handleConfirmOffboard}
            refreshList={getOrgData}
            loading={confirmOffboardLoading}
            message="Are you sure you want to offboard this organization?"
            btnDisable={btnLoading}
            btnName="Offboard"
          />
        ) : null}
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
