import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import HomeAside from "./Aside/Aside";
import PostSection from "./postSection";
import FollowSection from "./FollowSection";

export default function Home({ setCurrentUser }) {
  const navigate = useNavigate();
  const signOutUser = () => {
    signOut(auth);
    console.log(auth);
    navigate("/");
  };

  auth.onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });

  useEffect(() => {
    if (!auth.currentUser) navigate("/");
  }, []);

  return (
    <div className="flex flex-col xl:flex-row">
      <HomeAside />
      <section className="ml-80 flex-1 h-full">
        <main className="container mx-auto h-screen flex p-12 justify-center">
          <PostSection signOutUser={signOutUser} />
          <FollowSection />
        </main>
      </section>
    </div>
  );
}
