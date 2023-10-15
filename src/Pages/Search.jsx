import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Slide, TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { BaseURL } from "../Contexts/Vars";
import axios from "axios";
import { useState } from "react";

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

export default function Search() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleSearchUser = () => {
    setLoading(true);
    axios
      .get(`${BaseURL}/users`)
      .then((res) => {
        setUsers(res.data.users);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(users);
  };

  return (
    <Box marginLeft="240px" width="100%" p={5}>
      <Typography color="#fff" variant="h5">
        Search for a user
      </Typography>
      <Stack my={2} direction="row" gap={2}>
        <StyledTextarea
          sx={{
            margin: 0,
            width: "40%",
            border: "none",
            outline: "none",
            fontSize: "1.2rem",
          }}
          minRows={1}
          id="outlined-basic"
          value={search}
          variant="outlined"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button
          sx={{ px: 6 }}
          onClick={handleSearchUser}
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </Stack>
      <Box>
        {}
        <Stack gap={1}></Stack>
      </Box>
    </Box>
  );
}
