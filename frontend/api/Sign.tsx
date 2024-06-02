import { BaseUrl } from "./common.tsx";

//サインアップ要求関数return201OK
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

//サインイン要求関数returnUser,TokenでOK
export async function SubmitSignIn(Name: string,Password:string) {
  const url = new URL("users/sign_in", BaseUrl);
  return new Promise((resolve) => {
    fetch(url.href, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Name,
        password: Password
      }),
    }).then( res =>res.json())
    .then(data=>resolve(data));
  });
}
