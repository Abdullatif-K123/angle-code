import React, { useState, useEffect } from "react";
import TipTap from "./EditorPage";
import { TextField } from "@mui/material";
import classes from "./meeting.module.css";
import parser from "html-react-parser";
import Button from "@mui/material/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
const Editcontent = ({ meetingId }) => {
  const user = useSelector((state) => state.user.user);
  var headers = {
    Authorization: `Bearer ${user.token}`,
  };
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [desc, setDesc] = useState("");
  useEffect(() => {
    async function fetchData() {
      const meetingData = await axios.get(
        `http://localhost:3333/AngelCode/Meetings/${meetingId}`,
        { headers }
      );
      const data = meetingData.data;
      console.log(data);
      if (data.data.content) setDesc(data.data.content);
      else setDesc("Write meeting content here");
    }
    fetchData();
  }, []);
  console.log(desc);
  const handleClickSubmit = async () => {
    const obj = {
      content: desc,
    };
    console.log(obj);
    enqueueSnackbar("Sending updating content for this meeting", {
      variant: "info",
    });
    try {
      const response = await axios.patch(
        `http://localhost:3333/AngelCode/Meetings/updateMeeting/${meetingId}`,
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

export default Editcontent;
