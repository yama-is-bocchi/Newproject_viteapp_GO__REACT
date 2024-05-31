package Util_Methods

import (
	"Ebook/ent"
	"Ebook/ent/user"
	"Ebook/Structs"
	"context"
	"strings"
)

// 名前からユーザーの情報を取得
func GetUserEnt(Name string) (*ent.User, error) {
	user, err := structs.Client.User.Query().
		Where(user.NameEQ(Name)).
		First(context.Background())
	return user, err
}

// エスケープ処理関数
func EscapeInput(input string) string {
	// 置き換える特殊文字のリストを定義
	specialChars := []string{
		"&", "<", ">", "\"", "'", "/", "\\", "`", "=", "$", ";", ":",
		"(", ")", "{", "}", "[", "]", "|", "^", "%", "~", "#", "!",
		"@", "*", "?", "+",
	}

	// 特殊文字を空文字列に置き換える
	for _, char := range specialChars {
		input = strings.ReplaceAll(input, char, "")
	}

	// 文字列の長さが100文字以上の場合に、100文字目で切り取る
	if len(input) >= 200 {
		input = input[:200]
	}

	return input
}