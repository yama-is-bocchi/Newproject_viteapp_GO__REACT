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

//本登録ハンドラ関数
func BookRegisterHandler(c *gin.Context) {

	// 変数reqをBookRegisterRequestで定義
	var req structs.BookRegisterRequest
	//reqに取得したデータを格納、変換でエラーが起きた場合はエラーを返して終了
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "変換できません"})
		return
	}

	//エスケープ処理
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
		c.JSON(401, gin.H{"error": "invalid credentials"})
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
		c.JSON(400, gin.H{"error": "token"})
		return
	}

	//e_titleが一致するデータが登録されていたらエラー
	_, err = structs.Client.Book.Query().
		Where(book.TitleEQ(e_Title)).
		First(context.Background())

	if err == nil {
		//存在する
		c.JSON(403, gin.H{"error": "invalid credentials"})
		return

	}
	//DBに登録する
	newBook, err := structs.Client.Book.Create().
		SetTitle(e_Title).
		SetKind(e_Kind).
		SetPrice(e_Price).
		SetRecom(e_Recom).
		SetUserID(subimiteduser.ID).
		Save(context.Background())

	//データベース登録失敗
	if err != nil {
		c.JSON(400, gin.H{"error": "データベース登録処理", "book": newBook})
		return
	}

	//正常終了
	c.JSON(200, gin.H{"book": newBook})
}