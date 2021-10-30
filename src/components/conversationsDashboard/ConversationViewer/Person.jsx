import { Avatar } from "@material-ui/core";
import React from "react";

function Person({ name, active = true }) {
  return (
    <div className={`person ${active ? "active" : ""}`}>
      <Avatar />
    </div>
  );
}

export default Person;
