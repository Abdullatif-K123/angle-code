import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import classes from "../Navbar.module.css";

const SectionOnSmall = () => {
  const [show, setShow] = useState({ top: false });

  //Should be here use Navigate yhaaa

  const togglerDrawer = (anchor, open) => (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "shift")) {
      return;
    }
    setShow({ ...show, top: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" && "auto" }}
      role="presentation"
      onClick={togglerDrawer(anchor, false)}
      onKeyDown={togglerDrawer(anchor, false)}
    >
      <List>
        <ListItem
          onClick={() => {
            console.log("Click tutorial");
          }}
        >
          <ListItemText primary={"Tutorials"} />
        </ListItem>
        <ListItem
          onClick={() => {
            console.log("Click Courses");
          }}
        >
          <ListItemText primary={"Courses"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          onClick={() => {
            console.log("Click Meetings");
          }}
        >
          <ListItemText primary={"Meetings"} />
        </ListItem>
        <ListItem
          onClick={() => {
            console.log("Click Messages");
          }}
        >
          <ListItemText primary={"Messages"} />
        </ListItem>
      </List>
      <Divider />
      <List
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ListItem>
          <SettingsIcon />
          <ListItemText primary={"Settings"} />
        </ListItem>
        <ListItem style={{ justifyContent: "flex-end" }}>
          <Button
            onClick={() => {
              console.log("logout");
            }}
            className={classes.logoutButton}
          >
            Logout
          </Button>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div className={classes.temporaryDrawer}>
      {[<MenuIcon />].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={togglerDrawer("top", true)}>{anchor}</Button>
          <Drawer
            anchor={"top"}
            open={show["top"]}
            onClose={togglerDrawer("top", false)}
          >
            {list("top")}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SectionOnSmall;
