import { useEffect, useState } from "react";
import "../Styles/Profile.css";
import profilepic from "../assets/profilepic.jpg";
import SettingsIcon from "@mui/icons-material/Settings";
import Highlight from "../Components/Highlight";
import GridOnIcon from "@mui/icons-material/GridOn";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";

export default function Profile() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="main-content">
          <div className="profile-photo">
            <img src={profilepic} alt="" />
          </div>
          <div className="profile-information">
            <div className="profile-actions">
              <div className="profile-username">
                <h3>kilani.jsx</h3>
                {screenWidth <= 735 ? (
                  <div className="setting-icon">
                    <SettingsIcon style={{ cursor: "pointer" }} />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="actions">
                <button>Edit Profile</button>
                <button>View Archive</button>
                {screenWidth > 735 ? (
                  <div className="setting-icon">
                    <SettingsIcon style={{ cursor: "pointer" }} />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="other-info">
              {screenWidth > 735 ? (
                <div className="profile-status-container">
                  <div>
                    0 <span>Posts</span>
                  </div>
                  <div>
                    322<span>followers</span>
                  </div>
                  <div>
                    266<span>following</span>
                  </div>
                </div>
              ) : (
                <></>
              )}

              {screenWidth > 735 ? (
                <div className="last-info">
                  <div className="fullname">Ibrahim Kilani</div>
                  <div className="threads">@23,822,576</div>
                  <div className="caption">
                    <p>
                      Never back down NEVER WHAT ⁉️
                      <br /> Never give up ✨🦦
                    </p>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        {screenWidth <= 735 ? (
          <div className="last-info">
            <div className="fullname">Ibrahim Kilani</div>
            <div className="threads">@23,822,576</div>
            <div className="caption">
              <p>
                Never back down NEVER WHAT ⁉️
                <br /> Never give up ✨🦦
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="highlights-container">
          <Highlight />
          <Highlight />
          <Highlight />
          <Highlight />
        </div>
        {screenWidth <= 735 ? (
          <div className="profile-status-container">
            <div>
              0 <span> Posts</span>
            </div>
            <div>
              322<span> followers</span>
            </div>
            <div>
              266<span> following</span>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="own-posts">
          <div className="post-type-navigator">
            <div className="posts-categ">
              <div className="active"></div>
              {screenWidth <= 735 ? (
                <>
                  <span>
                    <GridOnIcon />
                  </span>
                  <span>
                    <BookmarkBorderOutlinedIcon />
                  </span>
                  <span>
                    <VideoLibraryOutlinedIcon />
                  </span>
                </>
              ) : (
                <>
                  <span>
                    Posts <GridOnIcon />
                  </span>
                  <span>
                    Saved
                    <BookmarkBorderOutlinedIcon />
                  </span>
                  <span>
                    Taged <VideoLibraryOutlinedIcon />
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
