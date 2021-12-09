import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Amplify, {Auth} from "aws-amplify";
import awsconfig from "./aws-exports";
import Navigation from "./components/Navbar";
import { BrowserRouter, Switch, withRouter} from "react-router-dom";
import Routing from "./components/Routing";
import React, {useState} from "react"
Amplify.configure(awsconfig);

function App(props) {

  const [authenticated, setAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  async function getAuthStatus() {
    try {
      await Auth.currentSession();
      setAuthenticated(true);
    }
    catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    setAuthenticated(false);
    props.history.push("/login");
  }
  return (
    <div className="App">
      <Navigation authed={authenticated} handleLogout={handleLogout}/>
      <div className="body-container">
        <BrowserRouter>
          <Routing appProps={{ authenticated, setAuthenticated }} />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default withRouter(App);
