import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function SearchSkeleton() {
  return (
    <Skeleton
      sx={{ bgcolor: "grey.900" }}
      variant="rounded"
      width={420}
      height={70}
    />
  );
}
