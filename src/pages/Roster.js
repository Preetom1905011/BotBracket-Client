import React, { useState, useEffect } from "react";
import RosterCard from "../components/RosterCard";
import RosterList from "../components/RosterList";
import { useBotsContext } from "../hooks/useBotContext";
import { useSelectedTMContext } from "../hooks/useSelectedTMContext";
import "../styles/base.css";
import "../styles/card.css";
import "../styles/roster.css";
import { CSSTransition } from "react-transition-group";

export default function Roster() {
  const [input, setInput] = useState({});
  const [sortedNames, setSortedNames] = useState([]);
  const { names, dispatch } = useBotsContext();

  const [allowAddBot, setAllowAddBot] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedBot, setSelectedBot] = useState(null);
  const { selectedTourney } = useSelectedTMContext();

  const handleAllowAdd = (e) => {
    console.log(selectedTourney);
    if (selectedTourney._id !== "Default"){
      
      setAllowAddBot(!allowAddBot);
      setShowForm(!showForm);
      setInput({});
      setSelectedBot(null);
    
    }
    else{
      alert("Select a Tournament First");
    }
  };

  return (
    <div className="background-style-all">
      <div className="side-grid-main">
        <CSSTransition
          appear
          in
          classNames="rosterList-transition"
          timeout={350}
        >
          <RosterList
            allowAddBot={allowAddBot}
            setAllowAddBot={setAllowAddBot}
            sortedNames={sortedNames}
            setSortedNames={setSortedNames}
            selectedBot={selectedBot}
            setSelectedBot={setSelectedBot}
            handleAllowAdd={handleAllowAdd}
            setInput={setInput}
            setShowForm={setShowForm}
          ></RosterList>
        </CSSTransition>

        <CSSTransition
          appear
          in
          classNames="rosterScene-transition"
          timeout={350}
        >
          <RosterCard
            sortedNames={sortedNames}
            setSortedNames={setSortedNames}
            showForm={showForm}
            setShowForm={setShowForm}
            handleAllowAdd={handleAllowAdd}
            input={input}
            setInput={setInput}
            selectedBot={selectedBot}
            setSelectedBot={setSelectedBot}
          />
        </CSSTransition>
      </div>

      <div className="footer">
        <p>Combat Ready Robotics @ ASU</p>
      </div>
    </div>
  );
}
