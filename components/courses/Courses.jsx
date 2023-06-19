import React, { useEffect, useState, useRef } from "react";
import classes from "./courses.module.css";
import CourseCard from "./components/CourseCard";
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
import { AddOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";
import ImageGrid from "../loader/CourseLoader";
import Image from "next/image";
import { useRouter } from "next/router";
import noCourse from "../../assets/jpg/nocourse.jpg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const Courses = () => {
  const user = useSelector((state) => state.user.user);
  const [courseImg, setCourseImg] = useState(null);
  const courseName = useRef(null);
  const courseDesc = useRef(null);
  const courseRequirment = useRef(null);
  const [data, setData] = useState(null);
  const [timerWaiting, setTimerWaiting] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
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

  var headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${user.token}`,
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:3333/AngelCode/Courses/MyCourses/${user.userId}`,
        { headers }
      );
      const data = response.data;
      console.log(data.data.courses);
      setData(data.data.courses);
    }
    fetchData();
  }, []);

  const fireWaitingTimer = (time) => {
    setTimerWaiting(true);
    setTimeout(
      () => {
        setTimerWaiting(false);
      },
      time ? time : 3000
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCourseImg(null);
    courseName.current.value = "";
    courseDesc.current.value = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("our data is the following:");

    const formData = new FormData();
    formData.append("name", courseName.current.value);
    formData.append("description", courseDesc.current.value);
    formData.append("photo", courseImg);
    formData.append("user", user.userId);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3333/AngelCode/Courses/CreateCourses",
        formData,
        { headers }
      );
      console.log(response.data);
      setData([...data, response.data.data.course]);
      console.log(data);
      courseName.current.value = "";
      courseDesc.current.value = "";
      fireWaitingTimer(10000);
      setCourseImg(null);
    } catch (error) {
      console.log(error);
    }

    setOpen(false);
  };
  const handleFileChang = (e) => {
    const file = e.target.files[0];
    setCourseImg(file);
  };

  // Delete course

  const deleteCourse = (id) => {
    setData((prevState) => {
      let upDateItems = prevState.filter((item) => item._id !== id);
      return upDateItems;
    });
  };

  // Update Course

  const updateCourse = (updatedData) => {
    console.log(updatedData._id);

    setData((prevState) => {
      let upDateItems = prevState.map((item) => {
        if (item._id === updatedData._id) return updatedData;
        else return item;
      });
      console.log(upDateItems);
      return upDateItems;
    });
  };
  if (!data || timerWaiting) {
    return (
      <div className={classes.courseLoader}>
        <ImageGrid />
      </div>
    );
  }

  // No course Found !!!!!!

  if (data.length < 1) {
    return (
      <section className={classes.noCourse}>
        <Image
          className={classes.image2}
          src={noCourse}
          width={400}
          height={300}
          alt="no course found"
        />
        <h2>Oops!</h2>
        <h3>you did't choose any course</h3>
        <p>please add from here</p>
        {user.role === "admin" && (
          <Button
            className={`${classes.addCourse} ${classes.btnHover}`}
            startIcon={<AddOutlined />}
            onClick={handleClickOpen}
          >
            New Course
          </Button>
        )}
        {user.role === "user" && (
          <Button
            className={`${classes.addCourse} ${classes.btnHover}`}
            onClick={() => {
              router.push("/");
            }}
          />
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          className={classes.mainPopup}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <div className={classes.newCourse}>
            <DialogTitle className={classes.cardText}>New Course</DialogTitle>
            <DialogContent>
              <DialogContentText className={classes.textdesc}>
                Fill forms to create a new courses these forms are required so
                plase make sure to fill them all
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
                  required
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="desciption"
                  label="Course Description"
                  type="text"
                  inputRef={courseDesc}
                  fullWidth
                  required
                />
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
                    border: dragging ? "2px dashed #f50057" : "2px dashed #ccc",
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
                    id="createFile"
                    style={{ display: "none" }}
                  />
                  <span
                    className={classes.inputFile}
                    onClick={() =>
                      document.querySelector("#createFile").click()
                    }
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
                <Button onClick={handleClose} className={classes.buttonCancel}>
                  Cancel
                </Button>
                <Button type="submit" className={classes.buttonSubmit}>
                  {" "}
                  <AddOutlined /> Create{" "}
                </Button>
              </DialogActions>
            </form>
          </div>
        </Dialog>
      </section>
    );
  }

  // Course Found
  return (
    <>
      <div className={classes.main}>
        <div className={classes.maintext}>
          <h1>MY COURSES</h1>
          <p>Welcome back to your courses, Scroll and continue your learning</p>
        </div>
        <div className={classes.mainCourse}>
          <div className={classes.course}>
            {data.map((course) => {
              if (course) {
                if (course.user === user.userId)
                  var authorName = user.first_name + " " + user.last_name;

                return (
                  <CourseCard
                    key={course._id}
                    courseId={course._id}
                    courseName={course.name}
                    courseImage={
                      course.imageCover
                        ? course.imageCover
                        : "Course-64760ad3ea9ad97cc435241b-1685790633727.png"
                    }
                    courseAuthor={authorName}
                    authorAvatar={course.userAvatar}
                    userToken={user.token}
                    handleDelete={deleteCourse}
                    timerWaiting={fireWaitingTimer}
                    updateCourse={updateCourse}
                    role={user.role}
                  />
                );
              }
            })}
          </div>
        </div>
        {user.role === "admin" && (
          <Button
            className={`${classes.addCourse} ${classes.btnHover}`}
            startIcon={<AddOutlined />}
            onClick={handleClickOpen}
          >
            New Course
          </Button>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          className={classes.mainPopup}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <div className={classes.newCourse}>
            <DialogTitle className={classes.cardText}>New Course</DialogTitle>
            <DialogContent>
              <DialogContentText className={classes.textdesc}>
                Fill forms to create a new courses these forms are required so
                plase make sure to fill them all
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
                  required
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="desciption"
                  label="Course Description"
                  type="text"
                  inputRef={courseDesc}
                  fullWidth
                  required
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
                    border: dragging ? "2px dashed #f50057" : "2px dashed #ccc",
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
                    id="createFile"
                    style={{ display: "none" }}
                  />
                  <span
                    className={classes.inputFile}
                    onClick={() =>
                      document.querySelector("#createFile").click()
                    }
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
                <Button onClick={handleClose} className={classes.buttonCancel}>
                  Cancel
                </Button>
                <Button type="submit" className={classes.buttonSubmit}>
                  {" "}
                  <AddOutlined /> Create{" "}
                </Button>
              </DialogActions>
            </form>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default Courses;
