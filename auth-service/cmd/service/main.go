package main

import (
	api "auth-service/api/controllers"
	"auth-service/api/middlewares"
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	log.Println("Creating a server...")
	log.Printf("Attempting to connect to %s, %s, %s", os.Getenv("MONGO_CLUSTER"), os.Getenv("MONGO_USERNAME"), os.Getenv("MONGO_PASSWORD"))
	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	userAuthService, err := api.NewAuthService()
	if err != nil {
		log.Println(err)
		return
	}
	router.Use(middlewares.CORSMiddleware())
	router.POST("/auth/CreateUser", userAuthService.CreateUser)
	router.DELETE("/auth/DeleteUser/:id", middlewares.AuthenticationPlugin(userAuthService.TokenHandler), userAuthService.DeleteUser)
	router.POST("/token/get", userAuthService.CreateToken)
	router.POST("/token/verify", userAuthService.VerifyToken)
	port := os.Getenv("PORT")
	log.Printf("Server is running")
	router.Run(fmt.Sprintf(":%s", port))
}
