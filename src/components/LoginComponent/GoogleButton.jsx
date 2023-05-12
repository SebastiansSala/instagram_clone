import React from "react";
import { auth } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function GoogleButton({ setCurrentUser }) {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        setCurrentUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        navigate("/login");
      });
  };

  return (
    <button
      className="rounded-md bg-blue-400 px-3 py-1 text-white mb-6 text-base lg:text-base md:text-xl"
      onClick={handleClick}
    >
      Continue with Google
    </button>
  );
}
