import React from "react";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import classes from "./Footer.module.css";

import Container from "react-bootstrap/Container";

const Footer = () => {
  return (
    <Container fluid className={classes.main_container}>
      <Container style={{ padding: "0px" }}>
        <div className={classes.footer_container}>
          <div>Copyright © 2022 AnimeSite.com | All Rights Reserved.</div>
          <div>
            <span className={classes.icons}>
              <InstagramIcon />
            </span>
            <span className={classes.icons}>
              <FacebookIcon />
            </span>
            <span className={classes.icons}>
              <TwitterIcon />
            </span>
            <span className={classes.icons}>
              <WhatsAppIcon />
            </span>
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default Footer;
