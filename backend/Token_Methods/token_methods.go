package Token_Methods

import (
	"Ebook/ent"
	"Ebook/ent/token"
	"Ebook/ent/user"
	"Ebook/Structs"
	"Ebook/Util_Methods"
	"context"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"time"
)

// トークンとユーザーNameが一致するか確認する
func TokenCheckHandler(c *gin.Context) {
	// 変数reqをSignRequestで定義
	var req structs.TokenCheckRequest
	//reqに取得したデータを格納、変換でエラーが起きた場合はエラーを返して終了
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "変換できません"})
		return
	}
	//エスケープ処理
	e_Name:=Util_Methods.EscapeInput(req.Name)
	e_Token:=Util_Methods.EscapeInput(req.Token)
	//NameからユーザーIDを取得する
	submiteduser, err := structs.Client.User.Query().
		Where(user.NameEQ(e_Name)).
		First(context.Background())

	if err != nil {
		c.JSON(401, gin.H{"error": "ユーザー名が違います"})
		return
	}

	// ユーザの検索、パスワードの照合を行う
	token_list, err := structs.Client.Token.Query().
		Where(token.UserIDEQ(submiteduser.ID), token.TokenEQ(e_Token)).
		First(context.Background())

	if err != nil {
		//トークン,IDが不一致or存在しない
		c.JSON(403, gin.H{"error": "err"})
		return

	}
	today := time.Now()

	//Dateが今日のものか?
	if !SameDate(token_list.AccessDate, today) {
		//トークンが今日発行したものではない
		c.JSON(403, gin.H{"error": "err"})
		return
	}

	c.JSON(200, gin.H{"user": submiteduser, "token": token_list.Token})
}

// トークンテーブルにユーザーIDが存在するか確認する関数を返す
func CheckTokenlistinUser(client *ent.Client) structs.ExitsChecktype {
	return func(user_id int) bool {
		// 新規発行か確認
		_, err := client.Token.Query().
			Where(token.UserIDEQ(user_id)).
			First(context.Background())
		return err == nil
	}
}

// トークン生成
func GenerateToken() (string, error) {
	for {
		// ランダムバイト列を生成
		randomBytes := make([]byte, 16)
		_, err := rand.Read(randomBytes)
		if err != nil {
			// エラーが発生した場合、少し待って再試行する
			time.Sleep(100 * time.Millisecond)
			continue
		}

		// 現在時刻をナノ秒単位で取得
		timestamp := time.Now().UnixNano()

		// ランダムバイト列を16進数表記の文字列に変換
		randomString := hex.EncodeToString(randomBytes)

		// トークンを生成
		token := fmt.Sprintf("%d-%s", timestamp, randomString)

		return token, nil
	}
}

// トークン生成,保存
func SaveToken(client *ent.Client, user_id int) (string, error) {
	continueCounter := 0
	for {

		//5回再生成して失敗したらエラーとして返す
		if continueCounter > 5 {
			return "トークン生成に失敗しました", errors.New("トークン生成に失敗しました")
		}
		//トークンを生成する
		generatedToken, err := GenerateToken()
		if err != nil {
			continueCounter += 1
			continue
		}

		// トークンが重複しているか確認
		_, err = client.Token.Query().
			Where(token.TokenEQ(generatedToken)).
			First(context.Background())

		//重複していないなら保存
		if err != nil {
			//保存
			//既にトークン発行済みのユーザーなら上書き
			existtokenlistinuser := CheckTokenlistinUser(client)

			if structs.ExistCheckfunc(user_id, existtokenlistinuser) {
				//存在するので上書き
				//ユーザーIDからTokenIDを取得する
				targetToken, err := structs.Client.Token.Query().
					Where(token.UserIDEQ(user_id)).
					First(context.Background())

				if err != nil {
					return "データベース更新に失敗しました", errors.New("データベース更新に失敗しました")
				}
				//上書き
				_, err = client.Token.
					UpdateOneID(targetToken.ID).
					SetToken(generatedToken).
					SetAccessDate(time.Now()).
					Save(context.Background())

				if err != nil {
					return "データベース更新に失敗しました", errors.New("データベース更新に失敗しました")
				}
				return generatedToken, nil
			}

			//存在しないので新規発行
			// トークン登録を行う
			_, err = client.Token.
				Create().
				SetUserID(user_id).
				SetToken(generatedToken).
				Save(context.Background())

			if err != nil {
				return "データベース登録に失敗しました", errors.New("データベース登録に失敗しました")
			}

			return generatedToken, nil
		}
		continueCounter += 1
	}
}

// サーバー内で呼び出すトークンチェック
// True=OK,Flase=不整合,存在しない
func CheckNameToken(p_Name, p_Token string) bool {

	//NameからユーザーIDを取得する
	submiteduser, err := structs.Client.User.Query().
		Where(user.NameEQ(p_Name)).
		First(context.Background())

	if err != nil {
		return false
	}

	// ユーザの検索、パスワードの照合を行う
	token_list, err := structs.Client.Token.Query().
		Where(token.UserIDEQ(submiteduser.ID), token.TokenEQ(p_Token)).
		First(context.Background())

	if err != nil {
		//トークン,IDが不一致or存在しない
		return false
	}
	today := time.Now()

	//Dateが今日のものか?
	return SameDate(token_list.AccessDate, today)
}

// Tiem型が同じ日付か確認関数
func SameDate(t1, t2 time.Time) bool {
	return t1.Year() == t2.Year() &&
		t1.Month() == t2.Month() &&
		t1.Day() == t2.Day()
}