import React, { useEffect, useState } from 'react'
import '../styles/matchScene.css'
import MatchCard from './MatchCard'
import scrappyRed from '../media/dark_blue_scrappy.png'; 
import scrappyBlue from '../media/blueviolet_scrappy.png'; 
import vs_logo from '../media/VS_img3.png'; 
import WinToggle from './WinToggle';
import Timer from './Timer';
import { useBotsContext } from '../hooks/useBotContext';
import { useMatchesContext } from '../hooks/useMatchContext';
import {useSelectedTMContext} from '../hooks/useSelectedTMContext';
import { useAuthContext } from '../hooks/useAuthContext';

export default function MatchScene({sortedNames}) {

  const {names, dispatch} = useBotsContext()
  const {matches, dispatch: matchDispatch} = useMatchesContext()
  const {selectedTourney} = useSelectedTMContext()
  const {user} = useAuthContext()

  const [outRed, setOutRed] = useState({_id:"", bet:0, result:""});
  const [outBlue, setOutBlue] = useState({_id:"", bet:0, result:""});
  const [toggleState, setToggleState] = useState('na');
  const [reset, setReset] = useState(false);
  const [timerState, setTimerState] = useState("reset");

  // to prevent same bots being chosen 
  const [fightersDuo, setFightersDuo] = useState([]);

  // call PATCH request here to update botlist
  const handleEndMatch = async (e) => {
    setReset(!reset);

    if (!user) {
      return
    }

    let winnerName = {_id:""};
    let loserName = {_id:""};
    let newMatch = null;

    try{
      const redName = (names.find(name => name._id === outRed._id)).title;
      const blueName = (names.find(name => name._id === outBlue._id)).title;
    
      if (outRed.result === "winner" && outBlue.result === "loser"){
        winnerName = outRed;
        loserName = outBlue;

        newMatch = {"red": redName, "redScore": '+'+loserName.bet, "blue": blueName, "blueScore": '-'+loserName.bet}
      }
      else if (outRed.result === "loser" && outBlue.result === "winner"){
        winnerName = outBlue;
        loserName = outRed;

        newMatch = {"red": redName, "redScore": '-'+loserName.bet, "blue": blueName, "blueScore": '+'+loserName.bet}
      }
      
      const winner = names.find((name) => name._id === winnerName._id)
      const loser = names.find((name) => name._id === loserName._id)

      // update winner
      const response1 = await fetch(process.env.REACT_APP_URL+'/api/participants/'+winner._id, {
        method: 'PATCH',
        body: JSON.stringify({chip: winner.chip + Number(loserName.bet)}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json1 = await response1.json()
      if (response1.ok){
        dispatch({type: 'UPDATE_BOT', payload: json1})
      }
      // update loser
      const response2 = await fetch(process.env.REACT_APP_URL+'/api/participants/'+loser._id, {
        method: 'PATCH',
        body: JSON.stringify({chip: loser.chip - Number(loserName.bet)}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json2 = await response2.json()
      if (response2.ok){
        dispatch({type: 'UPDATE_BOT', payload: json2})
      }

      // add match to DB
      const response3 = await fetch(process.env.REACT_APP_URL+'/api/matches', {
        method: 'POST',
        body: JSON.stringify(newMatch),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json3 = await response3.json()

      if (!response3.ok){
        alert(json3.error)
      }
      else {
        matchDispatch({type: "ADD_MATCH", payload: json3})
        // add match to the TM DB
        const response4 = await fetch(process.env.REACT_APP_URL+'/api/tournaments/matches/'+selectedTourney._id, {
          method: 'POST',
          body: JSON.stringify(json3),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })

      }

      setToggleState("na");
      setOutRed({_id:"", bet:0, result:""});
      setOutBlue({_id:"", bet:0, result:""});
    } catch(error) {
      console.log("No Bot selected")
    }
  }


  // mount all the matches from DB
  useEffect(() => {
    const fetchMatches = async () => {
      if (!user) {
        return
      }
      if (selectedTourney._id !== "Default"){
        const response = await fetch(process.env.REACT_APP_URL+'/api/tournaments/matches/'+selectedTourney._id, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()

        if (response.ok){
          matchDispatch({type: 'SET_MATCHES', payload: json})
        }
        else{
          console.log("failed")
        }
      }
    }
    fetchMatches()
  }, [user])


  return (
    <div className='backdrop'>
        <Timer 
            toggleState={toggleState} 
            setToggleState={setToggleState}
            timerState={timerState} 
            setTimerState={setTimerState}
            reset={reset} 
            outRed={outRed} 
            outBlue={outBlue}></Timer>
        <div className='side-grid'>
          <MatchCard 
              reset={reset}
              sortedNames={sortedNames}
              outcome={outRed}
              setOutcome={setOutRed}
              fightersDuo={fightersDuo}
              setFightersDuo={setFightersDuo}
              toggleState={toggleState}
              timerState={timerState} 
              select_style={"fighter-select"} 
              confirm_style={"fighter-confirmed"}
              scrappy={scrappyRed}></MatchCard>
          <img src={vs_logo} className="vs_img"/>
          <MatchCard 
              reset={reset}
              sortedNames={sortedNames}
              outcome={outBlue}
              setOutcome={setOutBlue}
              fightersDuo={fightersDuo}
              setFightersDuo={setFightersDuo}
              toggleState={toggleState}
              timerState={timerState} 
              select_style={"fighter-select fighter-select2"} 
              confirm_style={"fighter-confirmed fighter-confirmed2"}
              scrappy={scrappyBlue}></MatchCard>
        </div>
        <WinToggle 
              outRed={outRed} 
              setOutRed={setOutRed} 
              outBlue={outBlue} 
              setOutBlue={setOutBlue}
              toggleState={toggleState}
              setToggleState={setToggleState}></WinToggle>
        <button 
              className='end-match-bt'
              onClick={handleEndMatch} 
              disabled={toggleState === "na"? true: false}>END MATCH</button>
        <div className='match-history'>
          <h3>Match History</h3>
          <div className='scroll'>
            {matches.map(match => (
              <li className='match-hist-list' key={match._id}>
                <div className={Number(match.redScore) < 0 || match.redScore === "-0"? 'match-list-each list-each-lose': 'match-list-each list-each-win'}>
                  <span>{match.red}</span> 
                  {match.redScore}
                </div>
                <div className={Number(match.blueScore) < 0 || match.blueScore === "-0"? 'match-list-each list-each-lose': 'match-list-each list-each-win'}>
                  <span>{match.blueScore}</span>
                  <span>{match.blue}</span> 
                </div>
              </li>
            ))}
          </div>
        </div>
    </div>
  )
}

