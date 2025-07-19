package handlers

import (
	"encoding/json"
	"net/http"
	"simple-task-management-backend/models"
)

func GetUsers(w http.ResponseWriter, r *http.Request) {
	users := []models.User{
		{ID: 1, Name: "Martha Tobing"},
		{ID: 2, Name: "Alex Pratama"},
		{ID: 3, Name: "Dina Silalahi"},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}
