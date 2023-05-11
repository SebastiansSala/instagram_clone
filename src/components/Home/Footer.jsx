import React from "react";

export default function HomeFooter() {
  return (
    <footer className="w-full flex flex-col text-gray-400 text-xs mt-8 justify-center items-center">
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
