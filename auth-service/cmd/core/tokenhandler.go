package auth_service

import (
	"fmt"
	"time"

	databases "auth-service/internal/connectors"

	"github.com/golang-jwt/jwt/v5"
)

type TokenHandler struct {
	userValidator *UserValidator
	secretKey     []byte
}

func NewTokenHandler(secretKey string) (*TokenHandler, error) {
	userDbConnection := databases.GetInstance()
	return &TokenHandler{
		userValidator: &UserValidator{userDbConnection}, secretKey: []byte(secretKey)}, nil
}

func (th *TokenHandler) CreateToken(username string, password string) (string, error) {
	validationResult, err := th.userValidator.validateUser(username, password)
	if err != nil {
		return "", err
	}
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": username,                         // Subject (user identifier)
		"iss": "us-aesthetic",                   // Issuer
		"aud": validationResult,                 // Audience (user role)
		"exp": time.Now().Add(time.Hour).Unix(), // Expiration time
		"iat": time.Now().Unix(),                // Issued at
	})

	fmt.Printf("Token claims added: %+v\n", claims)
	tokenString, err := claims.SignedString(th.secretKey)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func (th *TokenHandler) VerifyToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return th.secretKey, nil
	})
	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return token, nil
}
