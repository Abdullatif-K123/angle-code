import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import EditingCard from "./EditingCard";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { ArrowForwardIosOutlined, EditNoteOutlined } from "@mui/icons-material";
import classes from "../courses.module.css";
const CourseCard = (props) => {
  const router = useRouter();
  return (
    <Box boxShadow={2} className={classes.card}>
      <Card className={classes.cardCourse}>
        <Image
          component="img"
          height={200}
          width={370}
          src={require(`../../../../AngleCode_Server/img/${props.courseImage}`)}
          alt="courseImage"
        />
        <CardContent className={classes.cardcontent}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            className={classes.cardAuthor}
          >
            <Avatar
              alt={props.courseAuthor}
              src={props.authorAvatar}
              className={classes.cardAvatar}
            />
            {props.courseAuthor}
          </Typography>
          <Typography
            variant="h4"
            color="text.secondary"
            className={classes.cardText}
          >
            {props.courseName}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardAction}>
          {props.role === "admin" && (
            <EditingCard
              courseId={props.courseId}
              userToken={props.userToken}
              handleDelete={props.handleDelete}
              timerWaiting={props.timerWaiting}
              courseName={props.courseName}
              updateCourse={props.updateCourse}
            />
          )}
          <Button
            size="small"
            endIcon={<ArrowForwardIosOutlined />}
            className={classes.cardButton}
            onClick={() => {
              router.push(`/courses/${props.courseId}`);
            }}
          >
            Explore More
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CourseCard;
