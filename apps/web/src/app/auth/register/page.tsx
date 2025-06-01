"use client";

import { Router } from "lucide-react";
import React, { useState } from "react";

export default function RegisterPage() {
  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    referralcode: "", //make it optional... hmm
  });
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:2012/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      if (!res.ok) {
        throw new Error("failed to fetch data");
      }

      setRegisterData({
        firstname: "",
        lastname: "",

        username: "",
        email: "",

        password: "",

        referralcode: "",
      });

      alert("New User Created! Welcome");
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="py-10 bg-black borderbg-white border-2 p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid">
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={registerData.username}
              onChange={(e) =>
                setRegisterData((prev) => {
                  return { ...prev, username: e.target.value };
                })
              }
              className="bg-slate-500 text-white border border-black"
            />
          </div>
          <div className="grid">
            <label htmlFor="firstname">First Name</label>
            <input
              className="bg-slate-500 text-white border border-black"
              type="text"
              id="firstname"
              value={registerData.firstname}
              onChange={(e) =>
                setRegisterData((prev) => {
                  return { ...prev, firstname: e.target.value };
                })
              }
            />
          </div>
          <div className="grid">
            <label htmlFor="lastname">Last Name</label>
            <input
              className="bg-slate-500 text-white border border-black"
              type="text"
              id="lastname"
              value={registerData.lastname}
              onChange={(e) =>
                setRegisterData((prev) => {
                  return { ...prev, lastname: e.target.value };
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
              type="password"
              id="password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
              className="w-full px-4 py-2 rounded-md bg-stone-600 border border-stone-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your username"
            />
          </div>
          <div className="grid">
            <label htmlFor="referralcode">Referral Code (optional)</label>
            <input
              type="referralcode"
              id="referralcode"
              value={registerData.referralcode}
              onChange={(e) =>
                setRegisterData((prev) => {
                  return { ...prev, referralcode: e.target.value };
                })
              }
              className="w-full px-4 py-2 rounded-md bg-stone-600 border border-stone-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="role" className="block mb-1 text-sm font-medium">
              Role
            </label>
            <select
              id="role"
              value={registerData.role}
              onChange={(e) =>
                setRegisterData((prev) => ({ ...prev, role: e.target.value }))
              }
              className="w-full px-4 py-2 rounded-md bg-stone-600 border border-stone-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select a role</option>
              <option value="CUSTOMEr">Customer</option>
              <option value="ORGANIZER">Organizer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-yellow-500 text-stone-900 font-semibold rounded-md hover:bg-yellow-600 transition duration-200"
          >
            Confirm
          </button>
        </form>
      </div>
    </main>
  );
}
