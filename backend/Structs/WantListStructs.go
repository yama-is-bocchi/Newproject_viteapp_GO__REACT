package structs

//おすすめ追加に送られてくるリクエスト型定義
type WantListRegisterRequest struct{
	Title  string `json:"title" binding:"required"`
	Name  string `json:"name" binding:"required"`
	Token string `json:"token" binding:"required"`
}

//おすすめ参照に送られてくるリクエスト型定義
type WantListViewRequest struct{
	Kind string `json:"kind" binding:"required"`
	Name  string `json:"name" binding:"required"`
	Token string `json:"token" binding:"required"`
}
