import React, { useEffect, useState } from "react";
import classes from "./browse.module.css";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import CreditCardOffOutlinedIcon from "@mui/icons-material/CreditCardOffOutlined";
import CourseCard from "../UI/CourseCard";
import Notfound from "./components/Notfound";
const BrowseAll = () => {
  const courses = useSelector((state) => state.course.courses);

  const [selectedSec, setSelectedSec] = useState(1);
  const [inputKey, setInputKey] = useState("");
  const [showCourse, setShowCourse] = useState(courses);
  const handleSectionClick = (id) => {
    setSelectedSec(id);
    if (id === 1) {
      setShowCourse(courses);
    }
    if (id === 3) {
      setShowCourse(courses.slice(-6).reverse());
    }
    if (id === 4) {
      setShowCourse(courses.slice(-8));
    }
  };
  useEffect(() => {
    if (inputKey) {
      if (selectedSec === 1) {
        const filtering = courses.filter((course) => {
          return course.name.toLowerCase().includes(inputKey);
        });
        console.log(filtering);
        setShowCourse(filtering);
      } else if (selectedSec === 3) {
        const filtering = courses.slice(-6).filter((course) => {
          return course.name.toLowerCase().includes(inputKey);
        });
        console.log(filtering);
        setShowCourse(filtering);
      }
    } else {
      if (selectedSec === 1) setShowCourse(courses);
      else if (selectedSec === 3) setShowCourse(courses.slice(-6).reverse());
    }
  }, [inputKey]);

  return (
    <div className={classes.BrowseMain}>
      <div className={classes.headMain}>
        <h1>Learn Something new!</h1>
        <div className={classes.searchSection}>
          <input
            type="text"
            placeholder="Search Courses..."
            value={inputKey}
            onChange={(e) => {
              setInputKey(e.target.value);
            }}
          />
          <div className={classes.searchIcon}>
            <SearchIcon />
            <p>Search</p>
          </div>
        </div>
        <div className={classes.multiChoices}>
          <div
            className={`${classes.section} ${
              selectedSec == 1 ? classes.choiceCurrent : null
            }`}
            onClick={() => {
              handleSectionClick(1);
            }}
          >
            <LanguageIcon />
            <p>Browse All</p>
          </div>
          <div
            className={`${classes.section} ${
              selectedSec == 2 ? classes.choiceCurrent : null
            }`}
            onClick={() => {
              handleSectionClick(2);
            }}
          >
            <GradeOutlinedIcon />
            <p>Your Course</p>
          </div>
          <div
            className={`${classes.section} ${
              selectedSec == 3 ? classes.choiceCurrent : null
            }`}
            onClick={() => {
              handleSectionClick(3);
            }}
          >
            <AutoAwesomeOutlinedIcon />
            <p>New</p>
          </div>
          <div
            className={`${classes.section} ${
              selectedSec == 4 ? classes.choiceCurrent : null
            }`}
            onClick={() => {
              handleSectionClick(4);
            }}
          >
            <CreditCardOffOutlinedIcon />
            <p>Free</p>
          </div>
        </div>
      </div>
      <div className={classes.courseCard}>
        {!showCourse.length ? (
          <Notfound />
        ) : (
          showCourse.map((course) => {
            if (course.user) {
              var authorName =
                course.user.first_name + " " + course.user.last_name;
              return (
                <CourseCard
                  key={course._id}
                  courseId={course._id}
                  courseName={course.name}
                  courseImage={
                    course.imageCover[0] != "C"
                      ? "Course-64760ad3ea9ad97cc435241b-1685873555144.jpeg"
                      : course.imageCover
                  }
                  courseAuthor={authorName}
                  authorAvatar={course.userAvatar}
                  classes={classes}
                />
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default BrowseAll;
