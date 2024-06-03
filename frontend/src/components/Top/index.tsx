import {
  Anchor,
  Navbar,
  Header,
  Text,
  Button,
  MantineProvider,
  Title,
  Box,
} from "@mantine/core";
import { EmeraldMidBtn } from "./../../styles/Button.tsx";
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";


const Top = () => {

  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fade = useSpring({
    opacity: isVisible ? 1 : 0,
    config: { duration: 2000 }, // ここでアニメーションの速度を設定します（1000ms = 1秒）
  });

  //サインアップクリック
  const SignUpClick = () => {
    navigate("/SignUp")
  }

  //サインインクリック
  const SignInClick = () => {
    navigate("/SignIn")
  }

  return (
    <animated.div style={fade}>
      <div
        style={{
          textAlign: "center",
          position: "relative",
          height: "100vh",
          backgroundImage: "url(/images/libone.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <MantineProvider>

          <div className="App">

            <a className="header">
              <h1>Welcome to Ebooks!</h1>
              <Button style={EmeraldMidBtn} onClick={SignInClick}>
                <h2>SignIn</h2>
              </Button>
              <br />
              <Button style={EmeraldMidBtn} onClick={SignUpClick}>
                <h2>SignUp</h2>
              </Button>
            </a>
            <Link
              to="/about"
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                margin: "10px",
                color: "blue",
                textDecoration: "none",
              }}
            >
              <u> What is Ebook?</u>
            </Link>

          </div>

        </MantineProvider>
      </div>
    </animated.div>
  );
};

export default Top;
