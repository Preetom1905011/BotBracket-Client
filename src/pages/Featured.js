import React, { useEffect, useState } from "react";
import "../styles/featured.css";
import { CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import FeaturedCard from "../components/FeaturedCard";
import logo from "../media/scrappyhead_sticker_purple2.png";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { RiseLoader} from "react-spinners";
import loadScrappy from "../media/Scrappy2_loading.png";

export default function Featured() {
  const location = useLocation();

  const { allPubTMs, allUsers, isFetching } = location.state;

  return (
    <div className="featured-page">
      <div className="featured background-style-all">
        <CSSTransition
          appear
          in
          classNames="featureLeft-transition"
          timeout={350}
        >
          <div className="featured-left">
            <div className="featured-text">
              {/* <img src={logo} /> */}
              <h4>Check out some of the awesome tournaments managed using</h4>
              <h2>BotBracket</h2>
              {/* <img src={logo} /> */}
            </div>
          </div>
        </CSSTransition>

        <CSSTransition
          appear
          in
          classNames="featureScene-transition"
          timeout={350}
        >
          <div className="featured-scene">
            {allPubTMs.map((TM) => (
              <FeaturedCard TM={TM} allUsers={allUsers} key={TM?._id}/>
            ))}

            {isFetching && <div className="feature-loader">
                            <img src={loadScrappy}/>
                            <RiseLoader
                              color={"#00375e"}
                              loading={isFetching}
                              className="loader"
                              size={30}/></div>}
          </div>
        </CSSTransition>
      </div>
      

      <a href="#navbar">
        <ArrowUpwardIcon className="arrow" />
      </a>
    </div>
  );
}
