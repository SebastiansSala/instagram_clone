import React, { useState } from "react";
import {
  AiFillHome,
  AiOutlineSearch,
  AiOutlineCompass,
  AiOutlineHeart,
} from "react-icons/ai";
import NavItem from "./NavItem";
import { CgProfile, CgDetailsMore, CgAddR } from "react-icons/cg";
import { Link } from "react-router-dom";
import MoreModal from "./MoreModal";
import CreateModal from "./createModal";

export default function HomeAside({setDarkmode, darkmode, handleClick}) {
  const [selectState, setSelectState] = useState({
    Home: false,
    Search: false,
    Explore: false,
    Reels: false,
    Messages: false,
    Notifications: false,
    Create: false,
    Profile: false,
    More: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (selected) => {
    if (selected === "More") {
      setSelectState((prevState) => ({
        ...prevState,
        More: !prevState.More,
      }));
      if (selectState.More || !selectState.More) {
        setIsModalOpen(true);
      } else {
        setIsModalOpen(false);
        
      }
    }
    setSelectState((prevState) => {
      const newState = {};
      Object.keys(prevState).forEach((key) => {
        newState[key] = key === selected;
      });
      return newState;
    });
  };

  return (
    <aside className="fixed bottom-0 xl:top-0 xl:left-0 h-20 w-full xl:w-0 xl:h-full xl:pr-40 border-t border-r flex bg-white dark:bg-black xl:flex-col order-2 xl:order-first">
      {darkmode ? (
        <img
        src="https://www.pngkey.com/png/full/28-287308_instagram-logo-text-white.png"
        className="ml-6 hidden xl:w-40 xl:block w-40 mt-6"
        alt="logo"
      />
      ) : (
        <img
        src="https://1000marcas.net/wp-content/uploads/2019/11/Logo-Instagram.png"
        className="ml-6 hidden xl:w-40 xl:block w-40 mt-6"
        alt="logo"
      />
      )}
      <nav className="flex flex-row xl:flex-col xl:w-full xl:h-full justify-center p-5 gap-3 flex-1">
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
        {selectState.Create && (
          <CreateModal
            setSelectState={setSelectState}
          />
        )}
        <Link to="/profile">
          <NavItem
            icon={CgProfile}
            text="Profile"
            selectState={selectState}
            handleSelect={handleSelect}
          ></NavItem>
        </Link>
        {isModalOpen && (
          <MoreModal
            setIsModalOpen={setIsModalOpen}
            onClick = {handleClick}
          />
        )}
        <NavItem
          icon={CgDetailsMore}
          text="More"
          selectState={selectState}
          handleSelect={handleSelect}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </nav>
    </aside>
  );
}
