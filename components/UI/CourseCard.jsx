import React, { useState, memo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import classes from "../Home/home.module.css";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
} from "@mui/material";
import { ArrowForwardIosOutlined } from "@mui/icons-material";

const CourseCard = (props) => {
  const router = useRouter();
  return (
    <Card
      className={classes.cardCourse}
      onClick={() => {
        router.push({
          pathname: `/courses/${props.courseId}`,
        });
      }}
    >
      <Image
        component="img"
        height={180}
        width={370}
        src={require(`../../../5theyear/img/${props.courseImage}`)}
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
        <Button
          size="small"
          endIcon={<ArrowForwardIosOutlined />}
          className={classes.cardButton}
        >
          Get Started
        </Button>
      </CardActions>
    </Card>
  );
};

export default memo(CourseCard);
