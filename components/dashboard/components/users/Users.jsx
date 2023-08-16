import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import UserCard from "./components/UserCard";
import classes from "./users.module.css";
const Users = ({ student }) => {
  const [inputKey, setInputKey] = useState("");

  const [showCourse, setShowCourse] = useState(student);
  useEffect(() => {
    const filtering = student.filter((course) => {
      return course.first_name.toLowerCase().includes(inputKey);
    });

    setShowCourse(filtering);
  }, [inputKey]);
  return (
    <div className={classes.userInstructorMain}>
      <h2>
        Students <span>({student.length})</span>
      </h2>
      <div className={classes.searchSection}>
        <input
          type="text"
          placeholder="Search Students..."
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
      <div className={classes.usersContainer}>
        {showCourse.map((inst) => {
          return (
            <UserCard key={inst._id} title={"Course Attendens"} user={inst} />
          );
        })}
      </div>
    </div>
  );
};

export default Users;
