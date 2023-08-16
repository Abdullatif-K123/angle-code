import * as React from "react";
import { useRef, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import axios from "axios";
import { logoutUser } from "../../../redux/userSlice";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};
function DeleteMyAccount() {
    //
    const user = useSelector((state) => state.user.user);
    const router = useRouter();
    const dispatch = useDispatch();
    var headers = {
        Authorization: `Bearer ${user.token}`,
    };
    //Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handelsubmit = async () => {
        try {
            console.log(true);
            const response = await axios.delete(
                `http://127.0.0.1:3333/AngelCode/users/deleteUser/${user.userId}`,
                { headers }
            );
            console.log(response);
            console.log("done");
        } catch (error) {
            console.error(error);
        } 
        dispatch(logoutUser({email:""}));
         router.replace("/");
    };

    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <Container
                    maxWidth="xl"
                    className="d-flex align-items-center  mb-9 mt-0 pt-3"
                >
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleOpen}
                        startIcon={<DeleteIcon />
                        }
                        className="text-lowercase"
                    > Delete account
                    </Button>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                        }}
                    >
                        <Fade in={open}>
                            <Box sx={style}>
                                <Typography
                                    id="transition-modal-title"
                                    variant="h6"
                                    component="h2"
                                >
                                    Are you Sure???
                                </Typography>
                                <div className="d-flex align-items-center justify-content-evenly m-2">
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="error"
                                        onClick={handelsubmit}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleClose}
                                    >
                                        NO
                                    </Button>
                                </div>
                            </Box>
                        </Fade>
                    </Modal>
                </Container>
            </React.Fragment>
        </>
    );
}
export default DeleteMyAccount;
