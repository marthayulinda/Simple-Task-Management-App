export interface User {
  id: string
  name: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: 'Todo' | 'In Progress' | 'Done'
  deadline: string
  assignee: string
  assignee_name: string
}
