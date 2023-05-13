import React from "react";

export default function RenderComments({comments, setShowComments}) {
  return (
    <div className="w-screen h-screen inset-0 bg-black/60 flex items-center justify-center z-50 absolute transition duration-300">
      <div className="w-full h-full" onClick={setShowComments(false)}></div>
      <span
        className="right-4 top-1 text-white absolute text-3xl cursor-pointer"
        onClick={setShowComments(false)}
      >
        x
      </span>
      <div className="container  w-[40rem] h-[40rem] bg-white rounded-lg flex flex-col absolute">
      </div>
    </div>
  );
}
