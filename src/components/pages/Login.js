import React, { useState } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Alert
} from "react-bootstrap";
import "./Login.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useHistory } from "react-router-dom";
export default function Login(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isMessage, setMessage] = useState(false);
  const [message, setMessageContent] = useState("");
  const history = useHistory();
  function validateForm() {
    return login.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    Axios.post("http://publisher.freesher.ct8.pl/user/login", {
      login,
      password
    })
      .then(res => res.data)
      .then(data => {
        localStorage.setItem("id", data.id);
        //  this.props.onLogin();
        history.push("/");
      })
      .catch(err => {
        setMessage(true);
        setMessageContent(err.response.data.message);
      });
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
