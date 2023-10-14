import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Post from "./Post";
import axios from "axios";
import { BaseURL, token } from "../Contexts/Vars";

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

export default function ProfileTabs({ userId, setPostsCount }) {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [user, setUser] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    // Get My Posts

    axios
      .get(`${BaseURL}/posts/${userId}`, {
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
    axios
      .get(`${BaseURL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLikedPosts(
          res.data.posts.filter((post) => post.likes.includes(userId))
        );
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${BaseURL}/users`)
      .then((res) => {
        setUser(res.data.users.find((user) => user.id == userId));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [posts]);

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
            {posts.map(
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
            )}
          </div>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Box>
          <div className="posts-container">
            {likedPosts.map(
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
            )}
          </div>
        </Box>
      </TabPanel>
    </Box>
  );
}
