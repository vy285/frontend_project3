import React, { useState, useEffect } from "react";
import Logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import "./ReferralItem.css";
import { useSelector } from "react-redux";
import profile from "../../img/profile.png";

const url = "http://localhost:2805/";
const ReferralItem = ({ user, setIsFresh }) => {
  const { userId, avatar, nickname, dateOfBirth, address, referralId } = user;
  const token = useSelector((state) => state.token);

  const handleYes = async () => {
    console.log("dong y");
    await fetch(
      `${url}referral/accept?senderId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: " Bearer " + token,
        },
      }
    ).then((response) => {
      const statusCode = response.status;
      if (statusCode === 200) {
        setIsFresh(prev => !prev);
        return response.json();
      } else {
        alert("Dữ liệu thất bại");
      }
    });
  };

  const handleCancle = async () => {
    console.log("tu choi", referralId);
    await fetch(`${url}referral?referralId=${referralId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: " Bearer " + token,
      },
    }).then((response) => {
      const statusCode = response.status;
      if (statusCode === 200) {
        console.log("tu choi thanh cong")
        setIsFresh(prev => !prev);
        return response.json();
      } else {
        alert("Dữ liệu thất bại");
      }
    });
  };
  return (
    <div className="user-item">
      <img src={avatar ? avatar : profile} alt={`${nickname}'s Avatar`} />
      <div className="user-details">
        <div>
          <strong>Nickname:</strong> {nickname}
        </div>
        <div>
          <strong>Date of Birth:</strong> {dateOfBirth}
        </div>
        <div>
          <strong>Address:</strong> {address}
        </div>
      </div>
      <div className="friend-status">
        <button onClick={handleYes}>Đồng ý</button>
        <button onClick={handleCancle}>Từ chối</button>
      </div>
    </div>
  );
};

export default ReferralItem;
