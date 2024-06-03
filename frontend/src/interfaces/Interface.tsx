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

//編集本の構造体
interface EditBookInfo{
    Pretitle:string;
    Title:string;
    Kind:string;
    Price:number;
    Recom:string;
    Name:string;
    Token:string;
}

//削除申請の構造体
interface DeleteBookInfo{
    Title:string;
    Kind:string;
    Price:number;
    Recom:string;
    Name:string;
    Token:string;
}

//種類別選択の構造体
interface GetLFBInfo{
    Kind:string;
    Name:string;
    Token:string;
}

//欲しいものリスト選択の構造体
interface AddLFBInfo{
    Title:string;
    Name:string;
    Token:string;
}