import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Avatar } from "@mui/material";

export default function StoriesSkeleton() {
  return (
    <Stack spacing={1}>
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        // animation="wave"
        variant="circular"
        width={58}
        height={58}
      >
        <Avatar />
      </Skeleton>
      <Skeleton sx={{ bgcolor: "grey.900", fontSize: "1rem" }} variant="text" />
    </Stack>
  );
}
