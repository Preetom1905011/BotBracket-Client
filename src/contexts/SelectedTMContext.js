import { createContext, useReducer } from "react";

export const SelectedTMContext = createContext();

export const selectedTMReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TM':
            return {
                selectedTourney: action.payload
            }
        default:
            return state
    }
}


export const SelectedTMContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(selectedTMReducer, {
        selectedTourney: {_id: "Default", name: "Default", public: Boolean(false), style: "Token", size: 48}
    })

    return (
        <SelectedTMContext.Provider value={{...state, dispatch}}>
            {children}
        </SelectedTMContext.Provider>
    )
}