import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import avatar from "../../../../assets/svg/avatar.svg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import chat from "../../../../assets/svg/chat.svg";
import ForumIcon from "@mui/icons-material/Forum";
import classes from "../Navbar.module.css";
import { useState } from "react";
import AddIcon from "@mui/icons-material/EventOutlined";
import { logoutUser } from "../../../../redux/userSlice";
import Image from "next/image";
import MenuBookIcon from "@mui/icons-material/BookmarkAddOutlined";
import { useRouter } from "next/router";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import Badge from "@mui/material/Badge";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { AddOutlined } from "@mui/icons-material";
import axios from "axios";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
const UserAvatar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //Dialog Become a teacher
  const courseName = useRef(null);
  const [courseImg, setCourseImg] = useState(null);
  const [openTeacher, setOpenTeacher] = useState(false);
  const handleClickOpenTeacher = () => {
    setOpenTeacher(true);
  };

  const handleCloseTeacher = () => {
    setOpenTeacher(false);
    handleClose();
    setCourseImg(null);
    courseName.current.value = "";
  };
  //handle Submit Become a teacher
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
  var headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${user.token}`,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("our data is the following:");
    console.log(courseImg);
    const formData = new FormData();
    formData.append("message", courseName.current.value);
    formData.append("images", courseImg);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3333/AngelCode/users/becomeTeacher",
        formData,
        { headers }
      );

      handleClickSneak();
      console.log(response.data);
      console.log(data);
      courseName.current.value = "";
      setCourseImg(null);
    } catch (error) {
      console.log(error);
    }

    setOpenTeacher(false);
  };
  const handleFileChang = (e) => {
    const file = e.target.files[0];
    setCourseImg(file);
    console.log(e.target.files[0]);
  };

  // Drag and Drop Section
  const [dragging, setDragging] = React.useState(false);

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    console.log(file);
    setCourseImg(file);
  };
  //SneakBar
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [opensneak, setOpensneak] = React.useState(false);

  const handleClickSneak = () => {
    setOpensneak(true);
  };

  const handleCloseSneak = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpensneak(false);
  };
  return (
    <>
      <Snackbar
        open={opensneak}
        autoHideDuration={6000}
        onClose={handleCloseSneak}
      >
        <Alert
          onClose={handleCloseSneak}
          severity="success"
          sx={{ width: "100%" }}
        >
          Your request has been send sucessfully
        </Alert>
      </Snackbar>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="notification">
          <Badge
            badgeContent={4}
            color="primary"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <NotificationsActiveRoundedIcon
              className={classes.notificationUser}
              style={{ fontSize: "30px", marginTop: "-1px" }}
            />
          </Badge>
        </Tooltip>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 1 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {user.avatar ? (
              <Image
                className={classes.userPof}
                style={{ borderRadius: "50%", objectFit: "cover" }}
                width={"43"}
                height={"43"}
                alt={user.email}
                src={require(`../../../../../AngleCode_Server/img/${user.avatar}`)}
              />
            ) : (
              <Avatar className={classes.user} alt={user.email} src={avatar} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            router.push("/profile");
          }}
        >
          {user.avatar ? (
            <Image
              className={classes.userPof}
              style={{ borderRadius: "50%", objectFit: "cover" }}
              width={"33"}
              height={"33"}
              alt={user.email}
              src={require(`../../../../../AngleCode_Server/img/${user.avatar}`)}
            />
          ) : (
            <Avatar className={classes.user} alt={user.email} src={avatar} />
          )}
          Profile
        </MenuItem>

        <Divider />
        <MenuItem
          onClick={() => {
            router.push("/mycourses");
          }}
        >
          <MenuBookIcon /> My Courses
        </MenuItem>
        {user.role === "admin" && (
          <MenuItem
            onClick={() => {
              router.push("/meeting/addnewmeeting");
            }}
          >
            <AddIcon /> New Meetings
          </MenuItem>
        )}

        <Divider />
        {user.role === "admin" ? (
          <MenuItem>
            <ListItemIcon>
              <SpaceDashboardOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Dashboard
          </MenuItem>
        ) : (
          <MenuItem onClick={handleClickOpenTeacher}>
            <ListItemIcon>
              <SupervisorAccountIcon fontSize="small" />
            </ListItemIcon>
            Become Instructor
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            dispatch(logoutUser({ email: "" }));
            localStorage.clear();
            router.replace("/");
            console.log(user);
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Dialog
        open={openTeacher}
        onClose={handleCloseTeacher}
        className={classes.mainPopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={classes.newCourse}>
          <DialogTitle className={classes.cardText}>
            Become A teacher
          </DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.textdesc}>
              Wanna Become a Teache ?
            </DialogContentText>
          </DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Write a message"
                type="text"
                inputRef={courseName}
                fullWidth
                required
              />

              <label
                for="images"
                className={classes.dropContainer}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{
                  border: dragging ? "2px dashed #f50057" : "2px dashed #ccc",
                  padding: "16px",
                }}
              >
                <span className={classes.dropTitle}>Drop Img here</span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChang}
                  id="createFile"
                  style={{ display: "none" }}
                />
                <span
                  className={classes.inputFile}
                  onClick={() => document.querySelector("#createFile").click()}
                >
                  Select file
                </span>
                {courseImg && (
                  <p className={classes.imgSelectedText}>
                    Selected file: {courseImg.name}
                  </p>
                )}
              </label>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseTeacher}
                className={classes.buttonCancel}
              >
                Cancel
              </Button>
              <Button type="submit" className={classes.buttonSubmit}>
                {" "}
                <AddOutlined /> Become A Teacher{" "}
              </Button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default UserAvatar;
