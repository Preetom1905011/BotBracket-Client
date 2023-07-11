import React, { useState } from "react";
import Card from "../components/Card";
import MatchScene from "../components/MatchScene";
import "../styles/base.css";
import "../styles/card.css";
import "../styles/bracket.css";
import { CSSTransition } from "react-transition-group";
import Footer from '../components/Footer';
import ElimBracket from "../components/ElimBracket";
import { useSelectedTMContext } from "../hooks/useSelectedTMContext";

export default function Bracket() {

  const [input, setInput] = useState({});
  const [sortedNames, setSortedNames] = useState([]);
  const { selectedTourney } = useSelectedTMContext();
  const [bgColor, setBgColor] = useState(localStorage.getItem('theme') || "");

  // Based on selectedTourney Type: display single, double, or Token Based Bracket
  // const style = "Double";

  return (
    <div className="background-style-all" style={{backgroundColor: bgColor}}>
      {selectedTourney.style === "Double"? <ElimBracket/>:
      <div className="side-grid-main">
        <span>
          <CSSTransition appear in classNames="card-transition" timeout={350}>
            <Card
              input={input}
              setInput={setInput}
              sortedNames={sortedNames}
              setSortedNames={setSortedNames}
              bgColor={bgColor}
            ></Card>
          </CSSTransition>
        </span>
        <CSSTransition
          appear
          in
          classNames="matchScene-transition"
          timeout={350}
        >
          <MatchScene sortedNames={sortedNames} bgColor={bgColor}></MatchScene>
        </CSSTransition>
      </div>}

      <Footer/>
      
    </div>
  );
}
