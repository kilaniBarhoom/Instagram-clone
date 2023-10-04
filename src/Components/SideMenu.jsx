// MUI ICONS

import instaIcontext from "../assets/headername.jpg";
import instaIcon from "../assets/instaIcon.jpg";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";

// ROUTER NAVIGATE

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Images from "../Contexts/Images";
import profilepic from "../assets/profilepic.jpg";
import NavIcons from "./NavIcons";

export default function SideMenu({ setOpenCreate }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const location = useLocation();
  const CurrentPath = location.pathname;

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const nav = useNavigate();

  return (
    <div
      className={`sidenav-container ${
        screenWidth <= 1263 || CurrentPath == "/messeges" ? "close" : ""
      } ${screenWidth <= 735 ? "mobile" : ""} `}
    >
      <h1 className="sidenav-header" onClick={() => nav("/")}>
        {screenWidth <= 1263 || CurrentPath == "/messeges" ? (
          <img id="instIcon" src={instaIcon} alt="" />
        ) : (
          <img id="instText" src={instaIcontext} alt="" />
        )}
      </h1>
      <ul className="list-items">
        <NavIcons name="Home" icon={<HomeIcon />} navigate="/" />
        <NavIcons name="Search" icon={<SearchIcon />} />
        <NavIcons name="Explore" icon={<ExploreIcon />} navigate="/explore" />
        <NavIcons name="Reels" icon={<SlideshowIcon />} />
        <NavIcons name="Messeges" icon={<ChatIcon />} navigate="/messeges" />
        <NavIcons name="Notifications" icon={<FavoriteBorderIcon />} />
        <NavIcons
          name="Create"
          icon={<AddCircleOutlineIcon />}
          create={true}
          setOpenCreate={setOpenCreate}
        />
        <NavIcons
          name="Profile"
          icon={
            <div
              className="profile-img"
              style={{
                height: "30px",
                width: "30px",
                cursor: "pointer",
                border: "none",
              }}
            >
              <img
                src={profilepic}
                style={{ width: "100%", borderRadius: "50%" }}
                alt=""
              />
            </div>
          }
          navigate="/kilani.jsx"
        />
        <NavIcons name="More" icon={<MenuIcon />} />
      </ul>
    </div>
  );
}
