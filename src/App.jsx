import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LoginComponent/Login";
import Home from "./components/Home/Home";
import Main from "./components/Home/Main";
import ProfilePage from "./components/Home/ProfilePage";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          exact
          element={<Login setCurrentUser={setCurrentUser} currentUser={currentUser} />}
        />
        <Route path="/" element={<Home currentUser={currentUser}/>}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
