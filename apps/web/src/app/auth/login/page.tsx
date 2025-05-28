"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:2012/api/v1/authentication/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to login");
      }
      alert("login success");

      setLoginData({ username: "", password: "" });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center bg-blue-300 text-black">
      <div>
        <h1 className="text-2xl font-bold text-center mb-5"></h1>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid">
            {" "}
            <label htmlFor="name" className="text-center">
              username
            </label>
            <input
              placeholder="type your username here.."
              type="text"
              id="name"
              className=" border-2 "
              value={loginData.username}
              onChange={(e) =>
                setLoginData((prev) => {
                  return { ...prev, username: e.target.value };
                })
              }
            />
          </div>

          <div className="grid">
            <label htmlFor="password" className="text-center">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border-2"
              placeholder="type your password.."
              value={loginData.password}
              onChange={(e) =>
                setLoginData((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
            />
          </div>

          <button
            className="rounded-2xl underline bg-black hover:bg-gray-800 text-white"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
