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
} from "src/Util/method.tsx";
import {SubmitSignUp} from "api/Sign.tsx"

const SignUp = () => {
  const navigate = useNavigate(); //ルーター
  const [isVisible, setIsVisible] = useState(false); //アニメーション
  const [passwordVisible, setPasswordVisible] = useState(false); //パスワード可視性
  const [Name, setName] = useState(""); //新規ユーザー名
  const [Password, setPassword] = useState(""); //新規パスワード
  const [TwoPassword, setTwoPassword] = useState(""); //確認パスワード

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
    if(Name==="" || Password===""|| TwoPassword===""){
      CautionComment("caution", "※入力に空欄があります");
      return;
    }

    //確認パスワードと照合
    if (Password !== TwoPassword) {
      CautionComment("caution", "※確認パスワード不一致");
      return;
    }
    //長すぎないか
    if (Name.length > 30 || Password.length > 30 || TwoPassword.length > 30) {
      CautionComment("caution", "※入力が長すぎます");
      return;
    }
    //特殊文字を含むか
    if (
      hasSpecialCharacters(Name) == true ||
      hasSpecialCharacters(Password) == true ||
      hasSpecialCharacters(TwoPassword) == true
    ) {
      CautionComment("caution", "※無効な文字列を含んでいます");
      return;
    }
    //エスケープ
    const EscapedName = EscapeInput(Name);
    const EscapedPassword = EscapeInput(Password);
    //パスワードが脆弱じゃないか?
    if(PasswordChecker(EscapedPassword)===false){
      CautionComment("caution","※パスワードが脆弱です");
      return;
    }

    //サーバーの返答を待つ
    const ServerResult = await SubmitSignUp(EscapedName, EscapedPassword);
    
    //Nameが重複していないか&サーバーからの返答が200か?
    if (ServerResult === 403) {
      CautionComment("caution", "※名前が重複しています。");
      return;
    }
    //Nameが重複していないか&サーバーからの返答が200か?
    if (ServerResult !== 201) {
      CautionComment("caution", "※サーバー処理エラー");
      return;
    }
    //サインアップ成功
    //メニュー画面へ遷移
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <body>
      <MantineProvider>
        <div className="App">
          <animated.div style={fade}>
            <h1 className="header">SignUp</h1>
            <div className="TextSpace">
              <span>UserName</span>
              <span id="caution" className="Caution"></span>
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
              <span>NewPassword</span>
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
            <div className="TextSpace">
              <span>UserName</span>
              <TextInput
                placeholder="password..."
                type={passwordVisible ? "text" : "password"}
                styles={{ input: { fontSize: "1.5em" } }}
                style={{ flex: 1 }}
                onChange={(e) => {
                  setTwoPassword(e.target.value);
                }}
              />
            </div>
            <Button style={BlueMidBtn} onClick={SubmitClick}>
              <h2>SignUp</h2>
            </Button>
          </animated.div>
        </div>
      </MantineProvider>
    </body>
  );
};

export default SignUp;
