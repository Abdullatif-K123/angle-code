import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import classes from "../home.module.css";
import Image from "next/image";
import img from "../../../assets/png/sorting.jpeg";
const Part6 = () => {
  return (
    <div className={classes.AlgoVisu}>
      <div className={classes.contentContainerPart6}>
        <h2>Algorithm Visulization</h2>
        <Link href="http://localhost:3001/">
          <Button variant="contained">Sorting Visualizations</Button>
        </Link>
      </div>
      <Image
        src={img}
        width={450}
        height={450}
        alt="img"
        className={classes.imgration}
        style={{ borderRadius: "50px", objectFit: "cover" }}
      />
    </div>
  );
};

export default Part6;
