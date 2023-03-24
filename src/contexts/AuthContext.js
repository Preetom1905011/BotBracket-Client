import { createContext, useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            const {exp} = jwtDecode(user.token);
            if (Date.now() < exp * 1000) {
                dispatch({type: "LOGIN", payload: user})
            }
            else {
                localStorage.removeItem("user");
            }
        }
    }, [])
    
    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}