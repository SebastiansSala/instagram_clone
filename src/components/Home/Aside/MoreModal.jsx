import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";

export default function MoreModal({setIsModalOpen, onClick}) {
  const navigate = useNavigate();

  const signOutUser = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full" onClick={() => setIsModalOpen(false)}></div>
      <div className="flex flex-col w-40 z-50 h-20 bg-white shadow-md bottom-20 absolute p-1 justify-between">
        <button
          className="text-sm rounded-md text-left p-2 bg-white hover:bg-gray-100"
          onClick={() => onClick()}
        >
          Toggle Dark Mode
        </button>
        <button
          className="text-sm rounded-md p-2 text-left bg-white hover:bg-gray-100"
          onClick={() => {
            signOutUser(), setIsModalOpen(false);
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
