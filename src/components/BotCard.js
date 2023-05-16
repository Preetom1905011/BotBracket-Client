import React, { useState } from "react";
import { PencilSquare, Save } from "react-bootstrap-icons";
import { useBotsContext } from "../hooks/useBotContext";
import { useSelectedTMContext } from "../hooks/useSelectedTMContext";
import "../styles/roster.css";
import "../styles/card.css";
import { useAuthContext } from "../hooks/useAuthContext";

export default function BotCard({ selectedBot, setSelectedBot }) {
  const { names, dispatch } = useBotsContext();
  const { selectedTourney } = useSelectedTMContext();
  const {user} = useAuthContext()

  const [editing, setEditing] = useState({
    allowEdit: true,
    id: null,
  });
  const [newName, setNewName] = useState({});
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
  });

  // allows the editing
  const handleEdit = ({ _id }) => {
    setEditing({ allowEdit: true, id: _id });
    const editedName = names.find((name) => name._id === _id);
    
    setNewName({
      title: editedName.title,
      chip: editedName.chip,
      teamname: editedName.teamname,
      weightclass: editedName.weightclass,
      signature: editedName.signature,
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const response = await fetch(
      process.env.REACT_APP_URL+"/api/participants/" + editing.id,
      {
        method: "PATCH",
        body: JSON.stringify(newName),
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_BOT", payload: json });
    }
    setEditing({ allowEdit: true, id: null });
    setSelectedBot({
      _id: json._id,
      title: json.title,
      chip: json.chip,
      teamname: json.teamname,
      weightclass: json.weightclass,
      signature: json.signature,
    });
  };

  // This will show the Cofirmation Box
  const handleDelete = ({ _id }) => {
    setPopup({
      show: true,
      id: _id,
    });
    setEditing({ allowEdit: false, id: null });
  };

  // This will perform the deletion and hide the Confirmation Box
  const handleDeleteTrue = async () => {
    
    if(!user) {
      return
    }
    // reset the selected bot
    setSelectedBot(null);
    if (popup.show && popup.id) {

      const response = await fetch(
        process.env.REACT_APP_URL+"/api/participants/" + popup.id,
        {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${user.token}`
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "REMOVE_BOT", payload: json });

        const response = await fetch(
          process.env.REACT_APP_URL+"/api/tournaments/bots/" + selectedTourney._id,
          {
            method: "DELETE",
            body: JSON.stringify(json),
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${user.token}`
            },
          }
        );
      }

      setPopup({
        show: false,
        id: null,
      });
    }
    setEditing({ allowEdit: true, id: null });
  };

  // This will just hide the Confirmation Box when user clicks "No"/"Cancel"
  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
    });
    setEditing({ allowEdit: true, id: null });
  };

  const handleChange = (event) => {
    setNewName((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <div className="roster-bot-header">
        {editing.id === selectedBot._id ? (
          <form
            className="TM-edit-form"
            onSubmit={handleSave}
            onChange={handleChange}
          >
            <input
              type="text"
              name="title"
              className="tournament-edit-input"
              value={newName.title}
              required
            />
            <Save className="button-sv TM-sv" onClick={handleSave}></Save>
          </form>
        ) : (
          <h2>
            {selectedBot.title}
            <PencilSquare
              className="button-del-ed TM-edit"
              onClick={() => handleEdit(selectedBot)}
            />
          </h2>
        )}
      </div>

      <div className="form-body">
        <h3>Safety Checklist</h3>
        <div className="form-container form-in-2">
          <label>Team Name</label>
          <input
            type="text"
            contentEditable={false}
            value={selectedBot.teamname}
          />
        </div>
        <br />
        <div className="form-container radio-bts">
          <h6>Weight Class:</h6>
          <div className="rb">
            <label>150 g</label>
            <input
              type="radio"
              value="150g"
              checked={selectedBot.weightclass === "150g"}
              contentEditable={false}
            />
          </div>
          <div className="rb">
            <label>1 lb</label>
            <input
              type="radio"
              value="1lb"
              checked={selectedBot.weightclass === "1lb"}
              contentEditable={false}
            />
          </div>
          <div className="rb">
            <label>3 lb</label>
            <input
              type="radio"
              value="3lb"
              checked={selectedBot.weightclass === "3lb"}
              contentEditable={false}
            />
          </div>
        </div>
        <div className="form-container checkbox-grid">
          <div className="safety-cb">
            <label>Under Weight</label>
            <input type="checkbox" checked={true} contentEditable={false} />
          </div>
          <div className="safety-cb">
            <label>Sharp Edges Covered</label>
            <input type="checkbox" checked={true} contentEditable={false} />
          </div>
          <div className="safety-cb">
            <label>Weapon Lock</label>
            <input type="checkbox" checked={true} contentEditable={false} />
          </div>
          <div className="safety-cb">
            <label>Batteries Protected</label>
            <input type="checkbox" checked={true} contentEditable={false} />
          </div>
          <div className="safety-cb">
            <label>Power Switch/Lock</label>
            <input type="checkbox" checked={true} contentEditable={false} />
          </div>
          <div className="safety-cb">
            <label>2.4Hz Radio</label>
            <input type="checkbox" checked={true} contentEditable={false} />
          </div>
        </div>
        <div className="safety-cb">
          <label>Weapon Failsafe</label>
          <input type="checkbox" checked={true} contentEditable={false} />
        </div>
        <br />
        <div className="form-container sign-field">
          <label>Inspector's Signature</label>
          <input
            type="text"
            contentEditable={false}
            value={selectedBot.signature}
          />
        </div>

            <br/>
        <div className="TM-scene-bottom">
          {!popup.show ? (
            <button
              className="TM-del-bt"
              onClick={() => handleDelete(selectedBot)}
            >
              Delete Bot
            </button>
          ) : (
            <>
              <div className="popup-box TM-popup">
                <p>Remove {selectedBot.title}?</p>
                <div>
                  <button
                    className="check-button TM-check-cancel"
                    onClick={handleDeleteTrue}
                  >
                    Confirm
                  </button>
                  <button
                    className="cancel-button TM-check-cancel"
                    onClick={handleDeleteFalse}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
