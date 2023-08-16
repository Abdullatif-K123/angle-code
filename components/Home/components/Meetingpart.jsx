import React, { useEffect, useState } from "react";
import axios from "axios";
import Meetingcard from "../../UI/Meetingcard";
import classes from "../home.module.css";
import { Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { useRouter } from "next/router";
const Meetingpart = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:3333/AngelCode/Meetings/All`
      );
      const data = response.data.data;
      console.log(data);
      const dataSlice = data.slice(2, 5);
      setData(dataSlice);
    }
    fetchData();
  }, []);
  return (
    <div className={classes.P3MainSection}>
      <div className={classes.P3MainText}>
        <h2>join</h2>
      </div>
      <div className={classes.coursesP3}>
        {data.map((m) => {
          if (m.userCreater) {
            var authorName =
              m.userCreater.first_name + " " + m.userCreater.last_name;
            var useravatar = m.userCreater.avatar;
            console.log(m.userCreater);
            return (
              <Meetingcard
                key={m._id}
                meetingId={m._id}
                title={m.title}
                link={m.link}
                startDate={m.startDate}
                duration={m.duration}
                usercreater={authorName}
                meetingImage={m.image}
                users={m.users}
                useravatar={useravatar}
              />
            );
          }
        })}
      </div>
      <Button
        variant="contained"
        color="primary"
        endIcon={<ArrowForward />}
        onClick={() => {
          router.push("/meeting/All");
        }}
      >
        Browse all meeting
      </Button>
    </div>
  );
};

export default Meetingpart;
