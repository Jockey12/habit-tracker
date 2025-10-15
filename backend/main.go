package main

import (
	"github.com/jockey12/habit-tracker/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(gin.Logger())
	
	// CORS middleware for production deployment
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // Configure this for production
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))
	
	routes.SetupRoutes(r)
	r.Run(":8080")
}
