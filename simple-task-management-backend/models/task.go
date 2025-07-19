package models

type Task struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      string `json:"status"`
	Deadline    string `json:"deadline"`
	Assignee    string `json:"assignee"`
	AssigneeName  string `json:"assignee_name"`
}
