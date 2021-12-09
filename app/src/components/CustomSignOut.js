import React from "react";
import { Auth } from "aws-amplify";
import * as ReactStrap from "reactstrap";
function CustomSignOut(props) {
  const signOut = (e) => {
    e.preventDefault();
    Auth.signOut().then(()=>
    window.location.reload(false));
  };
  return <ReactStrap.NavItem 
    // {/* <ReactStrap.NavLink href="/login" */}
  onClick={signOut}>

  sign out
    {/* </ReactStrap.NavLink> */}
    </ReactStrap.NavItem>;
}

export {CustomSignOut};
