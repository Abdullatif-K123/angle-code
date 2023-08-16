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
import classes from "./meeting.module.css";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Updatecard = (props) => {
  const [meetingImg, setmeetingImg] = useState(null);
  const title = useRef(null);
  const link = useRef(null);
  const startDate = useRef(null);
  const duration = useRef(null);

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
    setmeetingImg(file);
  };

  const handleFileChang = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setmeetingImg(file);
    console.log(file);
  };

  const handleCloseCard = () => {
    props.handleClose();
    setmeetingImg(null);
    title.current.value = "";
    link.current.value = "";
    startDate.current.value = "";
    duration.current.value = "";
    console.log("closing");
  };

     const handleSubmit = async (e) => {
     e.preventDefault();
     const meetingId = props.meetingId;
     console.log("our data is the following:");
     const formData = new FormData();
     if (title.current.value)
       formData.append("title", title.current.value);
     if (link.current.value)
       formData.append("link", link.current.value);
     if (startDate.current.value)
       formData.append("startDate", startDate.current.value);
    if (duration.current.value)
       formData.append("duration", duration.current.value);
    if (meetingImg) formData.append("photo", meetingImg);
     console.log(formData);
     try {
       const response = await axios.patch(
         `http://localhost:3333/AngelCode/Meetings/updateMeeting/${meetingId}`,
         formData,
         { headers }
       );
       console.log(response.data);
       props.updatemeeting(response.data.data.updatedMeeting);
       props.timerWaiting(5000);
       title.current.value = "";
       link.current.value = "";
       startDate.current.value = "";
       duration.current.value = "";
       setmeetingImg(null);
     } catch (error) {
       console.log(error);
     }

    props.handleClose();
   };
   var n = props.title[0] + props.title[1];
  
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
              id="title"
              label="title"
              type="text"
              inputRef={title}
              fullWidth
            />
            
            <TextField
              autoFocus
              margin="dense"
              id="link"
              label="link"
              type="text"
              inputRef={link}
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="duration"
              label="duration"
              type="text"
              inputRef={duration}
              fullWidth
            />
            
             <label className="ms-1 mt-3 text-secondary"> start Date: </label>
            <TextField
              autoFocus
              margin="dense"
              id="startDate"
              type="date"
              inputRef={startDate}
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
              <span className={classes.dropTitle}> Drop Img here</span>
              
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChang}
                id={n}
                style={{ display: "none" }}
              />
              <span
                className={classes.inputFile}
                onClick={() => document.querySelector(`#${n}`).click()}
              >
                Select file
              </span>
              {meetingImg && (
                <p className={classes.imgSelectedText}>
                  Selected file: {meetingImg.name}
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

export default Updatecard;
