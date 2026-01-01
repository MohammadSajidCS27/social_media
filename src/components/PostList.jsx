import { useContext } from "react";
import Post from "./Post";
import { PostContext } from "../store/PostContext.jsx";
import Welcome from "./Welcome.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
function PostList() {
    const { posts,fetching } = useContext(PostContext);
    return (
        <>
            {fetching && <LoadingSpinner />}
            {!fetching && posts.length === 0 && <Welcome />}
            {!fetching && posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    description={post.body}
                    user_id={post.userId}
                    reactions={post.reactions}
                    tags={post.tags}
                />
            ))}

        </>
    );
}
export default PostList;