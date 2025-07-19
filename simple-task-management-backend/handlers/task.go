package handlers

import (
	"encoding/json"
	"net/http"
	"simple-task-management-backend/models"
	"strings"

	"github.com/google/uuid"
)

var tasks []models.Task // simpan sementara di memori

func GetTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}

func CreateTask(w http.ResponseWriter, r *http.Request) {
	var task models.Task
	err := json.NewDecoder(r.Body).Decode(&task)
	if err != nil {
		http.Error(w, "Invalid body", http.StatusBadRequest)
		return
	}

	// Generate ID unik untuk task baru
	task.ID = uuid.New().String()

	tasks = append(tasks, task)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(task)
}

func GetTaskByID(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/tasks/")

	for _, task := range tasks {
		if task.ID == id {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(task)
			return
		}
	}

	http.Error(w, "Task tidak ditemukan", http.StatusNotFound)
}

// ✏️ Update Task berdasarkan ID
func UpdateTask(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/tasks/")

	var updatedTask models.Task
	err := json.NewDecoder(r.Body).Decode(&updatedTask)
	if err != nil {
		http.Error(w, "Gagal parse body", http.StatusBadRequest)
		return
	}

	for i, task := range tasks {
		if task.ID == id {
			updatedTask.ID = id // pastikan ID tetap
			tasks[i] = updatedTask

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(updatedTask)
			return
		}
	}

	http.Error(w, "Task tidak ditemukan", http.StatusNotFound)
}

// ❌ Hapus Task berdasarkan ID
func DeleteTask(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/tasks/")

	for i, task := range tasks {
		if task.ID == id {
			tasks = append(tasks[:i], tasks[i+1:]...)
			w.WriteHeader(http.StatusNoContent)
			return
		}
	}

	http.Error(w, "Task tidak ditemukan", http.StatusNotFound)
}