import React, { useEffect, useState } from "react";
import classes from "./lessonPre.module.css";
import CleoOne from "../loader/LessonLoader";
import LinearProgress from "@mui/material/LinearProgress";
import parser from "html-react-parser";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import TestLesson from "./components/TestLesson";
import { useSelector } from "react-redux";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
const LessonPreview = (props) => {
  const lessonCourse = useSelector((state) => state.course.lessons);
  const [lessonData, setLessonData] = useState(null);
  const [open, setOpen] = useState(false);
  const [openIntermediate, setOpenIntermediate] = useState(false);
  const [openAdvnaced, setOpenAdvanced] = useState(false);
  const [fireWaitings, setFireWaitings] = useState(false);

  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      setFireWaitings(true);
      const response = await axios.get(
        `http://localhost:3333/AngelCode/Lessons/Lesson/${props.lessonId}`
      );
      const data = response.data;

      setLessonData(data.data.lesson);
      console.log(data);
      setFireWaitings(false);
    }
    fetchData();
  }, [props.lessonId]);
  const handleClickBar1 = () => {
    setOpen(!open);
  };
  const handleClickIntermediate = () => {
    setOpenIntermediate(!openIntermediate);
  };
  const handleClickAdvanced = () => {
    setOpenAdvanced(!openAdvnaced);
  };
  if (!lessonData)
    return (
      <div className={classes.lessonLoader}>
        {" "}
        <CleoOne className={classes.lessonPreviewMain} />
      </div>
    );
  return (
    <div className={classes.lessonPreviewMain}>
      <div className={classes.sideBarLeft}>
        <div>
          <Button
            startIcon={<ArrowBackIcon style={{ color: "gray" }} />}
            className={classes.sideBarButton}
            onClick={() => {
              router.push(`/courses/${lessonData.course}`);
            }}
          >
            {" "}
            Back To Course Home{" "}
          </Button>
          <Divider />
        </div>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "left" }}>
          {props.courseName} Interactive course with AngleCode
        </h2>
        <div className={classes.progressBar}>
          <p> 20% completed </p>
          <LinearProgress variant="determinate" value={20} />
        </div>
        <Divider />

        <ListItemButton onClick={handleClickBar1} style={{ maxHeight: "2%" }}>
          <ListItemText primary="Beginner" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {lessonCourse[0].easy.map((lesson) => {
              return (
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    router.push({
                      pathname: `/courses/course/lesson/showlesson`,
                      query: { cName: props.courseName, id: lesson._id },
                    });
                  }}
                >
                  <ListItemIcon>
                    <CheckCircleRoundedIcon style={{ color: "green" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={lesson.title}
                    style={{ textDecoration: "underline" }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>

        <ListItemButton
          onClick={handleClickIntermediate}
          style={{ maxHeight: "2%" }}
        >
          <ListItemText primary="Intermediate" />
          {openIntermediate ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openIntermediate} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {lessonCourse[1].mid.map((lesson) => {
              return (
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    router.push({
                      pathname: `/courses/course/lesson/showlesson`,
                      query: { cName: props.courseName, id: lesson._id },
                    });
                  }}
                >
                  <ListItemIcon>
                    <RadioButtonUncheckedRoundedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={lesson.title}
                    style={{ textDecoration: "underline" }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>

        <ListItemButton
          onClick={handleClickAdvanced}
          style={{ maxHeight: "2%" }}
        >
          <ListItemText primary="Advanced" />
          {openAdvnaced ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAdvnaced} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {lessonCourse[2].hard.map((lesson) => {
              return (
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    router.push({
                      pathname: `/courses/course/lesson/showlesson`,
                      query: { cName: props.courseName, id: lesson._id },
                    });
                  }}
                >
                  <ListItemIcon>
                    <RadioButtonUncheckedRoundedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={lesson.title}
                    style={{ textDecoration: "underline" }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      </div>
      {fireWaitings ? (
        <CleoOne className={classes.lessonRight} />
      ) : (
        <div className={classes.lessonRight}>
          <h1>{lessonData.title}</h1>
          <Divider />
          <div className={classes.content}>
            {lessonData.content
              ? parser(lessonData.content)
              : "No content found"}
          </div>
          <TestLesson testArray={lessonData.test[0]} />
        </div>
      )}
    </div>
  );
};

export default LessonPreview;
