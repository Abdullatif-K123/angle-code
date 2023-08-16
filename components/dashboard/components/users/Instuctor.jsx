import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import UserCard from "./components/UserCard";
import classes from "./users.module.css";
const Instuctor = ({ teacher }) => {
  const [inputKey, setInputKey] = useState("");

  const [showCourse, setShowCourse] = useState(teacher);
  useEffect(() => {
    const filtering = teacher.filter((course) => {
      return course.first_name.toLowerCase().includes(inputKey);
    });

    setShowCourse(filtering);
  }, [inputKey]); 
  console.log(teacher);
  return (
    <div className={classes.userInstructorMain}>
      <h2>
        Instructor <span>({teacher.length})</span>
      </h2>
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
      <div className={classes.usersContainer}>
        {showCourse.map((inst) => {
          return <UserCard key={inst._id} user={inst} />;
        })}
      </div>
    </div>
  );
};

export default Instuctor;
