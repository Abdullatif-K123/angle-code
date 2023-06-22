import React from "react";
import homeImg from "../../../assets/svg/homesvg.svg";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import classes from "../home.module.css";
import Typewriter from "./TypeWriter";
const Part1 = () => {
  const router = useRouter();
  return (
    <div className={classes.homePart1}>
      <div className={classes.part1Info}>
        <h1>
          Learn Programming <br /> for Free
        </h1>
        <p>
          Learn to program with our friendly intractive platform <br />
          <span>explore Courses & tutorials.</span> Read tutorials, try
          examples,
          <br /> write code and learn to program.{" "}
        </p>
        <div className={classes.typeWriter}>
          <Typewriter />
        </div>
        <br />
        <Button
          onClick={() => {
            router.push("/courses/course/all");
          }}
          variant="contained"
        >
          Explore all courses
        </Button>
      </div>

      <div className={classes.imgSection}>
        <Image src={homeImg} alt="Home right Image" width={790} height={700} />
      </div>
    </div>
  );
};

export default Part1;
