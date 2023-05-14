import React, { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { auth, db } from "../../../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";

export default function Posts() {
  const [showPost, setShowPost] = useState(true);
  const [post, setPost] = useState([]);

  useEffect(() => {
    const userID = auth.currentUser?.uid;
    const getPosts = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "posts"), where("userID", "==", userID))
      );
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPost(posts);
    };
    getPosts();
  }, []);

  useEffect(() => {
    if (post.length > 0) {
      setShowPost(false);
    }
  }, [post])

  return (
    <>
      {showPost ? (
        <>
          <div className="h-16 w-16 rounded-full grid place-content-center border border-black">
            <AiOutlineCamera className="text-5xl" />
          </div>
          <h3 className="text-3xl font-extrabold">Share Photos</h3>
          <p className="text-sm">
            When you share photos, they will appear on your profile
          </p>
        </>
      ) : (
        <div className="flex flex-wrap">
          {post.map((elem, index) => {
            return (
              <div key={index}>
                <img src={elem.img} className="w-56"/>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
