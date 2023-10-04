// import Accounts from "./Data";
import React, { createContext, useEffect, useState } from "react";
// import AllNotes from "./Data";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const postsFromLS = JSON.parse(localStorage.getItem("posts")) || [];

  const [posts, setPosts] = useState(postsFromLS);
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostProvider, PostContext };
