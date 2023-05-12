import React, { useEffect } from "react";
import { auth } from "../../firebase";
import HomeAside from "./Aside/Aside";
import { useNavigate } from "react-router-dom";
import Main from "./Main";

export default function Home({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) navigate("/login");
  }, []);

  return (
    <div className="flex flex-col xl:flex-row">
      <HomeAside />
      <section className="ml-80 flex-1 h-full ">
        <main className="container mx-auto h-screen flex p-12 justify-center">
          <Main></Main>
        </main>
      </section>
    </div>
  );
}
