package auth_service

import (
	databases "auth-service/internal/connectors"
	"fmt"
	"log"
)

type UserValidator struct {
	userDbConnector *databases.UserDB
}

func (uv *UserValidator) validateUser(username string, password string) (string, error) {
	if username == "" || password == "" {
		return "", fmt.Errorf("no username/password")
	}
	userData, err := uv.userDbConnector.GetUserByUsername(username)
	if err != nil {
		log.Fatalf("failed to get user information. Error: %s", err.Error())
		return "", err
	}
	if userData.Password != password {
		failure := "incorrect username or password"
		log.Fatal(failure)
		return "", fmt.Errorf(failure)
	}
	return userData.Role, nil
}
