import { BaseUrl } from "./common.tsx";

//サインアップ要求関数return200でOK
export async function SubmitSignUp(Name: string, Password: string) {
  const url = new URL("users/sign_up", BaseUrl);
  return new Promise((resolve) => {
    fetch(url.href, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Name,
        password: Password,
      }),
    }).then((res) => resolve(res.status));
  });
}
