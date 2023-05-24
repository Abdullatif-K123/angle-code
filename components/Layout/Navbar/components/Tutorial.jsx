import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Cplus from "../../../../assets/icons/C++withLap.png";
import python from "../../../../assets/icons/python.png";
import Cprogram from "../../../../assets/icons/c.png";
import sql from "../../../../assets/icons/sql.png";
import Image from "next/image";
import classes from "../Navbar.module.css";
import { ArrowDropDown } from "@mui/icons-material";
import { ArrowDropUp } from "@mui/icons-material";
const Tutorial = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "black", fontweight: "bold" }}
      >
        Courses {open ? <ArrowDropUp /> : <ArrowDropDown />}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          className: classes.MenuNav,
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          style: {
            width: "450px",
            height: "500px",
            padding: "0",
          },
        }}
      >
        <Link
          href="/courses?course=cpuls"
          className={classes.linkStyle}
          onClick={handleClose}
        >
          <MenuItem className={classes.menuItems}>
            <Image src={Cplus} alt="My image" width={100} height={100} /> Become
            a C++ Master
          </MenuItem>
        </Link>
        <Link
          href="/courses?course=Python"
          className={classes.linkStyle}
          onClick={handleClose}
        >
          <MenuItem className={classes.menuItems}>
            <Image src={python} alt="My image" width={100} height={100} />{" "}
            Become a Python Master
          </MenuItem>
        </Link>
        <Link
          href="/courses?course=CProgramming"
          className={classes.linkStyle}
          onClick={handleClose}
        >
          <MenuItem className={classes.menuItems}>
            <Image src={Cprogram} alt="My image" width={100} height={100} />{" "}
            Learn C Programming
          </MenuItem>
        </Link>
        <Link
          href="/courses?course=SQL"
          className={classes.linkStyle}
          onClick={handleClose}
        >
          <MenuItem className={classes.menuItems}>
            <Image src={sql} alt="My image" width={100} height={100} /> Learn
            SQL Basic
          </MenuItem>
        </Link>
        <Link
          href="/courses?course=CPlusBasic"
          className={classes.linkStyle}
          onClick={handleClose}
        >
          <MenuItem className={classes.menuItems}>
            <Image src={Cplus} alt="My image" width={100} height={100} /> Learn
            C++ Basic
          </MenuItem>
        </Link>
        <Link
          href="/courses?course=OOp"
          className={classes.linkStyle}
          onClick={handleClose}
        >
          <MenuItem className={classes.menuItems}>
            <Image src={Cplus} alt="My image" width={100} height={100} /> Learn
            C++ OOP
          </MenuItem>
        </Link>

        <MenuItem className={classes.showAll}>
          {" "}
          <Link
            href="/courses?course=all"
            className={classes.showAll}
            onClick={handleClose}
          >
            See All Courses
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Tutorial;
