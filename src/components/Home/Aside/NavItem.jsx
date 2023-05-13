import React, { useState } from "react";

export default function NavItem({
  icon,
  text,
  selectState,
  handleSelect,
  styles,
  moreNavItemRef,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      ref={moreNavItemRef}
      className={`hover:bg-gray-300/30 hover:cursor-pointer px-2 py-3 rounded-md list-none transition-all w-full duration-300 flex gap-3 ${text === "More" ? 'mt-auto' : ""} ${
        selectState[text] ? "font-bold" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => handleSelect(text)}
      style={styles}
    >
      {icon({
        className: `text-2xl transition-all duration-300 ${
          hovered ? "scale-125" : ""
        }`,
      })}
      <span>{text}</span>
    </li>
  );
}
