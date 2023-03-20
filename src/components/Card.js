import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/card.css";
import { v4 as uuidv4 } from "uuid";
import BotList from "./BotList";
import { useBotsContext } from "../hooks/useBotContext";
import { useSelectedTMContext } from "../hooks/useSelectedTMContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Card({ input, setInput, sortedNames, setSortedNames }) {
  // const [error, setError] = useState(null);
  const { names, dispatch } = useBotsContext();
  const { selectedTourney } = useSelectedTMContext();
  const {user} = useAuthContext();

  useEffect(() => {
    setSortedNames([...names].sort((a, b) => b.chip - a.chip));
  }, [names]);

  // retrieving data from DB
  useEffect(() => {
    const fetchBots = async () => {
      if (!user) {
        return
      }
      if (selectedTourney._id !== "Default") {
        const response = await fetch(
          process.env.REACT_APP_URL+"/api/tournaments/bots/" + selectedTourney._id, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if (response.ok) {
          console.log("-->", json);
          const data = json.map(
            (bot) =>
              (bot = {
                _id: bot._id,
                title: bot.title,
                chip: bot.chip,
                teamname: bot.teamname,
                weightclass: bot.weightclass,
                signature: bot.signature,
              })
          );
          console.log("SET DATA", data);
          // setNames(data)
          dispatch({ type: "SET_BOTS", payload: data });
          console.log(names);
          setSortedNames(names);
        } else {
          console.log("failed");
        }
      }
    };

    fetchBots();
  }, [user]);

  return (
    <>
      <div className="card-body ">
        <h2>Leaderboard</h2>
        <div className="scroll-box">
          {sortedNames.map((name) => (
            <li className="TM-leader-list container" key={name._id}>
              {name.title}
              <div>{name.chip}</div>
            </li>
          ))}
        </div>
      </div>
    </>
  );
}
