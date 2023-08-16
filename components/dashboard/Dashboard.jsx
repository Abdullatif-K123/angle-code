import React, { useEffect, useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import classes from "./dashboard.module.css";
import Overview from "./components/overview/Overview";
import Users from "./components/users/Users";
import Instuctor from "./components/users/Instuctor";
import ApproveCourse from "./components/courses/ApproveCourse";
import { useSelector } from "react-redux";
import axios from "axios";
import DashboardLoader from "../loader/Dashboard";
import AllCourses from "./components/courses/AllCourses";
const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const [selected, setSelected] = useState(1);
  const [usersNum, setUserNum] = useState([]);
  const [coursesNum, setCoursesNum] = useState([]);
  const [courseCreate, setCourseCreate] = useState([]);
  const [popularTeacher, setPopularTeacher] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [student, setStudent] = useState([]);

  //Creating headers for user super admin
  var headers = {
    Authorization: `Bearer ${user.token}`,
  };
  console.log(headers);
  useEffect(() => {
    async function fetchData() {
      try {
        const responseCount = await axios.get(
          "http://localhost:3333/AngelCode/users/UsersCount",
          { headers }
        );
        const resCourseCount = await axios.get(
          "http://localhost:3333/AngelCode/Courses/getCoursesCount",
          { headers }
        );
        const resCourseCreated = await axios.get(
          "http://localhost:3333/AngelCode/Courses/getLastCoursesCreated",
          { headers }
        );
        const resPopularTeacher = await axios.get(
          "http://localhost:3333/AngelCode/users/favUsers",
          { headers }
        );
        const userTeacher = await axios.get(
          "http://localhost:3333/AngelCode/users/getUsersDet",
          { headers }
        );

        console.log("This is the teacher and user");
        console.log(userTeacher.data);
        setTeacher(userTeacher.data.data);
        setStudent(userTeacher.data.users);
        setPopularTeacher(resPopularTeacher.data.data);
        setCourseCreate(resCourseCreated.data.data);
        setCoursesNum(resCourseCount.data.data);
        setUserNum(responseCount.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);
  const changeSelected = (info) => {
    setSelected(info);
  };
  if (!usersNum.length || !coursesNum.length) {
    return (
      <div className={classes.dashboard}>
        <Sidebar changeSelected={changeSelected} />
        <div style={{ marginLeft: "17%" }}>
          <DashboardLoader />
        </div>
      </div>
    );
  }
  return (
    <div className={classes.dashboard}>
      <Sidebar changeSelected={changeSelected} />
      {selected == 1 ? (
        <Overview
          usersNum={usersNum}
          coursesNum={coursesNum}
          lastCourse={courseCreate}
          popularTeacher={popularTeacher}
        />
      ) : null}
      {selected == 2 ? <h1>Analytics</h1> : null}
      {selected == 3 ? <AllCourses /> : null}
      {selected == 4 ? <ApproveCourse /> : null}
      {selected == 5 ? <h1>Single Cours</h1> : null}
      {selected == 6 ? <h1>Single Course</h1> : null}
      {selected == 7 ? <Instuctor teacher={teacher} /> : null}
      {selected == 8 ? <Users student={student} /> : null}
      {selected == 81 ? <h1>Become a teacher</h1> : null}
      {selected == 9 ? <h1>Add Instructor</h1> : null}
      {selected == 10 ? <h1>Accounts</h1> : null}
      {selected == 11 ? <h1>Mails</h1> : null}
      {selected == 12 ? <h1>Settings</h1> : null}
    </div>
  );
};

export default Dashboard;
