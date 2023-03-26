import React, { useState } from "react";
import "../styles/login.css";
import { CSSTransition } from "react-transition-group";
import { useSignup } from "../hooks/useSignup";
import { RiseLoader} from "react-spinners";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [inPass, setInPass] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const [mismatch, setMismatch] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (inPass === password) {
      await signup(userName, email, password);
      // set mismatch to null
      setMismatch(null);
    } else {
      setMismatch("Passwords Do not match");
    }
  };

  return (
    <div className="hide-OF background-style-all">
      <div className="col-container">
        <CSSTransition appear in classNames="login-transition" timeout={350}>
          <div className="login signup pad-2">
            <h2>Welcome To BotBracket</h2>
            <form className="col-container pad-2" onSubmit={handleSignup}>
              <label className="left-align">User Name</label>
              <input
                type="userName"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <label className="left-align">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className="left-align">Password</label>
              <input
                type="password"
                value={inPass}
                onChange={(e) => {
                  setInPass(e.target.value);
                }}
              />
              <label className="left-align">Confirm Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button className="login-bt" type="submit" disabled={isLoading}>
                Sign Up
              </button>
              {error && <div className="signup-error">{error}</div>}
              {mismatch && <div className="signup-error">{mismatch}</div>}
            </form>

            {isLoading && <RiseLoader
                        color={"#0873f6"}
                        loading={isLoading}
                        size={10}/>}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
