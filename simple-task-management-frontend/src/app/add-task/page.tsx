'use client'
import TaskForm from '@/components/TaskForm'

export default function AddTaskPage() {
  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
          Tambah Task Baru
        </h1>
        <TaskForm />
      </div>
    </div>
  )
}
