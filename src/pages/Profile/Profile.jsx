import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import "./Profile.css";
import Logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import profile from "../../img/profile.png";

const url = "http://localhost:2805/";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [nickname, setNickname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [editPass, setEditPass] = useState(false);
  const [newPass, setNewPass] = useState(null);
  const [confirmPass, setConfirmPass] = useState(null);
  const [oldPass, setOldPass] = useState(null);
  const token = useSelector((state) => state.token);

  const handleEditClick = async () => {
    if (editMode === true) {
      console.log("sua thong tin");
      if (nickname !== undefined && nickname !== "") {
        await fetch(`${url}userInfo`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: " Bearer " + token,
          },
          body: JSON.stringify({
            avatar: avatar,
            dateOfBirth: dateOfBirth,
            nickname: nickname,
            address: address,
          }),
        }).then((response) => {
          const statusCode = response.status;
          if (statusCode === 200) {
            setEditMode(!editMode);
            return response.json();
          } else {
            alert("Dữ liệu thất bại");
          }
        });
      } else {
        alert("Hãy điền nick name")
      }
    } else {
      setEditMode(!editMode);
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
      //   console.log("File loaded", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handlePassClick = async (event) => {
    event.preventDefault();
    if (editPass === true) {
      if (oldPass !== null && newPass !== null && confirmPass !== null) {
        if (newPass === confirmPass) {
          console.log("thay doi mat khau");
        await fetch(`${url}account/password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: " Bearer " + token,
          },
          body: JSON.stringify({
            oldPass: oldPass,
            newPass: newPass,
          }),
        }).then((response) => {
          const statusCode = response.status;
          if (statusCode === 200) {
            alert("Doi mat khau thanh cong");
            setEditPass(!editPass);
            setOldPass(null);
            setNewPass(null);
            setConfirmPass(null);
            return response.json();
          } else {
            alert("Dữ liệu thất bại");
          }
        });
        } else {
          alert("Mật khẩu mới không trùng khớp!")
        }
      } else {
        alert("Hãy điền đầy đủ thông tin")
      }
    } else {
      setEditPass(!editPass);
    }
  };

  const handleBack = () => {
    setEditMode(false);
    setEditPass(false);
  };
  const getInfo = async () => {
    console.log("lay thong tin");
    await fetch(`${url}userInfo`, {
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
          const data = response.data;
          setAvatar(data.avatar);
          setNickname(data.nickname);
          setAddress(data.address);
          setDateOfBirth(data.dateOfBirth);
        }
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-details">
        <div {...getRootProps()} className="avatar-container">
          {editMode && <input {...getInputProps()} />}
          <img
            src={avatar ? avatar : profile}
            alt="Avatar"
            className="avatar"
          />
        </div>
        <div className="details">
          {!editPass && (
            <>
              <div>
                <div className="title">Nickname: </div>
                <input
                  className={editMode ? "input" : "input readOnly"}
                  readOnly={!editMode}
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
              <div>
                <div className="title">Date of Birth: </div>
                <input
                  className={editMode ? "input" : "input readOnly"}
                  type="date"
                  readOnly={!editMode}
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div>
                <div className="title">Address: </div>
                <input
                  className={editMode ? "input" : "input readOnly"}
                  readOnly={!editMode}
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </>
          )}
          {editPass && (
            <>
              <div>
                <div className="title">Mật khẩu cũ: </div>
                <input
                  className="input"
                  type="password"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                />
              </div>
              <div>
                <div className="title">Mật khẩu mới: </div>
                <input
                  className="input"
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
              </div>
              <div>
                <div className="title">Điền lại mật khẩu mới: </div>
                <input
                  className="input"
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="profile-buttons">
        {!editMode && (
          <button className="change-password-button" onClick={handlePassClick}>
            {!editPass ? "Thay đổi mật khẩu" : "Lưu"}
          </button>
        )}
        {!editPass && (
          <button className="change-info-button" onClick={handleEditClick}>
            {!editMode ? "Sửa" : "Lưu"}
          </button>
        )}
        {(editMode || editPass) && (
          <button className="change-info-button" onClick={handleBack}>
            Quay lại
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
