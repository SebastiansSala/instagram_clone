import React, { useState } from "react";
import Logo from "./Logo";
import Footer from "./Footer";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [changeState, setChangeState] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!changeState.email || !changeState.username || !changeState.password)
      return;

    let exists = false;

    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      if (changeState.username === doc.data().username) exists = true;
      if (changeState.email === doc.data().email) exists = true;
    });

    if (exists) {
      console.log("User Exists");
      return;
    }

    const addUser = async (user) => {
      try {
        await addDoc(collection(db, "users"), {
          userID: user.uid,
          username: changeState.username,
        });
      } catch (error) {
        console.error(error);
      }
    };

    createUserWithEmailAndPassword(
      auth,
      changeState.email,
      changeState.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        addUser(user);
        setChangeState({
          email: "",
          name: "",
          username: "",
          password: "",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode);
        console.error(errorMessage);
      })
      .finally(() => {
        navigate("/login");
      });
  };

  const handleChange = (e, changeItem) => {
    setChangeState((prevState) => ({
      ...prevState,
      [changeItem]: e.target.value,
    }));
  };

  return (
    <div className="h-screen grid place-content-center">
      <div className="flex flex-col items-center w-full">
        <div className="p-6 max-w-xs border text-center flex-2">
          <Logo />
          <h2>Sign up to see photos and videos from your videos</h2>
          <button></button>

          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="Email"></label>
            <input
              type="email"
              name="email"
              value={changeState.email}
              placeholder="Email"
              className="outline-none rounded border bg-gray-100 py-2 px-1 text-sm text-gray-400 w-full mt-2"
              onChange={(e) => {
                handleChange(e, "email");
              }}
            ></input>

            <label htmlFor="username"></label>
            <input
              type="text"
              name="username"
              value={changeState.username}
              placeholder="Username"
              className="outline-none rounded border bg-gray-100 py-2 px-1 text-sm text-gray-400 w-full mt-2"
              onChange={(e) => {
                handleChange(e, "username");
              }}
            ></input>

            <label htmlFor="password"></label>
            <input
              type="password"
              value={changeState.password}
              name="password"
              placeholder="Password"
              className="outline-none rounded border bg-gray-100 py-2 px-1 text-sm text-gray-400 w-full mt-2"
              onChange={(e) => {
                handleChange(e, "password");
              }}
            ></input>
            <button className="bg-blue-400 py-1 mt-2 w-full rounded text-white hover:bg-blue-500">
              Sign Up
            </button>
          </form>
        </div>
        <div className="border max-w-xs mt-4 w-96 py-3 text-center rounded">
          <p className="text-sm ">
            Have an account? <span className="text-blue-400">Log in</span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
