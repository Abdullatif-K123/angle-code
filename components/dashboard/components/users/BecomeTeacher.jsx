import React, { useEffect, useState } from "react";
import classes from "./users.module.css";
import axios from "axios";
import Image from "next/image";
import { useSelector } from "react-redux";
const BecomeTeacher = () => {
  const user = useSelector((state) => state.user.user);
  var headers = {
    Authorization: `Bearer ${user.token}`,
  };

  const handleRegected = async (id) => {
    setBeTeacher((courses) => {
      const newCourse = courses.filter((course) => course._id !== id);
      return newCourse;
    });
  };
  const handleApproved = async (id) => {
    try {
      const resCourseAccpeted = await axios.patch(
        `http://localhost:3333/AngelCode/users/approveTeacher/${id}`,
        {},
        { headers }
      );
      console.log(resCourseAccpeted);
      setBeTeacher((courses) => {
        const newCourses = courses.filter((course) => course._id !== id);
        return newCourses;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [beTeaher, setBeTeacher] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const becomeTeacher = await axios.get(
          "http://localhost:3333/AngelCode/users/becomeTeacherRequests",
          { headers }
        );
        console.log(becomeTeacher);
        setBeTeacher(becomeTeacher.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={classes.becomeMain}>
      <h2>Pending users Becoming Teacher</h2>
      {beTeaher.map((teacher) => {
        return (
          <div key={teacher._id} className={classes.teacherMain}>
            <div className={classes.personInfo}>
              <p>{teacher.message}</p>
              <p>his Id: {teacher.userid}</p>
            </div>
            <Image
              className={classes.userPof}
              style={{
                marginRight: "8px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
              width={"103"}
              height={"103"}
              src={require(`../../../../../AngleCode_Server/img/${teacher.images[0]}`)}
            />
            <div className={classes.action}>
              <button
                className={classes.reject}
                onClick={() => {
                  handleRegected(teacher._id);
                }}
              >
                Reject
              </button>
              <button
                className={classes.approve}
                onClick={() => {
                  handleApproved(teacher._id);
                }}
              >
                Approved
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BecomeTeacher;
