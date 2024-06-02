package main

import (
	"Ebook/ent"
	"Ebook/Sign_Methods"
	"Ebook/Book_Methods"
	"Ebook/WantList_Methods"
	"Ebook/Structs"
	"Ebook/Token_Methods"
	"context"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"log"
)

func main() {
	//Ginフレームワークのデフォルトの設定を使用してルータを作成
	router := gin.Default()

	//PostgreSQLに接続
	client, err := ent.Open("postgres", "host=db port=5432 user=postgres dbname=vite_db password=password sslmode=disable")

	if err != nil {
		log.Fatalf("failed opening connection to postgres: %v", err)
	}
	// Run the auto migration tool.
	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}


	// ルートハンドラの定義
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello, World!",
		})
	})

	//グローバル変数に代入
	structs.Client=client

	// CORS設定
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
			return
		}
		c.Next()
	})

	//ルーター
	router.POST("users/sign_up", Sign_Methods.SignUpHandler)//サインアップ
	router.POST("users/sign_in", Sign_Methods.SignInHandler)//サインイン
	router.POST("users/Tokencheck", Token_Methods.TokenCheckHandler)//トークンチェック
	router.POST("books/RegisterBook", Book_Methods.BookRegisterHandler)//本登録
	router.POST("books/ViewBook", Book_Methods.BookViewHandler)//本参照
	router.POST("books/UpdateBook", Book_Methods.BookUpdateHandler)//本更新
	router.POST("books/DeleteBook", Book_Methods.BookDeleteHandler)//本削除
	router.POST("wants/AddList", WantList_Methods.WantListRegisterHandler)//欲しいものリスト追加
	router.POST("wants/ViewMylist", WantList_Methods.WantMyListViewHandler)//自分の欲しいものリスト参照
	router.POST("wants/Viewlist", WantList_Methods.WantListViewHandler)//全体の欲しいものリスト参照
	router.POST("wants/DeleteList", WantList_Methods.WantListDeleteHandler)//欲しいものリスト削除

	// サーバー起動
	router.Run(":8080")
}
