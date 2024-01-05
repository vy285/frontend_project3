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

  const [confirmPass, setConfirmPass] = useState("");

  const [username, setUsername] = useState("");

  // const dispatch = useDispatch()

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass("");
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
      const url = "http://localhost:2805/public/sendVerifyCode";

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
            return (response = response.json());
          } else {
            return response.json().then((errorData) => {
              console.log(errorData.data.message);
              alert(errorData.data.message);
            });
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
    const url = "http://localhost:2805/public/signup";

    if (data.nickname !== "" && data.username !== "" && data.password !== "" && data.verifyCode !== "" && confirmPass !== "") {
      if (data.password === confirmPass) {
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
              console.log("dang ky thanh cong");
              resetForm();
              alert("Đăng ký thành công");
              return (response = response.json());
            } 
            else {
              return response.json().then((errorData) => {
                console.log(errorData.data.message);
                alert(errorData.data.message);
              });
            }
          })
          .then((response) => {
            if (response !== undefined) {
            }
          });
      } else {
        alert("Mật khẩu không trùng khớp")
      }
    } else {
      alert("Làm ơn, hãy điền đầy đủ thông tin")
    }
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
              placeholder="password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="confirm password"
              name="confirmPass"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
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
