import React from "react";
import classes from "./loader.module.css";
function Preload(props) {
  return (
    <div
      className={
        props.load ? `${classes.preloader}` : `${classes.preloaderNone}`
      }
    >
      <div className={classes.preContainer}>
        <svg viewBox="0 0 100 100">
          <defs>
            <filter className={classes.shadow}>
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="1.5"
                floodColor=" rgba(37, 38, 94, 0.87)"
              />
            </filter>
          </defs>
          <circle
            className={classes.spinner}
            style={{
              fill: "transparent",
              stroke: "#0083b0",
              strokeWidth: "7px",
              strokeLinecap: "round",
              filter: "url(#shadow)",
            }}
            cx="50"
            cy="50"
            r="40"
          />
        </svg>
      </div>
    </div>
  );
}

export default Preload;
