import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import WindowIcon from "@mui/icons-material/Window";
import "./Footer.css"

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-links">
        <a href="https://acehacker.com/microsoft/engage2022/">
          <Typography variant="body" color="#3796b5" align="center">
            <WindowIcon /> MS ENGAGE
          </Typography>
        </a>
        <a href="https://github.com/Sumrender">
          <Typography variant="body" color="#3796b5" align="center">
            <GitHubIcon /> GITHUB
          </Typography>
        </a>
        <Link to="/contact">
          <Typography variant="body" color="#3796b5" align="center">
            <ContactSupportIcon /> CONTACT US
          </Typography>
        </Link>
      </div>
      <div className="footer-copyright">
        <Typography variant="body" sx={{ color: "#3796b5", margin: "auto" }}>
          {"Copyright © "}
          <Link color="inherit" to="/">
            faceUp!
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </div>
    </div >
  );
};

export default Footer;
