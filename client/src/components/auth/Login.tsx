import React, { useEffect } from "react";
import { loginUser } from "../../reducers/authSlice.ts";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppSelector, useAppDispatch } from "../../hooks.ts";

const Login = ({ history }) => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/");
    }
  }, []);

  return (
    <div className="login">
      <h2 className="page-header">Login</h2>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string().required("Required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          const { username, password } = values;
          const user = {
            username,
            password,
          };
          dispatch(loginUser(user, history));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, handleSubmit }) => (
          <Form>
            <label htmlFor="username">username</label>
            <Field
              name="username"
              className={
                errors.username ? "form-control error" : "form-control"
              }
              type="text"
              placeholder="Enter your name"
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

            <button type="submit" className="btn btn-info">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
