package Book_Methods

import (
	"Ebook/ent/book"
	"Ebook/Lock_Methods"
	"Ebook/Structs"
	"Ebook/Token_Methods"
	"Ebook/Util_Methods"
	"context"
	"github.com/gin-gonic/gin"
)


// 本参照ハンドラ関数
func BookViewHandler(c *gin.Context) {

	// 変数reqをTokenCheckRequestで定義
	var req structs.TokenCheckRequest

	//reqに取得したデータを格納、変換でエラーが起きた場合はエラーを返して終了
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "変換できません"})
		return
	}
	//エスケープ処理
	e_Name := Util_Methods.EscapeInput(req.Name)
	e_Token := Util_Methods.EscapeInput(req.Token)

	//ユーザーNameからIDを求める
	subimiteduser, err := Util_Methods.GetUserEnt(e_Name)

	//ユーザー名が存在しない
	if err != nil {
		c.JSON(403, gin.H{"error": "invalid credentials"})
		return
	}

	//アカウントがロックされているか確認
	//あればこの場でreturnする
	existlocklist := Lock_Methods.CheckLocklist(structs.Client)

	if structs.ExistCheckfunc(subimiteduser.ID, existlocklist) {
		c.JSON(403, gin.H{"error": "invalid credentials"})
		return
	}

	//トークンを確認
	if !Token_Methods.CheckNameToken(e_Name, e_Token) {
		c.JSON(403, gin.H{"error": "invalid credentials"})
		return
	}

	//対象のユーザーIDのBookテーブルのデータを全て送信
	Datas, err := structs.Client.Book.Query().
		Where(book.UserIDEQ(subimiteduser.ID)).
		All(context.Background())

	//存在しないまたはエラー
	if err != nil {
		c.JSON(403, gin.H{"error": "not exist"})
		return
	}

	//正常終了
	c.JSON(200, Datas)
}