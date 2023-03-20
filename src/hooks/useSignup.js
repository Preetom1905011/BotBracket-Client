import { useState } from "react";
import { useAuthContext } from "./useAuthContext"
import { useSelectedTMContext } from "./useSelectedTMContext"

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const { dispatch: selectDispatch} = useSelectedTMContext();

  const signup = async (userName, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      process.env.REACT_APP_URL + "/api/user/signup",
      {
        method: "POST",
        body: JSON.stringify({ userName, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the AuthContext
      dispatch({ type: "LOGIN", payload: json });

      // add a new selectedTM in the DB and dispatch it
      const response2 = await fetch(
        process.env.REACT_APP_URL + "/api/selectedTM",
        {
          method: "POST",
          body: JSON.stringify(json),
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${json.token}`
          },
        }
      );
      const json2 = await response2.json();

      selectDispatch({type: 'UPDATE_TM', payload: {_id: "Default", TMID: "Default"}})

      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
