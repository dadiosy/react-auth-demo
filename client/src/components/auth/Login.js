import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

const Login = ({ history }) => {

  const auth = useSelector(state => state.auth)
  const errors = useSelector(state => state.errors)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/");
    }
  }, [])

  const onSubmit = e => {
    e.preventDefault();

    const user = {
      username,
      password
    };

    dispatch(loginUser(user, history))
  };

  return (
    <div className="login">
      <h2 className="page-header">Login</h2>
      <form onSubmit={onSubmit}>
        <TextFieldGroup
          label="username"
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          error={errors.username}
        />
        <TextFieldGroup
          label="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={errors.password}
        />
        <input type="submit" className="btn btn-info" value="Login" />
      </form>
    </div >
  )
}

export default Login