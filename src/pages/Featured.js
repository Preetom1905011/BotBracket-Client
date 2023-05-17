import React, { useEffect, useState } from "react";
import "../styles/featured.css";
import { CSSTransition } from "react-transition-group";
import FeaturedCard from "../components/FeaturedCard";
import logo from "../media/scrappyhead_sticker_purple2.png";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { RiseLoader} from "react-spinners";
import loadScrappy from "../media/Scrappy2_loading.png";

export default function Featured() {
  const [allPubTMs, setAllPubTMs] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(null);

  // get all the tournaments that are public
  useEffect(() => {
    // fetch all the userIDs
    setIsFetching(true);

    const fetchData = async () => {
      const responseUser = await fetch(process.env.REACT_APP_URL + "/api/user");
      const jsonUser = await responseUser.json();

      setAllUsers(jsonUser);

      Promise.all(
        jsonUser.map((user) =>
          fetch(
            process.env.REACT_APP_URL + "/api/tournaments/Users/" + user["_id"]
          )
        )
      )
        .then(function (responses) {
          // Get a JSON object from each of the responses
          return Promise.all(
            responses.map(function (response) {
              return response.json();
            })
          );
        })
        .then(function (data) {
          // Log the data to the console
          setIsFetching(false);
          let pubTM = [];
          data.forEach((d) => {
            Array.prototype.push.apply(pubTM, d);
          });
          // update state of allPubTMs
          setAllPubTMs(
            pubTM.sort((p1, p2) =>
              p1.createdAt > p2.createdAt
                ? -1
                : p1.createdAt < p2.createdAt
                ? 1
                : 0
            )
          );
        })
        .catch(function (error) {
          // if there's an error, log it
          setIsFetching(false);
          console.log(error);
        });
    };

    fetchData();
  }, []);

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
              <img src={logo} />
              <h4>Check out some of the awesome tournaments managed using</h4>
              <h2>BotBracket</h2>
              <img src={logo} />
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
              <FeaturedCard TM={TM} allUsers={allUsers} />
            ))}

            {isFetching && <div className="feature-loader">
                            <img src={loadScrappy}/>
                            <RiseLoader
                              color={"#00375e"}
                              loading={isFetching}
                              size={50}/></div>}
          </div>
        </CSSTransition>
      </div>
      

      <a href="#navbar">
        <ArrowUpwardIcon className="arrow" />
      </a>
    </div>
  );
}
