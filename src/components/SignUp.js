import React, { useState } from "react";
import {
  Container,
  Label,
  Button,
  FormGroup,
  Input,
  Spinner
} from "reactstrap";
import { getAuthInfo } from "../functions/AuthFunctions";
import { addUserToRDS } from "../functions/RDSFunctions";
import { Auth } from "aws-amplify";

export default function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newUser, setNewUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const forms = [
    { text: "email", type: "email", callback: setEmail },
    { text: "first name", type: "text", callback: setFirstName },
    { text: "last name", type: "text", callback: setLastName },
    { text: "password", type: "password", callback: setPassword },
    { text: "confirm password", type: "password", callback: setPasswordConfirm }
  ];

  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      password === passwordConfirm
    );
  }

  function validateConfirmationForm() {
    return confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const newUser = await Auth.signUp({
        username: email,
        password: password
      });
      setLoading(false);
      setNewUser(newUser);
    } catch (e) {
      alert(e.message);
      setLoading(false);
    }
    setNewUser("test");
    setLoading(false);
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await Auth.confirmSignUp(email, confirmationCode);
      await Auth.signIn(email, password);
      props.setAuthenticated(true);
      const newUser = {
        userId: await getAuthInfo(),
        firstName: firstName,
        lastName: lastName
      };
      await addUserToRDS(newUser);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <FormGroup>
          <Label>confirmation code</Label>
          <Input
            autoFocus
            type="tel"
            onChange={(e) => setConfirmationCode(e.target.value)}
            placeholder="enter 6 digit code here..."
          />
          <Label>please check your email for the code.</Label>
        </FormGroup>
        <Button
          block
          disabled={!validateConfirmationForm()}
          type="submit"
          style ={{backgroundColor: "#c0d6df" }}
        >
          {loading ? <Spinner color="primary" /> : "verify"} 
        </Button>
      </form>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        {forms.map((x, index) => {
          return (
            <FormGroup key={index}>
              <Label>{x.text}</Label>
              <Input
                autoFocus
                type={x.type}
                onChange={(e) => x.callback(e.target.value)}
              />
            </FormGroup>
          );
        })}
        <Button
          block
          disabled={!validateForm()}
          type="submit"
          style ={{backgroundColor: "#c0d6df" }}
        >
          {loading ? <Spinner color="primary" /> : "sign up"}
        </Button>
      </form>
    );
  }

  return (
    <Container>
      {newUser === null ? renderForm() : renderConfirmationForm()}
      <br />
      <a href="login">i already have an account</a>
    </Container>
  );
}