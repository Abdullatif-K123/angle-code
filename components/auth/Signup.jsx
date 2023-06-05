import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "./components/TextField";
import * as Yup from "yup";
import { Button } from "@mui/material";
import classes from "./auth.module.css";
import { useRouter } from "next/router";
import contactme from "../../assets/png/contact.png";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userSlice";
const Signup = () => {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const validate = Yup.object({
    firstName: Yup.string()
      .min(3, "Must be 15 characters or less")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const obj = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      passwordConfirm: values.confirmPassword,
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:3333/AngelCode/users/signup",
        obj
      );
      console.log(response.data);
      const myData = response.data.data.user;
      const token = response.data.token;
      dispatch(
        login({
          email: myData.email,
          first_name: myData.first_name,
          last_name: myData.last_name,
          userId: myData._id,
          token: token,
        })
      );
    } catch (error) {
      console.error(error);
    }
    resetForm();
    router.push("/");
  };
  return (
    <div className="container mt-3">
      <div className=" d-flex justify-content-between">
        <div className="col-md-5">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validate}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid, touched }) => (
              <div>
                <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
                <Form>
                  <TextField label="First Name" name="firstName" type="text" />
                  <TextField label="last Name" name="lastName" type="text" />
                  <TextField label="Email" name="email" type="email" />
                  <TextField label="password" name="password" type="password" />
                  <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                  />
                  <div className={classes.buttonSec}>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={
                        isSubmitting ||
                        !isValid ||
                        (!touched.email && !touched.password)
                      }
                    >
                      Register
                    </Button>
                    <Link href="/auth/login">already have account?</Link>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
        <div className="col-md-5 justify-content-end ">
          <Image
            src={contactme}
            alt="Home right Image"
            width={530}
            height={450}
            className="img-fluid  "
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
