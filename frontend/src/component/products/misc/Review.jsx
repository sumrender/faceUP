import { Avatar } from "@mui/material";
import React from "react";

const Review = ({ review }) => {
  return (
    <div className="reviewCard">
      {/* <img src={profilePng} alt="User" /> */}
      <Avatar />
      <p>{review.name}</p>
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default Review;
