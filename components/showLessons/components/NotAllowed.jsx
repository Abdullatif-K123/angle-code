import React from "react";
import classes from "../lessonPre.module.css";
import notAllowed from "../../../assets/svg/notallowed.svg";
import Image from "next/image";
import { Button } from "@mui/material";
const NotAllowed = ({ currentLesson }) => {
  return (
    <div className={classes.notAllowedMain}>
      <Image src={notAllowed} alt="not allowed" width={300} height={300} />
      <p>
        {currentLesson
          ? "Hmm, I sugest you to finish your previous lessons"
          : "  Hmmm, Sounds that you liking this course? Just click Get started and buy this course"}
      </p>
      <Button variant="contained">
        {currentLesson ? "Continue to learn" : "Get Started"}
      </Button>
    </div>
  );
};

export default NotAllowed;
