import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./question.module.css";
import axios from "axios";
import { Button } from "@mui/material";
import { AddSharp } from "@mui/icons-material";
import AddTestQuestion from "./components/testQuestion";
import OpenUpdateQuestion from "./components/OpenTestQuestoin";
import DeleteDialog from "./components/DialogDeleteQues";
import UpdateQuestion from "./components/UpdateTestQuestion";
import NotFoundQuestion from "./components/NotFoundQuestion";
const Questions = ({ testId, testTitle }) => {
  const user = useSelector((state) => state.user.user);
  const [questionData, setQuestionData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [questionId, setQuestionId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdated, setOpenUpdated] = useState(false);
  const [optionIndex, setOptionIndex] = useState(0);
  const [waiting, setWaitings] = useState(false);
  //   Open and close dialog for adding questions
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //   open and close dialog for Update question
  const handleOpenUpdate = () => {
    setOpenUpdated(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdated(false);
  };
  const handleQuestionUpdate = (data) => {
    setQuestionData((question) => {
      const newQuestion = question.map((test) => {
        if (test._id === data._id) return data;
        else return test;
      });
      return newQuestion;
    });
  };
  //   Open and close dialog for Deleteing
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleSubmit = (id) => {
    setQuestionData((question) => {
      const newData = question.filter((quest) => quest._id != id);
      return newData;
    });
  };
  // Open and close dialog for Updating and delete question
  const handleUpdateOpen = (id, index) => {
    setOptionIndex(index);
    setQuestionId(id);
    console.log(id, index);

    setOpenUpdate(true);
  };
  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };
  var headers = {
    Authorization: `Bearer ${user.token}`,
  };
  useEffect(() => {
    async function fetchData() {
      setWaitings(true);
      const testData = await axios.get(
        `http://localhost:3333/AngelCode/Tests/AllQuestions/${testId}`,
        { headers }
      );
      const data = testData.data.data;
      setQuestionData(data);
      console.log(data);
      setWaitings(false);
    }
    fetchData();
  }, []);
  const handleAddedQuestion = (newQuestion) => {
    setQuestionData([...questionData, newQuestion]);
  };
  if (!questionData.length && waiting) {
    return <p>Loading.....</p>;
  }
  return (
    <div className={classes.questionMain}>
      <h2>This Questions for {testTitle} </h2>
      <div className={classes.qusetionsSection}>
        {questionData.length < 1 ? (
          <NotFoundQuestion />
        ) : (
          questionData.map((question, index) => {
            return (
              <div
                className={classes.questionCard}
                onClick={() => handleUpdateOpen(question._id, index)}
                key={question._id}
              >
                <h3>
                  Q{index + 1}:{question.question}
                </h3>
                {question.answerOptions.map((option) => {
                  return (
                    <div
                      className={`${classes.option} ${
                        question.correctAnswer == option
                          ? classes.answred
                          : null
                      }`}
                    >
                      <p>{option}</p>
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
      <Button
        className={`${classes.btnfos} ${classes.btnfos5}`}
        startIcon={<AddSharp />}
        onClick={handleOpen}
      >
        Add Question
      </Button>
      <AddTestQuestion
        open={open}
        onClose={handleClose}
        testId={testId}
        handleAddedQuestion={handleAddedQuestion}
      />
      {questionData.length > 0 ? (
        <div>
          <OpenUpdateQuestion
            open={openUpdate}
            handleClose={handleUpdateClose}
            handleOpenDelete={handleOpenDelete}
            handleOpenUpdate={handleOpenUpdate}
          />
          <DeleteDialog
            open={openDelete}
            handleClose={handleCloseDelete}
            questionId={questionId}
            handleSubmit={handleSubmit}
            handleCloseTest={handleUpdateClose}
          />
          <UpdateQuestion
            open={openUpdated}
            onClose={handleCloseUpdate}
            questionId={questionId}
            handleQuestionUpdate={handleQuestionUpdate}
            questiones={questionData[optionIndex]}
            handleUpdateClose={handleUpdateClose}
          />{" "}
        </div>
      ) : null}
    </div>
  );
};

export default Questions;
