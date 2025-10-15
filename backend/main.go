package main

import (
	"github.com/jockey12/habit-tracker/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(gin.Logger())
	routes.SetupRoutes(r)
	r.Run(":8080")
}
