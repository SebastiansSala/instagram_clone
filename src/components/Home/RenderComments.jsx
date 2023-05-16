import React, { useEffect } from "react";

export default function RenderComments({ comments, setShowComments, post }) {
  useEffect(() => {
    console.log(comments);
  }, []);

  return (
    <div className="w-screen fixed h-full inset-0 bg-black/60 flex items-center justify-center z-50 transition duration-300">
      <div
        className="w-full h-full"
        onClick={() => setShowComments(false)}
      ></div>
      <div className="h-full p-5 flex items-center absolute">
        <div className="w-[60rem] h-[40rem] bg-white dark:bg-black relative">
          <img
            src={post.img}
            className="w-full object-center object-fill h-full"
          />
        </div>
        <div className="w-[30rem] h-[55rem] p-2 bg-white dark:bg-black relative dark:text-white text-black">
          <div className="h-10 w-full flex items-center gap-3 border-b">
            <div className="w-6 h-6 rounded-full bg-green-300"></div>
            <span>{post.username}</span>
          </div>
          <div className="h-3/4 w-full mt-2 border-b overflow-y-auto">
            {comments.map((comment) => {
              return (
                <>
                  <div className="flex gap-3">
                    <div className="w-4 h-4 rounded-full bg-green-300"></div>
                    <div className="flex flex-col gap-1">
                      <p>
                        <span className="font-semibold">
                          {comment.username}
                        </span>
                        {comment.comment}
                      </p>
                      <span>{comment.like}</span>
                    </div>
                    <span className="ml-auto">x</span>
                  </div>
                </>
              );
            })}
          </div>
          <div className="mt-2 flex flex-col border-b">
              <span>Corazon </span>
              <span>{post.likes} Likes</span>
            </div>
            <div className="mt-2">

            </div>
        </div>
      </div>
    </div>
  );
}
