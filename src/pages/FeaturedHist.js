import React from "react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function FeaturedHist() {
  const location = useLocation();
  const TM = location.state?.TM;

  const sortedNames = TM?.participantIDs.sort((a, b) => b.chip - a.chip);
  const matches = TM?.matchIDs.sort((m1, m2) =>
    m1.createdAt > m2.createdAt ? -1 : m1.createdAt < m2.createdAt ? 1 : 0
  );
  console.log(TM);

  return (
    <div className="background-style-all">
      <div className="side-grid-main">
        <CSSTransition
          appear
          in
          classNames="featureLeft-transition"
          timeout={350}
        >
          <div className="card-body ">
            <div className="winner-feature">
              
              <h2> <EmojiEventsIcon/> Champion <EmojiEventsIcon/></h2>
              <h1>{sortedNames?.[0]?.title}</h1>
            </div>
            <h2>Leaderboard</h2>
            <div className="scroll-box scroll-box-featured">
              {sortedNames?.map((name) => (
                <li className="TM-leader-list container" key={name._id}>
                  {name.title}
                  <div>{name.chip}</div>
                </li>
              ))}
            </div>
          </div>
        </CSSTransition>

        <CSSTransition
          appear
          in
          classNames="featureScene-transition"
          timeout={350}
        >
          <div className="TM-scene">
            <div className="TM-header">
              <h2>{TM ? TM.name : "Tournament Not Public"}</h2>
            </div>
            <div className="scroll-featured">
              <h2>Match History</h2>
              <div className="scroll">
                {matches?.map((match) => (
                  <li className="match-hist-list" key={match._id}>
                    <div
                      className={
                        Number(match.redScore) < 0 || match.redScore === "-0"
                          ? "match-list-each list-each-lose"
                          : "match-list-each list-each-win"
                      }
                    >
                      <span>{match.red}</span>
                      {match.redScore}
                    </div>
                    <div
                      className={
                        Number(match.blueScore) < 0 || match.blueScore === "-0"
                          ? "match-list-each list-each-lose"
                          : "match-list-each list-each-win"
                      }
                    >
                      <span>{match.blueScore}</span>
                      <span>{match.blue}</span>
                    </div>
                  </li>
                ))}
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
