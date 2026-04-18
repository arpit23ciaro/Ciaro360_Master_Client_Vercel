import React, { useContext, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconButton, styled, Tooltip } from "@mui/material";
import { colors, GlobleStyle } from "../Style/GlobalStyle";
import { SideBarData as SideBarSecondData } from "../utils/constants/sidebarData";
import useAccess from "../utils/Permission/HasAccess";

// ─── Drawer width ─────────────────────────────────────────────────────────────
const drawerWidth = 210;

// ─── Open / close transition mixins ──────────────────────────────────────────
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

// ─── Animated Drawer ──────────────────────────────────────────────────────────
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// ─── Header area (logo + toggle button) ──────────────────────────────────────
const DrawerHeader = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

// ─── Styled list button with active indicator ─────────────────────────────────
const SidebarItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ isActive }) => ({
  display: "flex",
  alignItems: "center",
  paddingTop: "0.55rem",
  paddingBottom: "0.55rem",
  paddingLeft: "1rem",
  paddingRight: "0.5rem",
  borderRadius: "8px",
  margin: "2px 8px",
  position: "relative",
  transition: "background-color 0.2s ease",
  backgroundColor: isActive ? "rgba(0, 170, 140, 0.08)" : "transparent",

  // Left accent bar for active item
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: "20%",
    height: "60%",
    width: "3px",
    borderRadius: "0 3px 3px 0",
    backgroundColor: isActive
      ? colors?.bluishGreen || "#00aa8c"
      : "transparent",
    transition: "background-color 0.2s ease",
  },

  // Hover state
  // "&:hover": {
  //   backgroundColor: "rgba(0, 170, 140, 0.06)",
  //   "& .item-icon img": {
  //     filter:
  //       "brightness(0) saturate(100%) invert(36%) sepia(95%) saturate(560%) hue-rotate(133deg) brightness(94%) contrast(101%)",
  //   },
  //   "& .item-label .MuiTypography-root": {
  //     color: colors?.bluishGreen || "#00aa8c",
  //   },
  //   "&::before": {
  //     backgroundColor: "rgba(0, 170, 140, 0.35)",
  //   },
  // },

  // Active icon tint
  "& .item-icon img": {
    filter: isActive
      ? "brightness(0) saturate(100%) invert(36%) sepia(95%) saturate(560%) hue-rotate(133deg) brightness(94%) contrast(101%)"
      : "none",
    transition: "filter 0.2s ease",
  },
}));

// ─── Component ────────────────────────────────────────────────────────────────
export default function Sidebar() {
  const { hasPermission } = useAccess();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const logo = localStorage.getItem("logo");

  // Deep-clone sidebar data and patch title/link for post-first-login state
  const sidebarItems = JSON.parse(JSON.stringify(SideBarSecondData));

  const handleDrawerOpen = () => {
    setOpen(true);
    // setToggleDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    // setToggleDrawer(false);
  };

  const handleItemClick = (path, title) => {
    navigate(path, {
      state: {
        __breadcrumbAction: "POP",
        crumb: { label: title, path },
      },
    });
  };

  return (
    <GlobleStyle open={open}>
      <Box sx={{ display: "flex" }}>
        {/* ── Navigation drawer ────────────────────────────────────────────── */}
        <Box
          component="nav"
          sx={{
            position: "sticky",
            top: "calc(46px + 2.4rem)",
            height: "100%",
            flexShrink: { sm: 0 },
            "& .MuiDrawer-paper": {
              display: "contents",
              boxSizing: "border-box",
            },
          }}
          aria-label="sidebar"
        >
          <Drawer variant="permanent" open={open}>
            {/* ── Logo + toggle ─────────────────────────────────────────── */}
            <DrawerHeader sx={{ top: "20px" }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: open ? "end" : "center",
                  padding: "0.5rem 1rem",
                  alignItems: "center",
                  height: "60px",
                  paddingBottom: "0px",
                }}
              >
                {open ? (
                  <>
                    <IconButton onClick={handleDrawerClose} size="small">
                      <ChevronLeftIcon sx={{ color: colors?.aquasky }} />
                    </IconButton>
                  </>
                ) : (
                  <IconButton onClick={handleDrawerOpen} size="small">
                    <ChevronRightIcon sx={{ color: colors?.aquasky }} />
                  </IconButton>
                )}
              </Box>
            </DrawerHeader>

            {/* ── Flat module list ──────────────────────────────────────── */}
            <List sx={{ pt: 1, pb: 1 }}>
              {sidebarItems.map((item, index) => {
                // Skip items the user has no access to
                if (item?.module && hasPermission(item.module, "noAccess")) {
                  return null;
                }

                const isActive =
                  location.pathname === item.link ||
                  location.pathname.startsWith(item.link + "/");

                return (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    {/* Tooltip only shows when drawer is collapsed */}
                    <Tooltip
                      title={!open ? item.title : ""}
                      placement="right"
                      arrow
                    >
                      <ListItemButton
                        isActive={isActive}
                        onClick={() => handleItemClick(item.link, item.title)}
                        sx={{
                          justifyContent: open ? "flex-start" : "center",
                        }}
                      >
                        {/* Icon */}
                        <ListItemIcon
                          className="item-icon"
                          sx={{
                            minWidth: 0,
                            justifyContent: "center",
                            mr: open ? 1.5 : 0,
                            transition: "margin 0.2s ease",
                            "& img": {
                              width: "22px",
                              height: "22px",
                              display: "block",
                            },
                          }}
                        >
                          <img src={item.icon} alt={item.title} />
                        </ListItemIcon>

                        {/* Label (only visible when drawer is open) */}
                        {open && (
                          <ListItemText
                            className="item-label"
                            primary={item.title}
                            sx={{
                              "& .MuiTypography-root": {
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "0.875rem",
                                fontWeight: isActive ? 600 : 400,
                                color: isActive
                                  ? colors?.bluishGreen || "#00aa8c"
                                  : "inherit",
                                transition:
                                  "color 0.2s ease, font-weight 0.2s ease",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              },
                            }}
                          />
                        )}
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                );
              })}
            </List>
          </Drawer>
        </Box>

        {/* ── Page content ─────────────────────────────────────────────────── */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: "2%",
            paddingLeft: "0px",
            width: "80%",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </GlobleStyle>
  );
}
