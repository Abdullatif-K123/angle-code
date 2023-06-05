import React from "react";
import classes from "./Navbar.module.css";
import Logo from "./components/Logo";
import SectionOnSmall from "./components/SectionOnSmall";
import Section from "./components/Section";
import Auth from "./components/Auth";
import Search from "./components/Search";
import Link from "next/link";
import angleCode from "../../../assets/png/angleCode.png";
import Image from "next/image";
const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <div>
        <SectionOnSmall />
        <Link href="/">
          <Image src={angleCode} height={60} width={60} />
        </Link>
      </div>
      <div className={classes.navElement}>
        <Section />
        <Search />
        <Auth />
      </div>
    </nav>
  );
};

export default Navbar;
