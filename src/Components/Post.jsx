import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import EditPostModal from "../Modals/EditPostModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseURL, token, userId } from "../Contexts/Vars";

export default function Post({
  id,
  user,
  image,
  likes,
  description,
  createdAt,
}) {
  const [liked, setLiked] = useState(null);
  const [likess, setLikess] = useState(null);
  const [openLikes, setOpenLikes] = useState(false);

  useEffect(() => {
    setLiked(likes.includes(userId));
  }, []);

  function formatInstagramCreationTime(creationTime) {
    const postCreationDate = new Date(creationTime);
    const now = new Date();

    const diffMilliseconds = now - postCreationDate;

    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);

    if (diffWeeks > 0) {
      return `${diffWeeks} ${diffWeeks == 1 ? "week" : "weeks"}`;
    } else if (diffDays > 0) {
      return `${diffDays} ${diffDays == 1 ? "day" : "days"}`;
    } else if (diffHours > 0) {
      return `${diffHours} ${diffHours == 1 ? "hour" : "hours"}`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} ${diffMinutes == 1 ? "minute" : "minutes"}`;
    } else {
      return `${diffSeconds} ${diffSeconds == 1 ? "second" : "seconds"}`;
    }
  }

  const nav = useNavigate();

  function handleLikePost() {
    axios
      .post(`${BaseURL}/posts/like/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setLiked(!likes.includes(userId));
  }

  function handleViewProfile() {
    axios
      .get(`${BaseURL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const posts = res.data.posts;
        const selectedPost = posts.find((post) => post.id == id);
        nav(`/${selectedPost.user.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleViewLiked() {
    axios
      .get(`${BaseURL}/posts/likes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLikess(res.data.likes);
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  return (
    <div className="post-container">
      <div className="post-header">
        <img className="profile-img" src={user.avatar} alt="" />
        <span onClick={handleViewProfile} className="profile-name">
          {user.userName}
        </span>

        <SeeWhoLiked likes={likess} open={openLikes} setOpen={setOpenLikes} />

        <BasicMenu id={id} description={description} user={user} />
      </div>
      <div className="postimage-container">
        <img src={image} alt="no img" />
      </div>
      <div className="post-actions">
        <span onClick={handleLikePost}>
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </span>
        <span>
          {" "}
          <ChatBubbleOutlineIcon />
        </span>
        <span>
          <SendIcon />
        </span>
        <span style={{ marginLeft: "auto" }}>
          <BookmarkBorderOutlinedIcon />
        </span>
      </div>
      <div className="utils">
        <div className="likes-container">
          <span>{likes.length}</span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleViewLiked();
              setOpenLikes(true);
            }}
          >
            {likes.length == 1 ? "Like" : "Likes"}
          </span>
        </div>
        <div className="caption-container">
          <span style={{ fontSize: "0.9rem" }}>{user.userName} &nbsp;</span>
          <span id="caption"> {description}</span>
        </div>
        <div>{`View all 40 comments`}</div>
        <div>Add a comment...</div>
        <div>{formatInstagramCreationTime(createdAt)} ago</div>
      </div>
    </div>
  );
}

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-hot-toast";
import SeeWhoLiked from "../Modals/SeeWhoLiked";

function BasicMenu({ id, user, description }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const [isMyPost, setIsMYPost] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setIsMYPost(user.id == userId);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setOpen(true);
    handleClose();
  };
  const handleDeletePost = () => {
    axios
      .delete(`${BaseURL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        padding: "0 !important",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        border: "none",
        marginLeft: "auto",
      }}
    >
      <EditPostModal
        user={user}
        caption={description}
        open={open}
        setOpen={setOpen}
        id={id}
      />
      <Button
        style={{ border: "none", padding: "0", color: "#fff" }}
        id="basic-button"
        aria-controls={openMenu ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon style={{ marginLeft: "auto", cursor: "pointer" }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {isMyPost ? (
          <div>
            {" "}
            <MenuItem
              sx={{ width: 150, textAlign: "start" }}
              onClick={handleEdit}
            >
              Edit
            </MenuItem>
            <MenuItem sx={{ width: 150 }} onClick={handleDeletePost}>
              Delete
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem sx={{ width: 150 }}>Report</MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
}
