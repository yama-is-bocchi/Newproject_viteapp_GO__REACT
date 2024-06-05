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
import { useNavigate, useLocation } from "react-router-dom";
import { BookTitleLimit, BookPriceLimit, BookRecomLimit } from "src/Util/common.tsx"
import { UserSessionInfo, GetLFBInfo, AddLFBInfo } from "src/components/interfaces/interface.tsx"
import { BlueSmallBtn } from "src/styles/Button.tsx"
import { ListGetLFB, WantsListRegister } from "api/LFBAPI.tsx";

const KindPage = () => {
    const location = useLocation();//ローケーション
    const navigate = useNavigate();//ナビゲーション
    const State = location.state as MessageState;//パラメータ(state)
    const [isVisible, setIsVisible] = useState(false);//アニメーション
    const [ApiDatas, setApiDatas] = useState([]); //APIからの受信データ
    const [PutBooks, setPutBooks] = useState([]);//表示するデータ
    const [WantBooks, setWantBooks] = useState([]);//表示するデータ
    const AddedBooks: string[] = [];//このページで追加した本のname
    const [clickedButton, setClickedButton] = useState(null);


    //アニメーション
    const fade = useSpring({
        opacity: isVisible ? 1 : 0,
        config: { duration: 500 }, // ここでアニメーションの速度を設定します（1000ms = 1秒）
    });


    const slideIn = useSpring({
        transform: isVisible ? "translateX(0)" : "translateX(-100%)",
        config: { duration: 500, tension: 200, friction: 20 },
    });

    //ボタンのスタイル



    const AddClick = async (e) => {
        //APIに接続して返答を待つ
        const submiter: AddLFBInfo = {
            Title: e.target.id,
            Name: State.UserInfo.Name,
            Token: State.UserInfo.Token
        };

        const ResultStatus = await WantsListRegister(submiter);
        //返答が403ならすでに追加済み
        if (ResultStatus === 403) {
            //追加済みと表示する
            CautionComment(e.target.id, "※追加済み");
            await sleep(2000);
            await CautionComment(e.target.id, "マイリストに追加");
        }
        //200なら成功
        //それ以外はエラー
        if (ResultStatus !== 200) {
            //エラーと表示する
            CautionComment(e.target.id, "※エラー");
            await sleep(2000);
            await CautionComment(e.target.id, "マイリストに追加");
        }

        if (ResultStatus === 200) {
            //✓を表示
            //緑に変色
            setClickedButton(e.target.id);
            CautionComment(e.target.id, "✓");
            await sleep(2000);
            await CautionComment(e.target.id, "マイリストに追加");
            await setClickedButton(null);
            return;

        }
    }


    useEffect(() => {
        //非同期処理でトークンチェック
        const CheckToken = async () => {
            //パラメータが空
            if (State.UserInfo == null || State.UserInfo.Name == null || State.UserInfo.Token == null) {
                navigate("/");
            }
            //userinfo.tokenを渡してトークンAPIを呼び出す
            if (await SubmitTokenCheck(State.UserInfo.Name, State.UserInfo.Token) === 200) {
                await setIsVisible(true);
                //成功
                //API呼び出し
                const Submiter: GetLFBInfo = {
                    Kind: State.Kind,
                    Name: State.UserInfo.Name,
                    Token: State.UserInfo.Token
                }
                const GetList = async () => {
                    const state = await ListGetLFB(Submiter);
                    if (state.length > 0) {
                        //データがある
                        setApiDatas(state);
                    } else {
                        //データがない
                        //無い旨を伝える
                        OpenNoneElement("none")
                    }

                }
                await GetList();

                return;
            } else {
                navigate("/");
                return;
            }
        }
        if (State.UserInfo == null || State.UserInfo.Name == null || State.UserInfo.Token == null) {
            navigate("/");
        }
        CheckToken();

    }, []);


    return (
        <animated.div style={fade}>

            <MantineProvider>
                <div style={{ display: 'flex', textAlign: "center", }}>
                    <Sidebar Name={State.UserInfo.Name} Token={State.UserInfo.Token} />
                    <div style={{ flex: 1, padding: '20px', paddingTop: '150px', }}>
<a className="nonedata" style={{ display: 'none'}} id="none" >データがありません</a>
                        <span className="header">
                            <Text size="xl" weight={700} mb="lg">
                                <span id="caution" ></span>
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
                                        <Button style={BlueSmallBtn} id={item.title} onClick={AddClick}>マイリストに追加</Button>
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

export default KindPage;