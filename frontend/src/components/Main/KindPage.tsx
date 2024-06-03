import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { SubmitTokenCheck } from "api/TokenCheck.tsx";
import { GetBookList } from "api/Book.tsx";
import { WantsListRegister} from "api/LookingForBooks.tsx";
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
import { Sidebar, listItemStyle } from "src/styles/Layouts.tsx"
import { EmeraldSmallBtn } from "src/styles/Button.tsx"
import { useNavigate, useLocation } from "react-router-dom";
import { BookTitleLimit, BookPriceLimit, BookRecomLimit } from "src/Util/common.tsx"
import { UserSessionInfo, BookInfo ,AddLFBInfo} from "src/components/interfaces/interface.tsx"



const KindPage = () => {
    const location = useLocation();//ローケーション
    const navigate = useNavigate();//ナビゲーション
    const State = location.state as MessageState;//パラメータ(state)
    const [isVisible, setIsVisible] = useState(false);//アニメーション
    const [ApiDatas, setApiDatas] = useState([]); //APIからの受信データ
    const [PutBooks, setPutBooks] = useState([]);//表示するデータ
    const [WantBooks, setWantBooks] = useState([]);//表示するデータ
    const AddedBooks: string[] = [];//このページで追加した本のname


    //アニメーション
    const fade = useSpring({
        opacity: isVisible ? 1 : 0,
        config: { duration: 500 }, // ここでアニメーションの速度を設定します（1000ms = 1秒）
    });

    const slideIn = useSpring({
        transform: isVisible ? "translateX(0)" : "translateX(-100%)",
        config: { duration: 500, tension: 200, friction: 20 },
    });

    const AddClick = async (e) => {
        //wants,AddedBooksに含まれていれば飛ばし
        const Existwants = State.BookInfo.Wants.find(item => item.title === e.target.id);
        const Existadded = AddedBooks.find(item => item === e.target.id);
        if(Existwants||Existadded ){
            e.textContent ="追加済み";
            console.log("nono")
            return;

        }else{
               //含まれていなければ追加ごAddedlistにも追加
               const Added:AddLFBInfo={
                Title:e.target.id,
                Name:State.UserInfo.Name,
                Token:State.UserInfo.Token
               }

            const Result=await WantsListRegister(Added);
            console.log(Result)
            if(Result===200){
            AddedBooks.push(e.target.id)
            console.log("okok")
            }
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
                if(State.BookInfo.Books.length===0){
                    CautionComment("caution","データがありません")
                    return;
                }

                console.log(State.BookInfo.Books)
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
                        <span className="header">
                            <Text size="xl" weight={700} mb="lg">
                                <span id="caution" ></span>
                            </Text>
                        </span>
                        <List spacing="lg" size="sm">
                        {State.BookInfo.Books.map((item, index) => (
                            <animated.div style={slideIn}>
                                        <div style={listItemStyle}>
                                            <Text size="lg" weight={500}>
                                                <h3> ・{item.title}</h3>
                                            </Text>
                                            <Text color="dimmed">種類: {item.kind}</Text>
                                            <Text>あらすじ: {item.recom}</Text>
                                            <Button style={EmeraldSmallBtn} id={item.title} onClick={AddClick }>マイリストに追加</Button>
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