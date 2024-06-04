import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { SubmitTokenCheck } from "api/TokenCheck.tsx";
import { GetBookList } from "api/Book.tsx";
import { MyListGetLFB, DeleteLFBAPI } from "api/LFBAPI.tsx";
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
import { RedSmallBtn } from "src/styles/Button.tsx"
import { useNavigate, useLocation } from "react-router-dom";
import { BookTitleLimit, BookPriceLimit, BookRecomLimit } from "src/Util/common.tsx"
import { UserSessionInfo, BookInfo, AddLFBInfo } from "src/components/interfaces/interface.tsx"



const MyList = () => {
    const location = useLocation();//ローケーション
    const navigate = useNavigate();//ナビゲーション
    const UserInfo = location.state as MessageState;//パラメータ(state)
    const [isVisible, setIsVisible] = useState(false);//アニメーション
    const [ApiDatas, setApiDatas] = useState([]); //APIからの受信データ
    const [clickedButton, setClickedButton] = useState(null);
    const [checkedItems, setCheckedItems] = useState({});//チェックされた本のBool配列
    const deleteBooks: DeleteBookInfo[] = [];//削除したい本のデータ

    //アニメーション
    const fade = useSpring({
        opacity: isVisible ? 1 : 0,
        config: { duration: 500 }, // ここでアニメーションの速度を設定します（1000ms = 1秒）
    });

    const slideIn = useSpring({
        transform: isVisible ? "translateX(0)" : "translateX(-100%)",
        config: { duration: 500, tension: 200, friction: 20 },
    });

    //チェック
    const handleToggle = (index) => {
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [index]: !prevCheckedItems[index],
        }));
    };

    //削除クリック
    const DeleteClick = async (e) => {
        //配列を確認する(checkedItems)
        const checkItems = (): boolean => {
            //チェックされているか
            const ItemarrayLen = Object.keys(checkedItems).length;
            if (ItemarrayLen != 0) {
                //チェックが一つはある
                for (const item in checkedItems) {
                    //どこの配列にチェックされているか確認
                    //item=number
                    if (checkedItems[item] == true) {
                        //チェックされている
                        //対象のApiDatasの要素をNeedDeleteBooksに追加する
                        const TargetBook: AddLFBInfo = {
                            Title: ApiDatas[item].title,
                            Name: UserInfo.Name,
                            Token: UserInfo.Token,
                        };
                        deleteBooks.push(TargetBook);
                    }
                }
                return true;
            }
            return false;
        };
        //アイテムから対象の本データを配列に挿入
        if (await checkItems() === true) {
            //選択が一つ以上あり全て配列に挿入した
            //APIを呼び出し結果を待つ
            const ResultStatus = await DeleteLFBAPI(deleteBooks);

            if (ResultStatus !== 200) {

                CautionComment("caution", "サーバーエラー")
                return
            }
            else {
                //成功
                //画面再描画
                //成功
                window.location.reload();
                return;
            }
        }
    }


    useEffect(() => {
        //非同期処理でトークンチェック
        const CheckToken = async () => {
            //パラメータが空
            if (UserInfo == null || UserInfo.Name == null || UserInfo.Token == null) {
                navigate("/");
            }
            //userinfo.tokenを渡してトークンAPIを呼び出す
            if (await SubmitTokenCheck(UserInfo.Name, UserInfo.Token) === 200) {
                await setIsVisible(true);
                //APIを呼び出し、本のリストを取得する
                setApiDatas(await MyListGetLFB(UserInfo.Name, UserInfo.Token))
                return;
            } else {
                navigate("/");
                return;
            }
        }
        if (UserInfo == null || UserInfo.Name == null || UserInfo.Token == null) {
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
                        <span className="header">
                            <Text size="xl" weight={700} mb="lg">
                                <h2>MyLists　　　<Button style={RedSmallBtn} onClick={DeleteClick}><span className="header">削除</span></Button></h2>
                            </Text>
                        </span>
                        <List spacing="lg" size="sm">
                            {ApiDatas.map((item, index) => (
                                <animated.div style={slideIn}>
                                    <div style={listItemStyle}>
                                        <h3> ・{item.title}</h3> <h3>   <input
                                            type="checkbox"
                                            checked={!!checkedItems[index]}
                                            onChange={() => handleToggle(index)}
                                            style={{
                                                cursor: 'pointer',
                                                width: '30px', // チェックボックスの幅を指定
                                                height: '30px' // チェックボックスの高さを指定
                                            }}
                                        /></h3>

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



export default MyList;