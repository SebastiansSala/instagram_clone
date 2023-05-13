import React, { useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import RenderComments from "./RenderComments";

export default function PostSection() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([{}]);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [postComments, setPostComments] = useState(posts.map(post => ({ [post.id]: '' })));

  const handleSubmit = async (postId) => {
    const currentUsername = auth.currentUser.displayName;
    console.log(postId)
    try {
      const postRef = doc(db, "posts", postId);
      const commentRef = collection(postRef, "comments");
      const newCommentRef = await addDoc(commentRef, {
        username: currentUsername,
        comment: postComments[postId],
        likes: 0,
      });
      setPostComments(prevPost => ({...prevPost, [postId]: ""}));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCommentChange = (postId, e) => {
    setPostComments(prevState => ({
      ...prevState,
      [postId]: e.target.value
    }));
  };
  

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
      {posts.map((post, index) => {
        return (
          <div
            className="flex flex-col ml-20 mt-10 w-4/6 border-b pb-5"
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
              <div className="flex flex-wrap items-center">
                <textarea
                  placeholder="Add a comment..."
                  value={postComments[post.id]}
                  onChange={(e) => handleCommentChange(post.id, e)}
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
      {showComments && (
        <RenderComments comments={comments} setShowComments={setShowComments} />
      )}
    </section>
  );
}
