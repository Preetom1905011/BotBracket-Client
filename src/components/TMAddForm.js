import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBotsContext } from "../hooks/useBotContext";
import { useTMContext } from "../hooks/useTMContext";
import { useMatchesContext } from "../hooks/useMatchContext";
import { useSelectedTMContext } from "../hooks/useSelectedTMContext";

export default function TMAddForm({ setError, setAllowAddTM, setShowTMForm, isLoading, setIsLoading }) {
  const [inputTourney, setInputTourney] = useState({ name: "", _id: "" });
  const [styleTourney, setStyleTourney] = useState("Token");
  const [sizeTourney, setSizeTourney] = useState(48);

  const { user } = useAuthContext();
  const { dispatch: botDispatch } = useBotsContext();
  const { dispatch: allTMDispatch } = useTMContext();
  const { dispatch: matchDispatch } = useMatchesContext();
  const { dispatch: selectDispatch } = useSelectedTMContext();

  const handleAddConfirm = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    // add Tournament to DB
    const newTourney = {
      name: inputTourney,
      participantIDs: [],
      matchIDs: [],
      style: styleTourney,
      size: styleTourney === "Token"? 48: sizeTourney
    };
    const response = await fetch(
      process.env.REACT_APP_URL + "/api/tournaments",
      {
        method: "POST",
        body: JSON.stringify(newTourney),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    } else {
      setInputTourney({ name: "", _id: "" });
      botDispatch({ type: "SET_BOTS", payload: newTourney.participantIDs });
      allTMDispatch({
        type: "ADD_TM",
        payload: { _id: json._id, name: newTourney.name, public: json.public , style: json.style, size: json.size},
      });
      selectDispatch({
        type: "UPDATE_TM",
        payload: { _id: json._id, name: newTourney.name, public: json.public , style: json.style, size: json.size},
      });
      matchDispatch({
        type: "SET_MATCHES",
        payload: newTourney.matchIDs,
      });

      setAllowAddTM(true);
      setShowTMForm(false);
      setError(null);
    }
    setIsLoading(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();

    setAllowAddTM(true);
    setShowTMForm(false);
    setInputTourney({ name: "", _id: "" });
    // reset bot and match context
    botDispatch({type: "RESET_BOTS"});
    matchDispatch({type: "SET_MATCHES", payload: []});
  };

  return (
    <div>
      <form className="add-TM-form" onSubmit={handleAddConfirm}>
        <div className="add-TM-input">
          <label>Tournment Name : </label>
          <input
            type="text"
            name="inputTourney"
            value={inputTourney.name}
            onChange={(e) => setInputTourney(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div className="add-TM-style">
          <label>Tournament Style :</label>
          <select
            name="tourneyStyle"
            value={styleTourney}
            onChange={(e) => setStyleTourney(e.target.value)}
          >
            <option value="Token">Token Based</option>
            <option value="Single" disabled>Single Elimination (In Progress)</option>
            <option value="Double" disabled>Double Elimination (In Progress)</option>
          </select>
        </div>
        <div className="add-TM-size">
          <label>Bracket Size : &nbsp; </label>
          {(styleTourney === "Token" ? <label> 48 </label> : 
          <select
            name="tourneySize"
            value={sizeTourney}
            onChange={(e) => setSizeTourney(e.target.value)}
          >
            <option value={parseInt(8)}>8</option>
            <option value={parseInt(16)}>16</option>
            <option value={parseInt(24)}>24</option>
            <option value={parseInt(32)}>32</option>
          </select>)}
        </div>
        <div className="button-box-TM">
          <button type="submit" disabled={isLoading}>Add</button>
          <button onClick={handleCancel} disabled={isLoading}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
