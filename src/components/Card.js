import React, { useEffect} from "react";
import "../styles/card.css";
import { useBotsContext } from "../hooks/useBotContext";
import { useSelectedTMContext } from "../hooks/useSelectedTMContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Card({ input, setInput, sortedNames, setSortedNames, bgColor }) {
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
          // setNames(data)
          dispatch({ type: "SET_BOTS", payload: data });
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
      {/* <div className="card-body " style={{backgroundColor: bgColor === "" ? "#ffffff" : "#ffffff80"}}> */}
      <div className="card-body">
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
