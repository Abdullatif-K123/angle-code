import React from "react";
import classes from "./home.module.css";
import Part1 from "./components/Part1";
import Part2 from "./components/Part2";
import Part4 from "./components/Part4";
import { useSelector } from "react-redux";
const MainSection = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className={classes.home}>
      <Part1 />
      <Part2 />
      <Part4 />
    </div>
  );
};

export default MainSection;
