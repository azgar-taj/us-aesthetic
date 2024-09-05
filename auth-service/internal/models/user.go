package auth_service

import (
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/golang-jwt/jwt/v5"
)

const (
	ADMIN = "admin"
	USER  = "user"
)

type User struct {
	Id       primitive.ObjectID `json:"id" bson:"_id"`
	Username string             `json:"username"`
	Password string             `json:"password"`
	Email    string             `json:"email"`
	Role     string             `json:"role"`
}

type AuthRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type Token struct {
	TokenStr string `json:"token"`
}

type Claims struct {
	Username string           `json:"username"`
	Claims   jwt.ClaimStrings `json:"claims"`
}
