import React, { useEffect } from 'react'
import '../styles/card.css'
import '../styles/tournament.css'
import {useSelectedTMContext} from '../hooks/useSelectedTMContext';
import { useTMContext } from "../hooks/useTMContext";
import { useAuthContext } from '../hooks/useAuthContext';

const TourneyList = ({visPublic, setVisPublic}) => {

  const {user} = useAuthContext();
  const {selectedTourney, dispatch: selectDispatch} = useSelectedTMContext()
  const {allTournaments, dispatch: allTMDispatch} = useTMContext()

  const handleLoadTourney = async (TM) => {
    // select this TM
    selectDispatch({type: "UPDATE_TM", payload: TM})
    const {public: isPublic} = TM;
    setVisPublic(isPublic);
    console.log(TM)
  }

  // Load the tournaments from DB on mount
  useEffect(() => {
    const fetchTMS = async () => {
      const response = await fetch(process.env.REACT_APP_URL+'/api/tournaments', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok){
        allTMDispatch({type: 'SET_TMS', payload: json})
      }
      else{
        console.log("failed")
      }
    }

    if (user) {
      fetchTMS()
    }
  }, [allTMDispatch, user])

  return (
      <div className='TM-scroll-box'>
        {allTournaments && allTournaments.map(TM => (
          (selectedTourney && selectedTourney._id === TM._id?
            <li className='TM-list-item container TM-list-item-selected' key={TM._id}>
              {TM.name} 
            </li>
            : <li className='TM-list-item container' onClick={() => {handleLoadTourney(TM);}} key={TM._id}>
            {TM.name} 
          </li>
          )
        ))}
      </div>

  )
}


export default TourneyList
