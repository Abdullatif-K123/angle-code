import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const EditCourse = (props) => {
  const user = useSelector((state) => state.user.user);
  var headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.token}`,
  };
  useEffect(() => {
    async function fetchData() {
      console.log(props.courseId);
      const response = await axios.get(
        `http://localhost:3333/AngelCode/Courses/${props.courseId}`,
        { headers }
      );
      const data = response.data;
      console.log(data);
    }
    fetchData();
  }, []);
  return <div>EditCourse</div>;
};

export default EditCourse;
