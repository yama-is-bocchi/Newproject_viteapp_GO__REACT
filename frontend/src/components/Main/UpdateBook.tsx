import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { SubmitTokenCheck } from "api/TokenCheck.tsx";
import { GetBookList } from "api/Book.tsx";
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
    isNumericString,
    OpenNoneElement
} from "src/Util/method.tsx";
import { Sidebar, listItemStyle } from "src/styles/Layouts.tsx"
import { EmeraldSmallBtn} from "src/styles/Button.tsx"
import { useNavigate, useLocation } from "react-router-dom";
import { BookTitleLimit, BookPriceLimit, BookRecomLimit } from "src/Util/common.tsx"
import { UserSessionInfo, BookInfo } from "src/components/interfaces/interface.tsx"



const UpdateBook = () => {
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

    const slideIn = useSpring({
        transform: isVisible ? "translateX(0)" : "translateX(-100%)",
        config: { duration: 500, tension: 200, friction: 20 },
    });

    const EditClick=async(e)=>{
        if (await e.target.id === null) return;
        const element=ApiDatas.find(el=>el.title===e.target.id)
        if (await element === null) return;
        navigate("/Menu/UpdateBook/Edit", { state: {UserInfo:UserInfo,BookInfo:element} });

        return;
    }


    useEffect(() => {
        //非同期処理でトークンチェック
        const CheckToken = async () => {
            //パラメータが空
            if (UserInfo == null||UserInfo.Name == null ||UserInfo.Token == null) {
                navigate("/");
            }
            //userinfo.tokenを渡してトークンAPIを呼び出す
            if (await SubmitTokenCheck(UserInfo.Name, UserInfo.Token) === 200) {
                await setIsVisible(true);
                 //成功
                //API呼び出し
                const GetList=async()=>{
                    const state=await GetBookList(UserInfo.Name, UserInfo.Token);
                    if (state.length > 0) {
                        //データがある
                        setApiDatas(state);
                        return;
                    } else {
                        //データがない
                        //無い旨を伝える
                        OpenNoneElement("none");
                        return;
                    }
                };
                await GetList();

                return;
            } else {
                navigate("/");
                return;
            }
        }
        if (UserInfo == null||UserInfo.Name == null ||UserInfo.Token == null) {
            navigate("/");
        }
        CheckToken();

    }, []);


    return (
        <animated.div style={fade}>
            <MantineProvider>
                <div style={{ display: 'flex', textAlign: "center", }}>
                    <Sidebar Name={UserInfo.Name} Token={UserInfo.Token} />
                    <div style={{ flex: 1, padding: '20px', paddingTop: '150px', }}>
                    <a className="nonedata" style={{ display: 'none'}} id="none" >データがありません</a>
                        <span className="header">
                            <Text size="xl" weight={700} mb="lg">
                                <h2>編集したい本を選んでください</h2>
                            </Text>
                            </span>
                            <List spacing="lg" size="sm">
                                {ApiDatas.map((item, index) => (
                                    <animated.div style={slideIn}>
                                        <div style={listItemStyle}>

                                            <Text size="lg" weight={500}>
                                                <h3> ・{item.title}</h3>
                                            </Text>
                                            <Text color="dimmed">種類: {item.kind}</Text>
                                            <Text>あらすじ: {item.recom}</Text>
                                            <Button style={EmeraldSmallBtn} id={item.title} onClick={EditClick}>編集</Button>
                                        </div>
                                    </animated.div>
                                ))}
                            </List>

                    </div>
                </div>

            </MantineProvider>
        </animated.div>
    );
}



export default UpdateBook;