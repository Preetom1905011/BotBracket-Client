import { TMContext } from "../contexts/TMContext";
import { useContext } from "react";

export const useTMContext = () => {
    const context = useContext(TMContext)

    if(!context) {
        throw Error('useTMContext must be used inside an TMContextProvider')
    }
    return context
}