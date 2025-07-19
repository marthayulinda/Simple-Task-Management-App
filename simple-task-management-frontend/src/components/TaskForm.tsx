"use client";
import { useState, useEffect } from "react";
import { Task, User } from "@/types";
import axios from "@/services/api";
import { useRouter } from "next/navigation";

interface TaskFormProps {
  task?: Task;
}

export default function TaskForm({ task }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<Task["status"]>(task?.status || "Todo");
  const [deadline, setDeadline] = useState(task?.deadline || "");
  const [assigneeId, setAssigneeId] = useState(task?.assignee_id || "");
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/users").then((res) => setUsers(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const selectedAssignee = users.find((u) => u.id === assigneeId);
  const assigneeName = selectedAssignee ? selectedAssignee.name : "";

  const payload = {
    title,
    description,
    status,
    deadline,
    assignee: parseInt(assigneeId),  // untuk backend
    assignee_name: assigneeName,     // untuk frontend (jika backend simpan ini)
  };

  try {
    if (task) {
      await axios.put(`/tasks/${task.id}`, payload);
      alert("Task diperbarui");
    } else {
      await axios.post("/tasks", payload);
      alert("Task ditambahkan");
    }
    router.push("/tasks");
  } catch (err) {
    alert("Gagal menyimpan task");
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-blue-700 mb-1">
          Judul
        </label>
        <input
          className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Judul Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-blue-700 mb-1">
          Deskripsi
        </label>
        <textarea
          className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Deskripsi Task"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-blue-700 mb-1">
          Status
        </label>
        <select
          className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={status}
          onChange={(e) => setStatus(e.target.value as Task["status"])}
          required
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-blue-700 mb-1">
          Deadline
        </label>
        <input
          type="date"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-blue-700 mb-1">
          Assignee
        </label>
        <select
          className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={assigneeId}
          onChange={(e) => setAssigneeId(e.target.value)}
          required
        >
          <option value="">-- Pilih Assignee --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
      >
        {task ? "Update Task" : "Tambah Task"}
      </button>
    </form>
  );
}
