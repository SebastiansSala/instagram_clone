import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LoginComponent/Login";
import Home from "./components/Home/Home";
import Signup from "./components/LoginComponent/Signup";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          exact
          element={
            <Login setCurrentUser={setCurrentUser} currentUser={currentUser} />
          }
        />
        <Route
          path="/*"
          element={
            <Home currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          path="/signup"
          element={<Signup setCurrentUser={setCurrentUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
