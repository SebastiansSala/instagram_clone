import React, { useState } from "react";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ProfileTags from "./profileTags";
import Saved from "./Saved";
import Posts from "./Posts";
import Tagged from "./Tagged";
import { Routes, Route } from "react-router-dom";

export default function ProfilePage({ currentUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState(currentUser?.displayName);
  const [selectState, setSelectState] = useState({
    posts: true,
    saved: false,
    tagged: false,
  });

  const handleSelected = (name) => {
    setSelectState((prevState) => {
      const newState = {};
      Object.keys(prevState).forEach(key => {
        newState[key] = key === name;
      });
      return newState;
    });
  };
  

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col items-center px-20 container mx-auto ">
      <section className="flex gap-20 border-b h-52 justify-center w-3/4">
        <div className="w-40 h-40 bg-red-300 rounded-full"></div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-4 items-center">
            <span>{username}</span>
            <button className="rounded-md px-4 py-2 bg-gray-400/10 text-sm font-semibold hover:bg-gray-400/40">
              Edit profile
            </button>
          </div>
          <div className="flex gap-7 items-center">
            <span>0 Posts</span>
            <span>1 Follower</span>
            <span>12 Following</span>
          </div>
          <span>Kromli</span>
        </div>
      </section>
      <section className="flex flex-col items-center w-96">
        <div className="flex gap-4">
          <ProfileTags
            text="posts"
            selectState={selectState}
            handleSelected={handleSelected}
          />
          <ProfileTags
            text="saved"
            selectState={selectState}
            handleSelected={handleSelected}
          />
          <ProfileTags
            text="tagged"
            selectState={selectState}
            handleSelected={handleSelected}
          />
        </div>
        <div className="flex flex-col gap-5 items-center mt-20">
          <Routes>
            <Route path="/" element={<Posts />}></Route>
            <Route path="/saved" element={<Saved />}></Route>
            <Route path="/tagged" element={<Tagged />}></Route>
          </Routes>
        </div>
        <footer className="mt-auto bg-red-400 h-10"></footer>
      </section>
    </div>
  );
}
