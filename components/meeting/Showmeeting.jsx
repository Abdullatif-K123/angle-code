import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Stack, Typography } from "@mui/material";
import {  useSelector } from "react-redux";
import Image from "next/image";
import ImageGrid from "../loader/CourseLoader";
import parser from "html-react-parser";
import classes from "./meeting.module.css";
import EventIcon from "@mui/icons-material/Event";
import LinkIcon from "@mui/icons-material/Link";
import { useSnackbar } from "notistack";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import AvTimerIcon from "@mui/icons-material/AvTimer";
const Showmeeting = (props) => {

    const user = useSelector((state) => state.user.user);
    const [data, setData] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const [timerWaiting, setTimerWaiting] = useState(false);
    var headers = {
        Authorization: `Bearer ${user.token}`,
    };
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `http://localhost:3333/AngelCode/Meetings/${props.meetingId}`,
                
            );
            const data = response.data.data;
            console.log(data);
            setData(data);
            fireWaitingTimer(5000);
        }
        fetchData();
    }, []);

    const fireWaitingTimer = (time) => {
        setTimerWaiting(true);
        setTimeout(
            () => {
                setTimerWaiting(false);
            },
            time ? time : 3000
        );
    };
    if (!data || timerWaiting) {
        return (
            <div className={classes.courseLoader}>
                <ImageGrid />
            </div>
        );
    }

     const handleSubmit = async () => {
        console.log("join");
        const obj = {
            userId: user.userId,
          };
        try {
            const response = await axios.patch(
                `http://127.0.0.1:3333/AngelCode/Meetings/joinMeeting/${props.meetingId}`,
                obj,
                {headers}
            );
            console.log("done");
            console.log( response.data.data);
            enqueueSnackbar("Good attendance!!!", {
                variant: "success",
              });
        } catch (error) {
            console.error(error);
        } 
     };

    let date = new Date(data.startDate);

    return (
        <>
            <div className="bg-white">
                <Container className="py-5">
                    <Typography className="fw-bolder fs-1">
                        {data.title} {" ("}
                        <EventIcon sx={{ fontSize: 30 }} />{" "}
                        {`${date.getDate()}/${
                            date.getUTCMonth() + 1
                        }/${date.getFullYear()}`}
                        {") "}
                    </Typography>
                    <Typography className="fw-bolder text-secondary fs-5"> 
                        {data.userCreater.avatar ? (
                            <Image
                                className={classes.cardAvatar}
                                style={{
                                    borderRadius: "50%",
                                    width: 30,
                                    height: 30,
                                }}
                                src={require(`../../../AngleCode_Server/img/${data.userCreater.avatar}`)}
                            />
                        ) : (
                            <AccountCircleSharpIcon fontSize="large" className="text-secondary" />
                        )}{" "}
                        {data.userCreater.first_name}{" "}
                        {data.userCreater.last_name}
                    </Typography>
                    <Typography className="fw-bolder text-secondary fs-3">
                        <AvTimerIcon sx={{ fontSize: 30 }} /> {data.duration}{" "}
                        min
                    </Typography>
                </Container>
            </div>
            <Container className="my-5">
                <Image
                    style={{ width: "100", height: "100" }}
                    src={require(`../../../AngleCode_Server/img/${data.image}`)}
                    alt={"meetingimage"}
                    className="mb-5"
                />
                <Typography component={"div"} className="mb-5">
                    <Typography className="fw-bold fs-4">Details:</Typography>
                {data.content ? <Typography className="fs-5"> {parser(data.content)}</Typography>: ""}
                </Typography>
                <Typography component={"div"} className="text-primary mb-5">
                    <LinkIcon sx={{ fontSize: 35 }} />{" "}
                    <Typography
                        component={"a"}
                        className="fs-5 text-decoration-none text-primary"

                    >
                        {data.link}
                    </Typography>
                </Typography>
                <br/>
                <Typography className="fw-bold fs-4 mb-1">
                    Attendees {`(${data.users.length})`}
                </Typography>
                <Stack className="mb-5" flexWrap={"wrap"} direction={"row"} gap={2}>
                    {/* map */}
                    {data.users?.map((user, i) => (
                        <Stack
                            key={i}
                            sx={{ width: 150, bgcolor: "#fff", p: 2 }}
                            justifyContent={"center"}
                            alignItems={"center"}
                            rowGap={1}
                        >
                            {user.avatar ? (
                                <Image
                                    className={classes.cardAvatar}
                                    style={{
                                        borderRadius: "50%",
                                        width: 40,
                                        height: 40,
                                    }}
                                    src={require(`../../../AngleCode_Server/img/${user.avatar}`)}
                                />
                            ) : (
                                <AccountCircleSharpIcon fontSize="large" className="text-secondary" />
                            )}
                            <Typography className="fs-5 text-decoration-none text-dark">
                                {user.first_name}
                            </Typography>
                            <Typography className="fs-5 text-decoration-none text-dark">
                                {user.last_name}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
                <Button variant="contained" onClick={handleSubmit} >Attend</Button>
            </Container>
        </>
    );
};

export default Showmeeting;
