import React from "react";
import "../styles/card.css";
import "../styles/roster.css";
import BotList from "./BotList";

export default function RosterList({
  allowAddBot,
  setAllowAddBot,
  sortedNames,
  setSortedNames,
  handleAllowAdd,
  selectedBot,
  setSelectedBot,
  setInput,
  setShowForm,
  error
}) {
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

        {error && <div className="login-error">{error}</div>}
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
