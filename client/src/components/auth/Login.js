import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Formik, Field, Form, ErrorMessage } from 'formik';
 import * as Yup from 'yup';

const Login = ({ history }) => {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/");
    }
  }, [])

  return (
    <div className="login">
      <h2 className="page-header">Login</h2>
      <Formik
       initialValues={{ username: '', password: ''}}
       validationSchema={Yup.object({
         username: Yup.string()
           .required('Required'),
         password: Yup.string()
           .required('Required'),
       })}
       onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        const {username, password} = values
        const user = {
          username,
          password
        };
        dispatch(loginUser(user, history))
        setSubmitting(false);
       }}
     >
       <Form>
         <label htmlFor="username">username</label>
         <Field name="username" className="form-control" type="text" placeholder="Enter your name" />
         <ErrorMessage name="username" /><br />
 
         <label htmlFor="password">password</label>
         <Field name="password" className="form-control" type="password" placeholder="Enter your password" />
         <ErrorMessage name="password" /><br />
 
         <button type="submit" className="btn btn-info">Login</button>
       </Form>
     </Formik>
    </div >
  )
}

export default Login