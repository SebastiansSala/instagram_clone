import React, { useEffect, useState } from "react";
import PostSection from "./postSection";
import FollowSection from "./FollowSection";

export default function Main({setLoading, setComments, setShowComments, setCurrentPost, posts, setPosts}) {

  //const [loadingFollow, setLoadingFollow] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    setLoading(loadingPosts);
  }, [loadingPosts, setLoading])

  return (
    <>
      <PostSection loadingPosts={loadingPosts} setLoadingPosts={setLoadingPosts} setComments={setComments} setShowComments={setShowComments} setCurrentPost={setCurrentPost} setPosts={setPosts} posts={posts}/>
      <FollowSection />
    </>
  );
}
