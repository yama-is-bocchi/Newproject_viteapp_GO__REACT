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
  
    const SignIn_Clickhandler=()=>{
  
    }
  
    const SignUp_Clickhandler=()=>{
      
    }
  
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
              </ul>
            </nav>
            <div className="content">
              <div className="maincontenttitle">
                <h2>ようこそ!!
                <p>新規作成の場合はサインアップを、</p>
                <p>アカウントをお持ちの場合はサインインをお選びください。</p>
                </h2>
              </div>
              <Button style={EmeraldBtn} onClick={SignIn_Clickhandler} >サインイン</Button>
              <Button style={EmeraldBtn} onClick={SignUp_Clickhandler}>サインアップ</Button>
  
            </div>
          </div>
        </div>
      </MantineProvider>
    );
  };
  
  export default Top;