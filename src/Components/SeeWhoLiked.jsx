import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import axios from "axios";
import { toast } from "react-hot-toast";

import { BaseURL, token } from "../Contexts/Vars";
import { Avatar } from "@mui/material";

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

export default function SeeWhoLiked({ id, open, setOpen }) {
  const [likes, setLikes] = useState({});
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    function handleViewLiked() {
      axios
        .get(`${BaseURL}/posts/likes/${id}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLikes(res.data.likes);
          if (likes && likes.users.length) {
            console.log(likes);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    handleViewLiked();
  }, []);

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
        {likes ? (
          <Box sx={style}>
            <Typography variant="h2">Has Likes</Typography>
          </Box>
        ) : (
          <Box sx={style}>
            <Typography variant="h2">Doesn't have likes</Typography>
          </Box>
        )}
      </Modal>
    </div>
  );
}
