import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

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
  height: 400,
  bgcolor: "#000",
  borderRadius: 2,
  p: 2,
};

export default function SeeWhoLiked({ likes, open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const nav = useNavigate();

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
          <Box sx={style} overflow="auto" border="solid 0px #fff">
            <Button
              sx={{ py: 2, minWidth: "0px", marginBottom: 2 }}
              onClick={handleClose}
            >
              {" "}
              <CloseIcon
                style={{
                  padding: "0",
                  marging: "0",
                  color: "#fff",
                  fontSize: "2rem",
                }}
              />
            </Button>
            <Stack gap={2}>
              {likes.users.map((user, i) => {
                return (
                  <Stack
                    direction="row"
                    key={i}
                    bgcolor="transparent"
                    borderRadius={2}
                    p={2}
                    alignItems="center"
                    gap={2}
                    border="solid 1px #fff"
                  >
                    <Avatar
                      sx={{
                        boxShadow: "1px 3px 5px #fff ",
                      }}
                      src={user.avatar}
                      width={55}
                      height={55}
                    />
                    <Typography sx={{ color: "#fff" }} variant="h6">
                      {user.userName}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        ) : (
          <Box sx={style}>
            <Button
              sx={{ p: "0", minWidth: "0px", marginBottom: 2 }}
              onClick={handleClose}
            >
              {" "}
              <CloseIcon
                style={{
                  padding: "0",
                  marging: "0",
                  color: "#fff",
                  fontSize: "2rem",
                }}
              />
            </Button>
            <Typography
              sx={{ margin: 10, textAlign: "center", color: "#fff" }}
              variant="h3"
            >
              This Post Has No Likes
            </Typography>
          </Box>
        )}
      </Modal>
    </div>
  );
}
