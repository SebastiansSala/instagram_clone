import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

export default function LoginForm({ setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        navigate("/login");
      });
  };

  auth.onAuthStateChanged((user) => {
    if (user) {
        setCurrentUser(user);
    } else {
        setCurrentUser(null);
    }
  });

  return (
    <div className="w-full flex justify-center mb-8">
      <form
        className="flex flex-col gap-1 md:gap-3 w-64 md:w-96 text-base md:text-xl lg:text-base lg:items-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label
          htmlFor="email"
          className="border border-gray-300 py-1 flex flex-col px-2 md:py-3 md:px-4 lg:w-3/4 lg:px-2 lg:py-1 items-start"
        >
          <span>Email</span>
          <input
            type="email"
            name="email"
            className="hidden"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label
          htmlFor="password  "
          className="border border-gray-300 py-1 md:py-3 md:px-4 flex flex-col px-2 lg:w-3/4 lg:px-2 lg:py-1"
        >
          <span>Password</span>
          <input
            type="password"
            name="password"
            className="hidden"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className="text-red-500 text-sm">{`Error: ${error}`}</p>}
        <button className="rounded-md px-20 bg-blue-400 text-white py-1 mb-6 text-base md:text-xl lg:text-base">
          Log in
        </button>
      </form>
    </div>
  );
}
