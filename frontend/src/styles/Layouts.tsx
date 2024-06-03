import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { UserSessionInfo } from "src/components/interfaces/interface.tsx";
import { useNavigate, useLocation } from "react-router-dom";

// トップバーコンポーネント
export const Sidebar: React.FC<UserSessionInfo> = ({ Name, Token }) => {
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation(); // パラメータ(state)
    const navigate = useNavigate(); // ナビゲーション
    const UserInfo: UserSessionInfo = { // ユーザーのセッション情報
        Name: Name,
        Token: Token
    };

    useEffect(() => {

        if (!UserInfo||!UserInfo.Name||!UserInfo.Token ) {
            navigate("/");
        }
        setIsVisible(true);
    }, []);

    // アニメーション設定
    const one_slideIn = useSpring({
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        config: { duration: 100, tension: 200, friction: 20 },
    });
    const two_slideIn = useSpring({
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        config: { duration: 200, tension: 200, friction: 20 },
    });
    const three_slideIn = useSpring({
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        config: { duration: 300, tension: 200, friction: 20 },
    });
    const four_slideIn = useSpring({
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        config: { duration: 400, tension: 200, friction: 20 },
    });
    const five_slideIn = useSpring({
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        config: { duration: 500, tension: 200, friction: 20 },
    });
    const six_slideIn = useSpring({
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        config: { duration: 600, tension: 200, friction: 20 },
    });
    const seven_slideIn = useSpring({
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        config: { duration: 700, tension: 200, friction: 20 },
    });
    // アニメーション設定

    // 遷移先クリック
    // 本登録クリック
    const BookAddClick = () => {
        // ユーザー情報を渡して画面遷移
        navigate("/Menu/AddBook", { state: UserInfo });
        return;
    };

    // 登録本参照
    const RegisteredBookClick = () => {
        // ユーザー情報を渡して画面遷移
        navigate("/Menu/RegisteredBooks", { state: UserInfo });
        return;
    };

    // アップデート本参照
    const UpdateBookClick = () => {
        // ユーザー情報を渡して画面遷移
        navigate("/Menu/UpdateBook", { state: UserInfo });
        return;
    };

        // 選択本削除
        const DeleteBookClick = () => {
            // ユーザー情報を渡して画面遷移
            navigate("/Menu/DeleteBook", { state: UserInfo });
            return;
        };

//LFBクリック

const LookingForBookClick = () => {
    // ユーザー情報を渡して画面遷移
    navigate("/Menu/LookingForBooks", { state: UserInfo });
    return;
};
    //サインアウト
    const SignOutClick = () => {
        navigate("/");
        return;
    }



    return (
        <div style={topbarStyle}>
            <h2>Ebook</h2>
            <ul style={ulStyle}>
                <animated.div style={one_slideIn}>
                    <li><button style={buttonStyle} onClick={BookAddClick}>AddBook</button></li>
                </animated.div>
                <animated.div style={two_slideIn}>
                    <li><button style={buttonStyle} onClick={RegisteredBookClick}>RegisteredBooks</button></li>
                </animated.div>
                <animated.div style={three_slideIn}>
                    <li><button style={buttonStyle} onClick={UpdateBookClick}>UpdateBook</button></li>
                </animated.div>
                <animated.div style={four_slideIn}>
                    <li><button style={buttonStyle} onClick={DeleteBookClick}>DeleteBook</button></li>
                </animated.div>
                <animated.div style={five_slideIn}>
                    <li><button style={buttonStyle} onClick={LookingForBookClick}>Looking for Books</button></li>
                </animated.div>
                <animated.div style={six_slideIn}>
                    <li><button style={buttonStyle}>MyList</button></li>
                </animated.div>
                <animated.div style={seven_slideIn}>
                    <li><button style={buttonStyle} onClick={SignOutClick}>SignOut</button></li>
                </animated.div>
            </ul>
        </div>
    );
};

const topbarStyle = {
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    padding: '5px',
    boxSizing: 'border-box' as 'border-box',
    overflowX: 'auto' as 'auto',
    position: 'fixed' as 'fixed',
    top: '0',
    left: '0',
    zIndex: 1000,
};

const ulStyle = {
    padding: '0',
    margin: '0',
    listStyleType: 'none' as 'none',
    display: 'flex',
    flexDirection: 'row' as 'row',
};

const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '8px 12px',
    margin: '8px',
    textAlign: 'center' as 'center',
};


export const listItemStyle = {
    border: "1px solid #000", // 黒いボーダー
    padding: "10px",
    marginBottom: "60px",

  };