import { BotsContext } from "../contexts/BotsContext";
import { useContext } from "react";

export const useBotsContext = () => {
    const context = useContext(BotsContext)

    if (!context) {
        throw Error('useBotsContext must be used inside a BotsContextProvider')
    }

    return context
}