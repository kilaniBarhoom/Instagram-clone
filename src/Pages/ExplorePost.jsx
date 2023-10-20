import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BaseURL, token } from "../Contexts/Vars";
import Post from "../Components/Post";

const ExplorePost = () => {
  const [post, setPost] = useState();
  const { postid } = useParams();

  useEffect(() => {
    axios
      .get(`${BaseURL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPost(res.data.posts.find((post) => post.id == postid));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div
      className="posts-container"
      style={{ marginLeft: "260px", padding: "10ch" }}
    >
      {post != undefined ? (
        <Post
          key={post.id}
          id={post.id}
          image={post.image}
          user={post.user}
          likes={post.likes}
          description={post.description}
          createdAt={post.createdAt}
          comments={post.comments}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ExplorePost;
