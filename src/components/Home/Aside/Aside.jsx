import React, { useState } from "react";
import {
  AiFillHome,
  AiOutlineSearch,
  AiOutlineCompass,
  AiOutlineHeart,
} from "react-icons/ai";
import NavItem from "./NavItem";
import { BsCameraReels } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";
import { CgProfile, CgDetailsMore, CgAddR } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function HomeAside() {
  const [selectState, setSelectState] = useState({
    Home: false,
    Search: false,
    Explore: false,
    Reels: false,
    Messages: false,
    Notifications: false,
    Profile: false,
    More: false,
  });

  const handleSelect = (selected) => {
    setSelectState((prevSelectState) => {
      const newState = {};
      for (const prop in prevSelectState) {
        if (prevSelectState.hasOwnProperty(prop)) {
          newState[prop] = prop === selected ? !prevSelectState[prop] : false;
        }
      }
      return newState;
    });
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-96 border-r flex flex-col">
      <img
        src="https://1000marcas.net/wp-content/uploads/2019/11/Logo-Instagram.png"
        className="ml-6 w-40"
        alt="logo"
      />
      <nav className="flex flex-col p-5 gap-3 flex-1">
        <Link to="/">
          <NavItem
            icon={AiFillHome}
            text="Home"
            selectState={selectState}
            handleSelect={handleSelect}
          />
        </Link>
        <NavItem
          icon={AiOutlineSearch}
          text="Search"
          selectState={selectState}
          handleSelect={handleSelect}
        />
        <NavItem
          icon={AiOutlineCompass}
          text="Explore"
          selectState={selectState}
          handleSelect={handleSelect}
        />
        <NavItem
          icon={BsCameraReels}
          text="Reels"
          selectState={selectState}
          handleSelect={handleSelect}
        />
        <NavItem
          icon={FiMessageSquare}
          text="Messages"
          selectState={selectState}
          handleSelect={handleSelect}
        />
        <NavItem
          icon={AiOutlineHeart}
          text="Notifications"
          selectState={selectState}
          handleSelect={handleSelect}
        />
        <NavItem
          icon={CgAddR}
          text="Create"
          selectState={selectState}
          handleSelect={handleSelect}
        />
        <Link to="/profile">
          <NavItem
            icon={CgProfile}
            text="Profile"
            selectState={selectState}
            handleSelect={handleSelect}
          ></NavItem>
        </Link>
        <NavItem
          icon={CgDetailsMore}
          text="More"
          styles={{ marginTop: "auto" }}
          selectState={selectState}
          handleSelect={handleSelect}
        />
      </nav>
    </aside>
  );
}
