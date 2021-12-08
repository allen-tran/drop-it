import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Navigation from "./components/Navbar";
import UploadView from "./components/UploadView";
import FileList from "./components/FileList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeView from "./components/HomeView";
Amplify.configure(awsconfig);

function App(props) {

  // const [authenticated, setAuthenticated] = useState(false);
  // const [isAuthenticating, setIsAuthenticating] = useState(true);

  // async function getAuthStatus() {
  //   try {
  //     await Auth.currentSession();
  //     setAuthenticated(true);
  //   }
  //   catch (e) {
  //     if (e !== "No current user") {
  //       alert(e);
  //     }
  //   }
  //   setIsAuthenticating(false);
  // }

  // async function handleLogout() {
  //   await Auth.signOut();
  //   setAuthenticated(false);
  //   props.history.push("/login");
  // }
  return (
    <div className="App">
      <Navigation />

      <div className="body-container">
        <BrowserRouter>
          <Routes>
            <Route path="/drop" element={<UploadView />} />
            <Route path= "/" element={<FileList/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
