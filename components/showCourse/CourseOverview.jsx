import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./course.module.css";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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
import EnrollCourse from "./components/EnrollCourse";
import { courseUser } from "@/redux/currentCourseSlice";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import swal from "sweetalert";
const CourseOverview = ({ courseId }) => {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const router = useRouter();
  const [courseData, setCourseData] = useState(null);
  const [open, setOpen] = useState(true);
  const [openExma, setOpenExma] = useState(false);
  const [openIntermediate, setOpenIntermediate] = useState(true);
  const [openAdvnaced, setOpenAdvanced] = useState(true);
  const [beginners, setBeginners] = useState([]);
  const [intermediates, setItnermediates] = useState([]);
  const [advanced, setAdvanceds] = useState([]);
  const [userCourse, setUserCourse] = useState({});
  const [currentLessons, setCurrentLessons] = useState(null);

  const [enroll, setEnroll] = useState(null);
  const [exams, setExams] = useState(null);
  const [finalExmas, setFinalExams] = useState(null);
  var headers = {
    Authorization: `Bearer ${user.token}`,
  };

  // Enroll Course Section
  const handleEnroll = () => {
    setEnroll(true);
  };
  const [openEnroll, setOpenEnroll] = React.useState(false);

  const handleClickOpenEnroll = () => {
    if (!userCourse._id) setOpenEnroll(true);
    else {
      router.push({
        pathname: `/courses/course/lesson/showlesson`,
        query: { cName: userCourse.name, id: currentLessons },
      });
    }
  };

  const handleCloseEnroll = () => {
    setOpenEnroll(false);
  };
  // open Exams suring dialog
  const handleOpenExam = () => {
    setOpenExma(true);
  };
  const handleCloseExam = () => {
    setOpenExma(false);
  };
  const handleClickExams = () => {
    console.log(finalExmas);
    swal({
      title: "Are you sure that you want to take this exam?",
      text: `Once clicked yes, you will enter to this exams which take like about ${parseInt(
        finalExmas.limit_time
      )} minutes  
      -Make sure you have suitable internet
      -Don't leave the exam once you enter it
      -Don't go to another tab or another app
      -you can't copy the question  `,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willTakeit) => {
      if (willTakeit) {
        console.log("hello");
        router.push({
          pathname: `/exam/final`,
          query: { id: finalExmas._id },
        });
      }
    });
  };
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
      if (data.user._id === user.userId) {
        const idLesson = data.lesson.map((id) => id._id);
        const obj = { unlockedLessons: idLesson, lesson: idLesson };
        dispatch(courseUser({ data: obj }));
        setUserCourse({ unlockedLessons: idLesson });
      }
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

      if (user.token && !(data.user._id === user.userId)) {
        const responseTwo = await axios.get(
          "http://localhost:3333/AngelCode/myFavAndUnlock",
          { headers }
        );

        let dataUser = responseTwo.data.data.find(
          (obj) => obj._id === data._id
        );
        console.log(dataUser);
        dataUser = [dataUser];
        if (dataUser[0]) {
          setUserCourse(dataUser[0]);
          setCurrentLessons(
            dataUser[0].unlockedLessons[dataUser[0].unlockedLessons.length - 1]
          );
          console.log(dataUser[0]);
          dispatch(courseUser({ data: dataUser[0] }));
        } else {
          setUserCourse({ unlockedLessons: [] });
          dispatch(courseUser({}));
        }
      } else if (data.user._id === user.userId) {
        const idLesson = data.lesson.map((singleLesson) => singleLesson._id);
        idLesson.push("3432432432");
        setUserCourse({ unlockedLessons: idLesson });
        dispatch(courseUser({ data: idLesson }));
      } else {
        setUserCourse({ unlockedLessons: [] });
        dispatch(courseUser({}));
      }
    }
    async function fetchDataTesting() {
      try {
        const response = await axios.get(
          `http://localhost:3333/AngelCode/Tests/gettests/${courseId}`,
          { headers }
        );
        console.log("this is the Testing section");
        console.log(response.data);
        setExams(response.data.data);
        const finalExam = response.data.data.filter((exam) => exam.level === 4);
        setFinalExams(finalExam[0]);
      } catch (error) {
        console.log(error);
      }
    }
    if (user.token) fetchDataTesting();
    fetchData();
  }, [enroll]);

  // Loading...
  if (!courseData) return <ResponsiveProduct />;

  return (
    <div className={classes.mainPage}>
      <Card sx={{ maxWidth: 265 }} className={classes.cardSide}>
        <Image
          src={require(`../../../AngleCode_Server/img/${courseData.imageCover}`)}
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
          <div className={classes.priceCourse}>
            <span>150000</span>/SYP
          </div>
        </CardContent>
        {user.userId ? (
          <CardActions className={classes.cardAction}>
            <>
              <Button variant="contained" onClick={handleClickOpenEnroll}>
                {userCourse._id ? "Continue learning" : "GET STARTED"}
              </Button>
              <Button>Determined your level</Button>
            </>
          </CardActions>
        ) : null}
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
          <div className={classes.moreInfo}>
            <p>
              <VisibilityOutlinedIcon /> {courseData.views}
            </p>
            <p>
              <SubscriptionsOutlinedIcon /> +100
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
                    key={lesson._id}
                    onClick={() => {
                      router.push({
                        pathname: `/courses/course/lesson/showlesson`,
                        query: { cName: courseData.name, id: lesson._id },
                      });
                    }}
                  >
                    <ListItemIcon>
                      {!userCourse.unlockedLessons ? (
                        <LockOutlinedIcon />
                      ) : userCourse.unlockedLessons.indexOf(lesson._id) ===
                        -1 ? (
                        <LockOutlinedIcon />
                      ) : userCourse.unlockedLessons.indexOf(lesson._id) ===
                        userCourse.unlockedLessons.length - 1 ? (
                        <RadioButtonUncheckedRoundedIcon />
                      ) : (
                        <CheckCircleRoundedIcon style={{ color: "green" }} />
                      )}
                    </ListItemIcon>

                    <ListItemText
                      primary={lesson.title}
                      style={{ textDecoration: "underline" }}
                      primaryTypographyProps={
                        currentLessons === lesson._id
                          ? { className: classes.currentLesson }
                          : null
                      }
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
                    key={lesson._id}
                    sx={{ pl: 4 }}
                    onClick={() => {
                      router.push({
                        pathname: `/courses/course/lesson/showlesson`,
                        query: { cName: courseData.name, id: lesson._id },
                      });
                    }}
                  >
                    <ListItemIcon>
                      {!userCourse.unlockedLessons ? (
                        <LockOutlinedIcon />
                      ) : userCourse.unlockedLessons.indexOf(lesson._id) ===
                        -1 ? (
                        <LockOutlinedIcon />
                      ) : userCourse.unlockedLessons.indexOf(lesson._id) ===
                        userCourse.unlockedLessons.length - 1 ? (
                        <RadioButtonUncheckedRoundedIcon />
                      ) : (
                        <CheckCircleRoundedIcon style={{ color: "green" }} />
                      )}
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
                    key={lesson._id}
                    sx={{ pl: 4 }}
                    onClick={() => {
                      router.push({
                        pathname: `/courses/course/lesson/showlesson`,
                        query: { cName: courseData.name, id: lesson._id },
                      });
                    }}
                  >
                    <ListItemIcon>
                      {!userCourse.unlockedLessons ? (
                        <LockOutlinedIcon />
                      ) : userCourse.unlockedLessons.indexOf(lesson._id) ===
                        -1 ? (
                        <LockOutlinedIcon />
                      ) : userCourse.unlockedLessons.indexOf(lesson._id) ===
                        userCourse.unlockedLessons.length - 1 ? (
                        <RadioButtonUncheckedRoundedIcon />
                      ) : (
                        <CheckCircleRoundedIcon style={{ color: "green" }} />
                      )}
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
          <div className={classes.finalExam}>
            <Button
              variant="contained"
              startIcon={<QuizOutlinedIcon />}
              style={{
                padding: "10px 30px",
                fontWeight: "bold",
                fontSize: "19px",
                width: "20%",
                borderRadius: "10px",
              }}
              onClick={handleClickExams}
            >
              Final Exams
            </Button>
          </div>
        </List>
      </div>
      <EnrollCourse
        open={openEnroll}
        handleClose={handleCloseEnroll}
        courseId={courseId}
        handleEnroll={handleEnroll}
      />
    </div>
  );
};

export default CourseOverview;
