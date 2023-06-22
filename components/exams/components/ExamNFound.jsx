import React from "react";
import classes from "../exams.module.css";
import Image from "next/image";
import examNotFound from "../../../assets/png/examNotFound.png";
const ExamNFound = () => {
  return (
    <div className={classes.notFoundMain}>
      <Image
        src={examNotFound}
        alt="A sample exam Not found"
        width={400}
        height={400}
      />
      <h3>You Don't create any exam yet try to create one!!!</h3>
    </div>
  );
};

export default ExamNFound;
