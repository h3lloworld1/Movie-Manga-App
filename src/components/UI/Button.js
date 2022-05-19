import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button className={classes.button} onClick={props.onClick}>
      <h4>{props.children}</h4>
    </button>
  );
};

export default Button;
