import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import Stories from "./Stories";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function PostSection() {
  const navigate = useNavigate();
  const signOutUser = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <section>
      <Stories />
      <div className="flex flex-col ml-20 mt-10 w-4/6 border-b">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-full bg-slate-400"></div>
            <p className="hover:text-gray-500 hover:cursor-pointer">
              collins 3dias
            </p>
            <FiMoreHorizontal className="ml-auto text-xl hover:cursor-pointer hover:text-gray-500" />
          </div>
          <img
            src="https://fotografiamejorparavendermas.com/wp-content/uploads/2017/06/La-importancia-de-la-imagen.jpg"
            className="w-full object-cover object-center"
          ></img>
          <div className="flex gap-5 mt-3 items-center">
            <AiOutlineHeart className="text-3xl hover:cursor-pointer hover:text-gray-500" />
            <FaRegComment className="text-2xl hover:cursor-pointer hover:text-gray-500" />
            <AiOutlineShareAlt className="text-3xl hover:cursor-pointer hover:text-gray-500" />
          </div>
          <p className="hover:cursor-pointer mt-2 text-sm">123 likes</p>
          <div className="flex align-center gap-3 text-sm mt-2">
            <span className="font-semibold">username</span>
            <p>Tu plato Fuerte</p>
          </div>
          <button className="text-sm text-gray-500">View all 2 Comments</button>
        </div>
      </div>
      <button
        className="text-xl mt-20 py-2 px-8 bg-red-600"
        onClick={() => signOutUser()}
      >
        Sign out
      </button>
    </section>
  );
}
