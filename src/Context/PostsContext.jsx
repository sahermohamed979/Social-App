import axios from "axios";

import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const PostsContext = createContext();

export default function PostsContextProvider(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  async function getAllPosts() {
    try {
      setLoading(true);
      let { data } = await axios.get(
        "https://linked-posts.routemisr.com/posts?limit=50",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setLoading(false);
      return data;
    } catch (error) {
      console.log("Error fetching posts:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  return (
    <PostsContext.Provider value={{ getAllPosts, loading, error }}>
      {props.children}
    </PostsContext.Provider>
  );
}
