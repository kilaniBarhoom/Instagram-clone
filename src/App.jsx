import SideMenu from "./Components/SideMenu";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Explore from "./Pages/Explore";
import Messeges from "./Pages/Messeges";
import Suggested from "./Pages/Suggested";
import Profile from "./Pages/Profile";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Images from "./Contexts/Images";
import PostImages from "./Contexts/PostImages";

import { useForm } from "react-hook-form";

export default function App() {
  const [openCreate, setOpenCreate] = useState(false);

  const { register, handleSubmit } = useForm();

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Anything",
      profilepic: Images[Math.floor(Math.random() * Images.length)],
      postpic: PostImages[Math.floor(Math.random() * PostImages.length)],
      caption: "feeling happy",
    },
    {
      id: 2,
      title: "Anything",
      profilepic: Images[Math.floor(Math.random() * Images.length)],
      postpic: PostImages[Math.floor(Math.random() * PostImages.length)],
      caption: "feeling happy",
    },
    {
      id: 3,
      title: "Anything",
      profilepic: Images[Math.floor(Math.random() * Images.length)],
      postpic: PostImages[Math.floor(Math.random() * PostImages.length)],
      caption: "feeling happy",
    },
  ]);

  // useEffect(() => {
  // }, [openCreate]);

  return (
    <div className="app-container">
      {openCreate ? (
        <form
          onSubmit={handleSubmit((data) => {
            const { title, caption, postpic } = data;
            const profilepic =
              Images[Math.floor(Math.random() * Images.length)];
            const newPost = {
              id: 5,
              title: title,
              profilepic: profilepic,
              postpic: postpic,
              caption: caption,
            };
            setPosts([newPost, ...posts]);
            setOpenCreate(false);
          })}
          className="create-container"
        >
          <div className="create-content">
            <h3>Create A New Post</h3>
            <CloseIcon
              className="close-btn"
              onClick={() => setOpenCreate(false)}
            />
            <div className="inputs">
              <div className="inp-container">
                <input
                  required
                  autoComplete="off"
                  type="text"
                  id="post-title"
                  {...register("title")}
                />
                <label htmlFor="post-title">Title *</label>
              </div>
              <div className="body-container inp-container">
                <textarea
                  autoComplete="off"
                  id="post-body"
                  {...register("caption")}
                />
                <label htmlFor="post-body">Body</label>
              </div>
              <div className="url-container inp-container">
                <input
                  required
                  autoComplete="off"
                  type="text"
                  id="post-url"
                  {...register("postpic")}
                />
                <label htmlFor="post-url">URL * </label>
              </div>
            </div>
            <div className="submit-btn">
              <button type="submit">Post</button>
            </div>
          </div>
        </form>
      ) : (
        <></>
      )}

      <SideMenu setOpenCreate={setOpenCreate} />
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/messeges" element={<Messeges />} />
        <Route path="/suggested" element={<Suggested />} />
        <Route path="/kilani.jsx" element={<Profile />} />
      </Routes>
    </div>
  );
}
