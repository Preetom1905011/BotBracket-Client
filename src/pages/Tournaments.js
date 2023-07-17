import React, { useEffect, useState } from "react";
import TourneyList from "../components/TourneyList";
import { useSelectedTMContext } from "../hooks/useSelectedTMContext";
import { CSSTransition } from "react-transition-group";
import TMScene from "../components/TMScene";
import Footer from "../components/Footer";
import "../styles/tournament.css";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Tournaments() {

  const { dispatch: selectDispatch } = useSelectedTMContext();
  const [allowAddTM, setAllowAddTM] = useState(true);
  const [showTMForm, setShowTMForm] = useState(false);
  const [error, setError] = useState(null);
  const [visPublic, setVisPublic] = useState(false);
  const { user } = useAuthContext();

  const [bgColor, setBgColor] = useState(localStorage.getItem('theme') || "");

  const handleAllowAddTM = (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    setAllowAddTM(!allowAddTM);
    setShowTMForm(true);

    selectDispatch({
      type: "UPDATE_TM",
      payload: { _id: "Default", name: "Default", public: Boolean(false) },
    });
  };


  return (
    <div className="background-style-all" style={{backgroundColor: bgColor}}>
      <div className="TM-layout">
        <CSSTransition appear in classNames="TMList-transition" timeout={350}>
          <div className="card-body TM-card-body">
            <h2>Tournaments</h2>
            <form className="add-TM-label">
              {allowAddTM ? (
                <button className="add-TM-bt" onClick={handleAllowAddTM}>
                  Create New Tournament
                </button>
              ) : (
                <div className="label-roster label-TM">Fill out the form</div>
              )}
            </form>
            {error && <div className="login-error">{error}</div>}
            <TourneyList
              visPublic={visPublic}
              setVisPublic={setVisPublic}
              allowAddTM={allowAddTM}
              setAllowAddTM={setAllowAddTM}
              setShowTMForm={setShowTMForm}
            />
          </div>
        </CSSTransition>
        <CSSTransition appear in classNames="TMScene-transition" timeout={350}>
          <TMScene
            visPublic={visPublic}
            setVisPublic={setVisPublic}
            allowAddTM={allowAddTM}
            setAllowAddTM={setAllowAddTM}
            showTMForm={showTMForm}
            setShowTMForm={setShowTMForm}
            setError={setError}
            bgColor={bgColor}
          />
        </CSSTransition>
      </div>
      <Footer />
    </div>
  );
}
