import React from "react";
import { NavLink } from "react-router-dom";

import CenteredModal from "../Modal/CenteredModal";

import classes from "./Navbar.module.css";
import { Container, Nav, Navbar } from "react-bootstrap";

import { FaReact } from "react-icons/fa";

const NavigationBar = () => {
  return (
    <Navbar
      fixed="top"
      collapseOnSelect
      expand="lg"
      className={classes.navbar_bacgkround}
    >
      <Container style={{ padding: "0px" }}>
        <Nav>
          <NavLink className={classes.nav_links} to="/">
            <FaReact size={40} />
          </NavLink>
        </Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className={classes.collapse}
          id="responsive-navbar-nav"
        >
          <Nav className="me-auto">
            <NavLink className={classes.nav_links} to="/top-animes">
              Top Anime/Manga
            </NavLink>
            <NavLink className={classes.nav_links} to="/recent-episodes">
              Recent Episodes
            </NavLink>

            <NavLink className={classes.nav_links} to="/reviews">
              User Reviews
            </NavLink>
            <NavLink className={classes.nav_links} to="/magazines">
              Magazines
            </NavLink>
          </Nav>
          <Nav>
            <div className={classes.nav_linksRight}>
              <CenteredModal />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
