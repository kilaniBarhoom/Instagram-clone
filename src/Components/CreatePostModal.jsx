import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import photo from "../assets/photoCreate.jpg";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import profilepic from "../assets/profilepic.jpg";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import axios from "axios";
import { toast } from "react-hot-toast";

import { BaseURL, token, userId } from "../Contexts/Vars";
import { Avatar } from "@mui/material";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

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
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 0,
};

export default function CreatePostModal({ user, name, icon }) {
  const [open, setOpen] = React.useState(false);
  const [coverImg, setCoverImg] = React.useState(null);
  const [typeDesc, setTypeDesc] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [caption, setCaption] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
    setTypeDesc(false);
  };
  const handleClose = () => {
    setOpen(false);
    setCoverImg(null);
    setImage(null);
    setCaption("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();

    reader.onload = () => {
      setCoverImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const formData = new FormData();
  formData.append("image", image);
  formData.append("description", caption);

  const handleCreateSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BaseURL}/posts`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Posted");
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Button
        onClick={handleOpen}
        style={{
          displa: "flex",
          gap: "10px",
          padding: "0",

          // alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",

          // border: "solid #fff",
          // margin: "0 !important",
        }}
      >
        <div
          style={{
            display: "inline",
            color: "#ffffffc1",
            height: "25px",
          }}
        >
          {icon}
        </div>
        <span
          style={{
            color: "#ffffffc1",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "15px",
            cursor: "pointer",
            textTransform: "capitalize",
          }}
        >
          {name}
        </span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {coverImg && typeDesc ? (
            <Box padding={2} display="flex" flexDirection="column">
              <Box align="left">
                <Button
                  variant="text"
                  onClick={() => {
                    setTypeDesc(false);
                  }}
                >
                  <span
                    style={{
                      color: "#000",
                      display: "flex",
                      padding: "0",
                      width: "60px",
                    }}
                  >
                    <KeyboardBackspaceIcon
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
                  gap: "1px",
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  marginY={1}
                >
                  <Box display="flex" alignItems="center" gap="10px">
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
                        src={user.avatar}
                        alt=""
                      />
                    </div>
                    <Typography variant="h6">{user.userName}</Typography>
                  </Box>
                  <Box>
                    <img
                      src={coverImg}
                      width={35}
                      style={{ filter: "brightness(50%" }}
                      alt=""
                    />
                  </Box>
                </Box>

                <StyledTextarea
                  minRows={7}
                  sx={{ fontSize: "1.2rem", outline: "none" }}
                  placeholder="Write a caption....."
                  onChange={(e) => setCaption(e.target.value)}
                  value={caption}
                />
                <Box align="center">
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ paddingLeft: "6ch", paddingRight: "6ch" }}
                  >
                    Post
                  </Button>
                </Box>
              </form>
            </Box>
          ) : coverImg ? (
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                padding={1}
                alignItems="center"
              >
                <Button
                  variant="text"
                  onClick={() => {
                    setCoverImg(null);
                    setCaption("");
                  }}
                >
                  <span
                    style={{
                      color: "#000",
                      display: "flex",
                    }}
                  >
                    <KeyboardBackspaceIcon />
                  </span>
                </Button>
                <label htmlFor="image-upload">
                  <Button component="span" variant="contained">
                    Change Image
                  </Button>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <Button
                  onClick={() => {
                    setTypeDesc(true);
                  }}
                >
                  Next
                </Button>
              </Box>

              <Box>
                <img
                  src={coverImg}
                  alt=""
                  style={{ width: "100%", maxHeight: "40em", margin: "0" }}
                />
              </Box>
            </>
          ) : (
            <>
              <Typography
                id="modal-modal-title"
                variant="h5"
                component="h2"
                align="center"
                borderBottom={1}
                padding={2}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
              >
                Create New Post
              </Typography>
              <Box
                align="center"
                marginY={15}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={3}
              >
                <Typography>
                  <img width={150} src={photo} alt="" />
                </Typography>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  Drag photos and videos here
                </Typography>
                <label htmlFor="image-upload">
                  <Button
                    component="span"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Image
                  </Button>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
