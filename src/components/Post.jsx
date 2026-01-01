import { useContext } from "react";
import { PostContext } from "../store/PostContext.jsx";
import styles from "./Post.module.css";

function Post({ title, description, reactions, tags, user_id, id }) {
  const { handleDeleteButton } = useContext(PostContext);

  return (
    <div className={styles.postCard}>
      <div className={styles.cardBody}>
        <h5 className={styles.title}>{title}</h5>
        <p className={styles.userId}>User ID: {user_id}</p>

        <p className={styles.description}>{description}</p>

        <div className={styles.meta}>
          <p>{JSON.stringify(reactions)}</p>
          <span className={styles.tags}>{tags.join(", ")}</span>
        </div>

        <button
          className={`btn btn-danger ${styles.deleteBtn}`}
          onClick={() => handleDeleteButton(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Post;
