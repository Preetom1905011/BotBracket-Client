import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import "../styles/card.css";
import logo from "../media/scrappyhead_sticker_purple2.png";
import { useFeatureFetch } from "../hooks/useFeatureFetch";


export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const {fetchFeaturedTMs, allPubTMs, allUsers, isFetching} = useFeatureFetch();

  useEffect(() => {
  
    console.log("start in load")
    const fetchData = async () => {
      await fetchFeaturedTMs();
    }
    fetchData();
    console.log("end in load")

  }, [])

  const handleClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="navbar" id="navbar">
      <img src={logo} />
      <h1>
        <Link to="/">BotBracket</Link>
      </h1>
      <ul>
        <Link to="/featured" state={{ allPubTMs, allUsers, isFetching }}>
          <li>Featured</li>
        </Link>
        <Link to="/bracket">
          <li>Bracket</li>
        </Link>
        <Link to="/tournaments">
          <li>Tournaments</li>
        </Link>
        <Link to="/roster">
          <li>Roster</li>
        </Link>
        {!user ? (
          <Link to="/login">
            <li>Login</li>
          </Link>
        ) : (
          <li className="nav-logout">
            {user.userName}
            <button onClick={handleClick}>Log out</button>
          </li>
        )}
        &nbsp;
      </ul>
    </div>
  );
}
