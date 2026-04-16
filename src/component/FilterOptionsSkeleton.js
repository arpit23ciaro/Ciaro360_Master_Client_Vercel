import React from "react";
import { GlobleStyle } from "../Style/GlobalStyle";
import { Box, Skeleton } from "@mui/material";

const FilterOptionsSkeleton = () => {
  return (
    <GlobleStyle>
      {[1, 2, 3, 4].map((_, index) => (
        <Box key={index} className="role-checkbox-container">
          <Skeleton variant="rectangular" width={16} height={16} />
          <Skeleton variant="text" width={120} sx={{ ml: 1 }} />
        </Box>
      ))}
    </GlobleStyle>
  );
};

export default FilterOptionsSkeleton;
