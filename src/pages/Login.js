import React, { useState } from "react";
import "../styles/login.css";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { RiseLoader} from "react-spinners";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, error, isLoading} = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div className="hide-OF background-style-all">
      <div className="col-container">
        <CSSTransition appear in classNames="login-transition" timeout={350}>
          <div className="login pad-2">
            <h2>Welcome To BotBracket</h2>
            <form className="col-container pad-2" onSubmit={handleLogin}>
              <label className="left-align">Email Address</label>
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className="left-align">Password</label>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {error && <div className="login-error">{error}</div>}
              <button className="login-bt" type="submit" disabled={isLoading}>
                Log In
              </button>
              {/* <a className="right-align">Forgot Password?</a> */}
              <div className="col-container side-container pad-2">
                New to BotBracket?
                <Link to="/signup">Sign up</Link>
              </div>
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
