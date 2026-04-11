import React, { useContext, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
// import bgImg from "../assest/side-bg-img.png";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
// import SearchBar from "./SearchBar";
import { IconButton, MenuItem, MenuList, styled } from "@mui/material";
import {
  bgColors,
  colors,
  fontSize,
  GlobleStyle,
} from "../Style/GlobalStyle";
import {
  SideBarData,
} from "../utils/constants/sidebarData";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTheme } from "@emotion/react";
import SearchBar from "./SearchBar";

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isItemOpen, setIsItemOpen] = useState({});
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("");
  const [newSubMenuOpen, setNewSubMenuOpen] = useState(false);

  const location = useLocation();
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 0),
    ...theme.mixins.toolbar,
    justifyContent: "center",
  }));
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemClick = (path, title) => {
    setActiveItem(title);
    navigate(path);
  };

  return (
    <GlobleStyle open={open}>
      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{
            position: "relative",
            flexShrink: { sm: 0 },
            "& .MuiDrawer-paper": {
              display: "contents",
              boxSizing: "border-box",
            },
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="permanent"
            open={open}
            style={{ width: open ? "240px" : "40px" }}
          >
            <DrawerHeader sx={{ top: "20px" }}>
              <Box>
                {open ? (
                  <Box
                    style={{
                      display: "flex",
                      // gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <SearchBar
                      // className="search-bar-style"
                      // containerStyle="search-container"
                      placeholder="Find..."
                    />
                    <ChevronLeftIcon
                      onClick={handleDrawerClose}
                      sx={{ color: colors?.aquasky, cursor: "pointer" }}
                    />
                  </Box>
                ) : (
                  <ChevronRightIcon
                    sx={{ color: colors?.aquasky, cursor: "pointer" }}
                    onClick={handleDrawerOpen}
                  />
                )}
              </Box>
            </DrawerHeader>

            <List
              style={
                open
                  ? null
                  : {
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }
              }
            >
              {SideBarData.map((item, index) => {
                const isActive = location.pathname === item.link;
                return (
                  <Box key={index}>
                    <ListItem disablePadding>
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: !open ? "100%" : "240px",
                          
                        }}
                      >
                        <ListItemButton
                          onClick={() =>
                            open
                              ? handleItemClick(item?.link, item?.title)
                              : undefined
                          }
                          sx={{
                            justifyContent: open ? "initial" : "center",
                            px: open ? 2.5 : 0,
                            width: "100%",
                            fontFamily: "Poppins !important",
                          }}
                        >
                          <ListItemIcon
                          className={isActive ? "sidebar-icon" : ""}
                            sx={{
                              minWidth: 0,
                              justifyContent: "end",
                              "& img": {
                                width: open ? "auto" : "24px",
                                height: open ? "auto" : "24px",
                                transition: "width 0.3s ease, height 0.3s ease",
                              },
                            }}
                          >
                            <img
                              src={item.icon}
                              alt={item.title}
                              style={{
                                filter: "none",
                              }}
                            />
                          </ListItemIcon>
                          {open && (
                            <ListItemText
                              primary={item.title}
                              sx={{
                                opacity: 1,
                                ml: 2,
                                fontFamily: "Poppins !important",
                              }}
                            />
                          )}
                          
                        </ListItemButton>
                      </Box>
                    </ListItem>
                  </Box>
                );
              })}
            </List>
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </GlobleStyle>
  );
}

const LeftDrawerStyle = styled(Box)(({ isActive }) => ({
  "& .sidebar-icon": {
    filter:
      "brightness(0) saturate(100%) invert(36%) sepia(95%) saturate(560%) hue-rotate(133deg) brightness(94%) contrast(101%)",
    "&:hover": {
      filter:
        "brightness(0) saturate(100%) invert(36%) sepia(95%) saturate(560%) hue-rotate(133deg) brightness(94%) contrast(101%)",
    },
    "&:focus": {
      filter:
        "brightness(0) saturate(100%) invert(36%) sepia(95%) saturate(560%) hue-rotate(133deg) brightness(94%) contrast(101%)",
    },
  },

  "& .sidebarOpen": {
    backgroundColor: "green",
  },
  "& . sidebarClose": {
    backgroundColor: "red",
  },
  "& .sidebar-list-text": {
    fontSize: fontSize?.h6,
  },
  "& .input-style::placeholder": {
    color: "rgba(0, 0, 0, 0.5)",
  },
  "& .list-btn": {
    padding: "0px",
    color: isActive ? colors?.bluishGreen : "black",
    "&:hover": { color: colors?.bluishGreen },
    "&:focus": { color: colors?.bluishGreen },
  },
  "& .list-btn.active": {
    color: colors?.bluishGreen,
    "& svg": { fill: colors?.bluishGreen },
  },

  "& .list-item": {
    "&:focus": {
      color: colors?.bluishGreen,
      "& svg": { fill: colors?.bluishGreen },
    },
  },

  "& .black-outline": {
    width: "90%",
    margin: "auto",
    marginTop: "5%",
    marginBottom: "5%",
    border: "1px solid rgba(0, 0, 0, 0.5)",
    opacity: "50%",
  },
}));
const SecondSidebarStyle = styled(Box)(({ isItemOpen }) => ({
  "& .sidebar-menu": {
    textAlign: "center",
    width: "60%",
    margin: "auto",
  },
  "& .icon-filter": {
    filter:
      "brightness(0) saturate(100%) invert(36%) sepia(95%) saturate(560%) hue-rotate(133deg) brightness(94%) contrast(101%)",
  },
  "&:hover": {
    filter:
      "brightness(0) saturate(100%) invert(36%) sepia(95%) saturate(560%) hue-rotate(133deg) brightness(94%) contrast(101%)",
  },
  "&:focus": {
    filter:
      "brightness(0) saturate(100%) invert(36%) sepia(95%) saturate(560%) hue-rotate(133deg) brightness(94%) contrast(101%)",
  },
}));

const SubmenuStyle = styled(Box)(({ isItemOpen }) => ({
  "& ": {
    width: "100%",
  },
  "& .sidebar-submenu": {
    textAlign: "center",
    width: "70%",
    margin: "auto",
  },
  "& .submenu-sidebar": {
    display: "flex",
    justifyContent: "start",
    margin: "auto",
    alignItems: "center",
    border: "1px solid transparent",
    transition: "background-color 0.2s",
    color: isItemOpen ? colors?.bluishGreen : "black",
    cursor: "pointer",
    "&:hover": { color: colors?.bluishGreen },
    "&:focus": {
      color: colors?.bluishGreen,
      "& svg": { fill: colors?.bluishGreen },
    },
    "& svg": {
      fill: isItemOpen ? colors?.bluishGreen : "initial",
    },
  },
  "& .second-sidebar.active": {
    color: colors?.bluishGreen,
    "& svg": { fill: colors?.bluishGreen },
  },
}));
