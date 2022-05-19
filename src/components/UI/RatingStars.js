import React from "react";

import Rating from "@mui/material/Rating";

const RatingStars = (props) => {
  return (
    <div>
      <Rating
        name="read-only"
        value={props.value}
        readOnly
        max={10}
        size={props.size}
      />
    </div>
  );
};

export default RatingStars;
