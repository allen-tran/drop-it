import React from "react";
import { Auth } from "aws-amplify";
import * as ReactStrap from "reactstrap";
function CustomSignOut() {
  const signOut = (e) => {
    e.preventDefault();
    Auth.signOut().then(()=>
    window.location.reload(false));
  };
  return <ReactStrap.NavItem onClick={signOut}>sign out</ReactStrap.NavItem>;
}

export {CustomSignOut};
