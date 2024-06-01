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
import { BrowserRouter as Router, Route, Routes, Link,useNavigate  } from "react-router-dom";


const Top = () => {
 
  const navigate= useNavigate(); 
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fade = useSpring({
    opacity: isVisible ? 1 : 0,
    config: { duration: 2000 }, // ここでアニメーションの速度を設定します（1000ms = 1秒）
  });

const SignUpClick=()=>{
  navigate("/SignUp")
}

  return (
    <body>
      <MantineProvider>
        <div className="App">
          <animated.div style={fade}>
            <a className="header">
              <h1>Welcome to Ebooks!</h1>
              <Button style={EmeraldMidBtn}>
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
          </animated.div>
        </div>
      </MantineProvider>
    </body>
  );
};

export default Top;
