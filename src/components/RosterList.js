import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/card.css";
import "../styles/roster.css";
import BotList from "./BotList";
import { useBotsContext } from "../hooks/useBotContext";
import { useSelectedTMContext } from "../hooks/useSelectedTMContext";

export default function RosterList({
  allowAddBot,
  setAllowAddBot,
  sortedNames,
  setSortedNames,
  handleAllowAdd,
  selectedBot,
  setSelectedBot,
  setInput,
  setShowForm
}) {
  // const [error, setError] = useState(null);
  const { names, dispatch } = useBotsContext();
  const { selectedTourney } = useSelectedTMContext();

  return (
    <>
      <div className="card-body rosterlist-body">
        <h2>Participants</h2>
        {allowAddBot ? (
          <button className="allow-roster-bt" onClick={handleAllowAdd}>
            Add New Bot
          </button>
        ) : (
          <div className="label-roster">Fill out the form
          </div>
        )}
        <BotList
          sortedNames={sortedNames}
          setSortedNames={setSortedNames}
          selectedBot={selectedBot}
          setSelectedBot={setSelectedBot}
          allowAddBot={allowAddBot}
          setAllowAddBot={setAllowAddBot}
          setInput={setInput}
          setShowForm={setShowForm}
        />
      </div>
    </>
  );
}
