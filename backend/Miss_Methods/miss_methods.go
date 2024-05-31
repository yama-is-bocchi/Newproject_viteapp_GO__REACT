package Miss_Methods

import (
	"Ebook/ent"
	"Ebook/ent/miss"
	"Ebook/Lock_Methods"
	"Ebook/Structs"
	"context"
	"errors"
	"strconv"
)

// Missテーブルを確認する関数を返す
func CheckMisslist(client *ent.Client) structs.ExitsChecktype {
	return func(user_id int) bool {
		// 新規発行か確認
		_, err := client.Miss.Query().
			Where(miss.UserIDEQ(user_id)).
			First(context.Background())
		return err == nil
	}
}

// Missテーブルに新規追加する
func InsertMissList(client *ent.Client, user_id int) (string, error) {

	_, err := client.Miss.
		Create().
		SetUserID(user_id).
		SetCount(0).
		Save(context.Background())

	if err != nil {
		return "データベース登録に失敗しました", errors.New("データベース登録に失敗しました")
	}

	return "", nil
}

// MissテーブルのCount列をインクリメントする,5回を超えていたらロックする(ロックテーブルに追加する)
func IncrementCountatMissList(client *ent.Client, miss_tbl_id int,user_id int, user_count int) (string, error) {

	//5回を超える
	if user_count+1 > 5 {
		//ロックテーブルに追加
		_, err := Lock_Methods.InsertLocklist(client, user_id)

		if err != nil {
			return "データベース登録に失敗しました"+strconv.Itoa(user_id), errors.New("データベース登録に失敗しました")
		}

		return "アカウントをロックしました", errors.New("アカウントをロックしました")
	}
	newCount := user_count + 1
	//存在するので上書き
	_, err := client.Miss.
		UpdateOneID(miss_tbl_id).
		SetCount(newCount).
		Save(context.Background())

	if err != nil {
		return "データベース更新に失敗しました"+strconv.Itoa(user_id), errors.New("データベース更新に失敗しました")
	}

	return "", nil
}

// Missテーブルのカウントを0に戻す
func ReverseZeroMissCount(client *ent.Client, user_id int) (string, error) {
	//ミスIDを取得しないといけない
	missUser,err:=client.Miss.Query().
	Where(miss.UserIDEQ(user_id)).
	First(context.Background())

	if err != nil {
		return "データベース参照に失敗しました", errors.New("データベース更新に失敗しました")
	}
	//存在するので上書き
	_, err = client.Miss.
		UpdateOneID(missUser.ID).
		SetCount(1).
		Save(context.Background())

	if err != nil {
		return "データベース更新に失敗しました", errors.New("データベース更新に失敗しました")
	}

	return "", nil

}