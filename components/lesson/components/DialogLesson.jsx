import React, { useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DialogLesson = (props) => {
  const user = useSelector((state) => state.user.user);
  const [level, setLevel] = useState("1");
  const inputRef = useRef(null);

  var headers = {
    Authorization: `Bearer ${user.token}`,
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  const HandleSubmit = async () => {
    const title = inputRef.current.value;
    console.log(user.token);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("level", level);
    formData.append("user", user.userId);
    formData.append("course", props.courseId);
    const obj = {
      title: title,
      level: level,
      user: user.userId,
      course: props.courseId,
    };
    console.log(obj);
    try {
      const response = await axios.post(
        `http://localhost:3333/AngelCode/Lessons/CreateLesson`,
        obj,
        { headers }
      );
      console.log(response.data);
      props.addLesson(response.data.data.lesson);
    } catch (error) {
      console.log(error);
    }
    props.handleClose();
    inputRef.current.value = "";
    setLevel(1);
  };

  const handleClose = () => {
    inputRef.current.value = "";
    setLevel(1);
    props.handleClose();
  };
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add new lesson"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please write the title of the lesson and which level belong:
            Beginner, Intermediate, Advanced ?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Lesson title"
            inputRef={inputRef}
            type="text"
            fullWidth
            variant="standard"
          />
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <InputLabel htmlFor="level">Difficulty</InputLabel>
            <Select
              autoFocus
              value={level}
              onChange={handleLevelChange}
              label="difficulty"
              inputProps={{
                name: "level",
                id: "level",
              }}
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancle</Button>
          <Button onClick={HandleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogLesson;
