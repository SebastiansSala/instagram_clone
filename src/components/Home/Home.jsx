import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import HomeAside from "./Aside/Aside";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./Aside/ProfilePage";
import Main from "./Main";
import Loading from "../loading";
import RenderComments from './RenderComments'

export default function Home({ setCurrentUser, currentUser }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [darkmode, setDarkmode] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  useEffect(() => {
    if (!auth.currentUser) navigate("/login");
  }, []);

  const handleClick = () => {
    document.documentElement.classList.toggle("dark");
    setDarkmode((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col xl:flex-row bg-white dark:bg-black">
      {loading && <Loading />}
      <HomeAside
        setDarkmode={setDarkmode}
        darkmode={darkmode}
        handleClick={handleClick}
      />
      <section className="xl:ml-80 flex-1 xl:h-full order-1 mb-20">
        <main className="container mx-auto flex p-8 justify-center">
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  setLoading={setLoading}
                  darkmode={darkmode}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  setComments={setComments}
                  setShowComments={setShowComments}
                  setCurrentPost={setCurrentPost}
                />
              }
            />
            <Route
              path="/profile/*"
              element={
                <ProfilePage
                  currentUser={currentUser}
                  darkmode={darkmode}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
          </Routes>
          {showComments && (
            <RenderComments
              comments={comments}
              setShowComments={setShowComments}
              post={currentPost}
            />
          )}
        </main>
      </section>
    </div>
  );
}
