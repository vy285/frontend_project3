import React, { useState, useEffect } from "react";
import Logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import "./Search.css";
import { useSelector } from "react-redux";
import profile from "../../img/profile.png";
import UserItem from "../../components/UserItem/UserItem";

const url = "http://localhost:2805/";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [userList, setUserList] = useState([]);
  const [isFresh, setIsFresh] = useState(true);
  const token = useSelector((state) => state.token);
  const myId = useSelector((state) => state.userId);

  const handleSearch = async (event) => {
    console.log("tim kiem")
    await fetch(`${url}userInfo/search?nickname=${searchText}`, {
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
          setUserList(response.data);
        }
      });
  };

  useEffect(()=> {
    handleSearch()
  }, [isFresh])
  return (
    <div className="container">
      <div className="header">
        <input
          type="text"
          placeholder="name user"
          name="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="search-button" onClick={handleSearch}>
            Tìm
        </div>
      </div>

      <div className="body">
        {userList.map((user, index) => (
          <UserItem
            key={index}
            user={user}
            setIsFresh={setIsFresh}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
