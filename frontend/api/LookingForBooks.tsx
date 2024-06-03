import { BaseUrl } from "./common.tsx";
import {UserSessionInfo,BookInfo,EditBookInfo,DeleteBookInfo,GetLFBInfo,AddLFBInfo } from "src/components/interfaces/interface.tsx"


//本一覧関数return200でOK
export async function GetLFBList(LFBInfo:GetLFBInfo) {
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

