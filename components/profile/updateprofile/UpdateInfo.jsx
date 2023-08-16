import * as React from "react";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { login } from "../../../redux/userSlice";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import UpdateMyPassword from "./UpdateMyPassword";
import DeleteMyAccount from "./DeleteMyAccount";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const UpdateInfo = () => {
    //
    const user = useSelector((state) => state.user.user);
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    var headers = {
        Authorization: `Bearer ${user.token}`,
    };
    //Change Avtar
    const inputFile = useRef(null);
    const [avatar, setAvatar] = useState();
    const fileSelectedHandler = (event) => {
        console.log(event.target.files[0]);
        setAvatar(event.target.files[0]);
    };
    //

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .min(3, "Must be 15 characters or less")
            .max(15, "Must be 15 characters or less")
            .required("Required"),
        lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
        userName: Yup.string().required("Required"),
        email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
        phoneNumber: Yup.string()
            .min(9, "Must be 10 characters")
            .max(9, "Must be 10 characters"),
    });
    
    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append("first_name", values.firstName);
        formData.append("last_name", values.lastName);
        formData.append("user_name", values.userName);
        formData.append("about", values.about);
        formData.append("phone_number", values.phoneNumber);
        formData.append("email", values.email);
        formData.append("photo", avatar);
        formData.append("_id", user.userId);
        console.log(formData);
        try {
            console.log(true);
            const response = await axios.patch(
                `http://127.0.0.1:3333/AngelCode/users/UpdateUser/${user.userId}`,
                formData,
                { headers }
            );
            const myData = response.data.data.updateUser;
            console.log(myData);
             dispatch(
                 login({
                     email: myData.email,
                     first_name: myData.first_name,
                     last_name: myData.last_name,
                     user_name: myData.user_name,
                     about: myData.about,
                     avatar: myData.avatar,
                     phone_number: myData.phone_number,
               })
             );
            console.log(user);
            enqueueSnackbar("save success", {
                variant: "success",
              });
        } catch (error) {
            console.error(error);
        }
        // router.push("/profile/updateprofile");
    };

    const formik = useFormik({
        initialValues: {
            email: user.email,
            avatar: avatar,
            firstName: user.first_name,
            lastName: user.last_name,
            userName: user.user_name,
            phoneNumber: user.phone_number,
            about: user.about,
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    //
    const [value1, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div className="row my-5 mx-3">
                <div className="col-lg-4">
                    <div className="m-2 py-5 px-2 bg-white d-flex flex-column justify-content-center align-items-center shadow">
                        <div className="fw-bold fs-3 mb-5">
                            {user.user_name} 
                        </div>
                       {user.avatar ?
                        <Image
                            style={{ borderRadius: "50%" }}
                            alt="user avatar"
                            src={require(`../../../../AngleCode_Server/img/${user.avatar}`)} 
                            width={175}
                            height={175}
                            className="shadow-sm mb-5"
                            />
                          :  <Avatar
                            sx={{ width: 175, height: 175 }}
                            className="shadow-sm mb-5"
                        /> }
                        <input
                            className="d-none"
                            type="file"
                            onChange={fileSelectedHandler}
                            accept=".jpg,.png,.jpeg,.gif,.svg"
                            ref={inputFile}
                        />
                        <Button
                            size="small"
                            onClick={() => {
                                inputFile.current.click();
                            }}
                            variant="outlined"
                        >
                            Change your Avatar
                        </Button>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="m-2 py-4 px-2 bg-white">
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                                value={value1}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                            >
                                <Tab
                                    label="Change your Information"
                                    {...a11yProps(0)}
                                />
                                <Tab
                                    label="Change your Password"
                                    {...a11yProps(1)}
                                />
                            </Tabs>
                        </Box>
                        <TabPanel value={value1} index={0}>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="row row-cols-1 row-cols-sm-2 align-items-center p-2">
                                    <div className="col">
                                        <TextField
                                            label="First Name"
                                            name="firstName"
                                            id="firstName"
                                            type="text"
                                            className="w-100 shadow-sm my-2"
                                            value={formik.values.firstName}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.firstName &&
                                                Boolean(formik.errors.firstName)
                                            }
                                            helperText={
                                                formik.touched.firstName &&
                                                formik.errors.firstName
                                            }
                                        />
                                    </div>
                                    <div className="col">
                                        <TextField
                                            label="Last Name"
                                            name="lastName"
                                            id="lastName"
                                            type="text"
                                            className="w-100 shadow-sm my-2"
                                            value={formik.values.lastName}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.lastName &&
                                                Boolean(formik.errors.lastName)
                                            }
                                            helperText={
                                                formik.touched.lastName &&
                                                formik.errors.lastName
                                            }
                                        />
                                    </div>
                                    <div className="col">
                                        <TextField
                                            label="User Name"
                                            name="userName"
                                            id="userName"
                                            type="text"
                                            className="w-100 shadow-sm my-2"
                                            value={formik.values.userName}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.userName &&
                                                Boolean(formik.errors.userName)
                                            }
                                            helperText={
                                                formik.touched.userName &&
                                                formik.errors.userName
                                            }
                                        />
                                    </div>
                                    <div className="col">
                                        <TextField
                                            label="Email"
                                            name="email"
                                            id="email"
                                            type="email"
                                            className="w-100 shadow-sm my-2"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.email &&
                                                Boolean(formik.errors.email)
                                            }
                                            helperText={
                                                formik.touched.email &&
                                                formik.errors.email
                                            }
                                        />
                                    </div>
                                    <div className="col">
                                        <TextField
                                            label="Phone Number"
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            type="number"
                                            className="w-100 shadow-sm my-2"
                                            value={formik.values.phoneNumber}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.phoneNumber &&
                                                Boolean(
                                                    formik.errors.phoneNumber
                                                )
                                            }
                                            helperText={
                                                formik.touched.phoneNumber &&
                                                formik.errors.phoneNumber
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="p-2">
                                            <TextField
                                                label="About"
                                                placeholder="About"
                                                name="about"
                                                id="about"
                                                multiline
                                                className="w-100 shadow-sm"
                                                value={formik.values.about}
                                                onChange={formik.handleChange}
                                                error={
                                                    formik.touched.about &&
                                                    Boolean(formik.errors.about)
                                                }
                                                helperText={
                                                    formik.touched.about &&
                                                    formik.errors.about
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-center my-2">
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        
                                    >
                                        Save
                                    </Button>
                                </div>
                            </form>
                            <DeleteMyAccount />
                        </TabPanel>
                        <TabPanel value={value1} index={1}>
                            <UpdateMyPassword />
                        </TabPanel>
                    </div>
                </div>
            </div>
           
        </>
    );
};

export default UpdateInfo;
