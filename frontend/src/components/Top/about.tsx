import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fade = useSpring({
    opacity: isVisible ? 1 : 0,
    config: { duration: 2000 }, // ここでアニメーションの速度を設定します（1000ms = 1秒）
  });

  const title_slideIn = useSpring({
    transform: isVisible ? "translateX(0)" : "translateX(-100%)",
    config: { duration: 500, tension: 200, friction: 20 },
  });

  const sub_slideIn = useSpring({
    transform: isVisible ? "translateX(0)" : "translateX(-100%)",
    config: { duration: 1000, tension: 200, friction: 20 },
  });

  return (
    <body>
      <animated.div style={fade}>
        <div
          style={{
            textAlign: "center",
            position: "relative",
            height: "100vh",
            backgroundImage: "url(/images/spider.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="App">
            <animated.div style={title_slideIn}>
              <a className="header">
                <h1>Ebooks is Engineer's technical books</h1>
              </a>
            </animated.div>

            <animated.div style={sub_slideIn}>
                <a className="header">
              <h4>Ebookは全てのエンジニアのための、</h4>
              <h4>技術書を共有するためのサイトです。</h4>
              <h4>エンジニアの方はぜひ技術書の登録をお願いします🙇。</h4>
              </a>
           </animated.div>
          </div>
        </div>
      </animated.div>
    </body>
  );
};

export default About;
