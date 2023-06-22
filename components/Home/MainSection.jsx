import React, { useEffect, useState } from "react";
import classes from "./home.module.css";
import Part1 from "./components/Part1";
import Part2 from "./components/Part2";
import Part3 from "./components/Part3";
import Part4 from "./components/Part4";
import Part5 from "./components/Part5";
import { useSelector } from "react-redux";
import HeadBodyGrid from "../loader/HomeLoader";
import Preloader from "../loader/Preloader";
const MainSection = () => {
  const user = useSelector((state) => state.user);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);
  if (loader) {
    return (
      <div className={classes.homeLoader}>
        <Preloader load={loader} />
      </div>
    );
  }
  console.log(user);
  return (
    <div className={classes.home}>
      <Part1 />
      <Part2 />
      {/* <Part5 /> */}
      <Part3 />
      <Part4 />
    </div>
  );
};

export default MainSection;
