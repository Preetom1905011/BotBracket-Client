import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBotsContext } from "../hooks/useBotContext";
import { useTMContext } from "../hooks/useTMContext";
import { useMatchesContext } from "../hooks/useMatchContext";
import { useSelectedTMContext } from "../hooks/useSelectedTMContext";

export default function TMAddForm({ setError, setAllowAddTM, setShowTMForm }) {
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

    console.log(styleTourney, sizeTourney);

    // add Tournament to DB
    const newTourney = {
      name: inputTourney,
      participantIDs: [],
      matchIDs: [],
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
        payload: { _id: json._id, name: newTourney.name, public: json.public },
      });
      selectDispatch({
        type: "UPDATE_TM",
        payload: { _id: json._id, name: newTourney.name, public: json.public },
      });
      matchDispatch({
        type: "SET_MATCHES",
        payload: newTourney.matchIDs,
      });

      setAllowAddTM(true);
      setShowTMForm(false);
      setError(null);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();

    setAllowAddTM(true);
    setShowTMForm(false);
    setInputTourney({ name: "", _id: "" });
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
        <div>
          <label>Tournament Style :</label>
          <select
            name="tourneyStyle"
            value={styleTourney}
            onChange={(e) => setStyleTourney(e.target.value)}
          >
            <option value="Token">Token Based</option>
            <option value="Single" >Single Elimination</option>
            <option value="Double" >Double Elimination</option>
          </select>
        </div>
        <div>
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
        <div>
          <button type="submit">Add</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
