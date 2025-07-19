// app/tasks/[id]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Task } from '@/types'
import axios from '@/services/api'
import TaskForm from '@/components/TaskForm'

export default function EditTaskPage() {
  const [task, setTask] = useState<Task | null>(null)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/tasks/${params.id}`)
        setTask(res.data)
      } catch (err) {
        alert('Gagal mengambil task')
        router.push('/tasks')
      }
    }

    fetchTask()
  }, [params.id, router])

  if (!task) return <p className="p-6">Loading...</p>

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-blue-700 mb-6 text-center">Edit Task</h1>
        <TaskForm task={task} />
      </div>
    </div>
  )
}
