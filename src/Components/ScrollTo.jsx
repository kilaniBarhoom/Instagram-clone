import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const ScrollTo = () => {
  const [scrollingToBottom, setScrollingToBottom] = useState(false);

  const handleButtonClick = () => {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;

    if (scrollPosition + windowHeight >= documentHeight) {
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setScrollingToBottom(true);
    } else {
      // Scroll to bottom
      window.scrollTo({
        top: documentHeight,
        behavior: "smooth",
      });
      setScrollingToBottom(false);
    }
  };

  // Listen for scroll events to update button state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      if (scrollPosition + windowHeight >= documentHeight) {
        setScrollingToBottom(true);
      } else {
        setScrollingToBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Button
      variant="contained"
      sx={{
        position: "fixed",
        bottom: 16,
        right: 50,
        color: "#fff",
        backgroundColor: "transparent",
        borderRadius: "50%",
        border: "solid 1px #fff",
        p: 2,
        margin: 0,
        minWidth: "25px",
      }}
      onClick={handleButtonClick}
    >
      {scrollingToBottom ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
    </Button>
  );
};

export default ScrollTo;
