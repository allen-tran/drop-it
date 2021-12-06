import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Navigation from "./components/Navbar";
import UploadView from "./components/UploadView";
// import ViewFilesView from "./components/ViewFilesView";
import { BrowserRouter, Routes, Route } from "react-router-dom";
Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <Navigation />

      <div className="body-container">
        <BrowserRouter>
          <Routes>
            <Route path="/drop" element={<UploadView />} />
            {/* <Route path= "/" element={<ViewFilesView/>}/> */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default withAuthenticator(App, false);
