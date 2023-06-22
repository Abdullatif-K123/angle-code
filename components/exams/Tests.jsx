import React, { useEffect, useState } from "react";
import classes from "./exams.module.css";
import { Button } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DialogTest from "./components/DialogTest";
import ExamNFound from "./components/ExamNFound";
import axios from "axios";
import OpenTest from "./components/OpenTest";
import DeleteDialog from "./components/DialogTestDelete";
import { useSelector } from "react-redux";
import RepeatableTableRows from "../loader/QuestionLoader";
const Tests = ({ courseId }) => {
  const [open, setOpen] = useState(false);
  const [openTest, setOpenTest] = useState(false);
  const [openDeleteTest, setOpenDeleteTest] = useState(false);
  const [testData, setTestData] = useState([]);
  const [testLevel, setTestLevel] = useState([]);
  const [testTitle, setTestTitle] = useState("");
  const [testId, setTestId] = useState("");
  const [singleLevel, setSingleLevel] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const newTestsection = (test) => {
    setTestData([...testData, test]);
    setTestLevel([...testLevel, test.level]);
  };
  const user = useSelector((state) => state.user.user);
  var headers = {
    Authorization: `Bearer ${user.token}`,
  };
  useEffect(() => {
    async function fetchData() {
      setWaiting(true);
      try {
        const response = await axios.get(
          `http://localhost:3333/AngelCode/Tests/gettests/${courseId}`,
          { headers }
        );

        setTestData(response.data.data);
        const levelTest = response.data.data.map((testLevel) => {
          return testLevel.level;
        });
        setTestLevel(levelTest);
      } catch (error) {
        console.log(error);
      }
      setWaiting(false);
    }
    fetchData();
  }, []);
  // Open test && close Test
  const handleCloseTest = () => {
    setOpenTest(false);
  };
  const handleOpenTest = (id, title, level) => {
    setTestId(id);
    setTestTitle(title);
    setOpenTest(true);
    setSingleLevel(level);
  };
  // Open Delete Test &&  close it
  const handleOpenDelete = () => {
    setOpenDeleteTest(true);
  };
  const handleCloseDetele = () => {
    setOpenDeleteTest(false);
  };
  const filterHandleTest = (id) => {
    setTestData((dataTest) => {
      let updateDataTest = dataTest.filter((test) => test._id !== id);
      return updateDataTest;
    });
    const updateTestLevel = testLevel.filter((sTest) => sTest !== singleLevel);
    setTestLevel(updateTestLevel);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  //  Waiting Section
  if (waiting) {
    return (
      <div className={classes.waitings}>
        <RepeatableTableRows />
      </div>
    );
  }
  return (
    <div className={classes.testMain}>
      <h1>My Exams</h1>
      <p>
        Build your own exams for any level you want{" "}
        <span>Beginner, Intermedaite, Advanced</span> or you can Build your
        <span> determinate level</span> to know where should your user's level,
        and finally you can add <span>final exams</span> for this course and get
        certification
      </p>
      <div className={classes.testBody}>
        {!testData.length ? (
          <ExamNFound />
        ) : (
          testData.map((test) => {
            const hours = Math.floor(test.limit_time / 60);
            const remainingMinutes = Math.floor(test.limit_time % 60);
            const seconds = Math.floor((test.limit_time % 1) * 60);
            const time = `${hours}:${remainingMinutes}:${seconds}`;
            return (
              <div
                className={`${classes.singleTest}`}
                key={test._id}
                onClick={() => handleOpenTest(test._id, test.title, test.level)}
              >
                <h3>
                  {test.level == 0
                    ? "ability Test"
                    : test.level == 1
                    ? "beginner test"
                    : test.level == 2
                    ? "intermediate test"
                    : test.level == 3
                    ? "Advanced test"
                    : "Final Exam"}
                </h3>

                <div
                  className={`${classes.cardTest}  ${
                    test.questions.length ? null : classes.noQuestionFound
                  }`}
                >
                  <div className={classes.titleInfo}>
                    <TipsAndUpdatesOutlinedIcon className={classes.icons} />
                    <p>{test.title}</p>
                  </div>
                  <div className={classes.testInfo}>
                    <InfoOutlinedIcon className={classes.icons} />
                    <p>{test.about}</p>
                  </div>
                  <div className={classes.moreInfo}>
                    <div className={classes.iconInfo}>
                      <WatchLaterOutlinedIcon className={classes.icons} />
                      {time}
                    </div>
                    <div className={classes.iconInfo}>
                      <QuizOutlinedIcon
                        className={`${classes.icons}  ${
                          test.questions.length
                            ? null
                            : classes.iconQuestionNFound
                        }`}
                      />
                      {test.questions.length}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Button
        variant="contained"
        className={classes.addButton}
        onClick={handleOpen}
      >
        <AddRoundedIcon />
        <p>Add Test</p>
      </Button>
      <DialogTest
        open={open}
        handleClose={handleClose}
        courseId={courseId}
        testLevel={testLevel}
        newTestsection={newTestsection}
      />
      <OpenTest
        open={openTest}
        handleClose={handleCloseTest}
        testTitle={testTitle}
        testId={testId}
        handleClickOpen={handleOpenDelete}
      />
      <DeleteDialog
        open={openDeleteTest}
        handleClose={handleCloseDetele}
        testId={testId}
        testTitle={testTitle}
        handleSubmit={filterHandleTest}
        handleCloseTest={handleCloseTest}
      />
    </div>
  );
};

export default Tests;
