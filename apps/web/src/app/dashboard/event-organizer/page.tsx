"use client";

import React, { useState } from "react";

export default function EventOrgPage() {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    quota: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:2012/api/v1/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!res.ok) throw new Error("Failed to create event");

      const result = await res.json();
      console.log("Event created:", result);
      setSuccessMessage("Event created successfully!");
      setEventData({
        title: "",
        date: "",
        location: "",
        description: "",
        quota: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("Error creating event.");
    }
  };

  return (
    <main className="min-h-screen bg-stone-900 text-white px-4 py-10 flex items-center justify-center">
      <div className="bg-stone-800 p-8 rounded-xl shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Organizer Dashboard
        </h1>

        <form onSubmit={handleEventSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Event title"
            value={eventData.title}
            onChange={(e) =>
              setEventData({ ...eventData, title: e.target.value })
            }
            className="w-full px-4 py-2 rounded-md bg-stone-700 border border-stone-500 focus:outline-none"
            required
          />

          <input
            type="date"
            value={eventData.date}
            onChange={(e) =>
              setEventData({ ...eventData, date: e.target.value })
            }
            className="w-full px-4 py-2 rounded-md bg-stone-700 border border-stone-500 focus:outline-none"
            required
          />

          <input
            type="text"
            placeholder="Location"
            value={eventData.location}
            onChange={(e) =>
              setEventData({ ...eventData, location: e.target.value })
            }
            className="w-full px-4 py-2 rounded-md bg-stone-700 border border-stone-500 focus:outline-none"
            required
          />

          <textarea
            placeholder="Event Description"
            value={eventData.description}
            onChange={(e) =>
              setEventData({ ...eventData, description: e.target.value })
            }
            className="w-full px-4 py-2 rounded-md bg-stone-700 border border-stone-500 focus:outline-none min-h-[80px]"
          />

          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-stone-900 font-semibold rounded-md hover:bg-yellow-600 transition"
          >
            Create Event
          </button>

          {successMessage && (
            <p className="text-center text-sm mt-2 text-green-400">
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
