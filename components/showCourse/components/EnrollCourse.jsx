import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import axios from "axios";
export default function EnrollCourse({
  open,
  handleClose,
  courseId,
  handleEnroll,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.user.user);

  var headers = {
    Authorization: `Bearer ${user.token}`,
  };

  const handleEnrollClick = () => {
    async function fetchData() {
      try {
        const response = await axios.patch(
          `http://localhost:3333/AngelCode/AddCourseToFav/${courseId}`,
          {},
          { headers }
        );
        console.log(response.data);
        handleEnroll();
        enqueueSnackbar("Congratulations brother you successed!!!", {
          variant: "success",
        });
        handleClose();
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to Enroll this course"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By Click on Yes Button you will buy this course which cost 20000SP
            and Beginning to Learn!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEnrollClick} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
