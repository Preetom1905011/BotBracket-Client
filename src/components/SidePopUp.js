import React, { useState, useEffect } from "react";
import { Switch } from "react-native";
import { MdKeyboardArrowLeft } from "react-icons/md";

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
          <MdKeyboardArrowLeft
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

            {pathname === "/bracket" && <div> Instructions for Bracket </div>}

            {pathname === "/tournaments" && <div> Instructions for Tournaments </div>}

            {pathname === "/roster" && <div> Instructions for Roster </div>}
            
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
