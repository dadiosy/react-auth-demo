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
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">
              Create your account
            </p>
            <form noValidate onSubmit={onSubmit}>
              <TextFieldGroup
                name="name"
                placeholder="person"
                value={name}
                onChange={e => setName(e.target.value)}
                error={errors.name}
              />
              <TextFieldGroup
                name="username"
                placeholder="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                error={errors.name}
              />
              <TextFieldGroup
                name="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={errors.email}
              />
              <TextFieldGroup
                name="contact"
                placeholder="contact"
                value={contact}
                onChange={e => setContact(e.target.value)}
                error={errors.contact}
              />
              <TextFieldGroup
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={errors.password}
              />
              <TextFieldGroup
                name="password2"
                type="password"
                placeholder="Confirm password"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
                error={errors.password2}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register