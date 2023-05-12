import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LoginComponent/Login";
import Home from "./components/Home/Home";
import Main from "./components/Home/Main";
import ProfilePage from "./components/Home/Aside/ProfilePage";
import Posts from "./components/Home/Aside/Posts";
import Saved from "./components/Home/Aside/Saved";
import Tagged from "./components/Home/Aside/Tagged";

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
        <Route path="*" element={<Home currentUser={currentUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
