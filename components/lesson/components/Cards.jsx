import React from "react";
import classes from "../lessons.module.css";
import Image from "next/image";
import OpenLesson from "./OpenLesson";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import AddTestLesson from "./AddTestLesson";
const Cards = ({
  lessonName,
  levelImg,
  lessonId,
  handleDeleteLesson,
  level,
  fireandUnFireWaitings,
}) => {
  const [openLesson, setOpenLesson] = useState(false);

  // Open and close for click on Lesson
  const handleClickOpenLesson = () => {
    setOpenLesson(true);
  };

  const handleCloseLesson = () => {
    setOpenLesson(false);
  };

  // ADD & UPDATE TEST LESSON
  const [openTest, setOpenTest] = useState(false);

  const handleClickOpenTest = () => {
    setOpenTest(true);
  };
  const handleCloseTest = () => {
    setOpenTest(false);
  };

  // DELETE LESSON FOR SPECIFIC COURSE
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleSubmitDelete = (id) => {
    setOpenDelete(false);
    setOpenLesson(false);
    handleDeleteLesson({ id: id, level: level });
  };
  return (
    <>
      <div onClick={handleClickOpenLesson} className={classes.cardLink}>
        <div className={classes.cards}>
          <Image
            src={levelImg}
            alt="programming language avatar"
            width={26}
            height={26}
          />
          <h2>{lessonName}</h2>
        </div>
      </div>
      <OpenLesson
        open={openLesson}
        handleClose={handleCloseLesson}
        lessonName={lessonName}
        lessonId={lessonId}
        handleClickOpenTest={handleClickOpenTest}
        handleClickOpen={handleClickOpenDelete}
      />
      <DeleteDialog
        open={openDelete}
        handleClose={handleCloseDelete}
        lessonName={lessonName}
        lessonId={lessonId}
        handleSubmit={handleSubmitDelete}
        fireandUnFireWaitings={fireandUnFireWaitings}
      />
      <AddTestLesson
        open={openTest}
        onClose={handleCloseTest}
        lessonName={lessonName}
        lessonId={lessonId}
        handleCloseLesson={handleCloseLesson}
      />
    </>
  );
};

export default Cards;
