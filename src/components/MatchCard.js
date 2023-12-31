import React from 'react'
import "../styles/matchScene.css";
import { PlusCircle } from 'react-bootstrap-icons'
import { useState } from 'react';
import { useEffect } from 'react';
import { useBotsContext } from '../hooks/useBotContext';
import staccato from '../media/staccato_logo.png';


export default function MatchCard(props) {
  const {names} = useBotsContext()
  const {reset, sortedNames, outcome, setOutcome, 
    fightersDuo, setFightersDuo, toggleState, 
    timerState, select_style, confirm_style, scrappy,
    disWhileCountdown} = props;

  const [allowPlus, setAllowPlus] = useState(true);
  const [selectedFighter, setSelectedFighter] = useState({});
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [fighterId, setFighterId] = useState("");
  const [bet, setBet] = useState(1);

  useEffect(() => {
      setAllowPlus(true);
      setFighterId("");
      setBet(1);
      setIsConfirmed(false);
      setFightersDuo([]);
  }, [reset]);

  const handlePlus = () => {
    if (allowPlus){
      setAllowPlus(false);
    }
    else {
      setAllowPlus(true);
      setFighterId("");
      setBet(1);
      setOutcome({_id:"", bet:0, result:""});
      setFightersDuo(fightersDuo.filter((id) => id !== fighterId));
    }
    setIsConfirmed(false);
  }  
  const handleConfirm = (event) => {
    event.preventDefault();
    
    const bot = names.find(name => name._id === fighterId);
    if (bot !== undefined){
      if (Number(bet) < 0 || Number(bet) > Number(bot.chip)){
        alert("You cannot bet " + bet + " chips.\n" + bot.title + " only has " + bot.chip + " chips");
        setBet(1);
      }
      else{
        setSelectedFighter({...bot, bet: bet});
        setIsConfirmed(true);
        if (outcome.result === "winner") {
          setOutcome({...bot, bet: bet, result:"winner"});
        }
        else if (outcome.result === "loser") {
          setOutcome({...bot, bet: bet, result:"loser"});
        }
        else {
          setOutcome({...bot, bet: bet, result:""});
        }
        setFightersDuo([...fightersDuo, bot._id]);
      }
    }
  }

  const handleFighterId = (event) => {
      setFighterId(event.target.value);
      setBet(1);
  }

  return (
    <form className='matchCard' onSubmit={handleConfirm}>
      {allowPlus ? (
          <PlusCircle className='plus-button' onClick={handlePlus}></PlusCircle>
        ) : (
          <>
          { !isConfirmed ? (
            <div className= {select_style}>
              <select 
                name="fighterId"
                value={fighterId}
                onChange={handleFighterId}
              >
                <option value="">Select Bot</option>
                {sortedNames.filter((name) => !fightersDuo.includes(name._id)).map(name => (
                  <option value={name._id}>{name.title}</option>
                ))}
              </select>
              <img src={scrappy} alt="Logo"/>
              <input
                  type="number"
                  name="bet"
                  autoComplete="off"
                  value={bet}
                  max= {fighterId === ""? 1: names.find((name) => name._id === fighterId).chip}
                  min={0}
                  onChange={(e) => {setBet(e.target.value)}}
                  required
                />
              <div className='bottom-bt-bar'>
                <button type='submit'>Confirm</button>
                <button onClick={handlePlus}>Cancel</button>
              </div>
            </div>
          ) : (
              <div className={confirm_style}>
                <h3>{selectedFighter.title}</h3> 
                {/* <img src={selectedFighter.title === "Staccato"? staccato :scrappy} alt="Logo"/> */}
                <img src={scrappy} alt="Logo"/>
                <h4>Bet: {selectedFighter.bet}</h4>
                <button onClick={handlePlus} disabled={toggleState !== "na" || timerState !== "reset" || disWhileCountdown}>Remove</button>
              </div>
          )}
          </>
        )}
        
    </form>
  )
}
