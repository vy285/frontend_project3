import React, { useState, useEffect } from "react";
import Logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import "./Referral.css";
import { useSelector } from "react-redux";
import profile from "../../img/profile.png";
import ReferralItem from "../../components/Referral/ReferralItem";

const url = "http://localhost:2805/";

const Referral = () => {
  const token = useSelector((state) => state.token);
  const [referralList, setReferralList] = useState([]);
  const [isFresh, setIsFresh] = useState(true);

  const getReferralList = async () => {
    console.log("tim kiem");
    await fetch(`${url}userInfo/waitReferral`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: " Bearer " + token,
      },
    })
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) {
          return response.json();
        } else {
          alert("Dữ liệu thất bại");
        }
      })
      .then((response) => {
        console.log(response);
        if (response !== undefined) {
          setReferralList(response.data);
        }
      });
  };

  useEffect(() => {
    getReferralList();
  }, [isFresh]);

  return (
    <div className="container">
      <div className="header">Danh sách những người đã gửi lời kết bạn</div>
      <div className="body">
        {referralList.map((user, index) => (
          <ReferralItem key={index} user={user} setIsFresh={setIsFresh}/>
        ))}
      </div>
    </div>
  );
};

export default Referral;
