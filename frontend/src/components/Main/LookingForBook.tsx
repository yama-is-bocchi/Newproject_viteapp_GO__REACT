import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { SubmitTokenCheck } from "api/TokenCheck.tsx";
import { GetLFBList } from "api/LookingForBooks.tsx";
import {
    Anchor,
    Navbar,
    Header,
    Text,
    Button,
    MantineProvider,
    Title,
    Box,
    TextInput, Textarea, Card, Container, List, ListItem
} from "@mantine/core";
import {
    CautionComment,
    EscapeInput,
    PasswordChecker,
    hasSpecialCharacters,
    sleep,
    isNumericString
} from "src/Util/method.tsx";
import { Sidebar } from "src/styles/Layouts.tsx"
import { useNavigate, useLocation } from "react-router-dom";
import { BookTitleLimit, BookPriceLimit, BookRecomLimit } from "src/Util/common.tsx"
import { UserSessionInfo, GetLFBInfo } from "src/components/interfaces/interface.tsx"
import { AquaLargeBtn } from "src/styles/Button.tsx"

const LookingForBooks = () => {
    const location = useLocation();//ローケーション
    const navigate = useNavigate();//ナビゲーション
    const UserInfo = location.state as MessageState;//パラメータ(state)
    const [isVisible, setIsVisible] = useState(false);//アニメーション
    const [ApiDatas, setApiDatas] = useState([]); //APIからの受信データ

    //アニメーション
    const fade = useSpring({
        opacity: isVisible ? 1 : 0,
        config: { duration: 500 }, // ここでアニメーションの速度を設定します（1000ms = 1秒）
    });

    //種類を選択
    const SelectClick = async (e) => {
        const SelectData: GetLFBInfo = {
            Kind: e.target.textContent,
            Name: UserInfo.Name,
            Token: UserInfo.Token
        }
        //APIを呼び出し、本のリストを取得する
        //ここでデータ取得してから遷移
        navigate("/Menu/LookingForBooks/Kinds", { state: { UserInfo: UserInfo, BookInfo: await GetLFBList(SelectData)} });
        return;
    }



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
                <div style={{ display: 'flex', textAlign: "center", }}>
                    <Sidebar Name={UserInfo.Name} Token={UserInfo.Token} />
                    <div style={{ flex: 1, padding: '20px', textAlign: 'center', paddingTop: '150px' }}>
                        <Text size="xl" weight={700} mb="lg">
                            <h2 className="header">Lookin for Books</h2>
                        </Text>
                        <Button onClick={SelectClick} style={AquaLargeBtn}>アーキテクチャ</Button>
                        <Button onClick={SelectClick} style={AquaLargeBtn}>AI,ML</Button>
                        <Button onClick={SelectClick} style={AquaLargeBtn}>プロトコル</Button>
                        <Button onClick={SelectClick} style={AquaLargeBtn}>セキュリティ</Button>
                        <Button onClick={SelectClick} style={AquaLargeBtn}>プログラミング言語</Button>
                        <Button onClick={SelectClick} style={AquaLargeBtn}>技術書</Button>

                    </div>
                </div>

            </MantineProvider>
        </animated.div>
    );
}

export default LookingForBooks;