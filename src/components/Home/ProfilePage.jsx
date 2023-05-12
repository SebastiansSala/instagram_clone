import React from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const signOutUser = () => {
    signOut(auth);
    navigate("/login");
  };
  return (
    <div className="container">
      <p>rst</p>ars
    </div>
  );
}
