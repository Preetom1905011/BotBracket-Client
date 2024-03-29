import React, { useState, useEffect, useCallback } from "react";
import { useBotsContext } from "../hooks/useBotContext";
import { useSelectedTMContext } from "../hooks/useSelectedTMContext";
import { useTMContext } from "../hooks/useTMContext";
import { useMatchesContext } from "../hooks/useMatchContext";
import { PencilSquare, Save, Lock, Unlock } from "react-bootstrap-icons";
import "../styles/tournament.css";
import { useAuthContext } from "../hooks/useAuthContext";
import TMAddForm from "../components/TMAddForm";
import { RiseLoader} from "react-spinners";
import loadScrappy from "../media/Scrappy2_loading.png";

export default function TMScene({
  visPublic,
  setVisPublic,
  allowAddTM,
  setAllowAddTM,
  showTMForm,
  setShowTMForm,
  setError,
  bgColor
}) {
  const { names, dispatch } = useBotsContext();
  const { selectedTourney, dispatch: selectDispatch } = useSelectedTMContext();
  const { allTournaments, dispatch: allTMDispatch } = useTMContext();
  const { matches, dispatch: matchDispatch } = useMatchesContext();
  const [sortedNames, setSortedNames] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    setSortedNames([...names].sort((a, b) => b.chip - a.chip));
  }, [names]);

  const [editing, setEditing] = useState({
    allowEdit: true,
    id: null,
  });
  const [newTourney, setNewTourney] = useState({});
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
  });

  const handleEdit = ({ _id }) => {
    setEditing({ allowEdit: true, id: _id });
    const editedTM = allTournaments.find((TM) => TM._id === _id);
    setNewTourney({ name: editedTM.name });
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!user) {
      return;
    }

    const response = await fetch(
      process.env.REACT_APP_URL + "/api/tournaments/" + editing.id,
      {
        method: "PATCH",
        body: JSON.stringify(newTourney),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      allTMDispatch({ type: "EDIT_TM", payload: json });
    }

    setEditing({ allowEdit: true, id: null });

    // update SelectedTourney Too - NO - just the dispatch part
    selectDispatch({ type: "UPDATE_TM", payload: json });
  };

  const handleChange = (event) => {
    setNewTourney((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    const fetchTMparts = async () => {
      if (!user) {
        return;
      }
    
      if (selectedTourney._id !== "Default") {
        dispatch({ type: "SET_BOTS", payload: [] });
        matchDispatch({ type: "SET_MATCHES", payload: [] });
        // setIsLoading(true);
        const fetchBots = fetch(
          process.env.REACT_APP_URL + "/api/tournaments/bots/" + selectedTourney._id,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
    
        const fetchMatches = fetch(
          process.env.REACT_APP_URL + "/api/tournaments/matches/" + selectedTourney._id,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
    
        const [response2, response3] = await Promise.all([fetchBots, fetchMatches]);
    
        const json2 = await response2.json();
        const json3 = await response3.json();
    
        if (response2.ok) {
          // setIsLoading(false);
          const data = json2.map((bot) => ({
            _id: bot._id,
            title: bot.title,
            chip: bot.chip,
          }));
          // setNames(data)
          dispatch({ type: "SET_BOTS", payload: data });

        } else {
          // setIsLoading(false);
          console.log("failed");
        }
    
        if (response3.ok) {
          // setIsLoading(false);
          // setNames(data)
          matchDispatch({ type: "SET_MATCHES", payload: json3 });
        } else {
          // setIsLoading(false);
          console.log("failed");
        }
      }
    };
    
    fetchTMparts();
    
  }, [selectedTourney, user]);

  // This will show the Cofirmation Box
  const handleDelete = ({ _id }) => {
    setPopup({
      show: true,
      id: _id,
    });
  };

  // This will perform the deletion and hide the Confirmation Box
  const handleDeleteTrue = async () => {
    if (!user) {
      return;
    }
    setIsLoading(true);
    if (popup.show && popup.id) {
      const response = await fetch(
        process.env.REACT_APP_URL + "/api/tournaments/" + popup.id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      // update the TM list
      allTMDispatch({ type: "DELETE_TM", payload: json });
      // set selected tourney to default --- HOW DO I DO THIS - OFCOURSE YOU DUMMY, ADD A CONDITION IN THE USEEFFECT
      // SO IT DOESN'T MOUNT WHEN DEFAULT
      selectDispatch({
        type: "UPDATE_TM",
        payload: { _id: "Default", name: "Default", public: false },
      });
      // set the names and matches to be empty arrays
      dispatch({ type: "RESET_BOTS", payload: [] });
      matchDispatch({ type: "SET_MATCHES", payload: [] });

      setPopup({
        show: false,
        id: null,
      });

      // Delete all the participants from bot DB - update DELETE BOT to DELETE BOTS in context and add a deleteMultipleBots in controller
      const response2 = await fetch(
        process.env.REACT_APP_URL + "/api/participants/",
        {
          method: "DELETE",
          body: JSON.stringify(json),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json2 = await response2.json();

      // Delete all the matches from matches DB -
      const response3 = await fetch(
        process.env.REACT_APP_URL + "/api/matches",
        {
          method: "DELETE",
          body: JSON.stringify(json),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json3 = await response3.json();
    }

    setIsLoading(false);
  };

  // This will just hide the Confirmation Box when user clicks "No"/"Cancel"
  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
    });
  };

  // update Visibility of the Tournament and update the DB
  const handleVisibility = async () => {
    setVisPublic(!visPublic);

    const editedTM = allTournaments.find(
      (TM) => TM._id === selectedTourney._id
    );
    const response = await fetch(
      process.env.REACT_APP_URL + "/api/tournaments/" + selectedTourney._id,
      {
        method: "PATCH",
        body: JSON.stringify({ ...editedTM, public: !visPublic }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      allTMDispatch({ type: "EDIT_TM", payload: json });
      selectDispatch({ type: "UPDATE_TM", payload: json });
    }
  };

  return (
    <div className="TM-scene">
      <div className="TM-header">
        {editing.id === selectedTourney._id ? (
          <form
            className="TM-edit-form"
            onSubmit={handleSave}
            onChange={handleChange}
          >
            <input
              type="text"
              name="name"
              className="tournament-edit-input"
              value={newTourney.name}
              autoComplete="off"
              required
            />
            <Save className="button-sv TM-sv" onClick={handleSave}></Save>
          </form>
        ) : (
          <h2>
            {selectedTourney._id === "Default" ? (
              "No Tournament Selected"
            ) : (
              <>
                {selectedTourney.name} Scoreboard
                <PencilSquare
                  className="button-del-ed TM-edit"
                  onClick={() => handleEdit(selectedTourney)}
                />
                {selectedTourney.public ? (
                  <Unlock
                    className="lock-icon"
                    onClick={(e) => handleVisibility(e)}
                  />
                ) : (
                  <Lock
                    className="lock-icon"
                    onClick={(e) => handleVisibility(e)}
                  />
                )}
              </>
            )}
          </h2>
        )}
      </div>

      {!showTMForm ? (
        <div className="TM-details">
          <div className="TM-grid">
            <div>
              <h3>Leaderboard</h3>
              {selectedTourney._id !== "Default" &&
                <div className="count-box matches-count">
                  Total Bots: {sortedNames.length}
                </div>
              }
            </div>
            <div>
              <h3>Match History</h3>
              {selectedTourney._id !== "Default" &&
                <div className="count-box TM-matches-count">
                  Total Matches: {matches.length}
                </div>
              } 
            </div>
          </div>
          <div className="TM-grid scroll">
            <div className="TM-leaderboard" style={{backgroundColor: bgColor}}>
              {sortedNames.map((name) => (
                <li className="TM-leader-list container" key={name._id}>
                  {name.title}
                  <div>{name.chip}</div>
                </li>
              ))}
            </div>
            <div className="TM-matchHist" style={{backgroundColor: bgColor}}>
              {matches.map((match) => (
                <li className="match-hist-list TM-hist-list" key={match._id}>
                  <div
                    className={
                      Number(match.redScore) < 0 || match.redScore === "-0"
                        ? "match-list-each list-each-lose"
                        : "match-list-each list-each-win"
                    }
                  >
                    <span>{match.red}</span>
                    {match.redScore}
                  </div>
                  <div
                    className={
                      Number(match.blueScore) < 0 || match.blueScore === "-0"
                        ? "match-list-each list-each-lose"
                        : "match-list-each list-each-win"
                    }
                  >
                    <span>{match.blueScore}</span>
                    <span>{match.blue}</span>
                  </div>
                </li>
              ))}
            </div>
          </div>
          <div className="TM-scene-bottom">
            {!popup.show ? (
              <button
                className="TM-del-bt"
                onClick={() => handleDelete(selectedTourney)}
                disabled={selectedTourney._id === "Default" ? true : false}
              >
                Delete Tournament
              </button>
            ) : (
              <>
                <div className="popup-box TM-popup">
                  <p>Remove {selectedTourney.name}?</p>
                  <div>
                    <button
                      className="check-button TM-check-cancel"
                      onClick={handleDeleteTrue}
                      disabled={isLoading}
                    >
                      Confirm
                    </button>
                    <button
                      className="cancel-button TM-check-cancel"
                      onClick={handleDeleteFalse}
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <TMAddForm setError={setError} setAllowAddTM={setAllowAddTM} setShowTMForm={setShowTMForm} isLoading={isLoading} setIsLoading={setIsLoading}/>
      )}
      {isLoading && <div className="feature-loader">
                      <img src={loadScrappy}/>
                      <RiseLoader
                        color={"#00375e"}
                        loading={isLoading}
                        className="loader"
                        size={30}/></div>}
    </div>
  );
}
