import React from "react";
import classes from "../overview.module.css";
import MovingOutlinedIcon from "@mui/icons-material/MovingOutlined";
const OverviewCards = ({ avatar, numUser, newUser, title, supTitle }) => {
  return (
    <div className={classes.cardMain}>
      <div className={classes.cardContent}>
        <p className={classes.cardNumber}>{title}</p>
        {avatar}
      </div>
      <div className={classes.cardAdding}>
        <p>{numUser}</p>
      </div>
      <p className={classes.cardBottom}>
        <span className={supTitle ? classes.contentRed : classes.contentGreen}>
          {supTitle ? "" : <MovingOutlinedIcon />}+{newUser}
        </span>{" "}
        Number of {supTitle ? supTitle : title}
      </p>
    </div>
  );
};

export default OverviewCards;
