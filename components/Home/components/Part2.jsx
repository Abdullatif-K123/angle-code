import React from "react";
import classes from "../home.module.css";
import Cards from "./Cards";
import cplus from "../../../assets/icons/c++.png";
const Part2 = () => {
  return (
    <div className={classes.part2Main}>
      <div className={classes.part2Info}>
        <h1>Choose what you want to learn</h1>
        <p>
          Start learning Programming and Algorithm <br />
          and Stop wasting your time and money
        </p>
      </div>
      <div className={classes.part2ProCard}>
        <Cards language={"C++ Programming"} avatar={cplus} />
        <Cards language={"C++ Programming"} avatar={cplus} />
        <Cards language={"C++ Programming"} avatar={cplus} />
        <Cards language={"C++ Programming"} avatar={cplus} />
        <Cards language={"C++ Programming"} avatar={cplus} />
        <Cards language={"C++ Programming"} avatar={cplus} />
        <Cards language={"C++ Programming"} avatar={cplus} />
        <Cards language={"C++ Programming"} avatar={cplus} />
        <Cards language={"C++ Programming"} avatar={cplus} />
      </div>
    </div>
  );
};

export default Part2;
