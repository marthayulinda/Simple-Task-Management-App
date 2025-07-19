'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // mencegah mismatch dark mode

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 via-white to-gray-200 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 px-6">
      <div className="text-center space-y-6 animate-fade-up max-w-xl w-full">
        <Image
          src="/moonlay.png"
          alt="Moonlay Logo"
          width={180}
          height={38}
          className="mx-auto dark:invert"
        />

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          Selamat Datang di <br /> <span className="text-blue-600 dark:text-blue-400">Task Management App</span>
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          Aplikasi sederhana untuk mencatat, memantau, dan mengelola task dengan status, deadline, dan assignee.
        </p>

        <button
          onClick={() => router.push('/login')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
        >
          🚀 Mulai Gunakan
        </button>

        <footer className="text-sm text-gray-500 dark:text-gray-400 pt-8">
          Dibuat untuk <span className="font-medium">Technical Test Internship 2025</span>
        </footer>
      </div>
    </div>
  )
}
