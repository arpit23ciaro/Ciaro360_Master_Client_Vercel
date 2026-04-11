import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import logo from "../../assest/logo.png";

export default function Home() {
  const [open, setOpen] = React.useState(true);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {["Dashboard", "Profile", " User management", "Client management"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
    </Box>
  );
  return (
    <div>
      <Drawer open={open}>
        <Box>
          <img src={logo} />
        </Box>
        {DrawerList}
      </Drawer>
    </div>
  );
}
