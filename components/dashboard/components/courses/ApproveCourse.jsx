import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import classes from "./courses.module.css";
import Table from "./components/Table";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ApproveCourse = () => {
  const [unAcceptedCourse, setUnAcceptedCourse] = useState([]);
  const [content, setContent] = useState("Course Has Been Approved!");
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState("success");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //Creating headers for user super admin
  const user = useSelector((state) => state.user.user);
  var headers = {
    Authorization: `Bearer ${user.token}`,
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const resUnACourse = await axios.get(
          "http://localhost:3333/AngelCode/Courses/getUnAcceptedCourse",
          { headers }
        );
        setUnAcceptedCourse(resUnACourse.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const handleApproved = async (id) => {
    console.log(headers);
    try {
      const resCourseAccpeted = await axios.patch(
        `http://localhost:3333/AngelCode/Courses/ApproveCourse/${id}`,
        {},
        { headers }
      );
      console.log(resCourseAccpeted);
      setError("success");
      setContent("Course Has Been Approved!");
      setUnAcceptedCourse((courses) => {
        const newCourses = courses.filter((course) => course._id !== id);
        return newCourses;
      });
    } catch (error) {
      console.log(error);
      setError("error");
    }
    handleClick();
  };
  const handleRegected = async (id) => {
    setError("error");
    setUnAcceptedCourse((courses) => {
      const newCourse = courses.filter((course) => course._id !== id);
      return newCourse;
    });
    handleClick();
    setContent("Course Has Been Rejected!!");
  };
  console.log(unAcceptedCourse);
  if (!unAcceptedCourse.length) {
    return <h1>loading</h1>;
  }
  return (
    <div className={classes.approveCourseMain}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error} sx={{ width: "100%" }}>
          {content}
        </Alert>
      </Snackbar>
      <h2>Pending Courses</h2>
      <div className={classes.approveTable}>
        <div className={classes.approveTableHead}>
          <p>Course</p>
          <p>Instructor</p>
          <p>Status</p>
          <p>Action</p>
        </div>
        {unAcceptedCourse.map((course) => {
          return (
            <Table
              key={course._id}
              img={course.imageCover}
              lesson={course.lesson.length}
              name={course.name}
              userFirstName={course.user.first_name}
              userLastName={course.user.last_name}
              userImg={course.user.img}
              idCourse={course._id}
              handleApproved={handleApproved}
              handleRegected={handleRegected}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ApproveCourse;
