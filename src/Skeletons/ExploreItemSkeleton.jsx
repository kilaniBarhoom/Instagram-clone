import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
export default function ExploreItemSkeleton() {
  return (
    <Skeleton
      sx={{ bgcolor: "grey.900" }}
      variant="rounded"
      width={210}
      height={210}
    />
  );
}
