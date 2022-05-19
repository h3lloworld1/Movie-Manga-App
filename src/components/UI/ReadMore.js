import React, { useState } from "react";

import classes from "./ReadMore.module.css";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p>
      {isReadMore ? text.slice(0, 127) : text}
      <span onClick={toggleReadMore} className={classes.read_or_hide}>
        {isReadMore ? "... read more" : "  show less"}
      </span>
    </p>
  );
};

export default ReadMore;
