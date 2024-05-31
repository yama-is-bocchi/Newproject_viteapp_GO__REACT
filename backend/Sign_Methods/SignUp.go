package Sign_Methods

import (
	"Ebook/Structs"
	"Ebook/Util_Methods"
	"context"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

// サインアップのHTTPハンドラ関数
func SignUpHandler(c *gin.Context) {

	// 変数reqをSignRequestで定義
	var req structs.SignRequest

	//reqに取得したデータを格納、変換でエラーが起きた場合はエラーを返して終了
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "変換できません"})
		return
	}

	//エスケープ処理
	e_Name := Util_Methods.EscapeInput(req.Name)
	e_Password := Util_Methods.EscapeInput(req.Password)


	//reqのNameのユーザーがいるか確認
	_, err := Util_Methods.GetUserEnt(e_Name)
	if err == nil {
		//存在する
		c.JSON(403, gin.H{"error": "duplicate"})
		return
	}

	// ユーザ登録を行う
	newUser, err := structs.Client.User.
		Create().
		SetName(e_Name).
		SetPassword(e_Password).
		Save(context.Background())

	// エラーの場合はエラーを返して処理終了。
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error(), "messsage": "sign up missing"})
		return
	}
	// 保存したUserの情報をレスポンスとして返す。
	c.JSON(201, gin.H{"user": newUser})

}