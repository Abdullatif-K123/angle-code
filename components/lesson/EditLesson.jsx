import React, { useState, useEffect } from "react";
import TipTap from "./EditorPage";
import { TextField } from "@mui/material";
import classes from "./lessons.module.css";
import parser from "html-react-parser";
import Button from "@mui/material/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
const EditLesson = ({ lessonName, lessonId }) => {
  const user = useSelector((state) => state.user.user);
  var headers = {
    Authorization: `Bearer ${user.token}`,
  };
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [desc, setDesc] = useState("");
  const [inputValue, setInputValue] = useState(lessonName);

  useEffect(() => {
    async function fetchData() {
      const lessonData = await axios.get(
        `http://localhost:3333/AngelCode/Lessons/Lesson/${lessonId}`,
        { headers }
      );
      const data = lessonData.data;
      console.log(data.data.lesson);
      if (data.data.lesson.content) setDesc(data.data.lesson.content);
      else setDesc("Build your own lesson here");
    }
    fetchData();
  }, []);
  console.log(desc);
  const handleClickSubmit = async () => {
    const obj = {
      title: inputValue,
      content: desc,
    };
    console.log(obj);
    enqueueSnackbar("Sending updating info for this course", {
      variant: "info",
    });
    try {
      const response = await axios.patch(
        `http://localhost:3333/AngelCode/Lessons/UpdateLesson/${lessonId}`,
        obj,
        { headers }
      );
      console.log(response.data);
      enqueueSnackbar("Congratulations brother you successed!!!", {
        variant: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.mainEditLesson}>
      <TextField
        id="outlined-basic"
        label="Lesson_Title"
        variant="outlined"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        className={classes.lessonNameInput}
      />
      <p>Write your content here with Rich text Editor</p>

      {desc.length < 1 ? (
        <p>loading....</p>
      ) : (
        <TipTap setDesc={setDesc} desc={desc} />
      )}

      <div>{parser(desc)}</div>
      <div className={classes.buttonLessonEdit}>
        <Button className={classes.buttonHoverover} onClick={handleClickSubmit}>
          Update
        </Button>
        <Button
          className={classes.buttonCancelHover}
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default EditLesson;
