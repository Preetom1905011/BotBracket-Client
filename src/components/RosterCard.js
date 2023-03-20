import React, { useState } from "react";
import "../styles/roster.css";
import { useBotsContext } from "../hooks/useBotContext";
import { useSelectedTMContext } from "../hooks/useSelectedTMContext";
import BotCard from "./BotCard";
import { useAuthContext } from "../hooks/useAuthContext";

export default function RosterCard({
  sortedNames,
  setSortedNames,
  showForm,
  setShowForm,
  handleAllowAdd,
  input,
  setInput,
  selectedBot,
  setSelectedBot,
}) {
  // const [error, setError] = useState(null);
  const { names, dispatch } = useBotsContext();
  const { selectedTourney } = useSelectedTMContext();
  const {user} = useAuthContext();

  const [inputWeight, setInputWeight] = useState("3lb");
  const [error, setError] = useState(null);

  const onInputChange = (event) => {
    // setInput(event.target.value);
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  // Only submit and add to DB when everything is filled up
  // No need to store all value in DB, only -> botname, chipnum, teamname, weightclass, signature
  const onFormSubmit = async (event) => {
    // add to the DB
    event.preventDefault();
    handleAllowAdd();

    if (!user) {
      setError('You must be logged in')
      return
    }

    // incorporate the teamname, signature (and inputWeight separately) here
    // change the botSchema
    const { botname, chipnum, teamname, signature } = input;
    const newName = { title: botname, chip: chipnum, teamname: teamname, weightclass: inputWeight, signature: signature };
    console.log(newName);
    console.log("input", input);

    // add to bots DB
    const response = await fetch(process.env.REACT_APP_URL+"/api/participants", {
      method: "POST",
      body: JSON.stringify(newName),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error)
    } else {
      // setError(null);
      console.log("New Bot Added");
      // setInput({ botname: "", chipnum: input.chipnum });
      setInput({ botname: "", chipnum: 1 });
      setInputWeight("3lb");
      dispatch({
        type: "ADD_BOT",
        payload: { _id: json._id, title: json.title, chip: json.chip, teamname: json.teamname, weightclass: json.weightclass, signature: json.signature },
      });
    }
    // select the newly added bot
    setSelectedBot({ _id: json._id, title: json.title, chip: json.chip, teamname: json.teamname, weightclass: json.weightclass, signature: json.signature });

    // add bot id to the selectedTournament
    const responseTM = await fetch(
      process.env.REACT_APP_URL+"/api/tournaments/bots/" + selectedTourney._id,
      {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`
        },
      }
    );
    // const jsonTM = await response.json()
    // setError(null)

  };

  const handleSortName = (names) => {
    // // set the state to the newly created sorted array with the three dots operator:
    setSortedNames([...names].sort((a, b) => b.chip - a.chip));
  };

  return (
    <div className="roster-bg">
      <div className="roster-header">
        {selectedTourney._id === "Default" ? (
          <h3>No Tournament Selected</h3>
        ) : (
          <h3>{selectedTourney.name}</h3>
        )}
      </div>
      {error && <div className="login-error">{error}</div>}
      {selectedBot === null? (
        <>
        {showForm && selectedTourney._id !== "Default" ? (
          <form onSubmit={onFormSubmit} onChange={onInputChange}>
            <div className="form-container">
              <input
                type="text"
                placeholder="Enter Bot Name"
                name="botname"
                className="bot-input"
                autoComplete="off"
                value={input.botname}
                required
              />
              <input
                type="number"
                placeholder="Chip"
                name="chipnum"
                className="num-input"
                autoComplete="off"
                value={input.chipnum}
                min="0"
                required
              />
            </div>

            <div className="form-body">
              <h3>Safety Checklist</h3>
              <div className="form-container form-in-2">
                <label>Team Name</label>
                <input type="text" name="teamname" autoComplete="off" required />
              </div>
              <br />
              <div className="form-container radio-bts">
                <h6>Weight Class:</h6>
                <div className="rb">
                  <label>150 g</label>
                  <input type="radio" value="150g" checked={inputWeight === "150g"} onChange={(e) => setInputWeight(e.target.value)}/>
                </div>
                <div className="rb">
                  <label>1 lb</label>
                  <input type="radio" value="1lb" checked={inputWeight === "1lb"} onChange={(e) => setInputWeight(e.target.value)}/>
                </div>
                <div className="rb">
                  <label>3 lb</label>
                  <input type="radio" value="3lb" checked={inputWeight === "3lb"} onChange={(e) => setInputWeight(e.target.value)}/>
                </div>
              </div>
              <div className="form-container checkbox-grid">
                <div className="safety-cb">
                  <label>Under Weight</label>
                  <input type="checkbox" required />
                </div>
                <div className="safety-cb">
                  <label>Sharp Edges Covered</label>
                  <input type="checkbox" required />
                </div>
                <div className="safety-cb">
                  <label>Weapon Lock</label>
                  <input type="checkbox" required />
                </div>
                <div className="safety-cb">
                  <label>Batteries Protected</label>
                  <input type="checkbox" required />
                </div>
                <div className="safety-cb">
                  <label>Power Switch/Lock</label>
                  <input type="checkbox" required />
                </div>
                <div className="safety-cb">
                  <label>2.4Hz Radio</label>
                  <input type="checkbox" required />
                </div>
              </div>
              <div className="safety-cb">
                <label>Weapon Failsafe</label>
                <input type="checkbox" required />
              </div>
              <br />
              <div className="form-container sign-field">
                <label>Inspector's Signature</label>
                <input type="text" name="signature" autoComplete="off" required />
                <button className="button-style" type="submit">
                  Add
                </button>
                <button className="button-style" onClick={handleAllowAdd}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <h3></h3>
        )} </>): <BotCard selectedBot={selectedBot} setSelectedBot={setSelectedBot}/>}
    </div>
  );
}
