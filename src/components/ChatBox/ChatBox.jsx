import React,{ useEffect, useState } from "react";
import profile from "../../img/profile.png";
import "./ChatBox.css";
import InputEmoji from "react-input-emoji";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { useRef } from "react";

const ChatBox = ({ item, currentUser, setSendMessage,  receivedMessage}) => {
  const [content, setContent] = useState("");
  const [historyMess, setHistoryMess] = useState([]);
  const token = useSelector((state) => state.token);
  const scroll = useRef();


  //lay lich su tin nhan
  const getMessage = async () => {
    if (item !== null) {
        await fetch(`http://localhost:2805/message/${item.conId}?length=100`, {
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
          setHistoryMess(response.data);
        }
      });

    }
  }

  // lay lich su tin nhan
  useEffect(() => {
    getMessage();
  }, [item?.conId]);

  //gui tin nhan
  const handleSend = async (event) => {
    console.log('gui tin nhan')
    event.preventDefault()
    if (content!==null && content.length > 0) {
      setContent('');
    var dataMess = {
      content: content,
      type: 'TEXT',
      senderId: currentUser,
      receiverId: currentUser === item.userIdSendReferral ? item.userIdReceiveReferral : item.userIdSendReferral,
    }
    setSendMessage(dataMess);
    setHistoryMess([{ ...dataMess, createdAt: new Date().getTime() }, ...historyMess])
    }
  };

  //luot den dau trang khi co tin nhan
  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[historyMess])

  // khi co tin nhan gui den
  useEffect(()=> {
    console.log("Mess nhan o chatbox: ", receivedMessage)
    if (receivedMessage !== null && receivedMessage.conId === item?.conId) {
      setHistoryMess([receivedMessage, ...historyMess]);
    }
  },[receivedMessage])


  return (
    <div className="ChatBox-container">
      {item ? (
        <>
          {/* header */}
          <div className="chat-header">
            <div className="follower">
              <div>
                <img
                  src={item.avatarFriend ? item.avatarFriend : profile}
                  alt="Profile"
                  className="followerImage"
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="name" style={{ fontSize: "0.9rem" }}>
                  <span>{item.nameCon}</span>
                </div>
              </div>
            </div>
            <hr
              style={{
                width: "95%",
                border: "0.1px solid #ececec",
                marginTop: "20px",
              }}
            />
          </div>
          {/* chat-body */}
          <div className="chat-body">
            {historyMess.slice().reverse().map((message, index) => (
              <div key={index} style={{width: "100%"}}>
                <div
                  ref={scroll}
                  className={
                    message.senderId === currentUser ? "message own" : "message"
                  }
                >
                  <span>{message.content}</span>{" "}
                  <span>{format(message.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
          {/* chat-sender */}
          <div className="chat-sender">
            <input
            //   required
              type="text"
              placeholder="text"
            //   className="infoInput"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="send-button button" onClick={handleSend}>
              Send
            </div>
          </div>{" "}
        </>
      ) : (
        <span className="chatbox-empty-message">
          Tap on a chat to start conversation...
        </span>
      )}
    </div>
  );
};

export default ChatBox;
