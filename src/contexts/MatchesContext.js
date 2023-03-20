import { createContext, useReducer } from "react";

export const MatchesContext = createContext();

export const matchesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MATCHES':
            return {
                matches: action.payload
            }
        case 'ADD_MATCH':
            return {
                matches: [action.payload, ...state.matches]
            }
        default:
            return state
    }
}


export const MatchesContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(matchesReducer, {
        matches: []
    })

    return (
        <MatchesContext.Provider value={{...state, dispatch}}>
            {children}
        </MatchesContext.Provider>
    )
}