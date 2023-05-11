import React, { useState } from "react";
import {
  AiFillHome,
  AiOutlineSearch,
  AiOutlineCompass,
  AiOutlineHeart,
} from "react-icons/ai";
import { BsCameraReels } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";
import { CgProfile, CgDetailsMore } from "react-icons/cg";

export default function HomeAside() {
  const [hoverState, setHoverState] = useState({
    home: false,
    search: false,
    explore: false,
    reels: false,
    messages: false,
    notifications: false,
    profile: false,
    more: false,
  });

  return (
    <aside className="fixed left-0 top-0 h-full w-80 border-r flex flex-col">
      <img src="https://1000marcas.net/wp-content/uploads/2019/11/Logo-Instagram.png" className="ml-6 w-40" alt="logo"/>
      <nav className="flex flex-col p-5 gap-3 flex-1">
        <li
          className="hover:bg-gray-300/30 hover:cursor-pointer px-2 py-3 rounded-md list-none transition-all duration-300 flex gap-3"
          onMouseEnter={() => setHoverState({ ...hoverState, home: true })}
          onMouseLeave={() => setHoverState({ ...hoverState, home: false })}
        >
          <AiFillHome
            className={`text-2xl transition-all duration-300 ${
              hoverState.home ? "scale-125" : ""
            }`}
          />
          <span>Home</span>
        </li>
        <li
          className="hover:bg-gray-300/30 hover:cursor-pointer px-2 py-3 rounded-md list-none transition-all duration-300 flex gap-3"
          onMouseEnter={() => setHoverState({ ...hoverState, search: true })}
          onMouseLeave={() => setHoverState({ ...hoverState, search: false })}
        >
          <AiOutlineSearch
            className={`text-2xl transition-all duration-300 ${
              hoverState.search ? "scale-125" : ""
            }`}
          />
          <span className="relative">Search</span>
        </li>
        <li
          className="hover:bg-gray-300/30 hover:cursor-pointer px-2 py-3 rounded-md list-none transition-all duration-300 flex gap-3"
          onMouseEnter={() => setHoverState({ ...hoverState, explore: true })}
          onMouseLeave={() => setHoverState({ ...hoverState, explore: false })}
        >
          <AiOutlineCompass
            className={`text-2xl transition-all duration-300 ${
              hoverState.explore ? "scale-125" : ""
            }`}
          />
          <span className="">Explore</span>
        </li>
        <li
          className="hover:bg-gray-300/30 hover:cursor-pointer px-2 py-3 rounded-md list-none transition-all duration-300 flex gap-3"
          onMouseEnter={() => setHoverState({ ...hoverState, reels: true })}
          onMouseLeave={() => setHoverState({ ...hoverState, reels: false })}
        >
          <BsCameraReels
            className={`text-2xl transition-all duration-300 ${
              hoverState.reels ? "scale-125" : ""
            }`}
          />
          <span>Reels</span>
        </li>
        <li
          className="hover:bg-gray-300/30 hover:cursor-pointer px-2 py-3 rounded-md list-none transition-all duration-300 flex gap-3"
          onMouseEnter={() => setHoverState({ ...hoverState, messages: true })}
          onMouseLeave={() => setHoverState({ ...hoverState, messages: false })}
        >
          <FiMessageSquare
            className={`text-2xl transition-all duration-300 ${
              hoverState.messages ? "scale-125 text-gray-600" : ""
            }`}
          />
          <span>Messages</span>
        </li>
        <li
          className="hover:bg-gray-300/30 hover:cursor-pointer px-2 py-3 rounded-md list-none transition-all duration-300 flex gap-3"
          onMouseEnter={() =>
            setHoverState({ ...hoverState, notifications: true })
          }
          onMouseLeave={() =>
            setHoverState({ ...hoverState, notifications: false })
          }
        >
          <AiOutlineHeart
            className={`text-2xl transition-all duration-300 ${
              hoverState.notifications ? "scale-125" : ""
            }`}
          />
          <span>Notifications</span>
        </li>
        <li className="hover:bg-gray-300/30 hover:cursor-pointer px-2 py-3 rounded-md list-none transition-all duration-300 flex gap-3">
          <span>Create</span>
        </li>
        <li
          className="hover:bg-gray-300/30 hover:cursor-pointer px-2 py-3 rounded-md list-none transition-all duration-300 flex gap-3"
          onMouseEnter={() => setHoverState({ ...hoverState, profile: true })}
          onMouseLeave={() => setHoverState({ ...hoverState, profile: false })}
        >
          <CgProfile
            className={`text-2xl transition-all duration-300 ${
              hoverState.profile ? "scale-125" : ""
            }`}
          />
          <span>Profile</span>
        </li>
        <li className="flex-grow list-none"></li>
        <li
          className="hover:bg-gray-300/30 hover:cursor-pointer px-2 py-3 rounded-md list-none transition-all duration-300 flex gap-3 mt-auto"
          onMouseEnter={() => setHoverState({ ...hoverState, more: true })}
          onMouseLeave={() => setHoverState({ ...hoverState, more: false })}
        >
          <CgDetailsMore
            className={`text-2xl transition-all duration-300 ${
              hoverState.more ? "scale-125" : ""
            }`}
          />
          <span>More</span>
        </li>
      </nav>
    </aside>
  );
}
