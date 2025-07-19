"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const dummyUser = {
    email: "admin@example.com",
    password: "123456",
    token: "dummytoken1234567890",
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === dummyUser.email && password === dummyUser.password) {
      localStorage.setItem("token", dummyUser.token);
      router.push("/tasks");
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-blue-200 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-blue-200">
        {/* Optional Logo */}
        <div className="flex justify-center mb-6">
          <Image src="/moonlay.png" alt="Moonlay" width={160} height={40} />
        </div>

        <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">
          Selamat Datang 👋
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Masuk ke akun Task Management App kamu
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-blue-600 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-blue-600 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-lg"
          >
            Masuk
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-500">
          Login akun dummy: <br />
          <span className="font-medium">admin@example.com / 123456</span>
        </div>
      </div>
    </div>
  );
}
