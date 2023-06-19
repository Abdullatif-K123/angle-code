import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import classes from "./lessons.module.css";
import Form from "../loader/EditLoader";
import Cards from "./components/Cards";
import axios from "axios";
import beginner from "../../assets/svg/beginner.svg";
import intermediate from "../../assets/svg/intermediate.svg";
import advanced from "../../assets/svg/advnaced.svg";
import Button from "./components/Button";
import DialogLesson from "./components/DialogLesson";
const Lesson = (props) => {
  const [openAddLesson, setOpenAddLesson] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [beginners, setBeginners] = useState([]);
  const [intermediates, setItnermediates] = useState([]);
  const [advnaceds, setAdvanceds] = useState([]);
  const [waiting, setWaiting] = useState(false);

  // Open and close for adding lesson
  const handleClickOpen = () => {
    setOpenAddLesson(true);
  };

  const handleClose = () => {
    setOpenAddLesson(false);
  };
  useEffect(() => {
    async function fetchData() {
      setWaiting(true);
      const courseId = props.courseId;
      console.log(courseId);
      try {
        const response = await axios.get(
          `http://localhost:3333/AngelCode/Courses/${courseId}`
        );
        const data = response.data.data.course.lesson;
        setCourseData(response.data.data.course);
        const easy = data.filter((lesson) => {
          return lesson.level == 1;
        });
        setBeginners(easy);

        const mid = data.filter((lesson) => {
          return lesson.level == 2;
        });
        setItnermediates(mid);
        const hard = data.filter((lesson) => {
          return lesson.level == 3;
        });
        setAdvanceds(hard);
        console.log(data);
        console.log(beginners);
        console.log(intermediates);
        console.log(advnaceds);
      } catch (error) {
        console.log(error);
      }
      setWaiting(false);
    }
    fetchData();
  }, []);
  const addLesson = (course) => {
    console.log(course);
    course.level == 1
      ? setBeginners([...beginners, course])
      : course.level == 2
      ? setItnermediates([...intermediates, course])
      : setAdvanceds([...advnaceds, course]);
  };
  // handle Delete Lesson
  const handleDeleteLesson = (data) => {
    if (data.level === 1)
      setBeginners((prevState) => {
        let upDateLesson = prevState.filter((lesson) => lesson._id !== data.id);
        return upDateLesson;
      });
    if (data.level === 2)
      setItnermediates((prevState) => {
        let upDateLesson = prevState.filter((lesson) => lesson._id !== data.id);
        return upDateLesson;
      });
    if (data.level === 3)
      setAdvanceds((prevState) => {
        let upDateLesson = prevState.filter((lesson) => lesson._id !== data.id);
        return upDateLesson;
      });
  };
  // Firing and unFiring waitings
  const fireandUnFireWaitings = (fire) => {
    fire === 0 ? setWaiting(false) : setWaiting(true);
  };
  // if courseData Loading or fire Waiting
  if (!courseData || waiting) {
    return (
      <div className={classes.lessonLoader}>
        <Form />
      </div>
    );
  }
  return (
    <div className={classes.main}>
      <div className={classes.mainText}>
        <h2>My lessons for {courseData.name} course</h2>
        <p>
          You can add and update the lesson you want based on three level for
          each course.
        </p>
      </div>
      <div className={classes.lessonMain}>
        <div className={classes.lessonSection}>
          <h4>Beginner Lessons:</h4>
          <div className={classes.lessonArrange}>
            {beginners.length < 1 && <h3>No Lessons added</h3>}
            {beginners.length >= 1 &&
              beginners.map((item) => {
                return (
                  <Cards
                    lessonName={item.title}
                    levelImg={beginner}
                    lessonId={item._id}
                    key={item._id}
                    level={item.level}
                    handleDeleteLesson={handleDeleteLesson}
                    fireandUnFireWaitings={fireandUnFireWaitings}
                  />
                );
              })}
          </div>
        </div>
        <div className={classes.lessonSection}>
          <h4>Intermediate Lessons:</h4>
          <div className={classes.lessonArrange}>
            {intermediates.length < 1 && <h3>No Lessons added</h3>}
            {intermediates.length >= 1 &&
              intermediates.map((item) => {
                return (
                  <Cards
                    lessonName={item.title}
                    levelImg={intermediate}
                    lessonId={item._id}
                    key={item._id}
                    level={item.level}
                    handleDeleteLesson={handleDeleteLesson}
                    fireandUnFireWaitings={fireandUnFireWaitings}
                  />
                );
              })}
          </div>
        </div>
        <div className={classes.lessonSection}>
          <h4>Advanced Lessons:</h4>
          <div className={classes.lessonArrange}>
            {advnaceds.length < 1 && <h3>No Lessons added</h3>}
            {advnaceds.length >= 1 &&
              advnaceds.map((item) => {
                return (
                  <Cards
                    lessonName={item.title}
                    levelImg={advanced}
                    lessonId={item._id}
                    key={item._id}
                    level={item.level}
                    handleDeleteLesson={handleDeleteLesson}
                    fireandUnFireWaitings={fireandUnFireWaitings}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <Button handleClickOpen={handleClickOpen} />
      <DialogLesson
        open={openAddLesson}
        handleClose={handleClose}
        courseId={props.courseId}
        addLesson={addLesson}
      />
    </div>
  );
};

export default Lesson;
