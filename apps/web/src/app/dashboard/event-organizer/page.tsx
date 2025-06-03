// "use client";

// import React, { useState } from "react";

// export default function EventOrgPage() {
//   const [eventData, setEventData] = useState({
//     title: "",
//     description: "",
//     location: "",
//     date: "",
//     quota: "",
//   });

//   const [successMessage, setSuccessMessage] = useState("");

//   const handleEventSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:2012/api/v1/events", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(eventData),
//       });

//       if (!res.ok) throw new Error("Failed to create event");

//       const result = await res.json();
//       console.log("Event created:", result);
//       setSuccessMessage("Event created successfully!");
//       setEventData({
//         title: "",
//         date: "",
//         location: "",
//         description: "",
//         quota: "",
//       });
//     } catch (error) {
//       console.error("Error:", error);
//       setSuccessMessage("Error creating event.");
//     }
//   };

//   return (
//     <main className="min-h-screen bg-stone-900 text-white px-4 py-10 flex items-center justify-center">
//       <div className="bg-stone-800 p-8 rounded-xl shadow-md w-full max-w-2xl">
//         <h1 className="text-2xl font-bold mb-6 text-center">
//           Organizer Dashboard
//         </h1>

//         <form onSubmit={handleEventSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Event title"
//             value={eventData.title}
//             onChange={(e) =>
//               setEventData({ ...eventData, title: e.target.value })
//             }
//             className="w-full px-4 py-2 rounded-md bg-stone-700 border border-stone-500 focus:outline-none"
//             required
//           />

//           <input
//             type="date"
//             value={eventData.date}
//             onChange={(e) =>
//               setEventData({ ...eventData, date: e.target.value })
//             }
//             className="w-full px-4 py-2 rounded-md bg-stone-700 border border-stone-500 focus:outline-none"
//             required
//           />

//           <input
//             type="text"
//             placeholder="Location"
//             value={eventData.location}
//             onChange={(e) =>
//               setEventData({ ...eventData, location: e.target.value })
//             }
//             className="w-full px-4 py-2 rounded-md bg-stone-700 border border-stone-500 focus:outline-none"
//             required
//           />

//           <textarea
//             placeholder="Event Description"
//             value={eventData.description}
//             onChange={(e) =>
//               setEventData({ ...eventData, description: e.target.value })
//             }
//             className="w-full px-4 py-2 rounded-md bg-stone-700 border border-stone-500 focus:outline-none min-h-[80px]"
//           />

//           <button
//             type="submit"
//             className="w-full py-2 bg-yellow-500 text-stone-900 font-semibold rounded-md hover:bg-yellow-600 transition"
//           >
//             Create Event
//           </button>

//           {successMessage && (
//             <p className="text-center text-sm mt-2 text-green-400">
//               {successMessage}
//             </p>
//           )}
//         </form>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import {
  Plus,
  Calendar,
  MapPin,
  Users,
  Trash2,
  Edit,
  Search,
  X,
  AlertTriangle,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  attendees: number;
  status: "upcoming" | "ongoing" | "completed";
  category: string;
}

export default function OrganizerDashboard() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Tech Conference 2024",
      description:
        "Annual technology conference featuring the latest innovations and trends in the tech industry.",
      date: "2024-03-15",
      time: "09:00",
      location: "Convention Center, San Francisco",
      capacity: 500,
      attendees: 342,
      status: "upcoming",
      category: "Technology",
    },
    {
      id: "2",
      title: "Design Workshop",
      description:
        "Interactive workshop on modern UI/UX design principles and best practices.",
      date: "2024-02-28",
      time: "14:00",
      location: "Design Studio, New York",
      capacity: 50,
      attendees: 45,
      status: "upcoming",
      category: "Design",
    },
    {
      id: "3",
      title: "Startup Pitch Night",
      description:
        "Evening event where startups present their ideas to potential investors.",
      date: "2024-02-20",
      time: "18:00",
      location: "Innovation Hub, Austin",
      capacity: 200,
      attendees: 180,
      status: "completed",
      category: "Business",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    category: "",
  });

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateEvent = () => {
    if (
      !newEvent.title ||
      !newEvent.date ||
      !newEvent.time ||
      !newEvent.location
    ) {
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      capacity: Number.parseInt(newEvent.capacity) || 0,
      attendees: 0,
      status: "upcoming",
      category: newEvent.category || "General",
    };

    setEvents([...events, event]);
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      capacity: "",
      category: "",
    });
    setIsCreateModalOpen(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
    setDeleteEventId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const upcomingEvents = events.filter(
    (event) => event.status === "upcoming"
  ).length;
  const totalAttendees = events.reduce(
    (sum, event) => sum + event.attendees,
    0
  );
  const totalCapacity = events.reduce((sum, event) => sum + event.capacity, 0);

  return (
    <div className="min-h-screen bg-black pt-[70px]">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">OR</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Event Organizer Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  Manage your events efficiently
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create Event
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Events
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {events.length}
                </p>
                <p className="text-xs text-gray-500">
                  {upcomingEvents} upcoming
                </p>
              </div>
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Attendees
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalAttendees}
                </p>
                <p className="text-xs text-gray-500">Across all events</p>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Capacity Utilization
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalCapacity > 0
                    ? Math.round((totalAttendees / totalCapacity) * 100)
                    : 0}
                  %
                </p>
                <p className="text-xs text-gray-500">
                  {totalAttendees} / {totalCapacity} total capacity
                </p>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search events by title, category, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Your Events</h2>
            <span className="text-sm text-gray-500">
              {filteredEvents.length} events
            </span>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No events found
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Get started by creating your first event"}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Create Your First Event
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {event.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}
                        >
                          {event.status}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
                          {event.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(event.date).toLocaleDateString()} at{" "}
                            {event.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>
                            {event.attendees} / {event.capacity} attendees
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteEventId(event.id)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Capacity</span>
                      <span>
                        {Math.round((event.attendees / event.capacity) * 100)}%
                        filled
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min((event.attendees / event.capacity) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create Event Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Create New Event</h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                Fill in the details to create a new event.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    placeholder="Enter event title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                    placeholder="Enter event description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, date: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      value={newEvent.time}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, time: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, location: e.target.value })
                    }
                    placeholder="Enter event location"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Capacity
                    </label>
                    <input
                      type="number"
                      value={newEvent.capacity}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, capacity: e.target.value })
                      }
                      placeholder="Max attendees"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={newEvent.category}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, category: e.target.value })
                      }
                      placeholder="Event category"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateEvent}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteEventId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold">Delete Event</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete
              {events.find((e) => e.id === deleteEventId)?.title}? This action
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteEventId(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteEvent(deleteEventId)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
