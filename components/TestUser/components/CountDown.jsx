import React from "react";
import { useState, useEffect } from "react";
import classes from "../quiz.module.css";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
const CountDown = ({ timers, setFinished }) => {
  const [timer, setTimer] = useState({
    hours: timers.hours,
    minutes: timers.minutes,
    seconds: timers.seconds,
  });

  // For timer
  useEffect(() => {
    const timeres = setInterval(() => {
      // Decrease the seconds by 1
      setTimer((prevTime) => {
        let { hours, minutes, seconds } = prevTime;
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              // Time's up!
              clearInterval(timer);
              swal({
                title: "Your Times UP!!!",
                icon: "info",

                dangerMode: false,
              }).then((willTakeit) => {
                setFinished(true);
              });
              return prevTime;
            } else {
              hours--;
              minutes = 59;
              seconds = 59;
            }
          } else {
            minutes--;
            seconds = 59;
          }
        } else {
          seconds--;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timeres);
  }, [timers]);

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));
  return (
    <div className={classes.countDown}>
      <BootstrapTooltip title="Hours">
        <div className={classes.timing}>
          {timer.hours.toString().padStart(2, "0")}
        </div>
      </BootstrapTooltip>
      <BootstrapTooltip title="Minutes">
        <div className={classes.timing}>
          {timer.minutes.toString().padStart(2, "0")}
        </div>
      </BootstrapTooltip>
      <BootstrapTooltip title="Seconds">
        <div className={classes.timing}>
          {timer.seconds.toString().padStart(2, "0")}
        </div>
      </BootstrapTooltip>
    </div>
  );
};

export default CountDown;
