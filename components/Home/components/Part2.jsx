import React from "react";
import classes from "../home.module.css";
import Cards from "./Cards";
import cplus from "../../../assets/icons/c++.png";
import javascript from "../../../assets/png/javascript.png";
import php from "../../../assets/png/php.png";
import cee from "../../../assets/png/cee.png";
import chash from "../../../assets/png/chash.png";
import python from "../../../assets/png/python.png";
import redux from "../../../assets/png/redux.png";
import ruby from "../../../assets/png/ruby.png";
import java from "../../../assets/png/java.png";
import react from "../../../assets/png/react.png";
import firebase from "../../../assets/png/firebase.png";
import vue from "../../../assets/png/vue.png";

const Part2 = () => {
  return (
    <div className={classes.part2Main}>
      <div className={classes.part2Info}>
        <h1>
          Choose what you want
          <br />
          to learn
        </h1>
        <p>
          Start learning Programming and Algorithm <br />
          and Stop wasting your time and money
        </p>
      </div>
      <div className={classes.part2ProCard}>
        <Cards language={"C++ Programming"} avatar={cplus} />
        <Cards language={"C Programming"} avatar={cee} />
        <Cards language={"Py Programming"} avatar={python} />
        <Cards language={"PHP Programming"} avatar={php} />
        <Cards language={"JS Programming"} avatar={javascript} />
        <Cards language={"C# Programming"} avatar={chash} />
        <Cards language={"Redux Terms & Tech"} avatar={redux} />
        <Cards language={"Ruby Programming"} avatar={ruby} />
        <Cards language={"Java Programming"} avatar={java} />
        <Cards language={"React Library "} avatar={react} />
        <Cards language={"Firebase Tech"} avatar={firebase} />
        <Cards language={"Vue Framework"} avatar={vue} />
      </div>
    </div>
  );
};

export default Part2;
