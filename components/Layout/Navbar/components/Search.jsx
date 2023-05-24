import React from "react";
import { SearchOutlined } from "@mui/icons-material";
import classes from "../Navbar.module.css";
const Search = () => {
  return (
    <form className={classes.searchNav}>
      <SearchOutlined />
      <input
        type="text"
        placeholder="Search Courses & Tutorials"
        className={classes.inputSearch}
      />
    </form>
  );
};

export default Search;
