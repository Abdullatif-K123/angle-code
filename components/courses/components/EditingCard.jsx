import React from "react";
import { EditNoteOutlined } from "@mui/icons-material";
import classes from "../courses.module.css";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { TextField } from "@mui/material";
import { DeleteForever } from "@mui/icons-material/";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CardDialog from "./CardDialog";
import axios from "axios";
import { useRouter } from "next/router";
import QuizIcon from "@mui/icons-material/Quiz";
import { Router } from "next/router";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        fontWeight: 700,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditingCard = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSure, setOpenSure] = useState(false);
  const [disable, setDisable] = useState(true);
  const [openCard, setOpenCard] = useState(false);
  const router = useRouter();
  const courseId = props.courseId;
  const open = Boolean(anchorEl);
  var headers = {
    Authorization: `Bearer ${props.userToken}`,
  };
  // Card Update info
  const handleCloseCardUpdate = () => {
    setOpenCard(false);
  };
  const handleOpenCardUpdate = () => {
    setOpenCard(true);
    setAnchorEl(null);
  };
  // conFirm Text
  const handleConfirmChange = (e) => {
    if (
      e.target.value.replace(/^\s+|\s+$/g, "") ==
      props.courseName.replace(/^\s+|\s+$/g, "")
    )
      setDisable(false);
    else setDisable(true);
    console.log(props.courseName);
  };
  // Click Editing
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //click Rubbish Bin sure
  const handleClickDelete = () => {
    setOpenSure(true);
    setAnchorEl(null);
  };
  const handleDeleteClose = () => {
    setOpenSure(false);
  };

  const deleteCourse = async () => {
    handleDeleteClose();
    console.log(props.courseId);
    props.timerWaiting();
    try {
      const response = await axios.delete(
        `http://localhost:3333/AngelCode/Courses/DeleteCourse/${courseId}`,
        { headers }
      );
      console.log(response);
      console.log("done");
      props.handleDelete(courseId);
      props.timerWaiting(2000);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        size="small"
        className={classes.edit}
        onClick={handleClick}
      >
        <EditNoteOutlined className={classes.editIcon} />{" "}
        <span className={classes.labelEdit}>Edit</span>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            router.push(`/mycourses/edit/${props.courseId}`);
          }}
          disableRipple
        >
          <EditIcon />
          Edit lessons
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push(`/mycourses/edit/exams/${props.courseId}`);
          }}
          disableRipple
        >
          <QuizIcon />
          Edit exams
        </MenuItem>
        <MenuItem onClick={handleOpenCardUpdate} disableRipple>
          <FileCopyIcon />
          Update course info
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />

        <MenuItem onClick={handleClickDelete} className={classes.delete}>
          <DeleteForever className={classes.delete} />
          DELETE
        </MenuItem>
      </StyledMenu>
      <Dialog
        open={openSure}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className={classes.DialogTitle}>
          {"You are about to delete your course"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete the {props.courseName} if you are
            sure then right the name of this course
            <TextField
              autoFocus
              margin="dense"
              id="confirm"
              label="Delete confirmation"
              type="text"
              onChange={handleConfirmChange}
              fullWidth
              required
            />
            course name:{" "}
            <spam className={classes.courseNameConfirm}>
              {props.courseName}
            </spam>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button
            onClick={deleteCourse}
            disabled={disable}
            variant="contained"
            className={classes.buttonDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <CardDialog
        open={openCard}
        handleClose={handleCloseCardUpdate}
        mainTitle={"Update Course"}
        explainText={
          "Fill forms to update the exisiting course all forms are rquired speically the file one"
        }
        timerWaiting={props.timerWaiting}
        userToken={props.userToken}
        courseId={props.courseId}
        updateCourse={props.updateCourse}
        courseName={props.courseName}
      />
    </>
  );
};

export default EditingCard;
