import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useRouter } from "next/router";
import {
  PlayLessonOutlined,
  TextSnippetOutlined,
  DeleteForeverRounded,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import classes from "../lessons.module.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const OpenLesson = (props) => {
  const router = useRouter();
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
      >
        <DialogTitle id="alert-dialog-title">
          Dialog Contorl for:{" "}
          <span className={classes.lessonTitle}>{props.lessonName}</span> lesson
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Choose what you want to do in this lesson
          </DialogContentText>
        </DialogContent>

        <List>
          <ListItem
            button
            onClick={() => {
              router.push({
                pathname: `/mycourses/edit/lesson/${props.lessonId}`,
                query: { lessonName: props.lessonName },
              });
            }}
          >
            <PlayLessonOutlined />
            <ListItemText
              primary="add & update Content of this lesson"
              secondary="ADD CONTENT"
            />
          </ListItem>
          <Divider />
          <ListItem button onClick={props.handleClickOpenTest}>
            <TextSnippetOutlined />
            <ListItemText
              primary="add & Update test of this lesson"
              secondary="ADD&UPDATE"
            />
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={props.handleClickOpen}
            className={classes.DeleteDialgoOpen}
          >
            <DeleteForeverRounded />
            <ListItemText
              className={classes.secondary}
              primary="Delete this lesson with the test "
              secondary={
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ color: "red" }}
                >
                  DELETE
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
};

export default OpenLesson;
