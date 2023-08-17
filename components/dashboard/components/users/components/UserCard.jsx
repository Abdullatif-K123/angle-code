import React from "react";
import classes from "../users.module.css";
import { Avatar } from "@mui/material";
import { ModeEditTwoTone } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Image from "next/image";
import { useSelector } from "react-redux";
import axios from "axios";

const UserCard = ({ user, title }) => {
  const userse = useSelector((state) => state.user.user);

  var headers = {
    Authorization: `Bearer ${userse.token}`,
  };
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});

  const handleClickOpen = async () => {
    setLoading(true);

    const resContent = await axios.get(
      `http://localhost:3333/AngelCode/users/${user._id}`,
      { headers }
    );
    setUserInfo(resContent.data.data);
    console.log(resContent.data);
    setOpen(true);
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.userCardMain}>
      {user.avatar ? (
        <Image
          className={classes.userPof}
          style={{
            marginRight: "8px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          width={"33"}
          height={"33"}
          alt={user.first_name}
          src={require(`../../../../../../AngleCode_Server/img/${user.avatar}`)}
        />
      ) : (
        <Avatar alt={user.first_name} className={classes.cardAvatarsectwo} />
      )}

      <p>
        {user.first_name} {user.last_name}
      </p>
      <p>
        {title ? title : "Courses"}: {user.courseCount}
      </p>
      <ModeEditTwoTone className={classes.iconEdit} onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Data Information for the user"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {loading ? (
              "loading"
            ) : (
              <div className={classes.userContent}>
                <p>
                  Name: {userInfo.first_name} {userInfo.last_name}
                </p>
                <p>UserName: {userInfo.user_name}</p>
                <p>Email: {userInfo.email}</p>
                <p>Phone: {userInfo.phone_number}</p>
                <p>about: {userInfo.about}</p>
              </div>
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserCard;
