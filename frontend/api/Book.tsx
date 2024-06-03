import { BaseUrl } from "./common.tsx";
import {UserSessionInfo,BookInfo,EditBookInfo,DeleteBookInfo } from "src/components/interfaces/interface.tsx"

//本登録要求関数return200OK
export async function SubmitBookRegister(Book: BookInfo, User: UserSessionInfo) {
  const url = new URL("books/RegisterBook", BaseUrl);
  return new Promise((resolve) => {
    fetch(url.href, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title:Book.Title,
        kind:Book.Kind,
        price:Book.Price,
        recom:Book.Recom,
        name: User.Name,
        token: User.Token
      }),
    }).then((res) => resolve(res.status));
  });
}

//本一覧関数return200でOK
export async function GetBookList(Name: string, Token: string) {
    const url = new URL("books/ViewBook", BaseUrl);
    return new Promise((resolve) => {
      fetch(url.href, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: Name,
          token: Token,
        }),
      })
        .then((res) => res.json())
        .then((data) => resolve(data));
    });
  }


  //本編集関数return200でOK
export async function EditBookAPI(Book: EditBookInfo, User: UserSessionInfo) {
  const url = new URL("books/UpdateBook", BaseUrl);
  return new Promise((resolve) => {
    fetch(url.href, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pretitle:Book.Pretitle,
        title:Book.Title,
        kind:Book.Kind,
        price:Book.Price,
        recom:Book.Recom,
        name: User.Name,
        token: User.Token
      }),
    }).then((res) => resolve(res.status));
  });
}

//本の選択削除
export async function DeleteBookAPI(DeleteBooks: DeleteBookInfo []) {
  const url = new URL("books/DeleteBook", BaseUrl);
  return new Promise((resolve) => {
    fetch(url.href, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(DeleteBooks),
    }).then((res) => resolve(res.status));
  });
}