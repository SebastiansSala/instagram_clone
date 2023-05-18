import {
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { db, auth } from "../../firebase";

export default function RenderComments({
  comments,
  setShowComments,
  post,
  postComments,
  setPostComments,
}) {
  const [change, setChange] = useState("");
  const currentUser = auth.currentUser.uid;

  const handleLikes = async (commentId) => {
    try {
      const postRef = doc(db, "posts", post.id);
      const commentRef = collection(postRef, "comments");
      const commentList = await getDocs(commentRef);
      const commentsFiltered = commentList.docs.filter(
        (comment) => comment.id !== commentId
      );
      const likesList = commentsFiltered[0].data().likes;
      const likes = likesList.find((id) => id === currentUser);
      if (likes) {
        const filteredLikes = likesList.filter((id) => id !== currentUser);
        await updateDoc(commentsFiltered[0].ref, { likes: [...filteredLikes] });
      } else {
        await updateDoc(commentsFiltered[0].ref, {
          likes: [...likesList, currentUser],
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log(comments);
    comments.forEach((element) => {
      console.log(element);
    });
  }, []);

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
            {comments.map((comment) => {
              return (
                <>
                  <div className="flex gap-3 items-center">
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
                      <AiOutlineHeart
                        className="hover:cursor-pointer"
                        onClick={() => handleLikes(comment.id)}
                      />
                    </span>
                  </div>
                </>
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
            />
            <button className="text-blue-400 text-sm">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}
