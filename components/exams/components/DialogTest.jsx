import React, { useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import axios from "axios";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};
const DialogTest = (props) => {
  const user = useSelector((state) => state.user.user);
  const [level, setLevel] = useState("1");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");
  const inputRef = useRef(null);
  const inputDescRef = useState(null);
  console.log(props.testLevel);
  var headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.token}`,
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  const HandleSubmit = async () => {
    const title = inputRef.current.value;
    const about = inputDescRef.current.value;
    const time = Number(hours) * 60 + Number(minutes) + Number(seconds) / 60;
    console.log(user.token);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("about", about);
    formData.append("limit_time", time);
    formData.append("level", level);
    formData.append("course", props.courseId);
    console.log(formData);
    const obj = {
      title: title,
      level: level,
      user: user.userId,
      course: props.courseId,
    };
    // console.log(obj);
    if (title && level && time) {
      try {
        const response = await axios.post(
          `http://localhost:3333/AngelCode/Tests/CreateTest`,
          formData,
          { headers }
        );
        console.log(response.data);
        props.newTestsection(response.data.data.newTest);
      } catch (error) {
        console.log(error);
      }
      props.handleClose();
      inputRef.current.value = "";
      inputDescRef.current.value = "";
      setLevel(1);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      swal(
        "Good job Test Added!",
        "Test added to your exams course",
        "success"
      );
    } else {
      swal("Plsease select the required !", "Title, level, and time", "error");
    }
  };

  const handleClose = () => {
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
        <DialogTitle>{"Add New Exams"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please write the title, discription and which level belong and set
            the time of that exam: Beginner, Intermediate, Advanced ?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            inputRef={inputRef}
            type="text"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            inputRef={inputDescRef}
            type="text"
            fullWidth
            variant="standard"
          />

          <div
            style={{ display: "flex", alignItems: "center", columnGap: "30px" }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="level">Hours</InputLabel>
              <Select
                autoFocus
                value={hours}
                onChange={(e) => {
                  setHours(e.target.value);
                }}
                label="hours"
                MenuProps={MenuProps}
                inputProps={{
                  name: "level",
                  id: "level",
                }}
              >
                <MenuItem value="0">0</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="9">9</MenuItem>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="11">11</MenuItem>
                <MenuItem value="12">12</MenuItem>
                <MenuItem value="13">13</MenuItem>
                <MenuItem value="14">14</MenuItem>
                <MenuItem value="15">15</MenuItem>
                <MenuItem value="16">16</MenuItem>
                <MenuItem value="17">17</MenuItem>
                <MenuItem value="18">18</MenuItem>
                <MenuItem value="19">19</MenuItem>
                <MenuItem value="20">20</MenuItem>
                <MenuItem value="21">21</MenuItem>
                <MenuItem value="22">22</MenuItem>
                <MenuItem value="23">23</MenuItem>
                <MenuItem value="24">24</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label" htmlFor="level">
                Mins
              </InputLabel>
              <Select
                MenuProps={MenuProps}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                autoFocus
                value={minutes}
                onChange={(e) => {
                  setMinutes(e.target.value);
                }}
                label="hours"
                inputProps={{
                  name: "level",
                  id: "level",
                }}
              >
                <MenuItem value="0">0</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="9">9</MenuItem>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="11">11</MenuItem>
                <MenuItem value="12">12</MenuItem>
                <MenuItem value="13">13</MenuItem>
                <MenuItem value="14">14</MenuItem>
                <MenuItem value="15">15</MenuItem>
                <MenuItem value="16">16</MenuItem>
                <MenuItem value="17">17</MenuItem>
                <MenuItem value="18">18</MenuItem>
                <MenuItem value="19">19</MenuItem>
                <MenuItem value="20">20</MenuItem>
                <MenuItem value="21">21</MenuItem>
                <MenuItem value="22">22</MenuItem>
                <MenuItem value="23">23</MenuItem>
                <MenuItem value="24">24</MenuItem>
                <MenuItem value="25">25</MenuItem>
                <MenuItem value="26">26</MenuItem>
                <MenuItem value="27">27</MenuItem>
                <MenuItem value="28">28</MenuItem>
                <MenuItem value="29">29</MenuItem>
                <MenuItem value="30">30</MenuItem>
                <MenuItem value="31">31</MenuItem>
                <MenuItem value="32">32</MenuItem>
                <MenuItem value="33">33</MenuItem>
                <MenuItem value="34">34</MenuItem>
                <MenuItem value="35">35</MenuItem>
                <MenuItem value="36">36</MenuItem>
                <MenuItem value="37">37</MenuItem>
                <MenuItem value="38">38</MenuItem>
                <MenuItem value="39">39</MenuItem>
                <MenuItem value="40">40</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="level">Sec</InputLabel>
              <Select
                autoFocus
                MenuProps={MenuProps}
                value={seconds}
                onChange={(e) => {
                  setSeconds(e.target.value);
                }}
                label="hours"
                inputProps={{
                  name: "level",
                  id: "level",
                }}
              >
                <MenuItem value="0">0</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="9">9</MenuItem>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="11">11</MenuItem>
                <MenuItem value="12">12</MenuItem>
                <MenuItem value="13">13</MenuItem>
                <MenuItem value="14">14</MenuItem>
                <MenuItem value="15">15</MenuItem>
                <MenuItem value="16">16</MenuItem>
                <MenuItem value="17">17</MenuItem>
                <MenuItem value="18">18</MenuItem>
                <MenuItem value="19">19</MenuItem>
                <MenuItem value="20">20</MenuItem>
                <MenuItem value="21">21</MenuItem>
                <MenuItem value="22">22</MenuItem>
                <MenuItem value="23">23</MenuItem>
                <MenuItem value="24">24</MenuItem>
                <MenuItem value="25">25</MenuItem>
                <MenuItem value="26">26</MenuItem>
                <MenuItem value="27">27</MenuItem>
                <MenuItem value="28">28</MenuItem>
                <MenuItem value="29">29</MenuItem>
                <MenuItem value="30">30</MenuItem>
                <MenuItem value="31">31</MenuItem>
                <MenuItem value="32">32</MenuItem>
                <MenuItem value="33">33</MenuItem>
                <MenuItem value="34">34</MenuItem>
                <MenuItem value="35">35</MenuItem>
                <MenuItem value="36">36</MenuItem>
                <MenuItem value="37">37</MenuItem>
                <MenuItem value="38">38</MenuItem>
                <MenuItem value="39">39</MenuItem>
                <MenuItem value="40">40</MenuItem>
              </Select>
            </FormControl>
          </div>
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <InputLabel htmlFor="level">Level</InputLabel>
            <Select
              autoFocus
              required
              value={level}
              onChange={handleLevelChange}
              label="difficulty"
              inputProps={{
                name: "level",
                id: "level",
              }}
            >
              {!props.testLevel.includes(0) ? (
                <MenuItem value="0">Test Skills</MenuItem>
              ) : null}
              {!props.testLevel.includes(1) ? (
                <MenuItem value="1">Beginner</MenuItem>
              ) : null}
              {!props.testLevel.includes(2) ? (
                <MenuItem value="2">Intermediate</MenuItem>
              ) : null}
              {!props.testLevel.includes(3) ? (
                <MenuItem value="3">Advanced</MenuItem>
              ) : null}
              {!props.testLevel.includes(4) ? (
                <MenuItem value="4">Final exam</MenuItem>
              ) : null}
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

export default DialogTest;
