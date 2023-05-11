import React from "react";

export default function PostSection({signOutUser}) {
  return (
    <section className="border">
      <div className="flex gap-4">
        <div className="w-16 h-16 rounded-full bg-slate-400"></div>
        <div className="w-16 h-16 rounded-full bg-slate-400"></div>
        <div className="w-16 h-16 rounded-full bg-slate-400"></div>
        <div className="w-16 h-16 rounded-full bg-slate-400"></div>
        <div className="w-16 h-16 rounded-full bg-slate-400"></div>
        <div className="w-16 h-16 rounded-full bg-slate-400"></div>
        <div className="w-16 h-16 rounded-full bg-slate-400"></div>
      </div>
      <div className="flex flex-col border ml-20 mt-10">
        <div>
          <div className="flex items-center gap-3 border justify-between">
            <div className="w-6 h-6 rounded-full bg-slate-400"></div>
            <p>collins 3dias</p>
            <p className="ml-auto">Icons</p>
          </div>
          <img src="https://fotografiamejorparavendermas.com/wp-content/uploads/2017/06/La-importancia-de-la-imagen.jpg" className="w-[30rem]"></img>
          <div className="flex gap-5"></div>
          <p>123 likes</p>
          <p>Tu plato Fuerte</p>
          <button>View all 2 Comments</button>
        </div>
      </div>
      <button
        className="text-xl mt-20 py-2 px-8 bg-red-600"
        onClick={signOutUser}
      >
        Sign out
      </button>
    </section>
  );
}
