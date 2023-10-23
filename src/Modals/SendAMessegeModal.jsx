import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Slide } from "@mui/material";
import Stack from "@mui/material/Stack";
import MessageToChooser from "../Components/MessageToChooser";

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

export default function SendAMessegeModal({ open, handleClose, users }) {
  const handleMessageSubmit = (e) => {
    e.preventDefault();
    toast.success("Messege Sent");
    handleClose();
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
              onSubmit={handleMessageSubmit}
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
                <MessageToChooser users={users} />
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
                <Stack direction="column" gap={1} alignItems="flex-start">
                  <Box sx={{ width: "60%", textAlign: "left" }}></Box>

                  <Box sx={{ width: "100%", textAlign: "left" }}>
                    <Typography variant="h6">Messege</Typography>
                    <StyledTextarea
                      sx={{ margin: 0, fontSize: "1.3rem" }}
                      minRows={5}
                      id="outlined-basic"
                      variant="outlined"
                      required
                    />
                  </Box>
                </Stack>
                <Box textAlign="center" marginTop={2}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      px: 6,
                      py: 1.5,
                      textTransform: "capitalize",
                      fontSize: "1rem",
                    }}
                  >
                    <span>Send</span>
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
