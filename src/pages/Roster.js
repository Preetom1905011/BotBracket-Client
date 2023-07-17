import React, { useState } from "react";
import RosterCard from "../components/RosterCard";
import RosterList from "../components/RosterList";
import { useSelectedTMContext } from "../hooks/useSelectedTMContext";
import { useAuthContext } from "../hooks/useAuthContext";
import "../styles/base.css";
import "../styles/card.css";
import "../styles/roster.css";
import { CSSTransition } from "react-transition-group";
import Footer from '../components/Footer';

export default function Roster() {

  const [input, setInput] = useState({});
  const [sortedNames, setSortedNames] = useState([]);
  const [error, setError] = useState(null);

  const [allowAddBot, setAllowAddBot] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedBot, setSelectedBot] = useState(null);
  const { selectedTourney } = useSelectedTMContext();
  const {user} = useAuthContext();
  const [bgColor, setBgColor] = useState(localStorage.getItem('theme') || "");

  const handleAllowAdd = (e) => {

    if (!user) {
      setError('You must be logged in')
      return
    }

    if (selectedTourney._id !== "Default"){
      
      setAllowAddBot(!allowAddBot);
      setShowForm(!showForm);
      setInput({});
      setSelectedBot(null);
      setError(null);
    
    }
    else{
      setError("Select a Tournament First");
    }
  };

  return (
    <div className="background-style-all" style={{backgroundColor: bgColor}}>
      <div className="roster-layout">
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
            error={error}
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
            setError={setError}
          />
        </CSSTransition>
      </div>
      <Footer/>
    </div>
  );
}
