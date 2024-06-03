import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { SubmitTokenCheck } from "api/TokenCheck.tsx";
import { EditBookAPI } from "api/Book.tsx";
import {
    Anchor,
    Navbar,
    Header,
    Text,
    Button,
    MantineProvider,
    Title,
    Box,
    TextInput, Textarea
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
import { BlueSmallBtn } from "src/styles/Button.tsx";
import { BookTitleLimit, BookPriceLimit, BookRecomLimit } from "src/Util/common.tsx"
import { UserSessionInfo, EditBookInfo } from "src/components/interfaces/interface.tsx"

const EditBook = () => {
    const location = useLocation();//ローケーション
    const navigate = useNavigate();//ナビゲーション
    const State = location.state as MessageState;//パラメータ(state)
    const [isVisible, setIsVisible] = useState(false);//アニメーション
    const [showList, setShowList] = useState(false); //リスト状態
    const [PreTitle, setPreTitle] = useState(""); //本の編集前の題名
    const [Title, setTitle] = useState(""); //本の題名
    const [Kind, setKind] = useState(""); //種類
    const [Price, setPrice] = useState(""); //本の価格
    const [Recom, setRecom] = useState(""); //本のあらすじ

    //アニメーション
    const fade = useSpring({
        opacity: isVisible ? 1 : 0,
        config: { duration: 500 }, // ここでアニメーションの速度を設定します（1000ms = 1秒）
    });


    //リスト展開ボタンクリック
    const handleButtonClick = () => {
        setShowList(!showList);
    };

    //リストアイテムボタンクリック
    const handleItemClick = async (item) => {
        await setKind(item);
        setShowList(false);
    };

    const SubmitClick = async () => {
        //空欄がないか
        if (Title === "" || Kind === "" ||
            Price === "" || Recom === ""
        ) {
            CautionComment("success", "");
            CautionComment("caution", "※入力に空欄があります")
            return
        }
        //サイズが大きすぎないか
        if (Title.length > BookTitleLimit || Price.length > BookPriceLimit ||
            Recom.length > BookRecomLimit) {
            CautionComment("success", "");
            CautionComment("caution", "※入力が長すぎます")
            return
        }
        //特殊文字を含んでいないか
        if (
            hasSpecialCharacters(Title) == true ||
            hasSpecialCharacters(Price) == true ||
            hasSpecialCharacters(Recom) == true
        ) {
            CautionComment("success", "");
            CautionComment("caution", "※無効な文字列を含んでいます");
            return;
        }
        //ニューメリックチェック
        if (isNumericString(Price) != true) {
            CautionComment("success", "");
            CautionComment("caution", "※Priceは数値しか受け付けません");
            return;
        }
        //エスケープ
        const EscapedPreTitle = EscapeInput(PreTitle);
        const EscapedTitle = EscapeInput(Title);
        const EscapedPrice = Number(await EscapeInput(Price));//Priceを数値に変換
        const EscapeRecom = EscapeInput(Recom);
        //インターフェースに当てはめる
        const SubmitBook: EditBookInfo = {
            Pretitle: EscapedPreTitle,
            Title: EscapedTitle,
            Kind: Kind,
            Price: EscapedPrice,
            Recom: EscapeRecom
        }

        const SubmitUser: UserSessionInfo = {
            Name: State.UserInfo.Name,
            Token: State.UserInfo.Token
        }
        //送信
        const ResulutStatus = await EditBookAPI(SubmitBook, SubmitUser);
        //タイトルが重複していないか
        if (ResulutStatus === 403) {
            CautionComment("success", "");
            CautionComment("caution", "※タイトルが重複しています");
            return;
        }
        if (ResulutStatus !== 200) {
            CautionComment("success", "");
            CautionComment("caution", "※サーバーエラー");
            return;
        }
        if (ResulutStatus === 200) {
            CautionComment("success", "本を更新しました!");
            CautionComment("caution", "");
            await sleep(1000);
            navigate("/Menu/UpdateBook", { state: State.UserInfo });
            return;
        }
    }

    useEffect(() => {
        //非同期処理でトークンチェック
        const CheckToken = async () => {
            //パラメータが空
            if (State == null) {
                navigate("/");
            }
            //userinfo.tokenを渡してトークンAPIを呼び出す
            if (await SubmitTokenCheck(State.UserInfo.Name, State.UserInfo.Token) === 200) {
                await setIsVisible(true);
                //初期値を設定する
                await setPreTitle(State.BookInfo.title);
                await setTitle(State.BookInfo.title);
                await setPrice(State.BookInfo.price.toString());
                await setKind(State.BookInfo.kind);
                await setRecom(State.BookInfo.recom);
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

            <div
                style={{
                    textAlign: "center",
                    backgroundImage: "url(/images/libtwo.jpg)",
                    paddingTop: '150px'
                }}
            >
                <MantineProvider>
                    <div style={{ display: 'flex' }}>
                        <Sidebar Name={State.UserInfo.Name} Token={State.UserInfo.Token} />
                        <div style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
                            <span className="header">
                                <h2>・Edit Technical Book</h2>
                                <span id="caution" className="Caution"></span>
                                <span id="success" className="Success"></span>
                                <TextInput
                                    fullWidth
                                    placeholder="title..."
                                    variant="filled"
                                    label="Title"
                                    fullWidth
                                    styles={{ input: { fontSize: "1.5em" } }}
                                    id="title"
                                    value={Title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                />
                                <TextInput
                                    fullWidth
                                    placeholder="price..."
                                    variant="filled"
                                    label="Price(JPY)"
                                    fullWidth
                                    styles={{ input: { fontSize: "1.5em" } }}
                                    id="pricefield"
                                    value={Price}
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                    }}
                                />
                                <Textarea
                                    placeholder="explain..."
                                    autosize
                                    label="explain"
                                    minRows={2}
                                    style={{ fontSize: '16px', padding: '10px' }}
                                    styles={{ input: { fontSize: "1.75em" } }}
                                    value={Recom}
                                    id="recom"

                                    onChange={(e) => {
                                        setRecom(e.target.value);
                                    }}
                                />
                            </span>
                            <div style={{ maxWidth: '320px', margin: '0 auto' }}>
                                <button onClick={handleButtonClick}
                                    style={{
                                        cursor: "pointer",
                                        border: "1px solid #ccc",
                                        padding: "8px",
                                        margin: "10px",
                                        borderRadius: "3px",
                                        fontSize: "1.1em",
                                        width: "300px"

                                    }}
                                    id="kind"
                                >
                                    ▽{Kind}
                                </button>
                                {showList && (
                                    <ul
                                        style={{
                                            listStyleType: "none",
                                            background: "#f0f0f0",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            fontSize: "1.1em",
                                        }}
                                    >
                                        <li
                                            onClick={() => handleItemClick("アーキテクチャ")}
                                            style={{
                                                cursor: "pointer",
                                                border: "1px solid #ccc",
                                                padding: "8px",
                                                margin: "5px",
                                                borderRadius: "3px",
                                            }}
                                        >
                                            アーキテクチャ
                                        </li>
                                        <li
                                            onClick={() => handleItemClick("AI,ML")}
                                            style={{
                                                cursor: "pointer",
                                                border: "1px solid #ccc",
                                                padding: "8px",
                                                margin: "5px",
                                                borderRadius: "3px",
                                            }}
                                        >
                                            AI,ML
                                        </li>
                                        <li
                                            onClick={() => handleItemClick("プロトコル")}
                                            style={{
                                                cursor: "pointer",
                                                border: "1px solid #ccc",
                                                padding: "8px",
                                                margin: "5px",
                                                borderRadius: "3px",
                                            }}
                                        >
                                            プロトコル
                                        </li>
                                        <li
                                            onClick={() => handleItemClick("セキュリティ")}
                                            style={{
                                                cursor: "pointer",
                                                border: "1px solid #ccc",
                                                padding: "8px",
                                                margin: "5px",
                                                borderRadius: "3px",
                                            }}
                                        >
                                            セキュリティ
                                        </li>
                                        <li
                                            onClick={() => handleItemClick("プログラミング言語")}
                                            style={{
                                                cursor: "pointer",
                                                border: "1px solid #ccc",
                                                padding: "8px",
                                                margin: "5px",
                                                borderRadius: "3px",
                                            }}
                                        >
                                            プログラミング言語
                                        </li>
                                        <li
                                            onClick={() => handleItemClick("技術書")}
                                            style={{
                                                cursor: "pointer",
                                                border: "1px solid #ccc",
                                                padding: "8px",
                                                margin: "5px",
                                                borderRadius: "3px",
                                            }}
                                        >
                                            技術書
                                        </li>
                                    </ul>
                                )}
                                <Button style={BlueSmallBtn} onClick={SubmitClick}>
                                    Submit!
                                </Button>
                            </div>
                        </div>
                    </div>

                </MantineProvider>
            </div>

        </animated.div>
    );
}

export default EditBook;