package auth_service

import (
	core "auth-service/cmd/core"
	databases "auth-service/internal/connectors"
	models "auth-service/internal/models"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type AuthService struct {
	userDbConnection *databases.UserDB
	TokenHandler     *core.TokenHandler
}

func NewAuthService() (*AuthService, error) {
	userDBConnection := databases.GetInstance()
	tokenHandler, err := core.NewTokenHandler(os.Getenv("JWT_SECRET"))
	if err != nil {
		return nil, err
	}
	return &AuthService{
		userDbConnection: userDBConnection,
		TokenHandler:     tokenHandler,
	}, nil
}

func (s *AuthService) CreateUser(c *gin.Context) {
	var item models.User
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, models.Error{Code: http.StatusBadRequest, Message: err.Error()})
		return
	}
	id, err := s.userDbConnection.InsertUser(item)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.Error{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}
	c.JSON(http.StatusOK, id)
}

func (s *AuthService) DeleteUser(c *gin.Context) {
	id := c.Param("id")
	err := s.userDbConnection.DeleteUser(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.Error{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}
	c.JSON(http.StatusOK, "User deleted successfully!")
}

func (s *AuthService) CreateToken(c *gin.Context) {
	var item models.AuthRequest
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, models.Error{Code: http.StatusBadRequest, Message: err.Error()})
		return
	}
	token, err := s.TokenHandler.CreateToken(item.Username, item.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.Error{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	c.JSON(http.StatusOK, token)
}

func (s *AuthService) VerifyToken(c *gin.Context) {
	var token models.Token
	err := c.ShouldBindJSON(&token)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Error{Code: http.StatusBadRequest, Message: fmt.Sprintf("Failed to get token from request. %s", err.Error())})
		return
	}

	parsedToken, err := s.TokenHandler.VerifyToken(token.TokenStr)
	if err != nil {
		c.JSON(http.StatusUnauthorized, models.Error{Code: http.StatusBadRequest, Message: err.Error()})
		return
	}
	username, err := parsedToken.Claims.GetSubject()
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Error{Code: http.StatusBadRequest, Message: err.Error()})
		return
	}
	claims, err := parsedToken.Claims.GetAudience()
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Error{Code: http.StatusBadRequest, Message: err.Error()})
		return
	}
	c.JSON(http.StatusOK, models.Claims{Username: username, Claims: claims})
}
