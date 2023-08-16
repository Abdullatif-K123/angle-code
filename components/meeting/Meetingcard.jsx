import React, { useState } from "react";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import axios from "axios";
import { CardActionArea, Grid } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import EventIcon from "@mui/icons-material/Event";
import Backdrop from "@mui/material/Backdrop";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import Updatecard from './Updatecard';
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import Editcontent from './Editcontent';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Box,
} from "@mui/material";
import { EditNoteOutlined, AddOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import classes from "./meeting.module.css"
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const stylee = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const ITEM_HEIGHT = 48;

const Meetingcard = (props) => {
    let date = new Date(props.startDate);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const router= useRouter();
    var headers = {
        Authorization: `Bearer ${props.userToken}`,
      };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [sure, setsure] = useState(false);
    const handleOpen1 = () => setsure(true);
    const handleClose1 = () => setsure(false);

    const [openCard, setOpenCard] = useState(false);

    const handleCloseCardUpdate = () => {
        setOpenCard(false);
      };
      const handleOpenCardUpdate = () => {
        setOpenCard(true);
      };

    const handelsubmit = async () => {
        handleClose1();
        console.log(props.meetingId);
        props.timerWaiting();
        try {
          const response = await axios.delete(
            `http://localhost:3333/AngelCode/Meetings/deleteMeeting/${props.meetingId}`,
            { headers }
          );
          console.log(response);
          console.log("done");
          props.handleDelete(props.meetingId);
          props.timerWaiting(2000);
        } catch (err) {
          console.log(err);
        }
      };
    return (
        <>
            <Card 
            className="shadow"
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: { xs: "column", lg: "row-reverse" },
                }}
            >
                <Box 
                    sx={{
                        width: { xs: "100%", lg: "550px" },
                    }}
                >
                    <Image
                         component="img"
                        src={require(`../../../AngleCode_Server/img/${props.meetingImage}`)}
                        alt="meetingImage"
                       className={classes.img2}
                    />
                </Box>
                <CardActionArea>
                    <CardContent>
                        <Grid
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Typography
                                className="fw-bold text-center text-primary"
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                {props.title}
                            </Typography>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? "long-menu" : undefined}
                                aria-expanded={open ? "true" : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </Grid>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                "aria-labelledby": "long-button",
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: "25ch",
                                },
                            }}
                        >
                                <MenuItem
                                    onClick={ () => {    
                                   router.push(`/meeting/editmeetingcontent/${props.meetingId}`);
                                    }}
                                >
                                <AddOutlined />  Add or Update Content
                                </MenuItem>

                                <MenuItem                  
                                    onClick={handleOpenCardUpdate}                            
                                >
                                 <EditNoteOutlined />  Update Info
                                </MenuItem>

                                <MenuItem
                                    onClick={handleOpen1}                              
                              >
                              <DeleteIcon />    delete
                                </MenuItem>  
                        </Menu>

                        <hr />
                        <Typography
                            gutterBottom
                            className="text-success"
                            variant="div"
                            component="div"
                        >
                            <PermContactCalendarIcon /> Created by:{" "}
                            {props.usercreater}
                        </Typography>
                        <Typography
                            gutterBottom
                            className="text-primary"
                            variant="div"
                            component="div"
                        >
                            <LinkIcon /> Link: {props.link}
                        </Typography>
                        <Typography
                            gutterBottom
                            className="text-dark"
                            variant="div"
                            component="div"
                        >
                            <EventIcon /> Start Date:{" "}
                            {`${date.getDate() }/${date.getUTCMonth() + 1}/${date.getFullYear()}       
                           `}
                        </Typography>
                        <Typography
                            gutterBottom
                            className="text-dark"
                            variant="div"
                            component="div"
                        >
                            <AvTimerIcon /> Duration: {props.duration} min
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

       {/* for sure delete  */}
                        <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={sure}
                        onClose={handleClose1}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                        }}
                    >
                        <Fade in={sure}>
                            <Box sx={stylee}>
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
                                        onClick={handleClose1}
                                    >
                                        NO
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="error"
                                        type="submit"
                                        onClick={handelsubmit}
                                    >
                                        Yes
                                    </Button>
                                </div>
                            </Box>
                        </Fade>
                    </Modal>

      <Updatecard
        open={openCard}
        handleClose={handleCloseCardUpdate}
        mainTitle={"Update meeting"}
        explainText={
          "Fill forms to update the exisiting meeting"
        }
        timerWaiting={props.timerWaiting}
        userToken={props.userToken}
        meetingId={props.meetingId}
        title={props.title}
        link={props.link}
        updatemeeting={props.updatemeeting}
      /> 

      

        </>
    );
};

export default Meetingcard;
