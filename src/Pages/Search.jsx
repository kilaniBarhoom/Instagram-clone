import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { BaseURL } from "../Contexts/Vars";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import stringSimilarity from "string-similarity";

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
  const [user, setUser] = useState(null);
  const [displayUsers, setDisplayUsers] = useState(null);

  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  const handleSearchUser = () => {
    axios
      .get(`${BaseURL}/users`)
      .then((res) => {
        setUsers(res.data.users);
        users
          ? setDisplayUsers(
              users
                .map((user) => ({
                  user,
                  similarity: stringSimilarity.compareTwoStrings(
                    search.toLowerCase(),
                    user.userName.toLowerCase()
                  ),
                }))
                .sort((a, b) => b.similarity - a.similarity)
                .slice(0, 9)
                .map(({ user }) => user)
            )
          : "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const nav = useNavigate();

  return (
    <Box marginLeft="240px" width="40%" p={5}>
      <Typography color="#fff" variant="h5">
        Search for a user
      </Typography>
      <Stack my={2} direction="row" gap={2}>
        <StyledTextarea
          sx={{
            margin: 0,
            border: "none",
            outline: "none",
            fontSize: "1.2rem",
          }}
          ref={searchRef}
          maxRows={1}
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
      <Box marginTop="5ch">
        {!displayUsers ? (
          <></>
        ) : displayUsers.length ? (
          <Stack width="75%" direction="column" gap={1}>
            {displayUsers.map((displayUser, ind) => {
              return (
                <Stack
                  key={ind}
                  p={1}
                  border="solid rgba(0, 0, 0, 0.4) 1px"
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  borderRadius={2}
                >
                  <Stack direction="row" gap={2} alignItems="center">
                    <Avatar
                      src={displayUser.avatar}
                      alt="no img"
                      sx={{ width: 55, height: 55 }}
                    />
                    <Typography color="#fff" variant="h5">
                      <span>{displayUser.userName}</span>
                    </Typography>
                  </Stack>
                  <Box alignItems="center">
                    <Button
                      onClick={() => nav(`/${displayUser.id}`)}
                      variant="text"
                    >
                      View Profile
                    </Button>
                  </Box>
                </Stack>
              );
            })}
          </Stack>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}
