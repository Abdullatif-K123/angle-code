import React, { useEffect, useState } from "react";
import Image from "next/image";
import classes from "../home.module.css";
const DUMMY_TEXT = [
  "Interactive and amazing lessons",
  "Save Time and Money",
  "Build Your Course and Meetings",
];
const Part5 = () => {
  const [greenIndex, setGreenIndex] = useState(1);

  useEffect(() => {
    const toggle = setTimeout(() => {
      setGreenIndex((greenIndex + 1) % 3);
    }, [2000]);
    return () => {
      clearTimeout(toggle);
    };
  }, [greenIndex]);
  return (
    <div className={classes.part5MainSec}>
      <div className={classes.textPart5}>
        <h2>Angle Code is the best choice for you</h2>
        <ul className={classes.optionsPart5}>
          {DUMMY_TEXT.map((text, index) => {
            return (
              <li
                className={`${classes.texts} ${
                  greenIndex == index ? classes.greenText : null
                }`}
                key={index}
              >
                {text}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={classes.imagePart5}>
        <Image src="/image.png" alt="A sample image" width={500} height={500} />
      </div>
    </div>
  );
};

export default Part5;
