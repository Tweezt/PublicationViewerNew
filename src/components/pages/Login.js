import React, { useState } from "react";

import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Alert
} from "react-bootstrap";
import "./Login.css";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

export default function Login(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isMessage, setMessage] = useState(false);
  const [message, setMessageContent] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  function validateForm() {
    return login.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    //
    try {
      const result = await Axios.post("http://localhost:3000/user/login", {
        // const result = await Axios.post(
        // "http://publisher.freesher.ct8.pl/user/login",
        // {
        login,
        password
      });
      console.log(result.data.data.id);
      await localStorage.setItem("id", result.data.data.id);
      await props.onLogin(result.data.data.id);
      setIsLogin(true);
    } catch (err) {
      console.log();
      setMessage(true);
      if (typeof err.response === "undefined") {
        setMessageContent(err.message);
      } else {
        setMessageContent(err.response.data.message);
      }
    }
  }
  function redirect() {
    if (isLogin) {
      return <Redirect to="/" />;
    }
  }
  return (
    <div className="Login">
      <Alert variant="primary" show={isMessage}>
        {message}
      </Alert>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="login" bssize="large">
          <FormLabel>Login</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bssize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bssize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
        {redirect()}
        <div>
          <Link style={linkStyle} to="/register">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

const linkStyle = {
  color: "#000",
  textDecoration: "none",
  fontWeight: "bold"
};
