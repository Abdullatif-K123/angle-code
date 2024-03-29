import React from "react";
import { ErrorMessage, useField } from "formik";
import classes from "../auth.module.css";
export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2 ">
      <label htmlFor={field.name} className="labelForm">
        {label}
      </label>
      <input
        className={`form-control shadow-none  ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className={classes.error}
      />
    </div>
  );
};
