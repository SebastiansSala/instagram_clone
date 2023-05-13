import React, { useState } from "react";

export default function CreateModal({ setSelectState, selectState }) {
  const [image, setImage] = useState(undefined);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setImage((prevState) => ({ ...prevState, Create: false }));
  };

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
      <div className="container  w-[40rem] h-[40rem] bg-white rounded-lg flex flex-col absolute">
        {!image && (
          <>
            <span className="w-full border-b py-2 text-center font-semibold">
              Create new Post
            </span>
            <div className="flex flex-col justify-center items-center gap-5 flex-1">
              <img src="" alt="create post" />
              <span className="text-xl">Drag photos and videos here</span>
              <form className="hover:cursor-pointer">
                <div className="relative hover:cursor-pointer">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:cursor-pointer"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    Seleccionar archivo
                  </button>
                  <input
                    id="fileInput"
                    type="file"
                    value={image}
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 hover:cursor-pointer"
                  />
                </div>
              </form>
            </div>
          </>
        )}
        {image && (
          <>
            <div className="flex flex-col items-center py-4 gap-5 flex-1">
              {image && (
                <>
                <div className="border w-3/4">
                <img
                    src={URL.createObjectURL(image)}
                    alt="Selected image"
                    className="w-full"
                  />
                </div>
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                      value={text}
                      type="areatext"
                      onChange={(e) => setText(e.target.value)}
                      className="text-black border hover:cursor-pointer"
                    />
                  </form>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
