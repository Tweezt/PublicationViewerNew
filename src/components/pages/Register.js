import React, { useState } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Alert
} from "react-bootstrap";
import "./Register.css";
import Axios from "axios";

export default function Register(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isMessage, setMessage] = useState(false);
  const [messageType, setMessageType] = useState("primary");
  const [message, setMessageContent] = useState("");

  function validateForm() {
    return (
      login.length > 0 &&
      password.length > 0 &&
      passwordConfirm.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0
    );
  }

  function comparePasswords() {
    if (password.length === passwordConfirm.length) {
      if (password !== passwordConfirm) {
        setMessage(true);
        setMessageContent("Password aren't the same");
        setMessageType("danger");
        return false;
      } else {
        setMessage(false);
        setMessageContent();
        return true;
      }
    } else {
      return false;
    }
  }
  function clearForm() {
    setFirstName("");
    setLastName("");
    setLogin("");
    setPassword("");
    setPasswordConfirm("");
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (comparePasswords()) {
      const userObj = {
        login,
        firstName,
        lastName,
        password
      };
      Axios.post("http://publisher.freesher.ct8.pl/user/signup", userObj)
        // Axios.post("http://localhost:3000/user/signup", userObj)
        .then(res => res.data)
        .then(res => {
          console.log(res);
          setMessage(true);
          setMessageContent(res.message);
          setMessageType("success");
          clearForm();
        })
        .catch(err => {
          setMessageType("danger");
          setMessage(true);
          if (typeof err.response === "undefined") {
            setMessageContent(err.message);
          } else {
            setMessageContent(err.response.data.message);
          }
        });
    }
  }

  return (
    <div className="Register">
      <Alert show={isMessage} variant={messageType}>
        {message}
      </Alert>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="login" bssize="large">
          <FormLabel>Login*</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bssize="large">
          <FormLabel>Password*</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="passwordConfirm" bssize="large">
          <FormLabel>Repeat Password*</FormLabel>
          <FormControl
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="firstName" bssize="large">
          <FormLabel>First Name*</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="lastName" bssize="large">
          <FormLabel>Last Name*</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormLabel>*Pole wymagane</FormLabel>
        <Button block bssize="large" disabled={!validateForm()} type="submit">
          Register
        </Button>
      </form>
    </div>
  );
}
