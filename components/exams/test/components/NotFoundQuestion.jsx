import React from "react";
import Image from "next/image";
import classes from "../question.module.css";
import quizeNotFound from "../../../../assets/png/quizNotFound.png";
const NotFoundQuestion = () => {
  return (
    <div className={classes.notFoundMain}>
      <Image src={quizeNotFound} height={400} width={400} />
      <h3>You don't have any Questions created yet for this test</h3>
      <p>Please click button to create one</p>
    </div>
  );
};

export default NotFoundQuestion;
