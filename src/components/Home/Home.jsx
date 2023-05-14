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

  useEffect(() => {
    if (!auth.currentUser) navigate("/login");
  }, []);

  return (
    <div className="flex flex-col xl:flex-row">
      {loading && <Loading/>}
      <HomeAside />
      <section className="ml-80 flex-1 h-full">
        <main className="container mx-auto flex p-8 justify-center">
          <Routes>
            <Route path="/" element={<Main setLoading={setLoading} />} />
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
