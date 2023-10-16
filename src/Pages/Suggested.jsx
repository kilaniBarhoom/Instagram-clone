import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BaseURL, token } from "../Contexts/Vars";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Suggested() {
  const [suggested, setSuggested] = useState([]);
  const nav = useNavigate();

  function getRandom(users) {
    const randomUsers = users.sort(() => 0.5 - Math.random());
    return randomUsers.slice(0, 10);
  }

  useEffect(() => {
    axios
      .get(`${BaseURL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSuggested(getRandom(res.data.users));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const style = {
    width: 500,
    borderRadius: 2,
    gap: 2,
    marginBottom: 2,
  };
  return (
    <Box
      sx={{
        marginLeft: "270px",
        color: "#fff",
        width: "100%",
        height: "fit-content",
        overflow: "auto",
      }}
    >
      <Typography variant="h3" my={5}>
        Suggested For You
      </Typography>
      <Stack sx={style}>
        {suggested.map((user, i) => {
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
              <Box alignItems="center" marginLeft="auto">
                <Button onClick={() => nav(`/${user.id}`)} variant="text">
                  View Profile
                </Button>
              </Box>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
}
