package models

import "gorm.io/gorm"

type Habit struct {
	gorm.Model
	Title       string `json:"title"`
	Description string `json:"description"`
	Frequency   string `json:"frequency"` // e.g., "daily", "weekly"
	Completed   bool   `json:"completed"` // Indicates if the habit is completed
}
