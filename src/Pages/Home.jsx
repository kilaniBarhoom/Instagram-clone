import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Images from "../Contexts/Images";
import PostImages from "../Contexts/PostImages";
import Post from "../Components/Post";
import HomePageSugg from "../Components/HomePageSugg";
import { Link } from "react-router-dom";

export default function Home({ posts }) {
  const carouselRef = useRef();
  const [width, setWidth] = useState();
  useEffect(() => {
    setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
  });

  return (
    <div className="main-page-container">
      <div className="left-main-page-side">
        <div className="stories-container">
          <motion.div ref={carouselRef} className="carousel">
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              className="inner-carousel"
            >
              {Images.map((image) => {
                return (
                  <motion.div className="story" key={image}>
                    <img className="profile-img" src={image} alt="" />
                    <span className="profile-name">kilani.jsx</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
        <div className="posts-container">
          {posts.map(({ title, profilepic, postpic, caption }, i) => {
            return (
              <Post
                key={i}
                title={title}
                profilepic={profilepic}
                postpic={postpic}
                caption={caption}
              />
            );
          })}
        </div>
      </div>
      <div className="right-main-page-side">
        <div className="right-main-content">
          <HomePageSugg
            src={Images[0]}
            username="kilani.jsx"
            content="Ibrahim Kilani"
          />
          <div className="suggested-container">
            <div className="top">
              <span>Suggested for you</span>
              <Link to="/suggested">See All</Link>
            </div>
            <div className="suggested-some">
              <HomePageSugg
                src={Images[0]}
                username="kilani.jsx"
                content="followed by ibra..."
              />
              <HomePageSugg
                src={Images[0]}
                username="kilani.jsx"
                content="followed by ibra..."
              />
              <HomePageSugg
                src={Images[0]}
                username="kilani.jsx"
                content="followed by ibra..."
              />
              <HomePageSugg
                src={Images[0]}
                username="kilani.jsx"
                content="followed by ibra..."
              />
              <HomePageSugg
                src={Images[0]}
                username="kilani.jsx"
                content="followed by ibra..."
              />
            </div>
          </div>
          <div className="links-container">
            <div className="links">
              <Link>About </Link> <span> . </span>
              <Link>Help </Link>
              <span> . </span>
              <Link>Press</Link>
              <span> . </span>
              <Link>API</Link> <span> . </span>
              <Link>Jobs</Link>
              <span> . </span>
              <Link>Privacy</Link>
              <span> . </span>
              <Link>Terms</Link> <span> . </span>
              <Link>Locations</Link>
              <span> . </span>
              <Link>Language</Link>
              <span> . </span>
              <Link>Meta</Link> <span> . </span>
              <Link>Verified</Link>
            </div>
            <p>© 2023 INSTAGRAM FROM META</p>
          </div>
        </div>
      </div>
    </div>
  );
}
