import React, { useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { auth } from "../../firebase";
import { FaRegComment } from "react-icons/fa";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function PostSection({
  loadingPosts,
  setLoadingPosts,
  setComments,
  setShowComments,
  setCurrentPost,
}) {
  const [posts, setPosts] = useState([]);
  const [postComments, setPostComments] = useState(
    posts.map((post) => ({ [post.id]: "" }))
  );

  const handleSubmit = async (postId) => {
    const currentUsername = auth.currentUser.displayName;
    try {
      const postRef = doc(db, "posts", postId);
      const commentRef = collection(postRef, "comments");
      const newCommentRef = await addDoc(commentRef, {
        username: currentUsername,
        comment: postComments[postId],
        likes: [],
      });
      const updatedComments = await getDoc(newCommentRef);
      setPostComments((prevPost) => ({ ...prevPost, [postId]: "", likesCount: updatedComments.data().likes.length}));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLikes = async (postId) => {
    const postRef = doc(db, "posts", postId);
    const docSnapshot = await getDoc(postRef);
    const likes = docSnapshot.data().likes;
    const currentUser = auth.currentUser.uid;
    const userFounded = likes.find((user) => user === currentUser);
    if (userFounded) {
      const updatedList = likes.filter((user) => user !== currentUser);
      await updateDoc(postRef, {
        likes: updatedList,
      });
    } else {
      await updateDoc(postRef, {
        likes: [...likes, currentUser],
      });
    }
    const updatedDocSnapshot = await getDoc(postRef);
    const updatedLikes = updatedDocSnapshot.data().likes;
    setPosts((prevState) =>
      prevState.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likesCount: updatedLikes.length,
            likes: updatedLikes,
          };
        }
        return post;
      })
    );
  };

  const handleCommentChange = (postId, e) => {
    setPostComments((prevState) => ({
      ...prevState,
      [postId]: e.target.value,
    }));
  };

  const handleShowComments = (postId) => {
    const post = posts.filter((post) => post.id === postId);
    setCurrentPost(post[0]);
    const mapComments = async () => {
      try {
        const postRef = doc(db, "posts", postId);
        const commentsRef = collection(postRef, "comments");
        const querySnapshot = await getDocs(commentsRef);
        const comments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          likesCount: doc.data().likes.length
        }));
        setComments(comments);
      } catch (e) {
        console.error(e);
      }
    };
    mapComments().then(() => setShowComments(true));
  };

  const mapPosts = async () => {
    setLoadingPosts(true);
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        likesCount: doc.data().likes.length,
        ...doc.data(),
      }));
    } catch (e) {
      console.error(e);
      return [];
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    mapPosts().then((data) => setPosts(data));
  }, []);

  return (
    <section className="bg-white dark:bg-black">
      {!loadingPosts &&
        posts.map((post, index) => {
          return (
            <div
              className="dark:text-white flex flex-col xl:ml-20 mt-10 w-full xl:w-4/6 border-b pb-5"
              key={index}
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-slate-400"></div>
                  <p className="hover:text-gray-500 hover:cursor-pointer">
                    {post.username} 3dias
                  </p>
                  <FiMoreHorizontal className="ml-auto text-xl hover:cursor-pointer hover:text-gray-500" />
                </div>
                <img
                  src={post.img}
                  className="w-[30rem] object-contain object-center"
                ></img>
                <div className="flex gap-5 mt-3 items-center">
                  <AiOutlineHeart
                    className={`text-2xl hover:cursor-pointer hover:text-gray-500 max-h ${
                      post.likes.includes(auth.currentUser.uid)
                        ? "text-red-600"
                        : "text-black"
                    }`}
                    onClick={() => handleLikes(post.id)}
                  />
                  <FaRegComment
                    className="text-xl hover:cursor-pointer hover:text-gray-500 "
                    onClick={() => handleShowComments(post.id)}
                  />
                </div>
                <p className="hover:cursor-pointer mt-2 text-sm max">
                  {post.likesCount} likes
                </p>
                <div className="flex align-center gap-3 text-sm mt-2">
                  <span className="font-semibold">{post.username}</span>
                  <p>{post.txt}</p>
                </div>
                <div className="flex flex-wrap items-center">
                  <textarea
                    placeholder="Add a comment..."
                    value={postComments[post.id]}
                    onChange={(e) => handleCommentChange(post.id, e)}
                    className="outline-none dark:bg-black w-11/12 overflow-auto h-6 break-words max-h-24 resize-none"
                  />
                  <button
                    className="text-blue-400 text-sm"
                    onClick={() => handleSubmit(post.id)}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
}
