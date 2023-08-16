import { useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const UpdateMyPassword = () => {
    //
    const handleSubmit = async (values) => {
        console.log("gggg");
        // const obj = {
        // };
        // try {
        //   const response = await axios.patch(
        //      obj,
        //      headers: {'Authorization': 'Bearer ' + token }
        //   );
        //   console.log(response.data);
        // } catch (error) {
        //   console.error(error);
        // }
        // dispatch();
        // router.push("/updateprofile");
    };
    const validationSchema = Yup.object({
        Oldpassword: Yup.string()
            .min(6, "Password must be at least 6 charaters")
            .required("Password is required"),
        newPassword: Yup.string()
            .min(6, "Password must be at least 6 charaters")
            .required("Password is required"),
        newConfirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Password must match")
            .required("Confirm password is required"),
    });
    const formik = useFormik({
        initialValues: {
            Oldpassword: "",
            newPassword: "",
            newConfirmPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="my-3 text-center fw-bold fs-4">
                Change Your Password
            </div>
            <div className="row row-cols-1 row-cols-sm-2 align-items-center">
                <div className="col">
                    <div className="p-2">
                        <TextField
                            label="Old Password"
                            name="Oldpassword"
                            id="Oldpassword"
                            type="password"
                            value={formik.values.Oldpassword}
                            onChange={formik.handleChange}
                            className="w-100 shadow-sm"
                            error={
                                formik.touched.Oldpassword &&
                                Boolean(formik.errors.Oldpassword)
                            }
                            helperText={
                                formik.touched.Oldpassword &&
                                formik.errors.Oldpassword
                            }
                        />
                    </div>
                </div>
                <div></div>
                <div className="col">
                    <div className="p-2">
                        <TextField
                            label="New Password"
                            name="newPassword"
                            id="newPassword"
                            type="password"
                            onChange={formik.handleChange}
                            className="w-100 shadow-sm"
                            error={
                                formik.touched.newPassword &&
                                Boolean(formik.errors.newPassword)
                            }
                            helperText={
                                formik.touched.newPassword &&
                                formik.errors.newPassword
                            }
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="p-2">
                        <TextField
                            label="New confirm Password"
                            name="newConfirmPassword"
                            id="newConfirmPassword"
                            type="password"
                            onChange={formik.handleChange}
                            className="w-100 shadow-sm"
                            error={
                                formik.touched.newConfirmPassword &&
                                Boolean(formik.errors.newConfirmPassword)
                            }
                            helperText={
                                formik.touched.newConfirmPassword &&
                                formik.errors.newConfirmPassword
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="d-flex align-items-center justify-content-center my-2">
                <Button variant="contained" type="submit">Save</Button>
            </div>
        </form>
    );
};

export default UpdateMyPassword;
