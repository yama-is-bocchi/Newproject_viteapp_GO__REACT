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

// 本更新アップデートハンドラ関数
func BookUpdateHandler(c *gin.Context) {
	//ユーザーIDとタイトルが一致するBookテーブルのデータを取得してReqの内容に更新して返す
	// 変数reqをBookUpdateRequestで定義
	var req structs.BookUpdateRequest

	//reqに取得したデータを格納、変換でエラーが起きた場合はエラーを返して終了
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "変換できません"})
		return
	}

	//エスケープ処理
	e_Pretitle := Util_Methods.EscapeInput(req.Pretitle)
	e_Name := Util_Methods.EscapeInput(req.Name)
	e_Title := Util_Methods.EscapeInput(req.Title)
	e_Kind := Util_Methods.EscapeInput(req.Kind)
	e_Price := req.Price
	e_Recom := Util_Methods.EscapeInput(req.Recom)
	e_Token := Util_Methods.EscapeInput(req.Token)
	//ユーザーNameからIDを求める
	subimiteduser, err := Util_Methods.GetUserEnt(e_Name)

	//ユーザー名が存在しない
	if err != nil {
		c.JSON(400, gin.H{"error": "invalid credentials"})
		return
	}

	//アカウントがロックされているか確認
	//あればこの場でreturnする
	existlocklist := Lock_Methods.CheckLocklist(structs.Client)

	if structs.ExistCheckfunc(subimiteduser.ID, existlocklist) {
		c.JSON(400, gin.H{"error": "invalid credentials"})
		return
	}

	//トークンを確認する
	if !Token_Methods.CheckNameToken(e_Name, e_Token) {
		c.JSON(401, gin.H{"error": "token"})
		return
	}

	//reqのpretitleとuserIDのデータが存在するか確認
	target_book, err := structs.Client.Book.Query().
		Where(book.UserIDEQ(subimiteduser.ID), book.TitleEQ(e_Pretitle)).
		First(context.Background())

	if err != nil {
		//存在しない
		c.JSON(400, gin.H{"error": "invalid credentials"})
		return
	}

	//更新後のデータが既に登録されているデータに重複しないか確認
	if e_Pretitle != e_Title {
		duplicatedBook, err := structs.Client.Book.Query().
			Where(book.UserIDEQ(subimiteduser.ID), book.TitleEQ(e_Title)).
			First(context.Background())

		if err == nil {
			//重複している
			c.JSON(403, gin.H{"duplicated": duplicatedBook})
			return
		}
	}
	//アップデートする
	updatedBook, err := structs.Client.Book.
		UpdateOneID(target_book.ID).
		SetKind(e_Kind).
		SetUserID(subimiteduser.ID).
		SetTitle(e_Title).
		SetRecom(e_Recom).
		SetPrice(e_Price).
		Save(context.Background())

	if err != nil {
		c.JSON(400, gin.H{"error": "invalid credentials"})
		return
	}

	c.JSON(200, gin.H{"book": updatedBook})
}
