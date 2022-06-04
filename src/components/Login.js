import React, { useState } from "react";
import {
  Container,
  Button,
  FormGroup,
  Input,
  Label,
  Spinner
} from "reactstrap";
import { Auth } from "aws-amplify";
import "./Login.css";

function LoginView(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const forms = [
    { text: "email", name: "email", callback: setEmail },
    { text: "password", name: "password", callback: setPassword }
  ];

  async function handleSignIn() {
    setLoading(true);
    try {
      await Auth.signIn(email, password);
      props.setAuthenticated(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setLoading(false);
    }
  }

  function formEmpty() {
    return email.length && password.length;
  }

  return (
    <Container>
      <form onSubmit={(e) => { e.preventDefault(); }}>
        {forms.map((x, index) => {
          return (
            <FormGroup key={index}>
              <Label>{x.text}</Label>
              <Input
                autoFocus
                name={x.name}
                type={x.name}
                onChange={(e) => x.callback(e.target.value)}
              />
            </FormGroup>
          );
        })}
        <Button
          block
          className="login-button"
          disabled={!formEmpty() || loading}
          type="submit"
          onClick={() => handleSignIn(email, password)}
        >
          {loading ? <Spinner color="primary" /> : "login"}
        </Button>
      </form> 
      <br />
      <a href="signup">new user? sign up here!</a>
    </Container>
  );
}

export default LoginView;