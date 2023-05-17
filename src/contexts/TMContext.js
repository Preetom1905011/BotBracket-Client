import { createContext, useReducer } from "react";

export const TMContext = createContext();

export const TMReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TMS':
            return {
                allTournaments: action.payload.map((p) => p = {_id: p._id, name: p.name, public: p.public, style: p.style, size: p.size})
            }
        case 'ADD_TM':
            return {
                allTournaments: [action.payload, ...state.allTournaments]
            }
        case 'EDIT_TM':
            return {
                allTournaments: state.allTournaments.map((name) => name._id === action.payload._id ? action.payload: name)
            }
        case 'DELETE_TM':
            return {
                allTournaments: state.allTournaments.filter((name) => name._id !== action.payload._id)
            }
        case 'RESET_TMS':
            return {
                allTournaments: null
            }
        default:
            return state
    }
}


export const TMContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(TMReducer, {
        allTournaments: null
    })

    return (
        <TMContext.Provider value={{...state, dispatch}}>
            {children}
        </TMContext.Provider>
    )
}