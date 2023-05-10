import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Home({ setCurrentUser }) {
  const navigate = useNavigate();
  const signOutUser = () => {
    signOut(auth);
    console.log(auth)
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
    <div className="container mx-auto h-96 w-96 bg-slate-500">
      <button className="text-xl py-2 px-8 bg-red-600" onClick={signOutUser}>
        Sign out
      </button>
    </div>
  );
}
