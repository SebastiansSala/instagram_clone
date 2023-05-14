import React, { useEffect } from "react";
import LoginForm from "./LoginForm";
import GoogleButton from "./GoogleButton";
import Footer from "./Footer";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

export default function Login({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) navigate("/");
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUser(user);
        setCurrentUser(userData);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, [setCurrentUser, auth.currentUser]);

  const getUser = async (user) => {
    const querySnapshot = await getDocs(collection(db, "users"));
    let userData = null;
    querySnapshot.forEach((doc) => {
      if (doc.data().userID === user.uid) {
        userData = doc.data();
      }
    });
    return userData;
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center pb-10 pt-20 transition-all duration-300">
      <div className="flex items-center h-full">
        <section className="hidden lg:block">
          <img src="https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones.png?__makehaste_cache_breaker=HOgRclNOosk" />
        </section>
        <div className="w-full flex flex-col items-center lg:border lg:w-96 lg:pb-5 lg:relative lg:-top-5">
          <Logo />
          <GoogleButton setCurrentUser={setCurrentUser} />
          <div className="mb-4 flex gap-3">
            <div className="w-24 bg-gray-300 h-[.12rem] relative top-2" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="w-24 bg-gray-300 h-[.12rem] relative top-2"></div>
          </div>
          <LoginForm setCurrentUser={setCurrentUser} />
          <p className="text-sm text-black md:text-xl lg:text-base">
            Don't have an account?{" "}
            <span className="text-blue-400 font-bold">
              <Link to="/signup">Sign</Link> up
            </span>
          </p>
          <section className="mt-8 flex flex-col items-center">
            <span className="text-sm md:text-xl lg:text-sm">Get the app</span>
            <div className="flex gap-2 justify-center mt-4">
              <img
                src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
                className="w-2/6 md:w-56 lg:w-2/6"
                alt="Google Play"
              />
              <img
                src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
                className="w-2/6 md:w-48 lg:w-2/6"
                alt="Microsoft"
              />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
