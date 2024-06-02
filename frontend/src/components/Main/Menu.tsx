import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { SubmitTokenCheck } from "api/TokenCheck.tsx";
import {
  Anchor,
  Navbar,
  Header,
  Text,
  Button,
  MantineProvider,
  Title,
  Box,
  TextInput,
} from "@mantine/core";
import { Sidebar } from "src/styles/Layouts.tsx"
import { useNavigate, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();//パラメータ(state)
  const navigate = useNavigate();//ナビゲーション
  const UserInfo = location.state as MessageState;//パラメータ(state)
  const [isVisible, setIsVisible] = useState(false);//アニメーション

  //アニメーション
  const fade = useSpring({
    opacity: isVisible ? 1 : 0,
    config: { duration: 500 }, // ここでアニメーションの速度を設定します（1000ms = 1秒）
  });

  useEffect(() => {
    //非同期処理でトークンチェック
    const CheckToken = async () => {
      //パラメータが空
      if (UserInfo == null) {
        navigate("/");
      }
      //userinfo.tokenを渡してトークンAPIを呼び出す
      if (await SubmitTokenCheck(UserInfo.Name, UserInfo.Token) === 200) {
        await setIsVisible(true);
        return;
      } else {
        navigate("/");
        return;
      }
    }
    CheckToken();
  }, []);


  return (
    <animated.div style={fade}>
      <MantineProvider>
        <div style={{ display: 'flex' }}>
          <Sidebar Name={UserInfo.Name} Token={UserInfo.Token} />

          <div style={{ flex: 1, padding: '20px',textAlign: 'center'}}>
            <h1>Welcome to Ebook!!</h1>
            <p>ようこそ、{UserInfo.Name}様。</p>
            <p>サイドバーから利用したいサービスを選んでください。</p>
          </div>
        </div>

      </MantineProvider>
    </animated.div>
  );
}

export default Menu;