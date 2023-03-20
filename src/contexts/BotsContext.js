import { createContext, useReducer } from "react";

export const BotsContext = createContext();

export const botsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BOTS':
            return {
                names: action.payload.map((p) => p = {_id: p._id, title: p.title, chip: p.chip, teamname: p.teamname, weightclass: p.weightclass, signature: p.signature})
            }
        case 'ADD_BOT':
            return {
                names: [action.payload, ...state.names]
            }
        case 'REMOVE_BOT':
            return {
                names: state.names.filter((name) => name._id !== action.payload._id)
            }
        case 'UPDATE_BOT':
            return {
                names: state.names.map((name) => name._id === action.payload._id ? action.payload: name)
            }
        case 'RESET_BOTS':
            return {
                names: []
            }
        default:
            return state
    }
}


export const BotsContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(botsReducer, {
        names: []
    })

    return (
        <BotsContext.Provider value={{...state, dispatch}}>
            {children}
        </BotsContext.Provider>
    )
}