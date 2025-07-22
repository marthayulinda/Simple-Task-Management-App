package main

import (
	"fmt"
	"log"
	"net/http"
	"simple-task-management-backend/config"

	"simple-task-management-backend/handlers"
)

func main() {
	config.InitDB()
	
	mux := http.NewServeMux()

	// Endpoints
	mux.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "PONG!")
	})

	mux.HandleFunc("/tasks", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "GET" {
			handlers.GetTasks(w, r)
		} else if r.Method == "POST" {
			handlers.CreateTask(w, r)
		} else {
			http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		}
	})

	mux.HandleFunc("/tasks/", func(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		handlers.GetTaskByID(w, r)
	case "PUT":
		handlers.UpdateTask(w, r)
	case "DELETE":
		handlers.DeleteTask(w, r)
	default:
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	}
})

	mux.HandleFunc("/users", handlers.GetUsers)

	// ✅ Wrap with CORS middleware
	fmt.Println("Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", enableCORS(mux)))
}

// ✅ Middleware CORS
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Izinkan semua origin, bisa kamu batasi jika perlu
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Untuk menangani preflight request
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}
