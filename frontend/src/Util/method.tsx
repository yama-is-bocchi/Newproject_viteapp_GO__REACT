import { SubmitTokenCheck } from "api/TokenCheck.tsx";

const specialChars: { [key: string]: string } = {
  '&': '',
  '<': '',
  '>': '',
  '"': '',
  "'": '',
  '/': '',
  '\\': '',
  '`': '',
  '=': '',
  '$': '',
  ';': '',
  ':': '',
  '(': '',
  ')': '',
  '{': '',
  '}': '',
  '[': '',
  ']': '',
  '|': '',
  '^': '',
  '%': '',
  '~': '',
  '#': '',
  '!': '',
  '@': '',
  '*': '',
  '?': '',
  '+': '',
};// 置き換える特殊文字のリストを定義


// パスワードの脆弱性確認
export function PasswordChecker(input: string): boolean {
  // 英字と数字が含まれているかチェック
  const hasLetter = /[a-zA-Z]/.test(input);
  const hasNumber = /[0-9]/.test(input);
  // 長さが5以上かチェック
  const lengthValid = input.length >= 5;

  // 英字と数字が含まれており、かつ長さが5以上の場合にTrueを返す
  return hasLetter && hasNumber && lengthValid;
}

//引数のIDを持つ要素に注意を促すテキスト挿入する
export function CautionComment(ID: string, comment: string): void {
  let element = document.getElementById(ID);
  if (element == null) return;
  element.textContent = comment;
  return;
}

//ユーザーの入力の特殊文字をエスケープする
export function EscapeInput(Input: string): string {
  // 正規表現を使って特殊文字を置き換える
  return Input.replace(/[&<>"'\/\\`=$;:(){}[\]|^%~#@!*?+]/g, (char) => specialChars[char] || '');
}

//入力に特殊文字を使われているか?
export function hasSpecialCharacters(input: string): boolean {
  // 正規表現を使って特殊文字をチェックする
  return /[&<>"'\/\\`=$;:(){}[\]|^%~#@!*?+]/.test(input);
}

//非同期処理でスリープ
export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}



//引数のニューメリックチェック
export function isNumericString(value: string): boolean {
  // 正規表現を使用して、文字列が0-9の数字のみで構成されているかを確認
  return /^[0-9]+$/.test(value);
}

//引数の時間(ms)の間引数の文字を引数の要素で表示するその後元に戻す
export async function ChangeElementMs(ElementId:string,ChangeStr:string,Time:Int16Array){
  let element = document.getElementById(ID);
  if (element == null) return;
  let tempTextcontent=element.textContent;
  CautionComment(ElementId,ChangeStr);
  await sleep(Time);
  await CautionComment(ElementId,tempTextcontent);
  return;
}