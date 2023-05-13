import React, { useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function PostSection() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([{}]);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [changeComment, setChangeComment] = useState("");

  const signOutUser = () => {
    signOut(auth);
    navigate("/login");
  };

  const handleSubmit = async (postID) => {
    const currentUsername = auth.currentUser.displayName;
    if(changeComment.length < 8) return;
    try {
      const postRef = doc(db, "posts", postID);
      const commentRef = collection(postRef, "comments");
      const newCommentRef = await addDoc(commentRef, {
        username: currentUsername,
        comment: changeComment,
        likes: 0,
      });
      setChangeComment("");
    } catch (e) {
      console.error(e);
    }
  };

  const handleCommentChange = (postId) => {
    const postIndex = posts.findIndex((post) => posts.id = postId);
    const post = posts[postIndex];
    const updatedPost = { ...post, comment: value };
    const updatedPosts = [...posts];
    updatedPosts.splice(postIndex, 1, updatedPost);
    setPosts(updatedPosts);
  }

  const handleShowComments = (postId) => {
    setShowComments(true);
    const mapComments = async () => {
      try {
        const postRef = doc(db, "posts", postId);
        const commentsRef = collection(postRef, "comments");
        const querySnapshot = await getDocs(commentsRef);
        const comments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments({ ...comments, [postId]: comments });
      } catch (e) {
        console.error(e);
      }
    };
    mapComments().then((data) => setComments(data));
  };

  const mapPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  useEffect(() => {
    mapPosts().then((data) => setPosts(data));
  }, []);

  return (
    <section>
      {posts.map((post) => {
        return (
          <div
            className="flex flex-col ml-20 mt-10 w-4/6 border-b pb-5"
            key={post.id}
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
                className="w-full object-cover object-center"
              ></img>
              <div className="flex gap-5 mt-3 items-center">
                <AiOutlineHeart className="text-2xl hover:cursor-pointer hover:text-gray-500 max-h" />
                <FaRegComment className="text-xl hover:cursor-pointer hover:text-gray-500 " />
              </div>
              <p className="hover:cursor-pointer mt-2 text-sm max">
                {post.likes} likes
              </p>
              <div className="flex align-center gap-3 text-sm mt-2">
                <span className="font-semibold">{post.username}</span>
                <p>{post.txt}</p>
              </div>
              <button
                className="block text-sm text-gray-500 "
                onClick={() => handleShowComments(post.id)}
              >
                View all 2 Comments
              </button>
              {showComments && (
                <div className="w-screen h-screen inset-0 bg-black/60 flex items-center justify-center z-50 absolute transition duration-300">
                  <div
                    className="w-full h-full"
                    onClick={setShowComments(false)}
                  ></div>
                  <span
                    className="right-4 top-1 text-white absolute text-3xl cursor-pointer"
                    onClick={setShowComments(false)}
                  >
                    x
                  </span>
                  <div className="container  w-[40rem] h-[40rem] bg-white rounded-lg flex flex-col absolute">

                  </div>
                </div>
              )}
              <div className="flex flex-wrap items-center">
                <textarea
                  placeholder="Add a comment..."
                  value={changeComment}
                  onChange={(e) => handleCommentChange(e.target.value)}
                  className="outline-none w-11/12 overflow-auto h-6 break-words max-h-24 resize-none"
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
      <button
        className="text-xl mt-20 py-2 px-8 bg-red-600"
        onClick={() => signOutUser()}
      >
        Sign out
      </button>
    </section>
  );
}
