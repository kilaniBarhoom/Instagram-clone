import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
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

export default function EditPostModal({ user, caption, open, setOpen, id }) {
  const [newCaption, setNewCaption] = React.useState(caption);

  const handleClose = () => {
    setOpen(false);
  };

  const formData = new FormData();
  formData.append("description", newCaption);

  const handleEditSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${BaseURL}/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Edited");
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box padding={2} display="flex" flexDirection="column">
            <Box align="left">
              <Button variant="text">
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
              onSubmit={handleEditSubmit}
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
                <Box></Box>
              </Box>

              <StyledTextarea
                minRows={7}
                sx={{ fontSize: "1.2rem", outline: "none" }}
                placeholder="Write a caption....."
                onChange={(e) => setNewCaption(e.target.value)}
                value={newCaption}
              />
              <Box align="center">
                <Button
                  variant="contained"
                  type="submit"
                  style={{
                    paddingLeft: "6ch",
                    paddingRight: "6ch",
                  }}
                >
                  Update
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
