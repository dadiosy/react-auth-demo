import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

const Register = ({ history }) => {

  const auth = useSelector(state => state.auth)
  const errors = useSelector(state => state.errors)
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [])

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name,
      username,
      contact,
      email,
      password,
      password2
    };
    dispatch(registerUser(newUser, history))
  };

  return (
    <div className="register">
      <h2 className="page-header">Register</h2>
      <form noValidate onSubmit={onSubmit}>
        <TextFieldGroup
          label="name"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          error={errors.name}
        />
        <TextFieldGroup
          label="Contact-Number"
          name="contact"
          placeholder="Enter your contact number"
          value={contact}
          onChange={e => setContact(e.target.value)}
          error={errors.contact}
        />
        <TextFieldGroup
          label="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={errors.email}
        />
        <TextFieldGroup
          label="username"
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          error={errors.name}
        />
        <TextFieldGroup
          label="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={errors.password}
        />
        <TextFieldGroup
          label="Confirm Password"
          name="password2"
          type="password"
          placeholder="Confirm password"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          error={errors.password2}
        />
        <input type="submit" className="btn btn-info" value="Register" />
      </form>
    </div>
  )
}

export default Register