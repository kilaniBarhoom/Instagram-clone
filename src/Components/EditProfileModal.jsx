import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Slide, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { BaseURL, token, userId } from "../Contexts/Vars";
import Stack from "@mui/material/Stack";

import axios from "axios";
import { toast } from "react-hot-toast";

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    width: 100%;
    resize:none;
    margin:20px 0;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius:5px;
    border: 1px solid #000;`
);

const style = {
  width: 500,
  maxWidth: "90%",
  transition: "max-width 0.3s ease-in-out",
  marginTop: "6%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 1,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditProfileModal({
  open,
  handleClose,
  bio,
  setBio,
  avatar,
  setAvatar,
  userName,
}) {
  const formData = new FormData();

  const [newAvatar, setNewAvatar] = useState(null);
  const [avatarToSet, setAvatarToSet] = useState(null);
  const [newBio, setNewBio] = useState("");

  useEffect(() => {
    setNewAvatar(avatar);
    setNewBio(bio);
  }, [open]);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    formData.append("bio", newBio);
    formData.append("avatar", avatarToSet);

    axios
      .put(`${BaseURL}/users`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        handleClose();
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setAvatarToSet(file);
    reader.onload = () => {
      setNewAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
      align="center"
    >
      <Transition in={open}>
        <Box sx={style}>
          <Box
            padding={2}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box align="left">
              <Button
                variant="text"
                onClick={handleClose}
                sx={{ p: "0", minWidth: "0px" }}
              >
                <span
                  style={{
                    color: "#000",
                    display: "flex",
                    padding: " 5px",
                    width: "30px",
                  }}
                >
                  <CloseIcon
                    style={{
                      padding: "0",
                      marging: "0",
                    }}
                  />
                </span>
              </Button>
            </Box>
            <form
              onSubmit={handleCreateSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0px",
              }}
            >
              <Stack
                alignItems="flex-start"
                justifyContent="space-between"
                marginY={1}
                direction="column"
              >
                <Stack direction="row" gap={2} alignItems="center">
                  <div
                    className="profile-img"
                    style={{
                      border: "none",
                      padding: "0",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <Avatar
                      sx={{ width: "100%", borderRadius: "50%" }}
                      src={newAvatar}
                      alt="No photo"
                    />
                  </div>
                  <Typography variant="h6">{userName}</Typography>
                </Stack>
              </Stack>

              <Stack
                sx={{
                  "& > :not(style)": {},
                }}
                autoComplete="off"
                display="flex"
                flexDirection="column"
                marginY={2}
                gap={2}
              >
                <Box display="flex" justifyContent="flex-start">
                  <label htmlFor="image-upload">
                    <Button component="span" variant="text">
                      Change Avatar
                    </Button>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </Box>
                <Stack direction="column" gap={1} alignItems="flex-start">
                  <Typography variant="h6">Bio</Typography>
                  <StyledTextarea
                    sx={{ margin: 0 }}
                    minRows={5}
                    id="outlined-basic"
                    value={newBio}
                    variant="outlined"
                    onChange={(e) => {
                      setNewBio(e.target.value);
                    }}
                  />
                </Stack>
                <Box textAlign="center" marginTop={2}>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{
                      paddingLeft: "6ch",
                      paddingRight: "6ch",
                      marginTop: "auto",
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Stack>
            </form>
          </Box>
        </Box>
      </Transition>
    </Modal>
  );
}
