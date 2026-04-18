import {
  Box,
  styled,
  Snackbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Badge,
  Tooltip,
  capitalize,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import logo from "../assest/logo.png";
import bell from "../assest/bell.svg";
import notificationImg from "../assest/Notification.svg";

import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
//   import UserContext from "../context/UserContext";
//   import { GetNotification } from "../services/GetNotification";
import { colors } from "../Style/GlobalStyle";
import UserContext from "../context/UserContext";

export default function Header() {
  const navigate = useNavigate();
  // const { setIsAdmin, setIsSA, notificationCount } = useContext(UserContext);
  // setIsAdmin(JSON.parse(sessionStorage.getItem("isAdmin")));
  // setIsSA(JSON.parse(sessionStorage.getItem("isSA")));
  const [notificationData, setNotificationData] = useState([]);
  const firstName = localStorage.getItem("firstName") || "User";

  const { resetUserContext } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const getNotification = async () => {
    //   const res = await GetNotification();
    //   setNotificationData(res?.data?.notifications);
  };
  useEffect(() => {
    getNotification();
  }, []);

  const handleLogout = () => {
    resetUserContext();
    localStorage.clear();
    navigate("/login", { replace: true, state: { initialState: false } });
  };

  const handleNotificationOpen = () => {
    setOpen(true);
  };

  const handleNotificationClose = () => {
    setOpen(false);
  };

  return (
    <HeaderStyle>
      <Box
        style={{
          boxShadow: "0 2px 2px -2px gray",
          mixBlendMode: "lighten",
          overflowX: "hidden",
        }}
      >
        <Box className="header-box">
          <img src={logo} className="img-container" />
          <Box style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Box className="user-greeting">
              <Typography className="greeting-text">
                Hello{" "}
                <span className="greeting-name">
                  {capitalize(firstName || "User")}
                </span>
              </Typography>
            </Box>
            {/* <Tooltip title="Notification">
              <IconButton>
                <img
                  src={bell}
                  className="img-container"
                  style={{ cursor: "pointer" }}
                  onClick={handleNotificationOpen}
                />
              </IconButton>
            </Tooltip> */}
            <Tooltip title="Logout">
              <IconButton onClick={handleLogout}>
                <LogoutIcon
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {/* Notification Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ maxWidth: "40vw" }} // Ensures Snackbar does not shrink too much
      >
        <Paper
          sx={{
            fontFamily: "Poppins",
            minWidth: "30vw",
            minHeight: "40vh",
            backgroundColor: "#EDEDED",
            color: "black",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
            padding: "10px",
          }}
        >
          <NotificationContent
            data={notificationData}
            onClose={handleNotificationClose}
          />
        </Paper>
      </Snackbar>
    </HeaderStyle>
  );
}

/* Custom Notification Component */
const NotificationContent = ({ data, onClose }) => {
  const notifications = [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        fontFamily: "Poppins",
        minHeight: "70vh",
        maxHeight: "80vh",
        overflowY: "scroll",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          width: "90%",
          margin: "auto",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
        >
          Notifications
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <List>
        {data.map((notification) => (
          <Box>
            <ListItem
              key={notification._id}
              sx={{ borderBottom: "1px solid #eee", padding: "6px 0" }}
            >
              <ListItemText>
                <Box
                  style={{
                    display: "flex",
                    gap: "0.8rem",
                    fontFamily: "Poppins",
                    alignItems: "start",
                  }}
                >
                  <img src={notificationImg} alt="notification" />
                  <Box>
                    <Typography sx={{ fontFamily: "Poppins" }}>
                      {notification?.content}
                    </Typography>
                    <Typography sx={{ fontFamily: "Poppins", opacity: "70%" }}>
                      {notification?.date}
                    </Typography>
                  </Box>
                </Box>
              </ListItemText>
            </ListItem>
          </Box>
        ))}
      </List>
    </Box>
  );
};

const HeaderStyle = styled(Box)({
  "& .header-box": {
    maxWidth: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "auto",
    paddingTop: "0.7rem",
    paddingBottom: "1.4rem",
  },
  "& .img-container": {
    objectFit: "cover",
    marginLeft: "2%",
  },
  "& .greeting-text": {
    fontFamily: "Poppins",
    // fontSize: "14px",
    // fontWeight: 400,
    // color: "#4B5563",
  },
});
