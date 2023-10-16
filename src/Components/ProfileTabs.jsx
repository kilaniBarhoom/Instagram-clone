import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Post from "./Post";
import axios from "axios";
import { BaseURL, token, userId } from "../Contexts/Vars";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import privateAccPhoto from "../assets/PrivateAccountPhoto.jpg";
import noposts from "../assets/noposts.jpg";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function ProfileTabs({ status, userid, setPostsCount }) {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [user, setUser] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Get My Posts
    axios
      .get(`${BaseURL}/posts/${userid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPosts(res.data.posts);
        setPostsCount(posts.length);
      })
      .catch((err) => {
        console.log(err);
      });

    // Get Posts That I Have Liked
  }, [posts]);

  useEffect(() => {
    axios
      .get(`${BaseURL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLikedPosts(
          res.data.posts.filter((post) => post.likes.includes(userid))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [posts]);

  useEffect(() => {
    axios
      .get(`${BaseURL}/users`)
      .then((res) => {
        setUser(res.data.users.find((user) => user.id == userid));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <Box sx={{ bgcolor: "background.dark", width: "100%" }}>
      <AppBar position="static" sx={{ backgroundColor: "#000" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          sx={{ backgroundColor: "#000", width: "100%" }}
        >
          <Tab label="Posts" {...a11yProps(0)} />
          <Tab label="Liked posts" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Box>
          <div className="posts-container">
            {status == "public" || userid == userId ? (
              posts.length ? (
                posts.map(
                  ({ id, image, likes, description, createdAt, comments }) => {
                    return (
                      <Post
                        key={id}
                        id={id}
                        image={image}
                        user={user}
                        likes={likes}
                        description={description}
                        createdAt={createdAt}
                        comments={comments}
                      />
                    );
                  }
                )
              ) : (
                <Box width="100%">
                  <Stack alignItems="center" gap={3}>
                    <Avatar src={noposts} sx={{ width: 150, height: 150 }} />
                    <Typography variant="h3">No Posts Yet</Typography>
                  </Stack>
                </Box>
              )
            ) : (
              <Stack alignItems="center" gap={1}>
                <Avatar
                  sx={{ width: 150, height: 150 }}
                  src={privateAccPhoto}
                />
                <Typography variant="h4">This Account Is Private</Typography>
                <Typography
                  sx={{ letterSpacing: 1, wordSpacing: 2, fontWeight: 400 }}
                  variant="h6"
                >
                  Follow this account to see their Photos An Videos
                </Typography>
              </Stack>
            )}
          </div>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Box>
          <div className="posts-container">
            {status == "public" || userid == userId ? (
              likedPosts.length ? (
                likedPosts.map(
                  ({ id, image, likes, description, createdAt, comments }) => {
                    return (
                      <Post
                        key={id}
                        id={id}
                        image={image}
                        user={user}
                        likes={likes}
                        description={description}
                        createdAt={createdAt}
                        comments={comments}
                      />
                    );
                  }
                )
              ) : (
                <Box width="100%">
                  <Stack alignItems="center" gap={3}>
                    <Avatar src={noposts} sx={{ width: 150, height: 150 }} />
                    <Typography variant="h3">No Liked Posts Yet</Typography>
                  </Stack>
                </Box>
              )
            ) : (
              <Stack alignItems="center" gap={1}>
                <Avatar
                  sx={{ width: 150, height: 150 }}
                  src={privateAccPhoto}
                />
                <Typography variant="h4">This Account Is Private</Typography>
                <Typography
                  sx={{ letterSpacing: 1, wordSpacing: 2, fontWeight: 400 }}
                  variant="h6"
                >
                  Follow this account to see their Liked Photos An Videos
                </Typography>
              </Stack>
            )}
          </div>
        </Box>
      </TabPanel>
    </Box>
  );
}
