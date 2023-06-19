import React from "react";
import classes from "../lessons.module.css";
import { AddOutlined } from "@mui/icons-material";
const Button = (props) => {
  return (
    <div className={classes.wrap}>
      <button className={classes.button} onClick={props.handleClickOpen}>
        <AddOutlined className={classes.icon} />
        ADD LESSON
      </button>
    </div>
  );
};

export default Button;
