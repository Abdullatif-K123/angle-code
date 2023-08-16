import React from "react";
import Image from "next/image";
import { CardActionArea, Grid } from "@mui/material";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import EventIcon from "@mui/icons-material/Event";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import { useRouter } from "next/router";
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button
} from "@mui/material";
import classes from "../meeting/meeting.module.css";

const ITEM_HEIGHT = 48;

const Meetingcard = (props) => {
    let date = new Date(props.startDate);
    const router = useRouter();
    return (
        <>
            <Card
                className="shadow"
                sx={{
                    width: { xs: 300, sm: 370 },
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: { xs: "column", lg: "row-reverse" },
                }}
            >
                <CardActionArea>
                    <CardContent>
                        <Grid
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Typography
                                className="fw-bold text-center text-primary"
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                {props.title}
                            </Typography>
                        </Grid>
                        <hr />
                        <Typography
                            gutterBottom
                            className="text-success"
                            variant="div"
                            component="div"
                        >
                            {props.useravatar ? (
                                <Image
                                    className={classes.cardAvatar}
                                    style={{ borderRadius: "50%" }}
                                    src={require(`../../../AngleCode_Server/img/${props.useravatar}`)}
                                />
                            ) : (
                                <AccountCircleSharpIcon fontSize="large" className="text-secondary"/>
                            )}{" "} 
                            {props.usercreater}
                        </Typography>
                        <Typography
                            gutterBottom
                            className="text-dark"
                            variant="div"
                            component="div"
                        >
                            <EventIcon /> Start Date:{" "}
                            {`${date.getDate()}/${
                                date.getUTCMonth() + 1
                            }/${date.getFullYear()}       
                        `}
                        </Typography>
                        <Typography
                            gutterBottom
                            className="text-dark"
                            variant="div"
                            component="div"
                        >
                            <AvTimerIcon /> Duration: {props.duration} min
                        </Typography>
                        <CardActions className={classes.cardAction}>
                            <Button
                                size="small"
                                className={classes.cardButton}
                                onClick={() => {
                                    router.push(
                                        `/meeting/showmeeting/${props.meetingId}`
                                    );
                                }}
                            >
                                details
                            </Button>
                        </CardActions>
                        <Typography
                            gutterBottom
                            variant="div"
                            component="div"
                            className={classes.cardAuthor}
                        >
                            {props.users?.map((user, i) => (
                                <div
                                key={i}
                                >
                                 {user.avatar ? (
                                    <Image
                                        className={classes.cardAvatar}
                                        style={{ borderRadius: "50%" }}
                                        src={require(`../../../AngleCode_Server/img/${user.avatar}`)}
                                    />
                                ) : (  
                                   <AccountCircleSharpIcon fontSize="large" className="text-secondary"/>
                                )}
                            </div>
                            ))}+{props.users.length}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
};

export default Meetingcard;
