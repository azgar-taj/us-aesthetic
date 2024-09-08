package backend

import (
	"net/http"
	"sync"
	client "us-aesthetic-backend-go/internal/connectors/client"

	"github.com/gin-gonic/gin"
)

var authclient *client.AuthClient

var clientLock sync.Mutex

func getClientInstance() *client.AuthClient {
	clientLock.Lock()
	if authclient == nil {
		authclient = client.NewAuthClient("auth.smruthitaj.life")
	}
	clientLock.Unlock()
	return authclient
}

func AuthenticationPlugin(requiredRole string) gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenStr := c.GetHeader("token")
		token, err := getClientInstance().VerifyToken(tokenStr)
		if err != nil {
			c.JSON(http.StatusUnauthorized, "token is invalid")
			c.Abort()
			return
		}
		if token.Claims[0] != requiredRole {
			c.JSON(http.StatusUnauthorized, "user does not have admin rights")
			c.Abort()
			return
		}
		c.Request.Header.Add("username", token.Username)
		c.Request.Header.Add("role", token.Claims[0])
		c.Next()
	}
}
