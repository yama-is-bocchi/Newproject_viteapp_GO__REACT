import {
    AppShell,
    Navbar,
    Header,
    Text,
    Button,
    MantineProvider,
    Title,
    Box,
  } from "@mantine/core";
  import { EmeraldBtn} from "./../../styles/Button.tsx";
  import "./../../styles/Layout.css";
  const Top = () => {
    return (
      <MantineProvider>
        <div className="app">
          <header className="header">
            <h1>Engineer's technical books</h1>
          </header>
          <div className="main">
            <nav className="sidebar">
              <h2>Sidebar</h2>
              <ul>
                <li>
                  <Button style={EmeraldBtn}>Item 1</Button>
                </li>
                <li>
                  <Button style={EmeraldBtn}>Item 2</Button>
                </li>
                <li>
                  <Button style={EmeraldBtn}>Item 3</Button>
                </li>
              </ul>
            </nav>
            <div className="content">
              <div className="maincontenttitle">
                <h2>ようこそ!!</h2>
                <p>新規作成の場合はサインアップを、</p>
                <p>アカウントをお持ちの場合はサインインをお選びください。</p>
              </div>
              
  
            </div>
          </div>
        </div>
      </MantineProvider>
    );
  };
  
  export default Top;