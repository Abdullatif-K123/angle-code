import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./course.module.css";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import CastForEducationOutlinedIcon from "@mui/icons-material/CastForEducationOutlined";
import ResponsiveProduct from "../loader/CourseView";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import SignalCellular1BarRoundedIcon from "@mui/icons-material/SignalCellular1BarRounded";
import SignalCellular3BarRoundedIcon from "@mui/icons-material/SignalCellular3BarRounded";
import SignalCellular4BarRoundedIcon from "@mui/icons-material/SignalCellular4BarRounded";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import Image from "next/image";
import { useRouter } from "next/router";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { addLessons } from "../../redux/courseSlice";
import { CardActionArea } from "@mui/material";
const CourseOverview = ({ courseId }) => {
  const dispatch = useDispatch();
  const lessoon = useSelector((state) => state.course.lessons);
  console.log(lessoon);
  const router = useRouter();
  const [courseData, setCourseData] = useState(null);
  const [open, setOpen] = useState(false);
  const [openIntermediate, setOpenIntermediate] = useState(false);
  const [openAdvnaced, setOpenAdvanced] = useState(false);
  const [beginners, setBeginners] = useState([]);
  const [intermediates, setItnermediates] = useState([]);
  const [advanced, setAdvanceds] = useState([]);

  // handle list Slide
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickIntermediate = () => {
    setOpenIntermediate(!openIntermediate);
  };
  const handleClickAdvanced = () => {
    setOpenAdvanced(!openAdvnaced);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:3333/AngelCode/Courses/${courseId}`
      );
      const data = response.data.data.course;
      console.log(data);
      setCourseData(data);
      const lesson = data.lesson;
      const easy = lesson.filter((lesson) => {
        return lesson.level == 1;
      });
      setBeginners(easy);

      const mid = lesson.filter((lesson) => {
        return lesson.level == 2;
      });
      setItnermediates(mid);
      const hard = lesson.filter((lesson) => {
        return lesson.level == 3;
      });
      dispatch(addLessons({ easy: easy, mid: mid, hard: hard }));
      setAdvanceds(hard);
      console.log(data);
      console.log(beginners);
      console.log(intermediates);
      console.log(advanced);
    }
    fetchData();
  }, []);

  // Loading...
  if (!courseData) return <ResponsiveProduct />;

  return (
    <div className={classes.mainPage}>
      <Card sx={{ maxWidth: 265 }} className={classes.cardSide}>
        <Image
          src={require(`../../../5theyear/img/${courseData.imageCover}`)}
          alt="My Image"
          width={265}
          height={130}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className={classes.cardTextHead}
          >
            Course Standard
          </Typography>
        </CardContent>
        <CardActions className={classes.cardAction}>
          <Button variant="contained">GET STARTED</Button>
          <Button>Determined your level</Button>
        </CardActions>
        <CardContent>
          <p style={{ fontWeight: "bold" }}>This course include:</p>
          <div className={classes.cardMoreInfo}>
            <p>
              <CastForEducationOutlinedIcon /> {courseData.lesson.length}{" "}
              lessons
            </p>
            <p>
              <AvTimerIcon /> {courseData.lesson.length / 2}h
            </p>
            <p>
              <QuizOutlinedIcon /> {courseData.lesson.length + 4} Quizzes
            </p>
            <p>
              <WorkspacePremiumIcon /> Certificate of Completion
            </p>
          </div>
        </CardContent>
      </Card>
      {/* <Image
        src={require(`../../../5theyear/img/${courseData.imageCover}`)}
        alt="My Image"
        width={800}
        height={400}
      /> */}
      <div className={classes.courseHead}>
        <div className={classes.mainTextHead}>
          <p className={classes.textbeg}>INTERACTIVE COURSE</p>
          <h1>
            {courseData.name} course for developers and software engineers
          </h1>
          <div className={classes.moreInfo}>
            <p>
              <CastForEducationOutlinedIcon /> {courseData.lesson.length}{" "}
              lessons
            </p>
            <p>
              <AvTimerIcon /> {courseData.lesson.length / 2}h
            </p>
            <p>
              <QuizOutlinedIcon /> {courseData.lesson.length + 4} Quizzes
            </p>
            <p>
              <WorkspacePremiumIcon /> Certificate of Completion
            </p>
          </div>
        </div>
      </div>
      <div className={classes.courseDescription}>
        <h3>Course Overview</h3>{" "}
        <p>
          {courseData.description} Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Eos architecto rerum ipsum, eligendi voluptates
          temporibus incidunt debitis tempora totam molestias earum atque?
          Debitis temporibus aliquam itaque molestias optio et soluta!
        </p>
      </div>
      <div>
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          className={classes.courseContent}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              style={{ fontSize: "23px", fontWeight: "bold" }}
            >
              Course Contents
            </ListSubheader>
          }
        >
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <SignalCellular1BarRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Beginner"
              secondary={`${beginners.length} Lessons`}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {beginners.map((lesson) => {
                return (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => {
                      router.push({
                        pathname: `/courses/course/lesson/showlesson`,
                        query: { cName: courseData.name, id: lesson._id },
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

          <ListItemButton onClick={handleClickIntermediate}>
            <ListItemIcon>
              <SignalCellular3BarRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Intermediate"
              secondary={`${intermediates.length} Lessons`}
            />
            {openIntermediate ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openIntermediate} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {intermediates.map((lesson) => {
                return (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => {
                      router.push({
                        pathname: `/courses/course/lesson/showlesson`,
                        query: { cName: courseData.name, id: lesson._id },
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

          <ListItemButton onClick={handleClickAdvanced}>
            <ListItemIcon>
              <SignalCellular4BarRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Advanced"
              secondary={`${advanced.length} Lessons`}
            />
            {openAdvnaced ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openAdvnaced} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {advanced.map((lesson) => {
                return (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => {
                      router.push({
                        pathname: `/courses/course/lesson/showlesson`,
                        query: { cName: courseData.name, id: lesson._id },
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
        </List>
      </div>
    </div>
  );
};

export default CourseOverview;
