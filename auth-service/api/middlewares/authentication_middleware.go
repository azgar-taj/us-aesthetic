package middlewares

import (
	core "auth-service/cmd/core"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthenticationPlugin(tokenHandler *core.TokenHandler) gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenStr := c.GetHeader("token")
		token, err := tokenHandler.VerifyToken(tokenStr)
		if err != nil {
			c.JSON(http.StatusUnauthorized, "Token is invalid")
			c.Abort()
			return
		}
		username, err := token.Claims.GetSubject()
		if err != nil {
			c.JSON(http.StatusUnauthorized, "Failed to get subject name from token")
			c.Abort()
			return
		}
		c.Request.Header.Add("username", username)
		c.Next()
	}
}
