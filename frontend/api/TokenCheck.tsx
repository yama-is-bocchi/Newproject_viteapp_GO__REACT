import { BaseUrl} from './common';

//トークンチェック要求関数return200でOK
export async function SubmitTokenCheck(Name: string,Token:string) {
  const url = new URL("users/Tokencheck", BaseUrl);
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
    }).then((res) => resolve(res.status));
  });
}