import { useReducer, createContext, useState, useEffect } from "react";

export const PostContext = createContext({
  posts: [],
  handleAddButton: () => { },
  handleDeleteButton: () => { },
  fetching: false
});



const postsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [action.payload,...state];

    case "DELETE_ITEM":
      return state.filter(post => post.id !== action.payload.id);

    case "ADD_ITEMS":
      return action.payload;

    default:
      return state;
  }
};

function PostContextContainer({ children }) {
  const [posts, dispatchPosts] = useReducer(postsReducer, []);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setFetching(true);

    fetch("https://dummyjson.com/posts", { signal })
      .then(res => res.json())
      .then(data => {
        handlePostServer(data.posts);
        setFetching(false);
      })
      .catch(err => {
        if (err.name !== "AbortError") {
          console.error(err);
          setFetching(false);
        }
      });

    return () => controller.abort();
  }, []);

  const handleAddButton = (post) => {
    dispatchPosts({
      type: "ADD_ITEM",
      payload: post
    });
  };

  const handlePostServer = (postsServer) => {
    dispatchPosts({
      type: "ADD_ITEMS",
      payload: postsServer
    });
  };

  const handleDeleteButton = (id) => {
    dispatchPosts({
      type: "DELETE_ITEM",
      payload: { id }
    });
  };

  return (
    <PostContext.Provider value={{ posts, handleAddButton, handleDeleteButton, fetching }}>
      {children}
    </PostContext.Provider>
  );
}

export default PostContextContainer;
