import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebase";

export default function RenderComments({
  comments,
  setShowComments,
  post,
  setComments,
}) {
  const [change, setChange] = useState("");
  const currentUser = auth.currentUser.uid;

  const handlePost = async () => {
    if (change.length < 2) return;
    try {
      const dbRef = doc(db, "posts", post.id);
      const collectionRef = collection(dbRef, "comments");
      const docRef = await addDoc(collectionRef, {
        userID: currentUser,
        username: auth.currentUser.displayName,
        comment: change,
        likes: []
      });
      const docData = await getDoc(docRef);
      setComments((prevComments) => [
        ...prevComments,
        { ...docData.data(), likesCount: docData.data().likes.length },
      ]);
      setChange("");
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  const handleLikes = async (commentId) => {
    try {
      const postRef = doc(db, "posts", post.id);
      const commentRef = collection(postRef, "comments");
      const commentDoc = await getDoc(doc(commentRef, commentId));
      const likesList = commentDoc.data().likes;
      const likes = likesList.includes(currentUser);

      let newLikesList;
      if (likes) {
        newLikesList = likesList.filter((id) => id !== currentUser);
        await updateDoc(doc(commentRef, commentId), { likes: newLikesList });
      } else {
        newLikesList = { ...likesList, currentUser };
        await updateDoc(doc(commentRef, commentId), {
          likes: newLikesList,
        });
      }

      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              likes: newLikesList,
              likesCount: newLikesList.length,
            };
          }
          return comment;
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const updateComments = async () => {
      try {
        const postRef = doc(db, "posts", post.id);
        const commentRef = collection(postRef, "comments");
        const newCommentList = await getDocs(commentRef);
        const updatedComments = newCommentList.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          likes: doc.data().likes || [],
          likesCount: doc.data().likes.length,
        }));
        setComments(updatedComments);
      } catch (e) {
        console.error(e);
      }
    };

    updateComments();
  }, [comments]);

  return (
    <div className="w-screen fixed h-screen inset-0 bg-black/60 flex items-center justify-center z-50 transition duration-300">
      <div
        className="w-full h-full"
        onClick={() => setShowComments(false)}
      ></div>
      <div className="p-5 w-4/6 h-full flex items-center absolute">
        <div className="w-4/6 h-full bg-white dark:bg-black relative">
          <img
            src={post.img}
            className="w-full object-center object-contain h-full"
          />
        </div>
        <div className="w-40 xl:w-[30rem] h-full p-2 bg-white dark:bg-black relative dark:text-white text-black">
          <div className="pl-3 h-10 w-full flex items-center gap-3 border-b">
            <div className="w-6 h-6 rounded-full bg-green-300"></div>
            <span>{post.username}</span>
          </div>
          <div className="pl-3 py-4 h-3/4 w-full mt-2 border-b overflow-y-auto">
            {comments.map((comment, index) => {
              return (
                <div className="flex gap-3 items-center" key={index}>
                  <div className="w-6 h-6 rounded-full bg-green-300"></div>
                  <div className="flex flex-col gap-1">
                    <p>
                      <span className="font-semibold mr-1">
                        {comment.username}
                      </span>
                      {comment.comment}
                    </p>
                    <span>{comment.likesCount} likes</span>
                  </div>
                  <span className="ml-auto">
                    {comment.likes.includes(currentUser) ? (
                      <AiFillHeart
                        className="hover:cursor-pointer text-red-600"
                        onClick={() => handleLikes(comment.id)}
                      />
                    ) : (
                      <AiOutlineHeart
                        className="hover:cursor-pointer"
                        onClick={() => handleLikes(comment.id)}
                      />
                    )}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="pl-3 mt-2 flex flex-col border-b">
            <AiOutlineHeart className="hover:cursor-pointer" />
            <span>{post.likesCount} Likes</span>
          </div>
          <div className="pl-3 mt-2">
            <textarea
              placeholder="Add a comment..."
              className="outline-none dark:bg-black w-11/12 overflow-auto h-6 break-words max-h-24 resize-none"
              onChange={(e) => setChange(e.target.value)}
            />
            <button
              className="text-blue-400 text-sm"
              onClick={() => handlePost()}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
