import React, { useEffect } from "react";
import { registerUser } from "../../reducers/authSlice.ts";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppSelector, useAppDispatch } from "../../hooks.ts";

const Register = ({ history }) => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }, []);

  return (
    <div className="register">
      <h2 className="page-header">Register</h2>
      <Formik
        initialValues={{
          name: "",
          contact: "",
          email: "",
          username: "",
          password: "",
          password2: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          contact: Yup.string()
            .required("Required")
            .min(10, "Must be 10 characters")
            .max(10, "Must be 10 characters"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          username: Yup.string().required("Required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Required"),
          password2: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm Password is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          const newUser = {
            name: values.name,
            username: values.username,
            contact: values.contact,
            email: values.email,
            password: values.password,
            password2: values.password2,
          };
          dispatch(registerUser(newUser, history));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, handleSubmit }) => (
          <Form>
            <label htmlFor="name">name</label>
            <Field
              name="name"
              className={errors.name ? "form-control error" : "form-control"}
              type="text"
              placeholder="Enter your name"
            />
            <div className="text-danger">
              <ErrorMessage name="name" />
            </div>
            <br />
            <label htmlFor="contact">contact number</label>
            <Field
              name="contact"
              className={errors.contact ? "form-control error" : "form-control"}
              type="text"
              placeholder="Enter your contact number"
            />
            <div className="text-danger">
              <ErrorMessage name="contact" />
            </div>
            <br />
            <label htmlFor="email">email</label>
            <Field
              name="email"
              className={errors.email ? "form-control error" : "form-control"}
              type="email"
              placeholder="Enter your email"
            />
            <div className="text-danger">
              <ErrorMessage name="email" />
            </div>
            <br />
            <label htmlFor="username">username</label>
            <Field
              name="username"
              className={
                errors.username ? "form-control error" : "form-control"
              }
              type="text"
              placeholder="Enter your username"
            />
            <div className="text-danger">
              <ErrorMessage name="username" />
            </div>
            <br />
            <label htmlFor="password">password</label>
            <Field
              name="password"
              className={
                errors.password ? "form-control error" : "form-control"
              }
              type="password"
              placeholder="Enter your password"
            />
            <div className="text-danger">
              <ErrorMessage name="password" />
            </div>
            <br />
            <label htmlFor="password2">confirm password</label>
            <Field
              name="password2"
              className={
                errors.password2 ? "form-control error" : "form-control"
              }
              type="password"
              placeholder="Enter your confirm password"
            />
            <div className="text-danger">
              <ErrorMessage name="password2" />
            </div>
            <br />
            <button type="submit" className="btn btn-info">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
