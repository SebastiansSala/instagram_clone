import {
  AiFillHome,
  AiOutlineSearch,
  AiOutlineCompass,
  AiOutlineHeart,
} from "react-icons/ai";
import { BsCameraReels } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";
import { CgProfile, CgDetailsMore } from "react-icons/cg";

export const navlist = [
  {
    name: "Home",
    icon: (
      <AiFillHome
        className={`text-2xl transition-all duration-300 ${
          hoverState.home ? "scale-125" : ""
        }`}
      />
    ),
    id: 0,
  },
  {
    name: "Search",
    icon: (
      <AiOutlineSearch
        className={`text-2xl transition-all duration-300 ${
          hoverState.search ? "scale-125" : ""
        }`}
      />
    ),
    id: 1,
  },
  {
    name: "Explore",
    icon: (
      <AiOutlineCompass
        className={`text-2xl transition-all duration-300 ${
          hoverState.explore ? "scale-125" : ""
        }`}
      />
    ),
    id: 2,
  },
  {
    name: "Reels",
    icon: (
      <BsCameraReels
        className={`text-2xl transition-all duration-300 ${
          hoverState.reels ? "scale-125" : ""
        }`}
      />
    ),
    id: 3,
  },
  {
    name: "Messages",
    icon: (
      <FiMessageSquare
        className={`text-2xl transition-all duration-300 ${
          hoverState.messages ? "scale-125" : ""
        }`}
      />
    ),
    id: 4,
  },
  {
    name: "Notifications",
    icon: (
      <AiOutlineHeart
        className={`text-2xl transition-all duration-300 ${
          hoverState.notifications ? "scale-125" : ""
        }`}
      />
    ),
    id: 5,
  },
  {
    name: "Create",
    icon: (
      <AiFillHome
        className={`text-2xl transition-all duration-300 ${
          hoverState.create ? "scale-125" : ""
        }`}
      />
    ),
    id: 6,
  },
  {
    name: "Profile",
    icon: (
      <CgProfile
        className={`text-2xl transition-all duration-300 ${
          hoverState.profile ? "scale-125" : ""
        }`}
      />
    ),
    id: 7,
  },
  {
    name: "More",
    icon: (
      <CgDetailsMore
        className={`text-2xl transition-all duration-300 ${
          hoverState.more ? "scale-125" : ""
        }`}
      />
    ),
    id: 8,
  },
];
