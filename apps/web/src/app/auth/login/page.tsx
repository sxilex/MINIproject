"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/user-context";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const { setRefreshUser } = useContext(UserContext);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:2012/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to login");
      }
      alert("login success");

      setLoginData({ username: "", password: "" });
      setRefreshUser((prev: number) => {
        return prev + 1;
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="bg-black border-2 border-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-white mb-6">
          Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm text-white mb-1">
              Username
            </label>
            <input
              type="text"
              required
              id="name"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={loginData.username}
              onChange={(e) =>
                setLoginData((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-white mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-white focus:ring-red-500"
              value={loginData.password}
              onChange={(e) =>
                setLoginData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-600 hover:bg-red-700 text-white rounded-md transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
