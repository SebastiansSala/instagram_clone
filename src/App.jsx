import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LoginComponent/Login";
import Home from "./components/Home/Home";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            exact
            element={
              <Login
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            }
          />
          <Route path="/*" element={<Home currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
