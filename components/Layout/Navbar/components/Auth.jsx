import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import classes from "../Navbar.module.css";
import { useSelector } from "react-redux";
import UserAvatar from "./UserAvatar";
const Auth = () => {
  const user = useSelector((state) => state.user.user);
  const router = useRouter();
  return (
    <>
      {user.email ? (
        <div>
          <UserAvatar />
        </div>
      ) : (
        <div className={classes.noUser}>
          <Button
            onClick={() => {
              router.push("/auth/login");
            }}
            sx={{ color: "black", fontWeight: "bold" }}
          >
            Login
          </Button>
          <Button
            onClick={() => {
              router.push("/auth/register");
            }}
            variant="contained"
          >
            Join For Free
          </Button>
        </div>
      )}
    </>
  );
};

export default Auth;
