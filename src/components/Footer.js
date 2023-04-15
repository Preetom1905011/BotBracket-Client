import React from "react";
import '../styles/home.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import WebIcon from '@mui/icons-material/Web';
import {FaTwitch} from 'react-icons/fa'

export default function Footer() {
  return (
    <div className="footer-home">
      <p> 
        <a href="mailto: pbiswa11@asu.edu"><EmailIcon className="icon-each icon-each-me"/></a>
        <a href="https://github.com/Preetom1905011"><GitHubIcon className="icon-each icon-each-me"/></a>
        Preetom Biswas &copy; 2023</p>
      <h7>Combat Ready Robotics @ ASU</h7>
      <div className="social-box">
        <a href="mailto: combatreadyrobotics@gmail.com"><EmailIcon className="icon-each"/></a>
        <a href="https://www.instagram.com/combatreadyrobotics/"><InstagramIcon className="icon-each"/></a>
        <a href="https://www.twitch.tv/combatreadyrobotics"><FaTwitch className="icon-each twitch-icon"/></a>
        <a href="https://combatreadyrobotics.wixsite.com/crrasu"><WebIcon className="icon-each"/></a>
        {/* <a href="https://asu.campuslabs.com/engage/organization/combat-ready-robotics"><WebIcon className="icon-each"/></a> */}
      </div>
    </div>
  );
}
