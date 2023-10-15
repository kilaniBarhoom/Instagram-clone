import "../Styles/Explore.css";
import InboxIcon from "@mui/icons-material/Inbox";
import axios from "axios";
import { useEffect, useState } from "react";
import { BaseURL, token } from "../Contexts/Vars";

export default function Explore() {
  const [tempPosts, setTempPosts] = useState([]);
  const [explorePosts, setExplorePosts] = useState([]);

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
        {explorePosts.map(({ image }, ind) => {
          return (
            <div key={ind} className="explore-item">
              <img src={image} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
