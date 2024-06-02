package WantList_Methods

import (
	"Ebook/Lock_Methods"
	"Ebook/Structs"
	"Ebook/Token_Methods"
	"Ebook/Util_Methods"
	"Ebook/ent/book"
	"Ebook/ent/wantlist"
	"context"
	"github.com/gin-gonic/gin"
)

// おすすめ本登録ハンドラ関数
func WantListRegisterHandler(c *gin.Context) {

	// 変数reqをWantListRegisterRequestで定義
	var req structs.WantListRegisterRequest
	//reqに取得したデータを格納、変換でエラーが起きた場合はエラーを返して終了
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(300, gin.H{"error": "変換できません"})
		return
	}

	//エスケープ処理
	e_Name := Util_Methods.EscapeInput(req.Name)
	e_Title := Util_Methods.EscapeInput(req.Title)
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
		c.JSON(402, gin.H{"error": "invalid credentials"})
		return
	}

	//トークンを確認する
	if !Token_Methods.CheckNameToken(e_Name, e_Token) {
		c.JSON(404, gin.H{"error": "token"})
		return
	}

	//e_titleが一致する本データが登録されているか
	_, err = structs.Client.Book.Query().
		Where(book.TitleEQ(e_Title)).
		First(context.Background())

	if err != nil {
		//存在しない
		c.JSON(405, gin.H{"error": "invalid credentials"})
		return
	}

	//WantList内で重複しないか
	_, err = structs.Client.Wantlist.Query().
		Where(wantlist.TitleEQ(e_Title),wantlist.UserIDEQ(subimiteduser.ID)).
		First(context.Background())

	if err == nil {
		//存在する
		c.JSON(405, gin.H{"error": "invalid credentials"})
		return
	}

	//DBに登録する
	newList, err := structs.Client.Wantlist.Create().
		SetTitle(e_Title).
		SetUserID(subimiteduser.ID).
		Save(context.Background())

	//データベース登録失敗
	if err != nil {
		c.JSON(406, gin.H{"error": "データベース登録処理", "book": newList})
		return
	}

	//正常終了
	c.JSON(200, gin.H{"book": newList})
}
