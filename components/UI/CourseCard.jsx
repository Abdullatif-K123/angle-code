import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

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
      className={props.classes.cardCourse}
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
      <CardContent className={props.classes.cardcontent}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          className={props.classes.cardAuthor}
        >
          <Avatar
            alt={props.courseAuthor}
            src={props.authorAvatar}
            className={props.classes.cardAvatar}
          />
          {props.courseAuthor}
        </Typography>
        <Typography
          variant="h4"
          color="text.secondary"
          className={props.classes.cardText}
        >
          {props.courseName}
        </Typography>
      </CardContent>
      <CardActions className={props.classes.cardAction}>
        <Button
          size="small"
          endIcon={<ArrowForwardIosOutlined />}
          className={props.classes.cardButton}
        >
          Get Started
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
