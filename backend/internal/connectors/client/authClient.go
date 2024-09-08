package backend

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	models "us-aesthetic-backend-go/internal/model"
)

type AuthClient struct {
	endpoint string
}

func NewAuthClient(endpoint string) *AuthClient {
	return &AuthClient{endpoint: endpoint}
}

func (ac *AuthClient) VerifyToken(tokenStr string) (*models.Token, error) {
	log.Printf("Verifying token: %s", tokenStr)
	formattedBody := fmt.Sprintf(`{ "token": "%s" }`, tokenStr)
	log.Println(formattedBody)
	body := []byte(formattedBody)
	bodyReader := bytes.NewReader(body)
	resp, err := http.Post(fmt.Sprintf("https://%s/token/verify", ac.endpoint), "application/json", bodyReader)
	if err != nil {
		log.Printf("Error while verifying token: %v", err)
		return nil, err
	}

	var j models.Token
	_ = json.NewDecoder(resp.Body).Decode(&j)

	log.Printf("Token verification successful")
	return &j, nil
}
