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

function LoginView(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const forms = [
    { text: "Email", name: "email", callback: setEmail },
    { text: "Password", name: "password", callback: setPassword }
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

  async function handleFacebookLogin(response) {
    const { error, name, userID, accessToken, expiresIn } = response;
    const userEmail = response.email;
    if (!error) {
      if (name && userEmail && userID) {
        try {
          await Auth.federatedSignIn("facebook",
            { accessToken, expiresIn: (expiresIn * 1000 + new Date().getTime()) }
          );
         
        } catch (error) {
          alert("Could not sign in with facebook.");
        }
      } else {
        alert("Could not sign in with facebook.");
      }
    }
  }

  async function handleGoogleLogin(response) {
    if (!response.error) {
      try {
        await Auth.federatedSignIn(
          "google", {
            accessToken: response.accessToken.toString(),
            expiresIn: (response.Zi.expires_in * 1000 + new Date().getTime())
          });
        // await handleNewSocialMediaSignIn({
        //   userFirstName: response.profileObj.givenName,
        //   userLastName: response.profileObj.familyName,
        //   userEmail: response.profileObj.email,
        //   password: "X!" + md5(response.El)
        // });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
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
          disabled={!formEmpty() || loading}
          type="submit"
          onClick={() => handleSignIn(email, password)}
        >
          {loading ? <Spinner color="primary" /> : "Login"}
        </Button>
      </form>
      <br />
      <a href="signup">New user? Sign up here!</a>
    </Container>
  );
}

export default LoginView;