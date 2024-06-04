import { BaseUrl } from "./common.tsx";
import {UserSessionInfo,BookInfo,EditBookInfo,DeleteBookInfo,GetLFBInfo,AddLFBInfo } from "src/components/interfaces/interface.tsx"


//本一覧関数return200でOK
export async function ListGetLFB(LFBInfo:GetLFBInfo) {
    const url = new URL("wants/Viewlist", BaseUrl);
    return new Promise((resolve) => {
      fetch(url.href, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kind:LFBInfo.Kind,
          name: LFBInfo.Name,
          token: LFBInfo.Token
        }),
      })
        .then((res) => res.json())
        .then((data) => resolve(data));
    });
  }



  //マイリスト登録関数return200でOK
export async function WantsListRegister(LFBInfo:AddLFBInfo) {
  const url = new URL("wants/AddList", BaseUrl);
  return new Promise((resolve) => {
    fetch(url.href, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title:LFBInfo.Title,
        name: LFBInfo.Name,
        token: LFBInfo.Token
      }),
    })
      .then((res) => resolve(res.status))
  });
}

//マイリスト参照
export async function MyListGetLFB(Name:string,Token:string) {
  const url = new URL("wants/ViewMylist", BaseUrl);
  return new Promise((resolve) => {
    fetch(url.href, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Name,
        token: Token
      }),
    })
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
}


//本の選択削除
export async function DeleteLFBAPI(DeleteBooks: AddLFBInfo []) {
  const url = new URL("wants/DeleteList", BaseUrl);
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