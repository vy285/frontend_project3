import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";
import { useDispatch } from 'react-redux';

const Auth = () => {
  const initialState = {
    username: "",
    password: "",
  };
  const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();

  // const dispatch = useDispatch()

  // Reset Form
  const resetForm = () => {
    setData(initialState);
  };

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogin = async (event) => {
    console.log('login')
    event.preventDefault();
    const url = "http://localhost:2805/public/login";

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gmail: data.username,
        password: data.password,
      }),
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
          dispatch({type: 'SET_TOKEN', payload: {token: response.data.token, userId: response.data.userId}});
          navigate("home", {replace:true})
        }
      });


  };

  return (
    <div className="Auth">
      {/* left side */}

      <div className="a-left">
        <img src={Logo} alt="" />

        <div className="Webname">
          <h1>ZKC Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/* right form side */}

      <div className="a-right">
        <form className="infoForm authForm" >
          <h3>Login</h3>
          <div>
            <input
              required
              type="text"
              placeholder="gmail"
              className="infoInput"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                navigate('/signup', {replace: true})
              }}
            >
              Don't have an account Sign up
            </span>
            <Button
              className="button infoButton"
              type="Submit"
              onClick={handleLogin}
              // disabled={loading}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
