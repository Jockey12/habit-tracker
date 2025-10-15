package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jockey12/habit-tracker/database"
	"github.com/jockey12/habit-tracker/models"
)

// GetHabits retrieves all habits
func GetHabits(c *gin.Context) {
	var habits []models.Habit
	if err := database.DB.Find(&habits).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, habits)
}

// GetHabit retrieves a single habit by ID
func GetHabit(c *gin.Context) {
	id := c.Param("id")
	var habit models.Habit
	if err := database.DB.First(&habit, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Habit not found"})
		return
	}
	c.JSON(http.StatusOK, habit)
}

// CreateHabit creates a new habit
func CreateHabit(c *gin.Context) {
	var habit models.Habit
	if err := c.ShouldBindJSON(&habit); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Create(&habit).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, habit)
}

// UpdateHabit updates an existing habit
func UpdateHabit(c *gin.Context) {
	id := c.Param("id")
	var habit models.Habit

	if err := database.DB.First(&habit, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Habit not found"})
		return
	}

	var updates models.Habit
	if err := c.ShouldBindJSON(&updates); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update fields
	if updates.Title != "" {
		habit.Title = updates.Title
	}
	if updates.Description != "" {
		habit.Description = updates.Description
	}
	if updates.Frequency != "" {
		habit.Frequency = updates.Frequency
	}
	// Update completed status
	habit.Completed = updates.Completed

	if err := database.DB.Save(&habit).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, habit)
}

// DeleteHabit deletes a habit
func DeleteHabit(c *gin.Context) {
	id := c.Param("id")
	var habit models.Habit

	if err := database.DB.First(&habit, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Habit not found"})
		return
	}

	if err := database.DB.Delete(&habit).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Habit deleted successfully"})
}

// ToggleHabitCompletion toggles the completion status of a habit
func ToggleHabitCompletion(c *gin.Context) {
	id := c.Param("id")
	idInt, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var habit models.Habit
	if err := database.DB.First(&habit, idInt).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Habit not found"})
		return
	}

	// Toggle the completed status
	habit.Completed = !habit.Completed

	if err := database.DB.Save(&habit).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, habit)
}
