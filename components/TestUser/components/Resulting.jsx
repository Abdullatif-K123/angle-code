import React, { useState } from "react";
import classes from "../quiz.module.css";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import gold from "../../../assets/png/gold_medal.png";
import fail from "../../../assets/png/failed.png";
import ShareIcon from "@mui/icons-material/Share";
import silver from "../../../assets/png/silver_medal.png";
import Snackbar from "@mui/material/Snackbar";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import MuiAlert from "@mui/material/Alert";
import Confetti from "react-confetti";
import { useRouter } from "next/router";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
import Image from "next/image";
import { SignalWifiStatusbarNull } from "@mui/icons-material";
function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

const Resulting = ({ scores, numQuestion, correct }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  const [transition, setTransition] = React.useState(undefined);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const score = (scores / numQuestion) * 100;
  let result = "";
  let grade = "";

  if (score >= 90) {
    result = "Excellent";
    grade = "A";
  } else if (score >= 80) {
    result = "Very Good";
    grade = "B";
  } else if (score >= 70) {
    result = "Good";
    grade = "C";
  } else if (score >= 60) {
    result = "Fair";
    grade = "D";
  } else if (score >= 50) {
    result = "Pass";
    grade = "E";
  } else {
    result = "Fail";
    grade = "F";
  }
  return (
    <div className={classes.mainResult}>
      {score >= 60 ? (
        <Confetti width={screenWidth - 20} height={screenHeight} />
      ) : null}
      <div className={classes.resultInfo}>
        <div className={classes.award}>
          <Image
            src={grade == "F" ? fail : grade == "A" ? gold : silver}
            width={200}
            height={grade == "F" ? 100 : 200}
          />

          <h1>{grade == "F" ? "" : `Congratulations`}</h1>
        </div>

        <h3>
          {grade == "F"
            ? `Sorry but you Failed!!`
            : `Congrats you pass the exam `}
        </h3>
        <Divider style={{ width: "100%" }}>
          <Chip label="Details" />
        </Divider>
        <div className={classes.detailInfo}>
          <h3>Grade: {grade}</h3>
          <h4>Total Questions: {numQuestion}</h4>
          <h4>Correct Answers: {correct}</h4>
          <h4>Your Score: {parseInt(score)}%</h4>
          <h4>Passing Score: 60%</h4>
        </div>
        <div className={classes.actions}>
          <Button
            onClick={() => {
              router.replace("/");
            }}
            variant="contained"
            startIcon={<OtherHousesOutlinedIcon />}
          >
            Home
          </Button>
          <div className={classes.share}>
            <ShareIcon className={classes.iconShare} />
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={`${score < 60 ? "error" : "success"}`}
          sx={{ width: "100%" }}
        >
          {`${
            score < 60
              ? "You failed unfortunaitly"
              : "Congratulations you pass the exam"
          }`}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Resulting;
