package structs

//本追加に送られてくるリクエスト型定義
type BookRegisterRequest struct{
	Title  string `json:"title" binding:"required"`
	Kind string `json:"kind" binding:"required"`
	Price int `json:"price" binding:"required"`
	Recom string `json:"recom" binding:"required"`
	Name  string `json:"name" binding:"required"`
	Token string `json:"token" binding:"required"`
}

// 本更新する際に送られてくるリクエストの型定義
type BookUpdateRequest struct {
	Pretitle string `json:"Pretitle" binding:"required"`
	Title  string `json:"title" binding:"required"`
	Kind string `json:"kind" binding:"required"`
	Price int `json:"price" binding:"required"`
	Recom string `json:"recom" binding:"required"`
	Name  string `json:"name" binding:"required"`
	Token string `json:"token" binding:"required"`
}