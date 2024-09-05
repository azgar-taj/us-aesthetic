package main

import (
	"fmt"
	"os"
	api "us-aesthetic-backend-go/api/controllers"
	middlewares "us-aesthetic-backend-go/api/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("Creating a server...")
	fmt.Printf("Attempting to connect to %s, %s, %s", os.Getenv("MONGO_CLUSTER"), os.Getenv("MONGO_USERNAME"), os.Getenv("MONGO_PASSWORD"))
	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	router.Use(middlewares.CORSMiddleware())
	storyItemController, err := api.NewStoryItemController(
		os.Getenv("MONGO_CLUSTER"),
		os.Getenv("MONGO_USERNAME"),
		os.Getenv("MONGO_PASSWORD"),
	)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer storyItemController.Close()
	router.GET("/storyservice/story_items", storyItemController.GetAllStoryItems)
	router.GET("/storyservice/story_items/:id", storyItemController.GetStoryItem)
	router.POST("/storyservice/story_items", storyItemController.CreateStoryItem)
	router.PUT("/storyservice/story_items/:id", storyItemController.UpdateStoryItem)
	router.PATCH("/storyservice/story_items/:id", storyItemController.PatchStoryItem)
	router.DELETE("/storyservice/story_items/:id", storyItemController.DeleteStoryItem)
	port := os.Getenv("PORT")
	fmt.Printf("Server is running on localhost:%s", port)
	router.Run(fmt.Sprintf(":%s", port))
}
