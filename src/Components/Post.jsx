import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InboxIcon from "@mui/icons-material/Inbox";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useState } from "react";

export default function Post({ title, profilepic, postpic, caption }) {
  const [likesCount, setLikesCount] = useState(0);
  return (
    <div className="post-container">
      <div className="post-header">
        <img className="profile-img" src={profilepic} alt="" />
        <span className="profile-name">kilani.jsx</span>
        <MoreHorizIcon style={{ marginLeft: "auto", cursor: "pointer" }} />
      </div>
      <h4>{title}</h4>
      <div className="postimage-container">
        <img src={postpic} alt="no img" />
      </div>
      <div className="post-actions">
        <FavoriteBorderIcon onClick={() => setLikesCount((prev) => prev + 1)} />
        <InboxIcon />
        <BookmarkBorderOutlinedIcon />
        <BookmarkBorderOutlinedIcon style={{ marginLeft: "auto" }} />
      </div>
      <div className="utils">
        <div className="likes-container">
          <span>123</span>
          <span>Likes</span>
        </div>
        <div className="caption-container">
          <span>kilani.jsx </span> <span id="caption">{caption}</span>
        </div>
        <div>View all 40 comment</div>
        <div>Add a comment...</div>
      </div>
    </div>
  );
}
