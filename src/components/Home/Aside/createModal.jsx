import React from "react";

export default function CreateModal({ setSelectState, selectState }) {
  return (
    <div className="w-screen h-screen inset-0 bg-black/60 flex items-center justify-center z-50 absolute transition duration-300">
      <div
        className="w-full h-full"
        onClick={() =>
          setSelectState((prevState) => ({ ...prevState, Create: false }))
        }
      ></div>
      <span
        className="right-4 top-1 text-white absolute text-3xl cursor-pointer"
        onClick={() =>
          setSelectState((prevState) => ({ ...prevState, Create: false }))
        }
      >
        x
      </span>
      <div className="container ml-0 xl:ml-80 w-[50rem] max-w-[30rem] h-96 bg-white rounded-lg flex flex-col absolute">
        <span className="w-full border-b py-2 text-center font-semibold">
          Create new Post
        </span>
        <div className="flex flex-col justify-center items-center gap-5 flex-1">
          <img src="" alt="create post" />
          <span className="text-xl">Drag photos and videos here</span>
          <button className="px-2 py-1 text-white bg-blue-600/80 hover:bg-blue-600 transition duration-300 rounded-md">
            Select from computer
          </button>
        </div>
      </div>
    </div>
  );
}
