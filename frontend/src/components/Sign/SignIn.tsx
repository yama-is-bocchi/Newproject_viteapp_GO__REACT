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
import { BlueMidBtn } from "src/styles/Button.tsx";
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import {
  CautionComment,
  EscapeInput,
  PasswordChecker,
  hasSpecialCharacters,
  sleep
} from "src/Util/method.tsx";
import { SubmitSignIn } from "api/Sign.tsx"
import { SignInUser } from "src/components/interfaces/interface.tsx"
import {UserLenLimit} from "src/Util/common.tsx"

const SignIn = () => {
  const navigate = useNavigate(); //ルーター
  const [isVisible, setIsVisible] = useState(false); //アニメーション
  const [passwordVisible, setPasswordVisible] = useState(false); //パスワード可視性
  const [Name, setName] = useState(""); //ユーザー名
  const [Password, setPassword] = useState(""); //パスワード

  //パスワード可視性
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  //アニメーション
  const fade = useSpring({
    opacity: isVisible ? 1 : 0,
    config: { duration: 1000 }, // ここでアニメーションの速度を設定します（1000ms = 1秒）
  });

  //API送信ボタン
  const SubmitClick = async () => {
    //空欄が無いか
    if (Name === "" || Password === "") {
      CautionComment("caution", "※入力に空欄があります");
      return;
    }
    //長すぎないか
    if (Name.length > UserLenLimit || Password.length > UserLenLimit) {
      CautionComment("caution", "※入力が長すぎます");
      return;
    }
    //特殊文字を含むか
    if (
      hasSpecialCharacters(Name) == true ||
      hasSpecialCharacters(Password) == true
    ) {
      CautionComment("caution", "※無効な文字列を含んでいます");
      return;
    }
    //エスケープ
    const EscapedName = EscapeInput(Name);
    const EscapedPassword = EscapeInput(Password);

    //サーバーの返答を待つ
    const Responce: SignInUser = await SubmitSignIn(EscapedName, EscapedPassword);
    //アカウントがロックされているか?
    if (Responce.Error === "lock") {
      CautionComment("caution", "アカウントがロックされています");
      const Img = document.getElementById("LockImg");
      if (Img !== null) {
        Img.style.display = '';
      }
      return;
    }
    //サーバーからの返答が201か?
    if (Responce.Error !== "OK") {
      CautionComment("caution", "サーバー処理エラー");
      return;
    }
    //サインイン成功
    CautionComment("caution", "");
    CautionComment("success", "Success!!");
    let Img = document.getElementById("SuccessImg");
    if (Img !== null) {
      Img.style.display = '';
    }
    Img = document.getElementById("LockImg");
      if (Img !== null) {
        Img.style.display = 'none';
      }
    await sleep(1000);
    navigate("/Menu",{state:Responce});
    //メニュー画面へ遷移
    return;

  };

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <body>
      <MantineProvider>
        <div className="App">
          <animated.div style={fade}>
            <h1 className="header">SignIn</h1>
            <div className="TextSpace">
              <span>UserName　　</span>
              <span id="caution" className="Caution"></span>
              <span id="success" className="Success"></span>
              <img id="SuccessImg" src="public/images/happy.gif" alt="Example" style={{ display: "none", maxWidth: '20%', height: 'auto' }} />
              <img id="LockImg" src="public/images/crybanana.gif" alt="Example" style={{ display: "none", maxWidth: '20%', height: 'auto' }} />
              <TextInput
                fullWidth
                placeholder="name..."
                variant="filled"
                fullWidth
                styles={{ input: { fontSize: "1.5em" } }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

            </div>
            <div className="TextSpace">
              <span>Password　　</span>
              <Button
                onClick={togglePasswordVisibility}
                variant="subtle"
                style={{
                  cursor: "pointer",
                  marginLeft: -1,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              >
                {passwordVisible ? (
                  <IconEyeOff size={16} />
                ) : (
                  <IconEye size={16} />
                )}
              </Button>
              <TextInput
                placeholder="password..."
                type={passwordVisible ? "text" : "password"}
                styles={{ input: { fontSize: "1.5em" } }}
                style={{ flex: 1 }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <Button style={BlueMidBtn} onClick={SubmitClick}>
              <h2>SignIn</h2>
            </Button>
          </animated.div>
        </div>
      </MantineProvider>
    </body>
  );
};

export default SignIn;