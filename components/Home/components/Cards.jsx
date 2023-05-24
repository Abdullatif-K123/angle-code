import React from "react";
import classes from "../home.module.css";
import Link from "next/link";
import Image from "next/image";
const Cards = ({ language, avatar }) => {
  return (
    <Link href={"/courses"} className={classes.cardLink}>
      <div className={classes.cards}>
        <Image
          src={avatar}
          alt="programming language avatar"
          width={36}
          height={36}
        />
        <h2>{language}</h2>
      </div>
    </Link>
  );
};

export default Cards;
