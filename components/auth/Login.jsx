import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "./components/TextField";
import * as Yup from "yup";
import { Button } from "@mui/material";
import classes from "./auth.module.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { useRouter } from "next/router";
import contactme from "../../assets/png/contact.png";
import learning from "../../assets/webp/depositphotos_557095826-stock-photo-web-designer-modern-flat-concept.webp";
const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const obj = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3333/AngelCode/users/login",
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
          role: myData.role,
        })
      );
      const uData = {
        email: myData.email,
        first_name: myData.first_name,
        last_name: myData.last_name,
        userId: myData._id,
        token: token,
        role: myData.role,
      };

      localStorage.setItem("userData", JSON.stringify(uData));
      resetForm();
      setSubmitting(false);
      myData.role == "superAdmin"
        ? router.replace("/dashboard")
        : router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container mt-3" style={{ height: "100vh" }}>
      <div className="  d-flex justify-content-between">
        <div className={classes.formSingup}>
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
            {({ isSubmitting, isValid }) => (
              <div className={classes.signInContainer}>
                <h1 className="my-4 font-weight-bold .display-4">
                  Welcome again
                </h1>
                <Form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "15px",
                  }}
                >
                  <TextField label="Email" name="email" type="email" />
                  <TextField label="password" name="password" type="password" />
                  <div className={classes.buttonSec}>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting || !isValid}
                    >
                      Login
                    </Button>
                    <Link href="/auth/register">Don't have account?</Link>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
        <div className="col-md-5 ">
          <Image
            src={contactme}
            alt="Home right Image"
            width="600px"
            height="600px"
            className="img-fluid justify-content-end  "
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
