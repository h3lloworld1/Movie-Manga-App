import React from "react";

import classes from "./HeadersCard.module.css";

const HeadersCard = (props) => {
  return (
    <div onClick={props.onClick} className={classes.header_card}>
      <h4>{props.children}</h4>
    </div>
  );
};

export default HeadersCard;
