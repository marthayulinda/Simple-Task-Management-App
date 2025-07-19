"use client";
import { useEffect, useState } from "react";
import { Task, User } from "@/types"; // pastikan import User juga
import axios from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]); // simpan daftar user
  const router = useRouter();

  // Ambil tasks dari API
  const fetchTasks = async () => {
    try {
      const res = await axios.get<Task[]>("/tasks");
      console.log("Tasks fetched:", res.data); // 👈 Tambahkan ini untuk debug
      setTasks(res.data ?? []); // 👈 Tambahkan fallback jika data null
    } catch (err) {
      alert("Gagal ambil task");
    }
  };

  // Ambil users dari API
  const fetchUsers = async () => {
    try {
      const res = await axios.get<User[]>("/users");
      setUsers(res.data);
    } catch (err) {
      alert("Gagal ambil users");
    }
  };

  // Cari nama assignee dari id
  const getAssigneeName = (id: string) => {
    const user = users.find((u) => u.id === id);
    return user ? user.name : "-";
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus task ini?")) {
      try {
        await axios.delete(`/tasks/${id}`);
        fetchTasks();
      } catch (err) {
        alert("Gagal menghapus task");
      }
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  return (
    <div className="bg-blue-50 px-6 py-10 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center w-full px-2 sm:px-4 mb-8">
          <h1 className="text-3xl font-bold text-blue-700">📝 Daftar Task</h1>
          <Link
            href="/add-task"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition"
          >
            + Tambah Task
          </Link>
        </div>

        {/* Task cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {Array.isArray(tasks) &&
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-lg shadow-md p-6 border border-blue-100 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-blue-800 mb-2">
                  {task.title}
                </h2>
                <p className="text-gray-700 mb-2">{task.description}</p>
                <p className="text-sm text-gray-500">
                  Status: <strong>{task.status}</strong>
                </p>
                <p className="text-sm text-gray-500">
                  Assignee: <strong>{task.assignee_name || "-"}</strong>
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Deadline: {new Date(task.deadline).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/tasks/${task.id}`)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
        </div>

        {tasks.length === 0 && (
          <p className="text-center text-gray-500 mt-12">
            Belum ada task tersedia.
          </p>
        )}
      </div>
    </div>
  );
}
