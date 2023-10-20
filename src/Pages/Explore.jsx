import "../Styles/Explore.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BaseURL, token } from "../Contexts/Vars";
import { useNavigate } from "react-router-dom";

export default function Explore() {
  const [tempPosts, setTempPosts] = useState([]);
  const [explorePosts, setExplorePosts] = useState([]);
  const nav = useNavigate();

  const sortByLikes = (post1, post2) => {
    const likesCount1 = post1.likes.length;
    const likesCount2 = post2.likes.length;

    return likesCount2 - likesCount1;
  };

  useEffect(() => {
    axios
      .get(`${BaseURL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTempPosts(res.data.posts);
        setExplorePosts(tempPosts.sort(sortByLikes).slice(0, 15));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [explorePosts]);

  return (
    <div className="explore-page-container">
      <div className="explore-content">
        {explorePosts.map(({ id, image }, ind) => {
          return (
            <div
              key={ind}
              onClick={() => nav(`/explore/${id}`)}
              className="explore-item"
            >
              <img src={image} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
