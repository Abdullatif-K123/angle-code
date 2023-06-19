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
import classes from "../lessons.module.css";
import { useSelector } from "react-redux";
export default function AddTestLesson({
  open,
  onClose,
  lessonName,
  lessonId,
  handleCloseLesson,
}) {
  const user = useSelector((state) => state.user.user);
  var headers = {
    Authorization: `Bearer ${user.token}`,
  };

  const [question, setQuestion] = useState("");
  const inputQues = useRef(null);
  const inputOp1 = useRef(null);
  const inputOp2 = useRef(null);
  const inputOp3 = useRef(null);
  const inputOp4 = useRef(null);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleAddQuestion = async () => {
    // handle adding the question to the database or state
    // reset the inputs and close the dialog

    const test = [
      {
        question: inputQues.current.value,
        options: [
          inputOp1.current.value,
          inputOp2.current.value,
          inputOp3.current.value,
          inputOp4.current.value,
        ],
        answer: correctAnswer,
      },
    ];
    const obj = { test };
    console.log(test);
    try {
      const response = await axios.patch(
        `http://localhost:3333/AngelCode/Lessons/UpdateLesson/${lessonId}`,
        obj,
        { headers }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    inputQues.current.value = "";
    inputOp1.current.value = "";
    inputOp2.current.value = "";
    inputOp3.current.value = "";
    inputOp4.current.value = "";
    setCorrectAnswer("");
    onClose();
    handleCloseLesson();
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle className={classes.mainTextAddTest}>
          Add Multiple Choice Question
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your question for: // {lessonName} // lesson
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Question"
            fullWidth
            inputRef={inputQues}
            required
          />
          <DialogContentText>
            Now enter four options, and select the correct answer bellow
          </DialogContentText>
          <TextField
            margin="dense"
            label="Option 1"
            fullWidth
            required
            inputRef={inputOp1}
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Option 2"
            fullWidth
            required
            inputRef={inputOp2}
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Option 3"
            fullWidth
            inputRef={inputOp3}
            variant="standard"
            required
          />
          <TextField
            margin="dense"
            label="Option 4"
            fullWidth
            inputRef={inputOp4}
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
            Add Question
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
