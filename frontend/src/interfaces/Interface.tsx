//サインイン要求レスポンスの構造体
interface SignInUser{
    Name:string;
    Token:string;
    Error:string;
}

//セッション管理情報構造体
interface UserSessionInfo{
    Name:string;
    Token:string;
}

//登録本の構造体
interface BookInfo{
    Title:string;
    Kind:string;
    Price:number;
    Recom:string;
}