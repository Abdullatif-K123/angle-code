import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import classes from "./quiz.module.css";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Divider } from "@mui/material";
import Image from "next/image";
import ourLogo from "../../assets/png/angleCode.png";
import CountDown from "./components/CountDown";
import Resulting from "./components/Resulting";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ThreeDots from "../loader/Loader";
import { useRouter } from "next/router";
import swal from "sweetalert";
const Quiz = ({ testId }) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [dataQuiz, setDataQuiz] = useState(null);
  const [currentTest, setCurrentTest] = useState(0);
  const [allQuizes, setAllQuizes] = useState(null);
  const [singleQuiz, setSingleQuiz] = useState({});
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [result, setResult] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });
  console.log(testId);
  const user = useSelector((state) => state.user.user);
  var headers = {
    Authorization: `Bearer ${user.token}`,
  };
  useEffect(() => {
    async function fetchDAta() {
      const response = await axios.get(
        `http://localhost:3333/AngelCode/Tests/${testId}`,
        { headers }
      );
      const quiz = response.data.data;
      setDataQuiz(quiz);
      quiz.limit_time;
      const hours = Math.floor(quiz.limit_time / 60);
      const remainingMinutes = Math.floor(quiz.limit_time % 60);
      const seconds = Math.floor((quiz.limit_time % 1) * 60);
      setTimer({ hours: hours, minutes: remainingMinutes, seconds: seconds });
      console.log(quiz);

      const responseQuiz = await axios.get(
        `http://localhost:3333/AngelCode/Tests/AllQuestions/${testId}`,
        { headers }
      );
      console.log(responseQuiz.data);
      const questions = responseQuiz.data.data;
      setAllQuizes(questions);
      setSingleQuiz(questions[currentTest]);
    }
    fetchDAta();
  }, []);

  // catch the little bitch
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User has switched away from the tab or minimized the window
        swal({
          title: "I catch you!!! you little piece of cake try to cheating",
          icon: "warning",

          dangerMode: true,
        }).then((willTakeit) => {
          router.push({
            pathname: `/`,
          });
        });
        console.log("User switched away from the tab or minimized the window");
      } else {
        // User has switched back to the tab or maximized the window
        console.log("User switched back to the tab or maximized the window");
      }
    };
    // const handleKeyDown = (event) => {
    //   alert("you little piece of shit");
    //   console.log(`Key pressed: ${event.key}`);
    // };
    // document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      //   document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  //Selected One Options
  const handlClickOption = (option) => {
    setSelectedOption(option);
  };

  // Answred and clicking Next
  const handleAnsweredClick = () => {
    if (allQuizes[currentTest].correctAnswer == selectedOption) {
      setCorrectAnswer(correctAnswer + 1);
      console.log("Correct!!!");
    }
    if (dataQuiz.questions.length !== currentTest + 1)
      setCurrentTest(currentTest + 1);
    else {
      const result = (correctAnswer / dataQuiz.questions.length) * 100;
      setResult(result);
      setFinished(true);
    }
    setSelectedOption(null);
  };

  if (!dataQuiz || !allQuizes) {
    return (
      <div className={classes.loaderExam}>
        <ThreeDots />
      </div>
    );
  }
  if (finished) {
    return (
      <Resulting
        scores={correctAnswer}
        numQuestion={dataQuiz.questions.length}
        correct={correctAnswer}
      />
    );
  }
  return (
    <div className={classes.testMain}>
      <div className={classes.headSection}>
        <div className={classes.testInfo}>
          <div className={classes.questionNum}>
            <InfoOutlinedIcon
              className={classes.iconQuestion}
              style={{ fontSize: "1.5em" }}
            />
            <h2>
              Question No.{currentTest + 1} of {dataQuiz.questions.length}
            </h2>
          </div>
          <div className={classes.ourLogo}>
            <Image src={ourLogo} alt="My Image" width={100} height={100} />
          </div>
          <CountDown
            timers={{ hours: 0, minutes: 0, seconds: 5 }}
            setFinished={setFinished}
          />
        </div>
        <div className={classes.questionSection}>
          <h3>
            <span>Q.</span>
            {allQuizes[currentTest].question}
          </h3>
        </div>
        <div className={classes.endHead}>
          <p>Please choose one of the following answers:</p>
        </div>
      </div>
      <div className={classes.bodySection}>
        {allQuizes[currentTest].answerOptions.map((option, index) => {
          return (
            <div
              className={`${classes.multiChoice} ${
                selectedOption === option ? classes.selectedOption : null
              }`}
              key={index}
              onClick={() => handlClickOption(option)}
            >
              <span>{String.fromCharCode(65 + index)}) </span> <p>{option}</p>
            </div>
          );
        })}
      </div>

      <div className={classes.submitButton}>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIosOutlinedIcon />}
          style={{ width: "17%", fontWeight: "bold", padding: "10px 0" }}
          disabled={selectedOption ? false : true}
          onClick={handleAnsweredClick}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
