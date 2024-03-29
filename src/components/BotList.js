import React, { useEffect} from "react";
import { useBotsContext } from "../hooks/useBotContext";
import { useSelectedTMContext } from "../hooks/useSelectedTMContext";
import "../styles/roster.css";
import '../styles/card.css';
import { useAuthContext } from "../hooks/useAuthContext";

const BotList = ({
  sortedNames,
  setSortedNames,
  selectedBot,
  setSelectedBot,
  allowAddBot,
  setAllowAddBot,
  setInput,
  setShowForm
}) => {
  const { names, dispatch } = useBotsContext();
  const { selectedTourney } = useSelectedTMContext();
  const {user} = useAuthContext();

  // selects the clicked bot
  const handleSelectBot = (name) => {
    setSelectedBot(name);
    if (!allowAddBot){
      setAllowAddBot(true);
      setShowForm(false);
      setInput({});
    }
  }

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
            (bot) => (bot = { _id: bot._id, title: bot.title, chip: bot.chip, teamname: bot.teamname, weightclass: bot.weightclass, signature: bot.signature })
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
    <div className="TM-scroll-box">
      {selectedTourney._id !== "Default" &&
        <div className="count-box">
          Total Bots: {sortedNames.length}
        </div>
      }
      {sortedNames.map((name) =>
        selectedBot && selectedBot._id === name._id ? (
          <li
            className="list-item container roster-list-item-selected"
            key={name._id}
          >
            {name.title}
            <div>{name.chip} &nbsp;</div>
          </li>
        ) : (
          <li
            className="list-item container"
            onClick={() => {handleSelectBot(name);}}
            key={name._id}
          >
            {name.title}
            <div>{name.chip} &nbsp;</div>
          </li>
        )
      )}
    </div>
  );
};

export default BotList;
