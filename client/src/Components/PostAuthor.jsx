import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Images/avatar1.jpg"
//start
const PostAuthor = () => {
  return <Link to={`/posts/users/sdfsdf`} className="post__author">
    <div className="post__author-avathar">
      <img src={Avatar} alt=""/>

  </div>
  <div className="post__author-details">
    <h5>By: Ernest Achiever</h5>
    <small>Just Now</small>
  </div>
  </Link>;
};
//stopp

export default PostAuthor;
