  import React, { useState } from "react";
  import { auth } from "../../../firebase";
  import { collection, addDoc } from "firebase/firestore";
  import { storage } from "../../../firebase";
  import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
  import { db } from "../../../firebase";
  import { MdOutlineAddPhotoAlternate } from "react-icons/md";
  import { AiOutlineRollback } from "react-icons/ai";

  export default function CreateModal({ setSelectState }) {
    const [image, setImage] = useState(undefined);
    const [text, setText] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const imageRef = ref(storage, image.name);
        await uploadBytes(imageRef, image);

        const imgUrl = await getDownloadURL(imageRef);

        const user = auth.currentUser;
        if (user) {
          const docRef = await addDoc(collection(db, "posts"), {
            userID: user.uid,
            username: user.displayName,
            img: imgUrl,
            likes: [],
            txt: text,
          });
        } else {
          console.error("Error adding document: user not found");
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      } finally {
        setImage(undefined);
        setText("");
        setSelectState((prevState) => ({ ...prevState, Create: false }));
      }
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
      <div className="container  w-[40rem] h-[40rem] bg-white dark:text-white dark:bg-zinc-800 rounded-lg flex flex-col absolute">
        {!image && (
          <>
            <div className="w-full border-b  dark:border-gray-900 py-2 text-center font-semibold">
              <span>Create new Post</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-5 flex-1">
              <MdOutlineAddPhotoAlternate className="text-7xl" />
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
            <div className="flex flex-col items-center gap-5 flex-1 px-3">
              {image && (
                <>
                  <div className="w-full border-b flex justify-between dark:border-gray-900 py-2 text-center font-semibold">
                    <AiOutlineRollback
                      className="text-2xl cursor-pointer"
                      onClick={() => {setImage(undefined); setText("")}}
                    />
                    <span>Create new Post</span>
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Share
                    </span>
                  </div>
                  <div className="flex">
                    <div className="w-4/6">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Selected image"
                        className="w-full max-h-full object-contain"
                      />
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)} className="px-2">
                      <div className="flex w-full items-center gap-2">
                        <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                        <span className="text-xs">
                          {auth.currentUser.displayName}
                        </span>
                      </div>
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="mt-3 w-full text-black border hover:cursor-pointer bg-transparent outline-none border-none dark:text-white max-h-40 h-40 overflow-auto min-h-min"
                      />
                    </form>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
