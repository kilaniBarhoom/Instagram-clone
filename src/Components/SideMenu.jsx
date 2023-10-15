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
import { Avatar, Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import { BaseURL, token, userId } from "../Contexts/Vars";
import LoadingButton from "@mui/lab/LoadingButton";

// ROUTER NAVIGATE

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NavIcons from "./NavIcons";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function SideMenu({ user }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const location = useLocation();
  const CurrentPath = location.pathname;

  const [openDeletModal, setOpenDeleteModal] = useState(false);

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
      } ${screenWidth <= 735 ? "mobile" : ""}
      ${CurrentPath == "/signup" || CurrentPath == "/" ? "none" : ""} `}
    >
      <DeletePostModal
        user={user}
        open={openDeletModal}
        setOpen={setOpenDeleteModal}
      />
      <h1 className="sidenav-header" onClick={() => nav("/")}>
        {screenWidth <= 1263 || CurrentPath == "/messeges" ? (
          <img id="instIcon" src={instaIcon} alt="" />
        ) : (
          <img id="instText" src={instaIcontext} alt="" />
        )}
      </h1>
      <ul className="list-items">
        <NavIcons name="Home" icon={<HomeIcon />} navigate="/" />
        <NavIcons name="Search" icon={<SearchIcon />} navigate="/search" />
        <NavIcons name="Explore" icon={<ExploreIcon />} navigate="/explore" />
        <NavIcons name="Reels" icon={<SlideshowIcon />} />
        <NavIcons name="Messeges" icon={<ChatIcon />} navigate="/messeges" />
        <NavIcons name="Notifications" icon={<FavoriteBorderIcon />} />
        <NavIcons name="Create" icon={<AddCircleOutlineIcon />} user={user} />
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
              <Avatar
                src={user ? user.avatar : ""}
                sx={{ width: "100%", height: "100%", borderRadius: "50%" }}
                alt=""
              />
            </div>
          }
          profile={true}
        />
        <NavIcons
          setOpen={setOpenDeleteModal}
          name="More"
          icon={<MenuIcon />}
        />
      </ul>
    </div>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 2,
};
function DeletePostModal({ open, setOpen, user }) {
  const handleClose = () => {
    setOpen(false);
  };

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeleteUser = () => {
    if (user.userName == username) {
      setLoading(true);
      axios
        .delete(`${BaseURL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          handleClose();
          toast.success(res.data);
          window.location.reload();
          nav("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Wrong Username");
    }
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction="column" alignItems="flex-start" gap={5}>
            <Stack>
              <Typography variant="h6" textAlign="left">
                Are You Sure You Want To Delete User
                <br />
                <Typography variant="span" color="blue">
                  {user ? user.userName : ""}
                </Typography>
                &nbsp;?
              </Typography>
            </Stack>
            <TextField
              id="outlined-size-small"
              placeholder="Enter Username"
              size="small"
              sx={{ width: "50%" }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Stack direction="row" gap={2}>
              <LoadingButton
                loading={loading}
                onClick={handleDeleteUser}
                variant="contained"
                color="error"
                endIcon={<DeleteIcon />}
                loadingPosition="end"
              >
                <span>Delete</span>
              </LoadingButton>

              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
