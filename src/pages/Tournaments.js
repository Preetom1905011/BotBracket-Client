import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { UserContext } from "../App";
import { useContext } from "react";
import TourneyList from "../components/TourneyList";
import { useBotsContext } from "../hooks/useBotContext";
import { useSelectedTMContext } from "../hooks/useSelectedTMContext";
import { useTMContext } from "../hooks/useTMContext";
import { useMatchesContext } from "../hooks/useMatchContext";
import { CSSTransition } from "react-transition-group";
import TMScene from "../components/TMScene";
import "../styles/tournament.css";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Tournaments() {
  const { dispatch: botDispatch } = useBotsContext();
  const { selectedTourney, dispatch: selectDispatch } = useSelectedTMContext();
  const { allTournaments, dispatch: allTMDispatch } = useTMContext();
  const { matches, dispatch: matchDispatch } = useMatchesContext();
  const [allowAddTM, setAllowAddTM] = useState(true);
  const [inputTourney, setInputTourney] = useState("");
  const [error, setError] = useState(null);
  const {user} = useAuthContext();

  const handleAddConfirm = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in')
      return 
    }
    // add Tournament to DB
    const newTourney = { name: inputTourney, participantIDs: [], matchIDs: [] };
    const response = await fetch(process.env.REACT_APP_URL+"/api/tournaments", {
      method: "POST",
      body: JSON.stringify(newTourney),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
    });
    const json = await response.json();
    console.log("Adding", json)
    if (!response.ok) {
      setError(json.error)
    } else {
      console.log("New Tournament Added");
      setInputTourney({ name: "", _id: "" });
      // const data = json.map((bot)=> bot = {_id: bot._id, name: bot.name, chip: bot.chip})
      botDispatch({ type: "SET_BOTS", payload: newTourney.participantIDs });
      allTMDispatch({
        type: "ADD_TM",
        payload: { _id: json._id, name: newTourney.name },
      });
      selectDispatch({
        type: "UPDATE_TM",
        payload: { _id: json._id, name: newTourney.name },
      });
      matchDispatch({
        type: "SET_MATCHES",
        payload: newTourney.matchIDs
      });

      setAllowAddTM(true);
      setError(null)
    }
  };

  const handleCancel = (e) => {
    setAllowAddTM(true);
    setInputTourney({ name: "", _id: "" });
  };

  return (
    <div className="background-style-all">
      <div className="side-grid-main">
        <CSSTransition appear in classNames="TMList-transition" timeout={350}>
          <div className="card-body TM-card-body">
            <h2>Tournaments</h2>
            <form className="add-TM-form" onSubmit={handleAddConfirm}>
              {allowAddTM ? (
                <button
                  className="add-TM-bt"
                  onClick={(e) => setAllowAddTM(!allowAddTM)}
                >
                  Add New Tournament
                </button>
              ) : (
                <div className="add-TM-input">
                  <input
                    type="text"
                    name="inputTourney"
                    value={inputTourney.name}
                    onChange={(e) => setInputTourney(e.target.value)}
                    autoComplete="off"
                    required
                  />
                  <button type="submit">Add</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              )}
            </form>
            {error && <div className="login-error">{error}</div>}
            <TourneyList />
          </div>
        </CSSTransition>
        <CSSTransition appear in classNames="TMScene-transition" timeout={350}>
          <TMScene />
        </CSSTransition>
      </div>

      <div className="footer">
        <p>Combat Ready Robotics @ ASU</p>
      </div>
    </div>
  );
}
