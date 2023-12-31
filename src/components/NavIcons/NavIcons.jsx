import React from "react";

import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import search from '../../img/search.png';
import profile from '../../img/profile.png';
import friend from '../../img/friend.png';
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import "./NavIcons.css";

const NavIcons = () => {
  return (
    <div className="navIcons">
      <Link to="../home" className="item">
        <img src={Home} alt="" />
      </Link>
      <Link to="../profile" className="item">
        <img src={profile} alt="" />
      </Link>
      <Link to="../search" className="item">
        <img src={search} alt="" />
      </Link>
      <Link to="../referral" className="item">
        <img src={friend} alt="" />
      </Link>
    </div>
  );
};

export default NavIcons;
