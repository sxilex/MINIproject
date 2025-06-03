"use client";
import React, { useState } from "react";

interface CustomerData {
  name: string;
  username: string;
  email: string;
  referralCode: string;
}

const defaultData: CustomerData = {
  name: "John Doe",
  username: "johndoe123",
  email: "john@example.com",
  referralCode: "REF123456",
};

export default function CustomerPage() {
  const [data, setData] = useState<CustomerData>(defaultData);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    setEditMode((prev) => !prev);
    // Add save logic here if needed (e.g. send to API or localStorage)
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Customer Profile</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          disabled={!editMode}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={data.username}
          onChange={handleChange}
          disabled={!editMode}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          disabled={!editMode}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Referral Code</label>
        <input
          type="text"
          name="referralCode"
          value={data.referralCode}
          onChange={handleChange}
          disabled={!editMode}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      <div className="text-right">
        <button
          onClick={toggleEdit}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {editMode ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
}
