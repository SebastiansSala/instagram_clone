import React, { useEffect } from "react";
import { auth } from "../../firebase";
import HomeAside from "./Aside/Aside";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./Aside/ProfilePage";
import Main from "./Main";
import Posts from "./Aside/Posts";
import Saved from "./Aside/Saved";
import Tagged from "./Aside/Tagged";

export default function Home({ currentUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) navigate("/login");
  }, []);

  return (
    <div className="flex flex-col xl:flex-row">
      <HomeAside />
      <section className="ml-80 flex-1 h-full ">
        <main className="container mx-auto h-screen flex p-8 justify-center">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/profile/*"
              element={<ProfilePage currentUser={currentUser} />}
            />
          </Routes>
        </main>
      </section>
    </div>
  );
}
