import React from "react";
import classes from "../overview.module.css";
import { Avatar } from "@mui/material";
import Image from "next/image";
const OverviewTable = ({ popularTeacher, lastCourse }) => {
  console.log(popularTeacher);
  console.log(lastCourse);

  if (popularTeacher) {
    popularTeacher.sort((a, b) => b.courseCount - a.courseCount);
    return (
      <div className={classes.viewTableMain}>
        {popularTeacher.map((teacher) => {
          return (
            <div className={classes.teacherPop} key={teacher._id}>
              <div className={classes.firstSec}>
                <Avatar
                  alt={teacher.first_name}
                  src={teacher.avatar}
                  className={classes.cardAvatar}
                />
                <div className={classes.teacherContent}>
                  <p>
                    {teacher.first_name} {teacher.last_name}
                  </p>
                  <p>Review</p>
                </div>
              </div>
              <p>{teacher.courseCount} Courses</p>
            </div>
          );
        })}
      </div>
    );
  }
  if (lastCourse) {
    return (
      <div className={classes.viewTableMain}>
        {lastCourse.map((course) => {
          return (
            <div className={classes.coursePop} key={course._id}>
              <div className={classes.firstSecs}>
                <Image
                  src={require(`../../../../../../AngleCode_Server/img/${
                    course.imageCover
                      ? course.imageCover
                      : "Course-64823685c2ba075f2c9f0423-1686258030491.png"
                  }`)}
                  width={105}
                  height={60}
                  style={{ borderRadius: "7px" }}
                />
                <p>{course.name}</p>
              </div>
              <div className={classes.secondSec}>
                <Avatar
                  alt={course.user.first_name}
                  src={course.user.avatar}
                  className={classes.cardAvatarsectwo}
                />
                <p>
                  {course.user.first_name} {course.user.last_name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default OverviewTable;
