import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
// import { isAdmin } from "../backend/AuthFunctions";

function Navigation(props) {
  const [isOpen, toggleOpen] = useState(false);
  //   const [adminStatus, setAdminStatus] = useState(false);
  const [dropdownOpen, toggleDropdownOpen] = useState(false);
  const navLinks = [
    { name: "Upload File", link: "upload" },
    { name: "View Files", link: "/" },
  ];

  useEffect(() => {
    getAdminStatus();
  });

  async function getAdminStatus() {
    if (!props.authed) return;
    // setAdminStatus(await isAdmin());
  }

  function getDropDown() {
    if (props.authed) {
      return (
        <Dropdown
          navbar="true"
          isOpen={dropdownOpen}
          toggle={() => toggleDropdownOpen(!dropdownOpen)}
        >
          <DropdownToggle navbar="true" caret>
            Account Options
          </DropdownToggle>
          <DropdownMenu dark="true">
            <DropdownItem>
              <NavLink onClick={props.handleLogout} href="/login">
                Log out
              </NavLink>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    } else {
      return <p />;
    }
  }

  return (
    <Navbar color="dark" dark={true} expand="sm">
      <Container>
        <NavbarBrand href="/">{"Drop It"}</NavbarBrand>
        <Collapse isOpen={isOpen} navbar={true}>
          <Nav className="mr-auto" navbar>
            {props.authed &&
              //   !adminStatus &&
              navLinks.map((option, index) => {
                return (
                  <NavItem key={index}>
                    <NavLink href={option.link}>{option.name}</NavLink>
                  </NavItem>
                );
              })}
          </Nav>

          <Nav className="ml-auto" nav="true">
            {getDropDown()}
          </Nav>
        </Collapse>
        <NavbarToggler onClick={() => toggleOpen(!isOpen)} />
      </Container>
    </Navbar>
  );
}

export default Navigation;
