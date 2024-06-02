import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import {UserSessionInfo } from "src/components/interfaces/interface.tsx"
import { useNavigate, useLocation } from "react-router-dom";

//サイドバーコンポーネント
export const Sidebar:React.FC<UserSessionInfo>=({Name,Token}) =>{

    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();//パラメータ(state)
    const navigate = useNavigate();//ナビゲーション
    const UserInfo:UserSessionInfo={//ユーザーのセッション情報
        Name:Name,
        Token:Token
    }

    useEffect(() => {
        setIsVisible(true);
    }, []);

    //アニメーション設定
    const one_slideIn = useSpring({
        transform: isVisible ? "translateX(0)" : "translateX(-100%)",
        config: { duration: 100, tension: 200, friction: 20 },
    });
    const two_slideIn = useSpring({
        transform: isVisible ? "translateX(0)" : "translateX(-100%)",
        config: { duration: 200, tension: 200, friction: 20 },
    });
    const three_slideIn = useSpring({
        transform: isVisible ? "translateX(0)" : "translateX(-100%)",
        config: { duration: 300, tension: 200, friction: 20 },
    });
    const four_slideIn = useSpring({
        transform: isVisible ? "translateX(0)" : "translateX(-100%)",
        config: { duration: 400, tension: 200, friction: 20 },
    });
    const five_slideIn = useSpring({
        transform: isVisible ? "translateX(0)" : "translateX(-100%)",
        config: { duration: 500, tension: 200, friction: 20 },
    });
    const six_slideIn = useSpring({
        transform: isVisible ? "translateX(0)" : "translateX(-100%)",
        config: { duration: 600, tension: 200, friction: 20 },
    });
    //アニメーション設定

    //遷移先クリック
    const BookAddClick=()=>{
        //ユーザー情報を渡して画面遷移
        navigate("/Menu/AddBook",{state:UserInfo});
        return;
    }

    return (
        <div style={{ width: '250px', height: '100vh', backgroundColor: '#333', color: '#fff', padding: '20px' }}>
            <h2>Ebook</h2>
            <ul>
                <animated.div style={one_slideIn}>
                    <li><button style={buttonStyle} onClick={BookAddClick}>AddBook</button></li>
                </animated.div>
                <animated.div style={two_slideIn}>
                    <li><button style={buttonStyle}>ViewBook</button></li>
                </animated.div>
                <animated.div style={three_slideIn}>
                <li><button style={buttonStyle}>UpdateBook</button></li>
                </animated.div>
                <animated.div style={four_slideIn}>
                <li><button style={buttonStyle}>DeleteBook</button></li>
                </animated.div>
                <animated.div style={five_slideIn}>
                <li><button style={buttonStyle}>Looking for Books</button></li>
                </animated.div>
                <animated.div style={six_slideIn}>
                <li><button style={buttonStyle}>MyList</button></li>
                </animated.div>
            </ul>
        </div>
    );
}

const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '8px 12px',
    margin: '8px 0',
    width: '100%',
    textAlign: 'left',
};

