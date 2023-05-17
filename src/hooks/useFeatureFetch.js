import { useState } from "react";

export const useFeatureFetch = () => {
  const [allPubTMs, setAllPubTMs] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(null);

  // get all the tournaments that are public
  const fetchFeaturedTMs = async () => {
    // fetch all the userIDs
    setIsFetching(true);

    const responseUser = await fetch(process.env.REACT_APP_URL + "/api/user");
    const jsonUser = await responseUser.json();

    setAllUsers(jsonUser);

    Promise.all(
      jsonUser.map((user) =>
        fetch(
          process.env.REACT_APP_URL + "/api/tournaments/Users/" + user["_id"]
        )
      )
    )
      .then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then(function (data) {
        // Log the data to the console
        setIsFetching(false);
        let pubTM = [];
        data.forEach((d) => {
          Array.prototype.push.apply(pubTM, d);
        });
        // update state of allPubTMs
        setAllPubTMs(
          pubTM.sort((p1, p2) =>
            p1.createdAt > p2.createdAt
              ? -1
              : p1.createdAt < p2.createdAt
              ? 1
              : 0
          )
        );
      })
      .catch(function (error) {
        // if there's an error, log it
        setIsFetching(false);
        console.log(error);
      });
  };

  return {fetchFeaturedTMs, allPubTMs, allUsers, isFetching};
};
