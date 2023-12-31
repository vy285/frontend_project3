import React, { useState, useEffect } from "react";
import Logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import "./Home.css";
import { useSelector } from "react-redux";
import profile from "../../img/profile.png";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import SockJS from "sockjs-client"

const url = "http://192.168.1.21:2805";
const Home = () => {
  const [conversationList, setConversationList] = useState([]);
  const token = useSelector((state) => state.token);
  const myId = useSelector((state) => state.userId);
  const [currentChat, setCurrentChat] = useState(null);

  //lay danh sach cuoc tro chuyen
  const getConversationList = async () => {
    console.log("token", token);
    await fetch(`http://192.168.1.21:2805/conversation`, {
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
          setConversationList(response.data);
        }
      });
  };
  useEffect(() => {
    getConversationList();
  }, [myId]);

  //connect socket
  useEffect(() => {
    // const sock = new SockJS("http://192.168.1.21:2805/ws");
    // sock.onopen = function() {
    //     console.log('open');
    //     // sock.send('test');
    // };


    // const socket = io("ws://192.168.1.21:2805/ws");
    // socket.on('connect' , () => console.log('coonect successful'));
    // socket.current.emit("new-user-add", user._id);
    // socket.current.on("get-users", (users) => {
    //   setOnlineUsers(users);
    // });
  }, [myId]);

  return (
    <div className="Chat">
      <div className="Left-side-chat">
        <h2>Chats</h2>
        <div className="Chat-list">
          {conversationList.map((item, index) => (
            <div
              onClick={() => setCurrentChat(item)}
              key={index}
              className="conversation follower"
            >
              <img
                src={item.avatarFriend ? item.avatarFriend : profile}
                className="followerImage"
                style={{ width: "50px", height: "50px" }}
              />
              <div>
                <div>{item.nameCon}</div>
                <div>{item.lastMessage}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="Right-side-chat">
        <ChatBox item={currentChat} currentUser={myId} />
      </div>
    </div>
  );
};

export default Home;
