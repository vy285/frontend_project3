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
import { over } from "stompjs";
import SockJS from "sockjs-client";
var stompClient = null;

const url = "http://localhost:2805";
const Home = () => {
  const [conversationList, setConversationList] = useState([]);
  const token = useSelector((state) => state.token);
  const myId = useSelector((state) => state.userId);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [isFresh, setIsFresh] = useState(true);
  const [text, setText] = useState("gia tri cu")
  const [message, setMessage] = useState(null);

  //lay danh sach cuoc tro chuyen
  const getConversationList = async () => {
    console.log("token", token);
    await fetch(`http://localhost:2805/conversation`, {
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
          return response.json().then((errorData) => {
            console.log(errorData.data.message);
            alert(errorData.data.message);
          });
        }
      })
      .then((response) => {
        console.log(response);
        if (response !== undefined) {
          setConversationList(response.data);
        }
      });

      setText("gia tri moi")
  };
  useEffect(() => {
    getConversationList();
  }, [myId]);

  const connectSocket = () => {
    let Sock = new SockJS("http://localhost:2805/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    if (stompClient.connected === true) {
      console.log("dang lang nghe");
      stompClient.subscribe(`/user/${myId}/queue/messages`, onMessageReceived);
    } else {
      console.log("khong lang nghe");
    }
  };
  const onError = (err) => {
    console.log(err);
  };

  // ham xu ly nhung message duoc gui ve user
  const onMessageReceived = (payload) => {
    // console.log("Message received", payload);
    setMessage(JSON.parse(payload.body))
    console.log("message nhan ve", message);
    setReceivedMessage(JSON.parse(payload.body));
    console.log("received message", receivedMessage);
    console.log("conversation lang nghe", conversationList);
    setIsFresh(prev => !prev)
    
  };

  useEffect(() => {
    if (message !== null) {
      setConversationList(
        moveConversationToTop(message.conId, `Friend: ${message.content}`)
      );
    } else {
      console.log("message is null")
    }
  }, [isFresh]);

  //cap nhap vi tri cua conversation co thay doi
  const moveConversationToTop = (conId, newLastMessage) => {
    console.log(text);

    console.log("ban dau", conversationList);
    const copy = conversationList.slice();
    const conversationIndex = copy.findIndex((item) => item.conId === conId);

    if (conversationIndex !== -1) {
      const movedConversation = copy.splice(conversationIndex, 1)[0];
      copy.unshift(movedConversation);
      copy[0].lastMessage = newLastMessage;
    }

    console.log("danh sach tro chuyen", copy);
    return copy;
  };

  //connect socket
  useEffect(connectSocket, []);

  // gui tin nhan
  useEffect(() => {
    if (sendMessage !== null && stompClient.connected === true) {
      console.log("gui tin nhan o home");
      stompClient.send("/app/message", {}, JSON.stringify(sendMessage));
      const conId =
        sendMessage.senderId < sendMessage.receiverId
          ? `${sendMessage.senderId}-${sendMessage.receiverId}`
          : `${sendMessage.receiverId}-${sendMessage.receiverId}`;
      setConversationList(
        moveConversationToTop(conId, `You: ${sendMessage.content}`)
      );
    } else {
      console.log("khong the gui tin nhan o home");
    }
  }, [sendMessage]);

  console.log("converationList", conversationList);
  return (
    <div className="Chat">
      <div className="Left-side-chat">
        <h2>Chats</h2>
        <div className="Chat-list">
          {conversationList.map((item, index) => (
            <div
              onClick={() => setCurrentChat(item)}
              key={item.conId}
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
        <ChatBox
          item={currentChat}
          currentUser={myId}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Home;
