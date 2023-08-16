import React, { useEffect, useState, useRef } from "react";
import classes from "./meeting.module.css";
import Meetingcard from "./Meetingcard";
import Grid from '@mui/material/Grid';
import ImageGrid from "../loader/CourseLoader";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";
import Image from "next/image";
import img from "./4.png";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const Addnewmeeting = () => {
    const user = useSelector((state) => state.user.user);
    const [meetingImg, setmeetingImg] = useState(null);
    const title = useRef(null);
    const link = useRef(null);
    const startDate = useRef(null);
    const duration = useRef(null);
    const [data, setData] = useState(null);
    const [timerWaiting, setTimerWaiting] = useState(false);
    const [open, setOpen] = useState(false);
    const [dragging, setDragging] = React.useState(false);

    const handleDragEnter = (event) => {
        event.preventDefault();
        setDragging(true);
      };
    
      const handleDragLeave = (event) => {
        event.preventDefault();
        setDragging(false);
      };
    
      const handleDragOver = (event) => {
        event.preventDefault();
      };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        console.log(file);
        setmeetingImg(file);
    };

    var headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
    };

    useEffect(() => {
        async function fetchData() {
            console.log("done");
            const response = await axios.get(
                `http://localhost:3333/AngelCode/Meetings/meetingsCr`,
                { headers }
            );
            const data = response.data;
            console.log(data);
            setData(data.data);
        }
        fetchData();
    }, []);

    const fireWaitingTimer = (time) => {
        setTimerWaiting(true);
        setTimeout(
            () => {
                setTimerWaiting(false);
            },
            time ? time : 3000
        );
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleFileChang = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setmeetingImg(file);
        console.log(file);
    };

    const handleClose = () => {
        setOpen(false);
        setmeetingImg(null);
        title.current.value = "";
        link.current.value = "";
        startDate.current.value = "";
        duration.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("our data is the following:");

        const formData = new FormData();
        formData.append("title", title.current.value);
        formData.append("link", link.current.value);
        formData.append("startDate", startDate.current.value);
        formData.append("duration", duration.current.value);
        formData.append("photo", meetingImg);
        formData.append("user", user.userId);
        console.log(formData);
        try {
            console.log("ff");
            const response = await axios.post(
                "http://localhost:3333/AngelCode/Meetings/createMeeting",
                formData,
                { headers }
            );
            console.log(response.data);
            setData([...data, response.data.data]);
            title.current.value = "";
            link.current.value = "";
            startDate.current.value = "";
            duration.current.value = "";
            fireWaitingTimer(10000);
            setmeetingImg(null);
        } catch (error) {
            console.log(error);
        }
        setOpen(false);
    };

