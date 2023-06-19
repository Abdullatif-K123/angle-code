import React, { useState } from "react";
import classes from "../lessonPre.module.css";
import { Button } from "@mui/material";
import Confetti from "react-confetti";
import { Divider } from "@mui/material";
import { useSnackbar } from "notistack";

const TestLesson = ({ testArray }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [classOption, setClassOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [buttonSubmit, setButtonSubmit] = useState(null);
  const [celebrating, setcelebrating] = useState(false);
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
  console.log(testArray);
  const handleSubmitClick = () => {
    if (testArray.options[testArray.answer] === selectedOption) {
      setButtonSubmit(classes.optionCorrect);
      enqueueSnackbar("Congratulations brother you successed!!!", {
        variant: "success",
      });
      setcelebrating(true);
      setTimeout(() => {
        setcelebrating(false);
      }, [7000]);
    } else {
      setButtonSubmit(classes.optionFault);
      enqueueSnackbar("Unfortunaitely you didn't successed", {
        variant: "error",
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
                buttonSubmit && testArray.options[testArray.answer] === option
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
    </div>
  );
};

export default TestLesson;
