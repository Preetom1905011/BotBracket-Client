import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import MatchScene from "../components/MatchScene";
import "../styles/base.css";
import "../styles/card.css";
import "../styles/bracket.css";
import { CSSTransition } from "react-transition-group";
import Footer from '../components/Footer';

export default function Bracket() {
  // const [input, setInput] = useState({botname: "", chipnum: "3"});
  const [input, setInput] = useState({});
  const [sortedNames, setSortedNames] = useState([]);

  return (
    <div className="background-style-all">
      <div className="side-grid-main">
        <span>
          <CSSTransition appear in classNames="card-transition" timeout={350}>
            <Card
              input={input}
              setInput={setInput}
              sortedNames={sortedNames}
              setSortedNames={setSortedNames}
            ></Card>
          </CSSTransition>
        </span>
        <CSSTransition
          appear
          in
          classNames="matchScene-transition"
          timeout={350}
        >
          <MatchScene sortedNames={sortedNames}></MatchScene>
        </CSSTransition>
      </div>
      <Footer/>
    </div>
  );
}
