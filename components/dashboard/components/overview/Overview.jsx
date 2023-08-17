import React, { useEffect, useRef } from "react";
import classes from "./overview.module.css";
import OverviewCards from "./components/OverviewCards";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import * as echarts from "echarts";
import OverviewTable from "./components/OverviewTable";
const Overview = ({ usersNum, coursesNum, lastCourse, popularTeacher }) => {
  const chartRef = useRef(null);
  const lineRef = useRef(null);
  const optionline = {
    title: [
      {
        text: "Traffic throw the weeks",
      },
    ],
    tooltip: {
      trigger: "item",
    },
    xAxis: {
      type: "category",
      data: ["Sat", "Sun", "Mon", "Tue", "Wed", "Fri", "Thu"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [
          12,
          {
            value: 20,
            itemStyle: {
              color: "#a90000",
            },
          },
          15,
          8,
          7,
          11,
          13,
        ],
        type: "bar",
      },
    ],
  };
  const options = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: coursesNum[1], name: "Visible Course" },
          { value: coursesNum[2], name: "Hidden Course" },
          { value: coursesNum[2], name: "Pending Course" },
        ],
      },
    ],
  };

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    chart.setOption(options);
    const chartline = echarts.init(lineRef.current);
    chartline.setOption(optionline);
    return () => {
      chartline.dispose();
      chart.dispose();
    };
  }, [options, optionline]);

  console.log(usersNum);
  console.log(coursesNum);
  return (
    <div className={classes.overViewMain}>
      <h2>Dashboard</h2>
      <div className={classes.overViewCard}>
        <OverviewCards
          avatar={
            <PeopleAltOutlinedIcon
              style={{ color: "#8664fe", width: "30px", height: "30px" }}
            />
          }
          numUser={usersNum[0] - usersNum[3]}
          newUser={usersNum[0] - 10}
          title={"Total Users"}
        />
        <OverviewCards
          avatar={
            <GroupAddOutlinedIcon
              style={{ color: "#8664fe", width: "30px", height: "30px" }}
            />
          }
          numUser={usersNum[1]}
          newUser={usersNum[1] - 3}
          title={"Students"}
        />
        <OverviewCards
          avatar={
            <PersonOutlineOutlinedIcon
              style={{ color: "#8664fe", width: "30px", height: "30px" }}
            />
          }
          numUser={usersNum[2]}
          newUser={usersNum[2] - 2}
          title={"Instructor"}
        />
        <OverviewCards
          avatar={
            <MenuBookOutlinedIcon
              style={{ color: "#8664fe", width: "30px", height: "30px" }}
            />
          }
          numUser={coursesNum[0]}
          newUser={coursesNum[3]}
          title={"Courses"}
          supTitle={"pending"}
        />
      </div>
      <div className={classes.chartSection}>
        <div ref={lineRef} style={{ width: "60%", height: "500px" }} />
        <div ref={chartRef} style={{ width: "40%", height: "400px" }} />
      </div>
      <div className={classes.tablesSectoin}>
        <div className={classes.teacher}>
          <h2>Popular Instructor</h2>
          <OverviewTable popularTeacher={popularTeacher} />
        </div>
        <div className={classes.courses}>
          <h2>Last Courses</h2>
          <OverviewTable lastCourse={lastCourse} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