// Delete meeting

 const deletemeeting = (id) => {
     setData((prevState) => {
       let upDateItems = prevState.filter((item) => item._id !== id);
       return upDateItems;
     });
     };


    // Update meeting

  const updatemeeting = (updatedData) => {
    console.log(updatedData._id);

    setData((prevState) => {
      let upDateItems = prevState.map((item) => {
        if (item._id === updatedData._id) return updatedData;
        else return item;
      });
      console.log(upDateItems);
      return upDateItems;
    });
  };

  if (!data || timerWaiting) {
    return (
      <div className={classes.courseLoader}>
        <ImageGrid />
      </div>
    );
  }

    // No meeting Found !!!!!!

    if (data.length < 1) {
        return (
            <section className={classes.noCourse}>
                <Image
                    className={classes.image2}
                    src={img}
                    width={400}
                    height={300}
                    alt="no course found"
                />

                <h3>Do you want to add anew meeting?</h3>
                <p> add from here</p>

                <Button
                    className={`${classes.addCourse} ${classes.btnHover}`}
                    startIcon={<AddOutlined />}
                    onClick={handleClickOpen}
                >
                    New Meeting
                </Button>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    className={classes.mainPopup}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                >
                    <div className={classes.newCourse}>
                        <DialogTitle className={classes.cardText}>
                            New Meeting
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText className={classes.textdesc}>
                                Fill forms to create a new meeting these forms
                                are required so plase make sure to fill them all
                            </DialogContentText>
                        </DialogContent>

                        <form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="title"
                                    label="title"
                                    type="text"
                                    inputRef={title}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="link"
                                    label="link"
                                    type="text"
                                    inputRef={link}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="duration"
                                    label="duration"
                                    type="text"
                                    inputRef={duration}
                                    fullWidth
                                    required
                                />

                           <label className="ms-1 mt-3 text-secondary"> start Date: </label>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="startDate"
                                    type="date"
                                    className="text-secondary"
                                    inputRef={startDate}
                                    fullWidth
                                    required
                                />

                                <label
                                    for="images"
                                    className={classes.dropContainer}
                                    onDragEnter={handleDragEnter}
                                    onDragLeave={handleDragLeave}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    style={{
                                        border: dragging
                                            ? "2px dashed #f50057"
                                            : "2px dashed #ccc",
                                        padding: "16px",
                                    }}
                                >
                                    <span className={classes.dropTitle}>
                                    Drop Img here
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChang}
                                        id="createFile"
                                        style={{ display: "none" }}
                                        
                                    />
                                    <span
                                        className={classes.inputFile}
                                        onClick={() =>
                                            document
                                                .querySelector("#createFile")
                                                .click()
                                        }
                                    >
                                        Select file
                                    </span>

                                    {meetingImg && (
                                        <p className={classes.imgSelectedText}>
                                            Selected file: {meetingImg.name}
                                        </p>
                                    )}
                                </label>
                            </DialogContent>

                            <DialogActions>
                                <Button
                                    onClick={handleClose}
                                    className={classes.buttonCancel}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className={classes.buttonSubmit}
                                >
                                    {" "}
                                    <AddOutlined /> Create{" "}
                                </Button>
                            </DialogActions>
                        </form>
                    </div>
                </Dialog>
            </section>
        );
    }

    // meeting Found 
    return (
        <>
            <div className={classes.main}>
                <div className={classes.maintext}>
                    <h1>MY Meetings</h1>
                </div>
                <div className={classes.mainCourse}>
                    <div className={classes.course}>
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                            {data.map((m) => {
                                if (m) {
                                    if (m.userCreater === user.userId)
                                        var Name =
                                            user.first_name +
                                            " " +
                                            user.last_name;
                                    return (
                                        <Grid item xs={6}>
                                            <Meetingcard
                                                key={m._id}
                                                meetingId={m._id}
                                                title={m.title}
                                                link={m.link}
                                                startDate={m.startDate}
                                                duration={m.duration}
                                                usercreater={Name}
                                                meetingImage={m.image}
                                                timerWaiting={fireWaitingTimer}
                                                handleDelete={deletemeeting}
                                                userToken={user.token}
                                                updatemeeting={updatemeeting}
                                            />
                                        </Grid>
                                    );
                                }
                            })}
                        </Grid>
                    </div>
                </div>
                <Button
                    className={`${classes.addCourse} ${classes.btnHover}`}
                    startIcon={<AddOutlined />}
                    onClick={handleClickOpen}
                >
                    New Meeting
                </Button>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    className={classes.mainPopup}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                >
                    <div className={classes.newCourse}>
                        <DialogTitle className={classes.cardText}>
                            New Meeting
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText className={classes.textdesc}>
                                Fill forms to create a new meeting these forms
                                are required so plase make sure to fill them all
                            </DialogContentText>
                        </DialogContent>
                        <form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="title"
                                    label="title"
                                    type="text"
                                    inputRef={title}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="link"
                                    label="link"
                                    type="text"
                                    inputRef={link}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="duration"
                                    label="duration"
                                    type="text"
                                    inputRef={duration}
                                    fullWidth
                                    required
                                />
                                <label className="ms-1 mt-3 text-secondary"> start Date: </label>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="startDate"
                                    className="text-secondary"
                                    type="date"
                                    inputRef={startDate}
                                    fullWidth
                                    required
                                />
                                <label
                                    for="images"
                                    className={classes.dropContainer}
                                    onDragEnter={handleDragEnter}
                                   onDragLeave={handleDragLeave}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    style={{
                                        border: dragging
                                            ? "2px dashed #f50057"
                                            : "2px dashed #ccc",
                                        padding: "16px",
                                    }}
                                >
                                    <span className={classes.dropTitle}>
                                    Drop Img here
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChang}
                                        id="createFile"
                                        style={{ display: "none" }}
                                    />
                                    <span
                                        className={classes.inputFile}
                                        onClick={() =>
                                            document
                                                .querySelector("#createFile")
                                                .click()
                                        }
                                    >
                                        Select file
                                    </span>
                                    {meetingImg && (
                                        <p className={classes.imgSelectedText}>
                                            Selected file: {meetingImg.name}
                                        </p>
                                    )}
                                </label>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={handleClose}
                                    className={classes.buttonCancel}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className={classes.buttonSubmit}
                                >
                                    {" "}
                                    <AddOutlined /> Create{" "}
                                </Button>
                            </DialogActions>
                        </form>
                    </div>
                </Dialog>
            </div>
        </>
    );
};

export default Addnewmeeting;
