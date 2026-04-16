import {
  Box,
  Breadcrumbs,
  IconButton,
  Link,
  Typography,
  Tooltip,
  Skeleton,
  MenuItem,
  Menu,
  capitalize,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  fontSize,
} from "../Style/GlobalStyle";
import EllipsisText from "./EllipsisText";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";

const PageHeader = ({
  crumbs = [],
  backTo,
  loading = false,
  maxWidth = 150,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const handleMenuOpen = (event, items) => {
    setAnchorEl(event.currentTarget);
    setMenuItems(items);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuItems([]);
  };

  return (
    <Box display="flex" alignItems="center" gap={2} mb={3}>
      {/* Back Button */}
      {backTo && (
        <IconButton
          onClick={() =>
            navigate(backTo, {
              state: { __breadcrumbAction: "POP" },
            })
          }
          disabled={loading}
        >
          <ArrowBackIcon />
        </IconButton>
      )}

      {/* Loading State */}
      {loading ? (
        <Box display="flex" gap={1} alignItems="center">
          <Skeleton variant="text" width={100} height={30} />
          <Skeleton variant="text" width={120} height={30} />
          <Skeleton variant="text" width={80} height={30} />
        </Box>
      ) : (
        <Breadcrumbs>
          {crumbs.map((crumb, index) => {
            const isLast = false;

            // 🔥 MULTI-PARENT CASE
            if (crumb.alternatives?.length) {
              return (
                <IconButton
                  key={index}
                  size="small"
                  onClick={(e) => handleMenuOpen(e, crumb.alternatives)}
                >
                  <MoreHorizIcon fontSize="small" />
                </IconButton>
              );
            }

            return isLast || !crumb.path ? (
              <Typography
                key={index}
                color="text.primary"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: fontSize.h6,
                }}
              >
                <EllipsisText text={crumb.label} maxWidth={150} />
              </Typography>
            ) : (
              <Link
                key={index}
                component={RouterLink}
                to={crumb.path}
                state={{ __breadcrumbAction: "POP" }}
                underline="hover"
                color="inherit"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: fontSize.h6,
                }}
              >
                <EllipsisText text={crumb.label} maxWidth={150} />
              </Link>
            );
          })}
        </Breadcrumbs>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box className="custom-menu-box">
          {menuItems.map((item, i) => (
            <MenuItem
              key={i}
              onClick={() => {
                handleClose();
                navigate(item.path);
              }}
              sx={{ fontFamily: "Poppins" }}
            >
              {capitalize(item?.label || "")}
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
};

export default PageHeader;
