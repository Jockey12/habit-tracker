package main

import (
	"os"
	"strings"

	"github.com/jockey12/habit-tracker/database"
	"github.com/jockey12/habit-tracker/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize database
	database.InitDatabase()

	r := gin.Default()
	r.Use(gin.Logger())
	
	// CORS middleware for production deployment
	// Set ALLOWED_ORIGINS environment variable in production (comma-separated)
	allowedOrigins := []string{"*"}
	if origins := os.Getenv("ALLOWED_ORIGINS"); origins != "" {
		allowedOrigins = strings.Split(origins, ",")
	}
	
	r.Use(cors.New(cors.Config{
		AllowOrigins:     allowedOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false,
	}))
	
	routes.SetupRoutes(r)
	r.Run(":8080")
}
