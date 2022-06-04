import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Amplify, {Auth} from "aws-amplify";
import awsconfig from "./aws-exports";
import Navigation from "./components/Navbar";
import { BrowserRouter, withRouter} from "react-router-dom";
import Routing from "./components/Routing";
import React, {useState, useEffect} from "react"
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
      // if (e !== "no current user") {
      //   alert(e);
      // }
    }
    setIsAuthenticating(false);
  }
  useEffect(() => {
    getAuthStatus();
  }); 

  // async function handleLogout() {
  //     // await Auth.signOut();
      
  //     Auth.signOut().then(()=>
  //     window.location.reload(false));
      
  //     setAuthenticated(false);
  //     props.history.push("/login"); 
  // }



  return (
    !isAuthenticating &&
    <div className="App">
        <BrowserRouter>
      <Navigation authed={authenticated} />
      <div className="body-container">
          <Routing appProps={{ authenticated, setAuthenticated }} />
      </div>
        </BrowserRouter>
    </div>
  );
}

export default withRouter(App);
