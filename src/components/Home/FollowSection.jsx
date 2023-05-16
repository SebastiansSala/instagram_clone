import React from "react";
import HomeFooter from "./Footer";

export default function FollowSection() {
  return (
    <section className="hidden xl:block xl:w-80 ">
      <div className="flex gap-5 items-center hover:cursor-pointer">
        <div className="h-6 w-6 xl:w-12 xl:h-12 rounded-full bg-green-400"></div>
        <div className="flex flex-col">
          <p className="text-sm">username</p>
          <p className="text-xs">name</p>
        </div>
        <button className="text-blue-400 font-bold hover:text-blue-700 text-xs ml-auto">
          Switch
        </button>
      </div>
      <div className="flex gap-5 items-center my-5 hover:cursor-pointer">
        <div className="xl:w-8 xl:h-8 rounded-full bg-rose-300"></div>
        <div className="flex flex-col xl:text-sm text-xs">
          <span>username</span>
          <span>Follow by people</span>
        </div>
        <button className="text-blue-400 font-bold hover:text-blue-700 text-xs ml-auto">
          Follow
        </button>
      </div>
      <div className="flex gap-5 items-center my-5 hover:cursor-pointer">
        <div className="xl:w-8 xl:h-8 rounded-full bg-rose-300"></div>
        <div className="flex flex-col text-xs xl:text-sm">
          <span>username</span>
          <span>Follow by 123123211</span>
        </div>
        <button className="text-blue-400 font-bold hover:text-blue-700 text-xs ml-auto">
          Follow
        </button>
      </div>
      <HomeFooter />
    </section>
  );
}
