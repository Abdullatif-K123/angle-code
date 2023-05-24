import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Tutorial from "./Tutorial";
const Section = () => {
  return (
    <div className="sections">
      <Tutorial />
    </div>
  );
};

export default Section;
