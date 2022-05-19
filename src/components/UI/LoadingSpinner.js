import React from "react";

import classes from "./LoadingSpinner.module.css";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingSpinner = () => {
  return (
    <Box className={classes.loading_spinner}>
      <CircularProgress size={120} />
    </Box>
  );
};

export default LoadingSpinner;
