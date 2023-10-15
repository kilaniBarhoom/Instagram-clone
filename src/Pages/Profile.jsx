import { useEffect, useState } from "react";
import { BaseURL, token, userId } from "../Contexts/Vars";
import "../Styles/Profile.css";
import profilepic from "../assets/profilepic.jpg";
import SettingsIcon from "@mui/icons-material/Settings";
import Highlight from "../Components/Highlight";
import GridOnIcon from "@mui/icons-material/GridOn";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditProfileModal from "../Components/EditProfileModal";

import Button from "@mui/material/Button";
import { Avatar, Box } from "@mui/material";
import ProfileTabs from "../Components/ProfileTabs";

export default function Profile() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { userid } = useParams();
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [followRequest, setFollowRequest] = useState("");
  const [followType, setFollowType] = useState(1);
  const [postsCount, setPostsCount] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    axios
      .get(`${BaseURL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.users.find((user) => user.id == userid));
        setAvatar(user.avatar);
        setUserName(user.userName);
        setEmail(user.email);
        setBio(user.bio);
        setStatus(user.status);
        setFollowType(status == "public" ? 1 : 2);
        setFollowRequest(status == "public" ? "Follow" : "Request");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  function handleFollowRequest() {
    if (followType == 1) {
      setFollowRequest(followRequest == "Follow" ? "Following" : "Follow");
    } else {
      setFollowRequest(followRequest == "Request" ? "Requested" : "Request");
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="main-content">
          <div className="profile-photo">
            <img
              source={{ width: "100%", height: "100%", borderRadius: "50%" }}
              src={avatar}
              alt=""
            />
          </div>
          <div className="profile-information">
            <div className="profile-actions">
              <div className="profile-username">
                <h3>{userName}</h3>

                {screenWidth <= 735 && userid == userId ? (
                  <div className="setting-icon">
                    <SettingsIcon style={{ cursor: "pointer" }} />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {userid == userId ? (
                <div className="actions">
                  <button onClick={handleOpen}>Edit Profile</button>
                  <EditProfileModal
                    open={open}
                    handleClose={handleClose}
                    bio={bio}
                    setBio={setBio}
                    avatar={avatar}
                    setAvatar={setAvatar}
                    userName={userName}
                    setUserName={setUserName}
                    status={status}
                    setStatus={setStatus}
                  />
                  <button>View Archive</button>
                  {screenWidth > 735 ? (
                    <div className="setting-icon">
                      <SettingsIcon style={{ cursor: "pointer" }} />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="other-info">
              {screenWidth > 735 ? (
                <div className="profile-status-container">
                  <div>
                    {postsCount}
                    <span> {postsCount == 1 ? "Post" : "Posts"}</span>
                  </div>
                  <div>
                    &nbsp; &nbsp; 0 <span> followers</span>
                  </div>
                  <div>
                    &nbsp; &nbsp; 0 <span> following</span>
                  </div>
                </div>
              ) : (
                <></>
              )}

              {screenWidth > 735 ? (
                <div className="last-info">
                  <div className="fullname">{email}</div>
                  <div className="threads">@23,822,576</div>
                  <div className="caption">
                    <pre style={{ maxWidth: "80%" }}>{bio}</pre>
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
            <div className="fullname">{email}</div>
            <div className="threads">@23,822,576</div>
            <div className="caption">
              <pre>{bio}</pre>
            </div>
          </div>
        ) : (
          <></>
        )}
        {userid != userId ? (
          <Box paddingX="30px">
            <Button
              sx={{
                width: "40%",
                minWidth: "30ch",
                fontSize: "1rem",
                padding: "2px 20px",
                textTransform: "capitalize",
                color: "#fff",
                borderColor: "#fff",
              }}
              variant={
                followRequest == "Follow" || followRequest == "Request"
                  ? "contained"
                  : "outlined"
              }
              onClick={handleFollowRequest}
            >
              {followRequest}
            </Button>
          </Box>
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
              {postsCount}
              <span> {postsCount == 1 ? "Post" : "Posts"}</span>
            </div>
            <div>
              0 <span> followers</span>
            </div>
            <div>
              0 <span> following</span>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="own-posts">
          <ProfileTabs
            status={status}
            userid={userid}
            setPostsCount={setPostsCount}
          />
        </div>
      </div>
    </div>
  );
}
