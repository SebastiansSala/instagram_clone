import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LoginComponent/Login";
import Home from "./components/Home/Home";

function App() {

  const [user, setCurrentUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login setCurrentUser={setCurrentUser} user={user}/>} />
        <Route path="/home" element={<Home setCurrentUser={setCurrentUser}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
