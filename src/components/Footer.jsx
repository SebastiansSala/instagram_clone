import React from "react";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col text-xs md:text-xl text-gray-500 justify-center items-center mt-20 px-8 lg:text-xs">
      <section className="flex flex-wrap gap-2 justify-center">
        <p>Meta</p>
        <p>About</p>
        <p>Blog</p>
        <p>Jobs</p>
        <p>Help</p>
        <p>API</p>
        <p>Privacy</p>
        <p>Terms</p>
        <p>Top Accounts</p>
        <p>Locations</p>
        <p>Instagram Lite</p>
        <p>Contact Uploading & Non-Users</p>
        <p>Meta Verified</p>
      </section>
      <div className="flex gap-8 mt-5">
        <p>English</p>
        <span>2023 Instagram from Meta</span>
      </div>
    </footer>
  );
}
