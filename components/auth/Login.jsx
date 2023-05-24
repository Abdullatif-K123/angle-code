import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "./components/TextField";
import * as Yup from "yup";
import { Button } from "@mui/material";
import classes from "./auth.module.css";
import contactme from "../../assets/png/contact.png";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userSlice";
import { useRouter } from "next/router";

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
    resetForm();
    // try {
    //   const response = await axios.post(
    //     "http://localhost:3000/programlern/users/login",
    //     obj
    //   );
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
    dispatch(login({ email: obj.email }));
    setSubmitting(false);
    router.push("/");
  };
  return (
    <div className="container mt-3">
      <div className="  d-flex justify-content-between">
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
                <h1 className="my-4 font-weight-bold .display-4">Sign In</h1>
                <Form>
                  <TextField label="Email" name="email" type="email" />
                  <TextField label="password" name="password" type="password" />
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
            width={530}
            height={450}
            className="img-fluid justify-content-end  "
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;