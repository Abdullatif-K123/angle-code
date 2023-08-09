import React, { useEffect, useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import classes from "./dashboard.module.css";
import Overview from "./components/overview/Overview";
import { useSelector } from "react-redux";
import axios from "axios";
import DashboardLoader from "../loader/Dashboard";
const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const [selected, setSelected] = useState(1);
  const [usersNum, setUserNum] = useState([]);
  const [coursesNum, setCoursesNum] = useState([]);
  const [courseCreate, setCourseCreate] = useState([]);
  const [popularTeacher, setPopularTeacher] = useState([]);
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
        console.log(resCourseCreated.data.data);
        console.log(resPopularTeacher.data.data);
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
        <DashboardLoader />
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
      {selected == 3 ? <h1>All Course</h1> : null}
      {selected == 4 ? <h1>Course Category</h1> : null}
      {selected == 5 ? <h1>Single Category</h1> : null}
      {selected == 6 ? <h1>Single Course</h1> : null}
      {selected == 7 ? <h1>Instructor</h1> : null}
      {selected == 8 ? <h1>Students</h1> : null}
      {selected == 9 ? <h1>Add Instructor</h1> : null}
      {selected == 10 ? <h1>Accounts</h1> : null}
      {selected == 11 ? <h1>Mails</h1> : null}
      {selected == 12 ? <h1>Settings</h1> : null}
    </div>
  );
};

export default Dashboard;
