package Lock_Methods

import (
	"Ebook/ent"
	"Ebook/ent/lock"
	"Ebook/Structs"
	"context"
	"errors"
	
)

// ロックテーブルを確認する関数を返す
func CheckLocklist(client *ent.Client) structs.ExitsChecktype {
	return func(user_id int) bool {
		// 新規発行か確認
		_, err := client.Lock.Query().
			Where(lock.UserIDEQ(user_id)).
			First(context.Background())
		return err == nil
	}

}

//ロックテーブルに追加する
func InsertLocklist(client *ent.Client, user_id int) (string, error) {

	_, err := client.Lock.
		Create().
		SetUserID(user_id).
		Save(context.Background())

	if err != nil {
		return "データベース登録に失敗しました", errors.New("データベース登録に失敗しました")
	}

	return "", nil
}