import React from "react";
import classes from "../home.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Chip from "@mui/material/Chip";
const Cards = ({ language, avatar }) => {
  const router = useRouter();
  const courseName = language.split(" ")[0];
  return (
    <div
      className={classes.cardLink}
      onClick={() => {
        router.push({
          pathname: `/courses/course/all`,
          query: { cName: courseName.toLowerCase() },
        });
      }}
    >
      <div className={classes.cards}>
        <Image
          src={avatar}
          alt="programming language avatar"
          width={36}
          height={36}
        />
        <h2>{language}</h2>
      </div>
    </div>
  );
};

export default Cards;
