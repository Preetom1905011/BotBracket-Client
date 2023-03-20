import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/Home";
import Bracket from "./pages/Bracket";
import Roster from "./pages/Roster";
import Tournaments from "./pages/Tournaments";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

function App() {
  const {user} = useAuthContext()

  return (
      <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roster" element={<Roster />} />
            <Route path="/bracket" element={<Bracket />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/login" element={!user? <Login /> : <Navigate to="/tournaments"/>} />
            <Route path="/signup" element={!user? <Signup /> : <Navigate to="/tournaments"/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
