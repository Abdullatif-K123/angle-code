import React, { useEffect, useState } from "react";
import classes from "../lessonPre.module.css";
import { Button } from "@mui/material";
import Confetti from "react-confetti";
import { Divider } from "@mui/material";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { unLockLesson } from "@/redux/currentCourseSlice";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useRouter } from "next/router";
const TestLesson = ({ testArray, lessonId, courseName, userCourse }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [classOption, setClassOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [buttonSubmit, setButtonSubmit] = useState(null);
  const [nextLesson, setNextLesson] = useState(null);
  const [celebrating, setcelebrating] = useState(false);
  const [finished, setFinished] = useState(false);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const scrollY = window.scrollY;
  const handleClick = (option) => {
    if (!buttonSubmit) {
      setSelectedOption(option);
      if (!classOption) setClassOption(classes.selectedOption);
      else setClassOption(null);
    }
  };
  useEffect(() => {
    if (user.token && userCourse.lesson) {
      if (!testArray) setNextLesson(lessonId);

      if (userCourse.lesson) {
        const indexLesson = userCourse.unlockedLessons.indexOf(lessonId);
        if (
          indexLesson !== -1 &&
          indexLesson + 1 !== userCourse.unlockedLessons.length
        ) {
          setFinished(true);
          setNextLesson(userCourse.unlockedLessons[indexLesson + 1]);
        }
      }
    }
  }, []);
  console.log(testArray);
  var headers = {
    Authorization: `Bearer ${user.token}`,
  };
  const handleSubmitClick = async () => {
    let answer = null;
    if (testArray.options[testArray.answer] === selectedOption) {
      setButtonSubmit(classes.optionCorrect);
      enqueueSnackbar("Congratulations brother you successed!!!", {
        variant: "success",
      });
      setcelebrating(true);
      setTimeout(() => {
        setcelebrating(false);
      }, [7000]);
      answer = true;
    } else {
      setButtonSubmit(classes.optionFault);
      enqueueSnackbar("Unfortunaitely you didn't successed", {
        variant: "error",
      });
      answer = false;
    }
    setTimeout(() => {
      axios
        .patch(
          `http://localhost:3333/AngelCode/lesso/${lessonId}`,
          { answer },
          { headers }
        )
        .then((response) => {
          console.log(response.data);
          const nextlesson = response.data.data.lessonsAttend;
          setNextLesson(nextlesson[nextlesson.length - 1]);
          dispatch(
            unLockLesson({ unlocklesson: nextlesson[nextlesson.length - 1] })
          );
        })
        .catch((error) => {
          // Handle any errors here
          console.error(error);
        });
    }, 5000);
  };
  const handleNextClick = () => {
    if (!testArray && !finished) {
      axios
        .patch(
          `http://localhost:3333/AngelCode/lesso/${lessonId}`,
          { answer: true },
          { headers }
        )
        .then((response) => {
          console.log(response.data);
          const nextlessons = response.data.data.lessonsAttend;
          setNextLesson(nextlessons[nextlessons.length - 1]);
          dispatch(
            unLockLesson({
              unlocklesson: nextlessons[nextlessons.length - 1],
            })
          );
          router.push({
            pathname: `/courses/course/lesson/showlesson`,
            query: {
              cName: courseName,
              id: nextlessons[nextlessons.length - 1],
            },
          });
        })
        .catch((error) => {
          // Handle any errors here
          console.error(error);
        });
    } else {
      router.push({
        pathname: `/courses/course/lesson/showlesson`,
        query: { cName: courseName, id: nextLesson },
      });
    }
  };
  return (
    <div className={classes.testForm}>
      {celebrating && (
        <Confetti
          width={screenWidth - 20}
          height={screenHeight + 1500}
          confettiSource={{
            w: 1000,
            x: screenWidth / 4,
            y: scrollY + 50,
          }}
        />
      )}
      {!testArray || finished ? null : (
        <>
          <div className={classes.testQuestion}>
            <h3>{testArray.question}</h3>
          </div>
          <div className={classes.testAnswer}>
            {testArray.options.map((option, index) => {
              return (
                <div
                  className={`${classes.testOption} ${
                    selectedOption === option ? classes.selectedOption : null
                  } ${buttonSubmit ? classes.notChoose : null}  ${
                    selectedOption === option ? buttonSubmit : null
                  }  ${
                    buttonSubmit &&
                    testArray.options[testArray.answer] === option
                      ? classes.optionCorrect
                      : null
                  } `}
                  onClick={() => handleClick(option)}
                  key={index}
                >
                  <p>{option}</p>
                </div>
              );
            })}
          </div>
          <div className={classes.submitButton}>
            <Button
              variant="contained"
              color="success"
              style={{
                width: "100%",
                padding: "10px 0px",
                fontWeight: "bold",
                borderRadius: "50px",
              }}
              onClick={handleSubmitClick}
              disabled={selectedOption && !buttonSubmit ? false : true}
            >
              Submit
            </Button>
          </div>
        </>
      )}

      <div style={{ marginLeft: "auto" }}>
        <Button
          variant="outlined"
          style={{ padding: "10px 50px", width: "10%" }}
          endIcon={<ArrowForwardOutlinedIcon />}
          disabled={!nextLesson ? true : false}
          onClick={handleNextClick}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TestLesson;
