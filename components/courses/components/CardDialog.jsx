import React from "react";
import { useState, useRef } from "react";
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
import { EditNote } from "@mui/icons-material";
import classes from "../courses.module.css";
import axios from "axios";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CardDialog = (props) => {
  const [courseImg, setCourseImg] = useState(null);
  const courseName = useRef(null);
  const courseDesc = useRef(null);

  const courseRequirment = useRef(null);

  var headers = {
    Authorization: `Bearer ${props.userToken}`,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseId = props.courseId;
    console.log("our data is the following:");

    const formData = new FormData();
    if (courseName.current.value)
      formData.append("name", courseName.current.value);
    if (courseDesc.current.value)
      formData.append("description", courseDesc.current.value);
    if (courseImg) formData.append("photo", courseImg);
    console.log(formData);
    try {
      const response = await axios.patch(
        `http://localhost:3333/AngelCode/Courses/UpdateCourse/${courseId}`,
        formData,
        { headers }
      );
      console.log(response.data);
      props.updateCourse(response.data.data.updatedCourse);
      props.timerWaiting(5000);
      courseName.current.value = "";
      courseDesc.current.value = "";
      setCourseImg(null);
    } catch (error) {
      console.log(error);
    }

    props.handleClose();
  };

  const handleFileChang = (e) => {
    e.preventDefault();

    console.log(name);
    const file = e.target.files[0];
    setCourseImg(file);
    console.log(file);
  };
  const handleCloseCard = () => {
    props.handleClose();
    setCourseImg(null);
    courseName.current.value = "";
    courseDesc.current.value = "";
    console.log("closing");
  };
  var name = props.courseName[0] + props.courseName[1];
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      className={classes.mainPopup}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <div className={classes.newCourse}>
        <DialogTitle className={classes.cardText}>
          {props.mainTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.textdesc}>
            {props.explainText}
          </DialogContentText>
        </DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Course Name"
              type="text"
              inputRef={courseName}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="desciption"
              label="Course Description"
              type="text"
              inputRef={courseDesc}
              fullWidth
            />
            <label for="requirment" className={classes.requirment}>
              For example: javascript, php, python, algorithm
            </label>
            <TextField
              autoFocus
              margin="dense"
              id="requirment"
              label="Course requirment"
              type="text"
              inputRef={courseRequirment}
              fullWidth
            />
            <label
              for="images"
              className={classes.dropContainer}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              style={{
                border: dragging ? "2px dashed #0083b0" : "2px dashed #ccc",
                padding: "16px",
              }}
            >
              <span className={classes.dropTitle}>Drop Img here</span>
              {/* <input
                  type="file"
                  id="imged"
                  accept="image/*"
                  className={classes.inputFile}
                  required
                /> */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChang}
                id={name}
                style={{ display: "none" }}
              />
              <span
                className={classes.inputFile}
                onClick={() => document.querySelector(`#${name}`).click()}
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
            <Button onClick={handleCloseCard} className={classes.buttonCancel}>
              Cancel
            </Button>
            <Button type="submit" className={classes.buttonSubmit}>
              {" "}
              <EditNote /> UPDATE{" "}
            </Button>
          </DialogActions>
        </form>
      </div>
    </Dialog>
  );
};

export default CardDialog;
