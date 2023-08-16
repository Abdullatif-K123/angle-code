import React from "react";
import classes from "../courses.module.css";
import Image from "next/image";
import { Avatar } from "@mui/material";
const Table = ({
  img,
  lesson,
  name,
  userFirstName,
  userLastName,
  userImg,
  handleApproved,
  idCourse,
  handleRegected,
  accepted,
  handleChangeStatus,
}) => {
  return (
    <div className={classes.tableView}>
      <div className={classes.courseSection}>
        <Image
          src={require(`../../../../../../AngleCode_Server/img/${
            img ? img : "Course-64823685c2ba075f2c9f0423-1686258030491.png"
          }`)}
          width={114}
          height={71}
          style={{ borderRadius: "7px" }}
        />
        <div className={classes.contentCourse}>
          <p>Course name: {name}</p>
          <p>Number of lessons: {lesson}</p>
        </div>
      </div>
      <div className={classes.teacher}>
        <Avatar
          alt={userFirstName}
          src={userImg}
          className={classes.cardAvatar}
        />
        <p>
          {userFirstName} {userLastName}
        </p>
      </div>
      <div className={classes.status}>
        <p>{accepted ? "Approved" : "Pending"}</p>
        <div className={`${accepted ? classes.accept : classes.pending}`}></div>
      </div>
      {accepted ? (
        <button
          className={classes.changeStatus}
          onClick={() => {
            handleChangeStatus(idCourse);
          }}
        >
          Change Status
        </button>
      ) : (
        <div className={classes.action}>
          <button
            className={classes.reject}
            onClick={() => {
              handleRegected(idCourse);
            }}
          >
            Reject
          </button>
          <button
            className={classes.approve}
            onClick={() => {
              handleApproved(idCourse);
            }}
          >
            Approved
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
