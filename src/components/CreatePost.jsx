import { useContext, useRef } from "react";
import { PostContext } from "../store/PostContext.jsx";
import styles from "./CreatePost.module.css";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  let  title = useRef();
  let  description = useRef();
  let  user_id = useRef();
  let  reactions = useRef();
  let tags = useRef();
  const navigate = useNavigate();
  const { handleAddButton } = useContext(PostContext);

  const handleSubmit = () => {
  const newPost = {
    title: title.current.value,
    body: description.current.value,
    userId: Number(user_id.current.value),
    reactions: { likes: 0, dislikes: 0 },
    tags: tags.current.value.split(" ")
  };

  fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost)
  })
    .then(res => res.json())
    .then(resObj => {
      handleAddButton(resObj); 
      navigate("/");
    });
};


  return (
    <div className={styles.formWrapper}>
      <div className={styles.formTitle}>Create New Post</div>

      <div className={styles.formGroup}>
        <label className="form-label">User ID</label>
        <input className="form-control" ref={user_id} />
      </div>

      <div className={styles.formGroup}>
        <label className="form-label">Title</label>
        <input className="form-control" ref={title} />
      </div>

      <div className={styles.formGroup}>
        <label className="form-label">Description</label>
        <textarea className="form-control" rows="3" ref={description} />
      </div>

      <div className={styles.formGroup}>
        <label className="form-label">Reactions</label>
        <input className="form-control" ref={reactions} />
      </div>

      <div className={styles.formGroup}>
        <label className="form-label">Tags</label>
        <input
          className="form-control"
          placeholder="space separated tags"
          ref={tags}
        />
      </div>

      <button
        type="button"
        className={`btn btn-primary ${styles.submitBtn}`}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default CreatePost;
