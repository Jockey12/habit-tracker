package routes

import (
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	// API routes group
	api := r.Group("/api")
	{
		// Health check endpoint
		api.GET("/health", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"status": "ok",
				"message": "Habit Tracker API is running",
			})
		})

		// Habits endpoints placeholder
		habits := api.Group("/habits")
		{
			habits.GET("", func(c *gin.Context) {
				c.JSON(200, gin.H{
					"habits": []string{},
				})
			})
		}
	}
}
