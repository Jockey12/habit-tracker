package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jockey12/habit-tracker/handlers"
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

		// Habits endpoints
		habits := api.Group("/habits")
		{
			habits.GET("", handlers.GetHabits)
			habits.GET("/:id", handlers.GetHabit)
			habits.POST("", handlers.CreateHabit)
			habits.PUT("/:id", handlers.UpdateHabit)
			habits.DELETE("/:id", handlers.DeleteHabit)
			habits.PATCH("/:id/toggle", handlers.ToggleHabitCompletion)
		}
	}
}
