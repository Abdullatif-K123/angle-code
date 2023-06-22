import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import classes from "../exams.module.css";
import { useSelector } from "react-redux";
import swal from "sweetalert";
export default function DeleteDialog(props) {
  const user = useSelector((state) => state.user.user);
  var headers = {
    Authorization: `Bearer ${user.token}`,
  };
  const handleDeleteLesson = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3333/AngelCode/Tests/DeleteTest/${props.testId}`,
        { headers }
      );
      console.log(response);
      props.handleSubmit(props.testId);
      props.handleClose();
      props.handleCloseTest();
      swal("Test Deleted", error, "error");
    } catch (error) {
      console.log(error);
      swal("Test Deleted", "You Delete one of your test", "success");
    }
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          className={classes.mainDeleteTitle}
        >
          {"DELETING TEST !!!!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this test think twice before any
            action that you make
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={props.handleClose}
            className={classes.buttonCancleConfirm}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteLesson}
            autoFocus
            className={classes.buttonDeleteConfirm}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
