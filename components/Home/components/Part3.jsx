import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../../UI/CourseCard";
import classes from "../home.module.css";
import { Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addCourses } from "../../../redux/courseSlice";
import { useRouter } from "next/router";
const Part3 = () => {
  const router = useRouter();
  const course = useSelector((state) => state.course.courses);
  console.log(course);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:3333/AngelCode/Courses`
      );
      const data = response.data;
      console.log(data.data.courses);
      dispatch(addCourses({ data: data.data.courses }));
      const dataSlice = data.data.courses.slice(0, 3);
      setData(dataSlice);
    }
    fetchData();
  }, []);
  return (
    <div className={classes.P3MainSection}>
      <div className={classes.P3MainText}>
        <h2>Stop Scrolling. Start Learning.</h2>
      </div>
      <div className={classes.coursesP3}>
        {data.map((course) => {
          if (course.user) {
            var authorName =
              course.user.first_name + " " + course.user.last_name;
            console.log(authorName);
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
                classes={classes}
              />
            );
          }
        })}
      </div>
      <Button
        variant="contained"
        color="primary"
        endIcon={<ArrowForward />}
        onClick={() => {
          router.push("/courses/course/all");
        }}
      >
        Browse all course
      </Button>
    </div>
  );
};

export default Part3;
