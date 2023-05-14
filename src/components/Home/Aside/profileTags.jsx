import React from "react";
import { Link } from "react-router-dom";

export default function ProfileTags({ text, selectState, handleSelected }) {
  let newText = text.at(0).toUpperCase() + text.slice(1);
  return (
    <Link
      to={`${text === "posts" ? "/profile/" : `/profile/${text}`}`}
      className={`py-3 text-sm tracking-widest  ${
        selectState[text]
          ? "border-t text-black dark:text-white border-black"
          : "text-gray-500 border-t border-white"
      }`}
      onClick={() => handleSelected(text)}
    >
      {newText}
    </Link>
  );
}
