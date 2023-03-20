import { useAuthContext } from "./useAuthContext"
import { useBotsContext } from "./useBotContext";
import { useMatchesContext } from "./useMatchContext";
import { useTMContext } from "./useTMContext";
import { useSelectedTMContext } from "./useSelectedTMContext";

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: botDispatch} = useBotsContext()
    const {dispatch: matchDispatch} = useMatchesContext()
    const {dispatch: TMDispatch} = useTMContext()
    const {dispatch: selectDispatch} = useSelectedTMContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout
        dispatch({type: "LOGOUT"})
        // reset all the global contexts
        selectDispatch({type: 'UPDATE_TM', payload: {_id: "Default", name: "Default"}})
        botDispatch({type: 'RESET_BOTS'})
        matchDispatch({type: 'SET_MATCHES', payload: []})
        TMDispatch({type: 'RESET_TMS'})
    }

    return {logout}
}