import React from "react";
import classes from "../browse.module.css";
import Image from "next/image";
import NotFound from "../../../assets/png/notFoundCourse.png";
const Notfound = () => {
  return (
    <div className={classes.notFound}>
      <Image src={NotFound} alt="My Image" width={400} height={350} />
      <h3>Could not find the course you were looking for?</h3>
      <p>Try searching again with a different keyword</p>
    </div>
  );
};

export default Notfound;
