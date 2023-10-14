import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function PostsSkeleton() {
  return (
    <Stack spacing={1}>
      <Stack spacing={1} direction="row">
        <Skeleton
          variant="circular"
          sx={{ bgcolor: "grey.900" }}
          width={58}
          height={58}
        />
        <Skeleton
          sx={{ bgcolor: "grey.900", fontSize: "1rem" }}
          variant="text"
          width={70}
        />
      </Stack>
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rounded"
        width={500}
        height={500}
      />
      <Skeleton sx={{ bgcolor: "grey.900", fontSize: "1rem" }} variant="h3" />
      <Skeleton
        sx={{ bgcolor: "grey.900", fontSize: "1rem" }}
        variant="text"
        width={80}
      />
      <Skeleton
        sx={{ bgcolor: "grey.900", fontSize: "1rem" }}
        variant="text"
        width={160}
      />
      <Skeleton
        sx={{ bgcolor: "grey.900", fontSize: "1rem" }}
        variant="text"
        width={160}
      />
    </Stack>
  );
}
