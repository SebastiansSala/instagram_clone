import React, { useEffect, useState } from "react";
import PostSection from "./postSection";
import FollowSection from "./FollowSection";

export default function Main({setLoading}) {

  //const [loadingFollow, setLoadingFollow] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    setLoading(loadingPosts);
  }, [loadingPosts, setLoading])

  return (
    <>
      <PostSection loadingPosts={loadingPosts} setLoadingPosts={setLoadingPosts}/>
      <FollowSection />
    </>
  );
}
