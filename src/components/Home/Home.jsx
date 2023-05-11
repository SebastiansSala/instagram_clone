import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import HomeAside from "./Sidebar/Aside";

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

  return (
    <div className="flex">
      <HomeAside />
      <section className="ml-80 flex-1 h-full">
        <main className="container mx-auto border h-screen flex gap-20">
          <section className="justify-self-center">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-400"></div>
              <div className="w-16 h-16 rounded-full bg-slate-400"></div>
              <div className="w-16 h-16 rounded-full bg-slate-400"></div>
              <div className="w-16 h-16 rounded-full bg-slate-400"></div>
              <div className="w-16 h-16 rounded-full bg-slate-400"></div>
              <div className="w-16 h-16 rounded-full bg-slate-400"></div>
              <div className="w-16 h-16 rounded-full bg-slate-400"></div>
            </div>
            <div className="flex flex-col w-full border">
              <div>
                <div className="flex items-center gap-3 border justify-between">
                  <div className="w-6 h-6 rounded-full bg-slate-400"></div>
                  <p>collins</p>
                  <p className="ml-auto">Icons</p>
                </div>
                <img></img>
                <div className="flex gap-5"></div>
                <p>123 likes</p>
                <p>Tu plato Fuerte</p>
                <button>View all 2 Comments</button>
              </div>
            </div>
            <button
              className="text-xl mt-20 py-2 px-8 bg-red-600"
              onClick={signOutUser}
            >
              Sign out
            </button>
          </section>
          <section></section>
        </main>
      </section>
    </div>
  );
}
