import React from "react";
import * as ReactStrap from "reactstrap";
import "./Navbar.css";
import { CustomSignOut } from "./CustomSignOut";
const NavBar = (props) => {
  const navLinks = [
    { name: "drop file", link: "drop" },
    { name: "view files", link: "/" },
  ];
  return (
    <div className="user-nav">
      <ReactStrap.Navbar dark expand="md" variant="light">
        <ReactStrap.NavbarBrand
          className="logo d-flex align-items-end"
          href="/"
        >
          drop it!
        </ReactStrap.NavbarBrand>
        <ReactStrap.Nav className="ml-auto the-nav" navbar>
          {navLinks.map((option, index) => {
            return (
              <ReactStrap.NavItem key={index}>
                <ReactStrap.NavLink href={option.link}>
                  {option.name}
                </ReactStrap.NavLink>
              </ReactStrap.NavItem>
            );
          })}
          <ReactStrap.NavLink>
            <CustomSignOut />
          </ReactStrap.NavLink>
        </ReactStrap.Nav>
      </ReactStrap.Navbar>
    </div>
  );
};

export default NavBar;
