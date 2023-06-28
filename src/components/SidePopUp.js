import React, { useState, useEffect } from "react";
import { Switch } from "react-native";
// import { MdKeyboardArrowLeft } from "react-icons/md";
// import { IoMdSettings } from "react-icons/io";
import { TbInfoOctagon } from "react-icons/tb";

export default function SidePopUp() {
  const [bgColor, setBgColor] = useState(localStorage.getItem("theme") || "");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(
    localStorage.getItem("theme") === "" ? false : true
  );
  const pathname = window.location.pathname;
  const validPaths = ["/tournaments", "/roster", "/bracket"];

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleColor = () => {
    if (!isEnabled) {
      setBgColor("#00ff00");
    } else {
      setBgColor("");
    }
    setIsEnabled(!isEnabled);
    console.log(isEnabled);

    window.location.reload(false);
  };
  useEffect(() => {
    localStorage.setItem("theme", bgColor);
  }, [bgColor]);

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <div>
      {validPaths.includes(pathname) ? (
        <div className="menu-container">
          <TbInfoOctagon
            className={`menu-button ${isMenuOpen ? "open" : ""}`}
            onClick={handleMenuToggle}
          />
          <div className={`menu ${isMenuOpen ? "open" : ""}`}>
            <div className="overlay-text">
              <h4>
                Wanna Overlay BotBracket to showcase your tournament ? <br />
                Now you can !
              </h4>
              <div className="overlay-block">
                Default
                <Switch
                  trackColor={{ false: "#ca8cf9", true: "#0b609d" }}
                  thumbColor={isEnabled ? "#00375e" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={handleColor}
                  value={isEnabled}
                />
                Green Screen
              </div>
            </div>

            {pathname === "/bracket" && (
              <div className="faq-block">
                <h3> FAQs </h3>
                <ul>
                  <h5>How Do I Select The Winner?</h5>
                  <li>
                    Winner can be selected at any time by clicking on the left
                    or right side of the "WINNER" toggle button, not on the
                    player cards.
                  </li>
                  <h5>How Do I End Match?</h5>
                  <li>
                    After selecting the winner, click on "END MATCH". It will
                    also add the result to the "MATCH HISTORY".
                  </li>
                  <h5>
                    What Do I Do To Start Over Or Cancel The Ongoing Match?
                  </h5>
                  <li>
                    If you want to cancel the match or start over, press "RESET"
                    on the timer instead, not the "END MATCH". Then you can
                    remove any bots, change the bets or restart the match.
                  </li>
                  <h5>
                    Can I Hold Grudge Matches Without Any Effect On The
                    Leaderboard?
                  </h5>
                  <li>
                    Yes, you can hold grudge matches between any two bots, even
                    if they have zero chips to bet. While selecting bots, just
                    set the "BET" of BOTH BOTS to '0' and the match will be
                    recorded but will have no effect on the leaderboard.
                  </li>
                </ul>
              </div>
            )}

            {pathname === "/tournaments" && (
              <div className="faq-block">
                <h3> FAQs </h3>
                <ul>
                  <h5>Can I Edit A Tournament Once It's Created?</h5>
                  <li>
                    After creating a tournament, you can only edit its name by clicking on the "EDIT" icon beside the Tournament Name.
                    If you want to change the tournament style or bracket size, you have to delete it and create a new one.
                  </li>
                  <h5>Can I Remove Bots Or Matches After Adding Them?</h5>
                  <li>
                    To remove a bot from a tournament, select the tournament. Then go to the "Roster" page and remove the bot from there.
                    Unfortunately you cannot remove a match once it's added. So, do not press "END MATCH" if you don't want the match to be added.
                  </li>
                  <h5>
                    How Do I Delete A Tournament?
                  </h5>
                  <li>
                    Select the Tournament you want to delete and scroll down. There's a "DELETE TOURNAMENT" button. Once deleted, it cannot be undone.
                  </li>
                  <h5>
                    Can I Make My Tournament Public So Others Can See The Results?
                  </h5>
                  <li>
                    Yes, by clicking on the "LOCK/UNLOCK" icon beside the tournament name, you can make a tournament public or private. Public tournaments
                    can be viewed by anyone without the need to login in the "Featured" page. All tournaments are private by default.
                  </li>
                </ul>
              </div>
            )}

            {pathname === "/roster" && (
              <div className="faq-block">
                <h3> FAQs </h3>
                <ul>
                  <h5>How Can I View Bot Details Once It's Added</h5>
                  <li>
                    Click on the bot you wish to view from the list on the left.
                  </li>
                  <h5>Can I Edit Bot Details After Adding Them</h5>
                  <li>
                    To maintain the safety regulation, only the name of the bot can be changed once it's added. If something is amiss, you have to remove the bot and add it back again.
                  </li>
                  <h5>
                    Can Multiple Devices Be Used To Manage The Same Tournament At The Same Time?
                  </h5>
                  <li>
                    Yes, the bots can be added using one device while another device is in charge of matches simultaneously. However they need to be logged in to the same account and need to be refreshed manually to view the most updated version.
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
