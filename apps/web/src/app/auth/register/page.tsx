"use client";

import React, { useState } from "react";

export default function RegisterPage() {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:3012/api/v1/authentication/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerData),
        }
      );
      if (!res.ok) {
        throw new Error("failed to fetch data");
      }

      setRegisterData({ email: "", username: "", password: "", role: "" });

      alert("New User Created! Welcome");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center bg-stone-600 text-white">
      <div>
        <h1 className="place-items-center grid">REGISTER</h1>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid">
            <label htmlFor="userame">Username</label>
            <input
              className="bg-slate-500 text-white border border-black"
              type="text"
              id="userame"
              value={registerData.username}
              onChange={(e) =>
                setRegisterData((prev) => {
                  return { ...prev, username: e.target.value };
                })
              }
            />
          </div>
          <div className="grid">
            <label htmlFor="email">Email</label>
            <input
              className="bg-slate-500 text-white border border-black"
              type="email"
              id="email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData((prev) => {
                  return { ...prev, email: e.target.value };
                })
              }
            />
          </div>
          <div className="grid">
            <label htmlFor="password">Password</label>
            <input
              className="bg-slate-500 text-white border border-black"
              type="password"
              id="password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
            />
          </div>

          <div>
            <label htmlFor="role" className="block mb-2 text-sm font-medium ">
              Select Role
            </label>
            <input
              className="bg-slate-500 text-white border border-black"
              type="text"
              id="role"
              value={registerData.role}
              onChange={(e) =>
                setRegisterData((prev) => {
                  return { ...prev, role: e.target.value };
                })
              }
            />
          </div>

          <button
            className="bg-slate-600 text-white border border-black hover:bg-slate-700 hover:brightness-110"
            type="submit"
          >
            Confirm
          </button>
        </form>
      </div>
    </main>
  );
}
