import React, { useState } from "react";

export default function NavItem({
  icon,
  text,
  selectState,
  handleSelect,
  moreNavItemRef,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      ref={moreNavItemRef}
      className={`hover:bg-gray-300/30 dark:text-white hover:cursor-pointer p-1 rounded-md list-none transition-all xl:w-full duration-300 flex gap-3 ${text === "More" ? 'mt-auto' : ""} ${
        selectState[text] ? "font-bold" : ""
      } ${text === "Explore" || text === "More" ? "hidden xl:block" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => handleSelect(text)}
    >
      {icon({
        className: `xl:text-2xl text-5xl transition-all duration-300 ${
          hovered ? "scale-125" : ""
        }`,
      })}
      <span className="hidden xl:block">{text}</span>
    </li>
  );
}
