import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import HomeAside from "./Aside/Aside";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./Aside/ProfilePage";
import Main from "./Main";
import Loading from "../loading";

export default function Home({ setCurrentUser, currentUser }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) navigate("/login");
  }, []);

  const handleClick = () => {
    document.documentElement.classList.toggle('dark')
    setDarkmode(prevState => !prevState)
  }

  return (
    <div className={`flex flex-col xl:flex-row dark:bg-black bg-white`}>
      {loading && <Loading/>}
      <HomeAside setDarkmode={setDarkmode} darkmode={darkmode} handleClick = {handleClick}/>
      <section className="ml-80 flex-1 h-full">
        <main className="container mx-auto flex p-8 justify-center">
          <Routes>
            <Route path="/" element={<Main setLoading={setLoading} darkmode={darkmode} currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
            <Route
              path="/profile/*"
              element={<ProfilePage currentUser={currentUser} darkmode={darkmode} setCurrentUser={setCurrentUser}/>}
            />
          </Routes>
        </main>
      </section>
    </div>
  );
}
