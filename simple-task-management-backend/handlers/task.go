package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/google/uuid"

	"simple-task-management-backend/config"
	"simple-task-management-backend/models"
)

// ✅ Ambil semua task
func GetTasks(w http.ResponseWriter, r *http.Request) {
	rows, err := config.DB.Query(`
		SELECT id, title, description, status, deadline, assignee, assignee_name
		FROM tasks
	`)
	if err != nil {
		http.Error(w, "Gagal ambil data: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var tasks []models.Task
	for rows.Next() {
		var task models.Task
		err := rows.Scan(&task.ID, &task.Title, &task.Description, &task.Status, &task.Deadline, &task.Assignee, &task.AssigneeName)
		if err != nil {
			http.Error(w, "Gagal baca baris: "+err.Error(), http.StatusInternalServerError)
			return
		}
		tasks = append(tasks, task)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}

// ✅ Buat task baru
func CreateTask(w http.ResponseWriter, r *http.Request) {
	var task models.Task
	err := json.NewDecoder(r.Body).Decode(&task)
	if err != nil {
		http.Error(w, "Invalid body", http.StatusBadRequest)
		return
	}

	task.ID = uuid.New().String()

	_, err = config.DB.Exec(`
		INSERT INTO tasks (id, title, description, status, deadline, assignee, assignee_name)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
	`, task.ID, task.Title, task.Description, task.Status, task.Deadline, task.Assignee, task.AssigneeName)

	if err != nil {
		http.Error(w, "Gagal simpan task: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(task)
}

// ✅ Ambil task berdasarkan ID
func GetTaskByID(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/tasks/")

	var task models.Task
	err := config.DB.QueryRow(`
		SELECT id, title, description, status, deadline, assignee, assignee_name
		FROM tasks
		WHERE id = $1
	`, id).Scan(&task.ID, &task.Title, &task.Description, &task.Status, &task.Deadline, &task.Assignee, &task.AssigneeName)

	if err != nil {
		http.Error(w, "Task tidak ditemukan: "+err.Error(), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(task)
}

// ✅ Update task berdasarkan ID
func UpdateTask(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/tasks/")

	var updatedTask models.Task
	err := json.NewDecoder(r.Body).Decode(&updatedTask)
	if err != nil {
		http.Error(w, "Gagal parse body", http.StatusBadRequest)
		return
	}

	_, err = config.DB.Exec(`
		UPDATE tasks
		SET title = $1,
			description = $2,
			status = $3,
			deadline = $4,
			assignee = $5,
			assignee_name = $6
		WHERE id = $7
	`, updatedTask.Title, updatedTask.Description, updatedTask.Status, updatedTask.Deadline, updatedTask.Assignee, updatedTask.AssigneeName, id)

	if err != nil {
		http.Error(w, "Gagal update task: "+err.Error(), http.StatusInternalServerError)
		return
	}

	updatedTask.ID = id
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updatedTask)
}

// ✅ Hapus task berdasarkan ID
func DeleteTask(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/tasks/")

	_, err := config.DB.Exec(`DELETE FROM tasks WHERE id = $1`, id)
	if err != nil {
		http.Error(w, "Gagal hapus task: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
