import React, { useState, useEffect } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";

const Signup = () => {
  const initialState = {
    nickname: "",
    username: "",
    password: "",
    confirmpass: "",
    verifyCode: "",
  };
  const navigate = useNavigate();

  const [data, setData] = useState(initialState);

  const [confirmPass, setConfirmPass] = useState(true);

  const [username, setUsername] = useState("");

  // const dispatch = useDispatch()

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
  };

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = (e) => {
    // setConfirmPass(true);
    // e.preventDefault();
    // if (isSignUp) {
    //   data.password === data.confirmpass
    //     ? dispatch(signUp(data, navigate))
    //     : setConfirmPass(false);
    // } else {
    //   dispatch(logIn(data, navigate));
    // }
  };

  const sendCode = async (e) => {
    e.preventDefault();
    console.log("Send Code");
    if (data.username === undefined) {
    } else {
        const url = "http://192.168.1.21:2805/public/sendVerifyCode";

        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gmail: data.username,
          }),
        })
          .then((response) => {
            const statusCode = response.status;
            if (statusCode === 200) {
              console.log('asdasdasd')
              return (response = response.json());
            } else {
              alert("Dữ liệu thất bại");
            }
          })
          .then((response) => {
            if (response !== undefined) {
            }
          });
      console.log(data.username);
    }
  };
  
  const handleSignup = async (event) => {
    event.preventDefault();
    const url = "http://192.168.1.21:2805/public/signup";

        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gmail: data.username,
            password: data.password,
            nickname: data.nickname,
            code: data.verifyCode,
          }),
        })
          .then((response) => {
            const statusCode = response.status;
            if (statusCode === 200) {
              console.log('dang ky thanh cong')
              resetForm();
              return (response = response.json());
            } else {
              alert("Dữ liệu thất bại");
            }
          })
          .then((response) => {
            if (response !== undefined) {
            }
          });

  }

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
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>Register</h3>
          <div>
            <input
              required
              type="text"
              placeholder="nickname"
              className="infoInput"
              name="nickname"
              value={data.nickname}
              onChange={handleChange}
            />
          </div>

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
            <input
              type="text"
              className="infoInput"
              name="verifyCode"
              placeholder="Code"
              value={data.verifyCode}
              onChange={handleChange}
            />
            <Button className="button infoButton" onClick={(e) => sendCode(e)}>
              Send Code
            </Button>
          </div>
          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>
          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                navigate("/", { replace: true });
              }}
            >
              Have account to signin
            </span>
            <Button
              className="button infoButton"
              type="Submit"
              onClick={(event) => handleSignup(event)}
              // disabled={loading}
            >
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
