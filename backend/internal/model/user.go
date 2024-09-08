package model

type Token struct {
	Username string   `json:"username"`
	Claims   []string `json:"claims"`
}
