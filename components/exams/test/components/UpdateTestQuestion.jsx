import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, MenuItem } from "@mui/material";
import { useState, useRef } from "react";
import axios from "axios";
import classes from "../question.module.css";
import { useSelector } from "react-redux";
import swal from "sweetalert";
export default function UpdateQuestion({
  open,
  onClose,
  questionId,
  handleQuestionUpdate,
  questiones,
  handleUpdateClose,
}) {
  console.log(questiones.question);
  const user = useSelector((state) => state.user.user);
  var headers = {
    Authorization: `Bearer ${user.token}`,
  };
  const [inputOp1, setInputOp1] = useState("");

  const [inputOp2, setInputOp2] = useState("");
  const [inputOp3, setInputOp3] = useState("");
  const [inputOp4, setInputOp4] = useState("");
  const [inputQues, setInputQues] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(
    questiones.answerOptions.indexOf(questiones.correctAnswer)
  );
  React.useEffect(() => {
    setInputOp1(questiones.answerOptions[0]);
    setInputOp2(questiones.answerOptions[1]);
    setInputOp3(questiones.answerOptions[2]);
    setInputOp4(questiones.answerOptions[3]);
    setInputQues(questiones.question);
    setCorrectAnswer(
      questiones.answerOptions.indexOf(questiones.correctAnswer)
    );
  }, [open]);

  const handleAddQuestion = async () => {
    // handle adding the question to the database or state
    // reset the inputs and close the dialog
    const options = [inputOp1, inputOp2, inputOp3, inputOp4];
    const answer = options[correctAnswer];
    const obj = {
      question: inputQues,
      answerOptions: options,
      correctAnswer: answer,
    };

    console.log(obj);
    try {
      const response = await axios.patch(
        `http://localhost:3333/AngelCode/Tests/UpdateQuestion/${questionId}`,
        obj,
        { headers }
      );
      console.log(response.data);
      handleQuestionUpdate(response.data.data);
      handleUpdateClose();
      swal("Greate job!", "Your Question has been added", "success");
    } catch (error) {
      console.log(error);
    }

    onClose();
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle className={classes.mainTextAddTest}>
          Add Multiple Choice Question
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your question</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Question"
            fullWidth
            value={inputQues}
            onChange={(e) => setInputQues(e.target.value)}
            required
          />
          <DialogContentText>
            Now enter four options, and select the correct answer bellow
          </DialogContentText>
          <TextField
            margin="dense"
            label="Option 1"
            fullWidth
            value={inputOp1}
            required
            onChange={(e) => {
              setInputOp1(e.target.value);
            }}
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Option 2"
            value={inputOp2}
            fullWidth
            required
            onChange={(e) => {
              setInputOp2(e.target.value);
            }}
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Option 3"
            value={inputOp3}
            fullWidth
            onChange={(e) => {
              setInputOp3(e.target.value);
            }}
            variant="standard"
            required
          />
          <TextField
            margin="dense"
            label="Option 4"
            value={inputOp4}
            fullWidth
            onChange={(e) => {
              setInputOp4(e.target.value);
            }}
            variant="standard"
            required
          />
          <TextField
            select
            margin="dense"
            label="Correct Answer"
            fullWidth
            value={correctAnswer}
            variant="standard"
            required
            onChange={(e) => setCorrectAnswer(e.target.value)}
          >
            <MenuItem value="0">Option 1</MenuItem>
            <MenuItem value="1">Option 2</MenuItem>
            <MenuItem value="2">Option 3</MenuItem>
            <MenuItem value="3">Option 4</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddQuestion} color="primary">
            Update Question
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
