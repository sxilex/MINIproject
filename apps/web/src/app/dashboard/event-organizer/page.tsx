"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";

export interface Event {
  id: string;
  title: string;

  description: string;
  date: string;
  time: string;
  location: string;
  quantity: number;
  attendees: number;
  status: "upcoming" | "ongoing" | "completed";
  category: string;
  ticketType: "REGULAR" | "VIP" | "DIAMOND";
}

export default function OrganizerDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);

  type TicketKey = "REGULAR" | "VIP" | "DIAMOND";

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startedDate: new Date(),
    startedTime: "",
    location: "",
    ticketPaymentType: "FREE",
    quantity: "",
    ticketTypes: {
      REGULAR: { quantity: "", price: "" },
      VIP: { quantity: "", price: "" },
      DIAMOND: { quantity: "", price: "" },
    },
    category: "Jazz",
    imageFile: null as File | null,
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:2012/api/v1/events");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        setEvents(data.data);
      } catch (err) {
        console.error("Failed to load events:", err);
      }
    };

    fetchEvents();
  }, []);

  const handleCreateEvent = async () => {
    if (
      !newEvent.title ||
      !newEvent.startedDate ||
      !newEvent.startedTime ||
      !newEvent.location
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newEvent.title);
    formData.append("description", newEvent.description);
    formData.append("location", newEvent.location);
    formData.append("startedDate", newEvent.startedDate);
    formData.append("startedTime", newEvent.startedTime);
    formData.append("quota", newEvent.quantity);
    formData.append("type", newEvent.ticketPaymentType);
    formData.append("category", newEvent.category);

    if (newEvent.imageFile) {
      formData.append("image", newEvent.imageFile);
    }

    try {
      if (newEvent.ticketPaymentType === "FREE") {
        formData.append(
          "tickets",
          JSON.stringify([
            {
              price: 0,
              quantity: parseInt(newEvent.quantity || "0"),
              userTicketLimit: 10,
              ticketCategory: "REGULAR",
            },
          ])
        );
      } else {
        const tickets = Object.entries(newEvent.ticketTypes)
          .filter(([, val]) => val.quantity && val.price)
          .map(([key, val]) => ({
            price: parseInt(val.price),
            quantity: parseInt(val.quantity),
            userTicketLimit: 1,
            ticketCategory: key.toUpperCase(),
          }));

        formData.append("tickets", JSON.stringify(tickets));
      }

      const res = await fetch("http://localhost:2012/api/v1/events", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        alert(`Failed to create event: ${error.message}`);
        return;
      }

      const { event: createdEvent } = await res.json();

      setEvents((prev) => [...prev, createdEvent]);
      setNewEvent({
        title: "",
        description: "",
        location: "",
        startedDate: "",
        startedTime: "",
        ticketPaymentType: "FREE",
        quantity: "",
        ticketTypes: {
          REGULAR: { quantity: "", price: "" },
          VIP: { quantity: "", price: "" },
          DIAMOND: { quantity: "", price: "" },
        },
        category: "Jazz",
        imageFile: null,
      });

      setIsCreateModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  const handleDeleteEvent = async (id: string) => {
    const res = await fetch(`http://localhost:2012/api/v1/events/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      alert("Failed to delete event.");
      return;
    }
    setEvents(events.filter((e) => e.id !== id));
    setDeleteEventId(null);
  };

  const filteredEvents = Array.isArray(events)
    ? events.filter((event) => {
        return (
          (event.title || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (event.category || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      })
    : [];

  const totalAttendees = (events ?? []).reduce(
    (sum, e) => sum + (e.attendees || 0),
    0
  );
  const totalquantity = (events ?? []).reduce(
    (sum, e) => sum + (e.quantity || 0),
    0
  );

  return (
    <div className="min-h-screen bg-black pt-[70px] text-white">
      <header className="bg-white border-b border-gray-200 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              OR
            </div>
            <div>
              <h1 className="text-2xl font-bold">Event Organizer Dashboard</h1>
              <p className="text-sm text-gray-500">
                Manage your events efficiently
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Create Event
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border p-6 text-black">
            <p className="text-sm font-medium text-gray-600">Total Events</p>
            <p className="text-2xl font-bold">{events?.length}</p>
          </div>
          <div className="bg-white rounded-lg border p-6 text-black">
            <p className="text-sm font-medium text-gray-600">Total Attendees</p>
            <p className="text-2xl font-bold">{totalAttendees}</p>
          </div>
          <div className="bg-white rounded-lg border p-6 text-black">
            <p className="text-sm font-medium text-gray-600">
              quantity Utilization
            </p>
            <p className="text-2xl font-bold">
              {totalquantity > 0
                ? Math.round((totalAttendees / totalquantity) * 100)
                : 0}
              %
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-black"
            />
          </div>
        </div>

        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg border p-6 mb-4 text-black"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-500">{event.description}</p>
                <div className="text-xs text-gray-400">
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </div>
              </div>
              <button
                onClick={() => setDeleteEventId(event.id)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Create Event Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-black">
            <h2 className="text-lg font-semibold mb-4">Create Event</h2>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <textarea
                placeholder="Description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="date"
                value={newEvent.startedDate}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, startedDate: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="time"
                value={newEvent.startedTime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, startedTime: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Location"
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              {/* Ticket Type Selection */}
              <select
                value={newEvent.ticketPaymentType}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    ticketPaymentType: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              >
                <option value="FREE">FREE</option>
                <option value="PAID">PAID</option>
              </select>

              {/* Conditional rendering for ticket type */}
              {newEvent.ticketPaymentType === "FREE" ? (
                <input
                  type="number"
                  placeholder="Quantity"
                  value={newEvent.quantity}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, quantity: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              ) : (
                <div className="space-y-2">
                  {/* Predefined ticket types */}
                  {(["REGULAR", "VIP", "DIAMOND"] as TicketKey[]).map(
                    (ticketType) => (
                      <div key={ticketType} className="flex gap-2 items-center">
                        <input
                          type="text"
                          readOnly
                          value={ticketType}
                          className="flex-1 border p-2 rounded bg-gray-100"
                        />
                        <input
                          type="number"
                          placeholder={`Quantity for ${ticketType}`}
                          value={
                            newEvent.ticketTypes[ticketType]?.quantity || ""
                          }
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              ticketTypes: {
                                ...newEvent.ticketTypes,
                                [ticketType]: {
                                  ...newEvent.ticketTypes[ticketType],
                                  quantity: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-1/3 border p-2 rounded"
                        />
                        <input
                          type="number"
                          placeholder={`Price for ${ticketType}`}
                          value={newEvent.ticketTypes[ticketType]?.price || ""}
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              ticketTypes: {
                                ...newEvent.ticketTypes,
                                [ticketType]: {
                                  ...newEvent.ticketTypes[ticketType],
                                  price: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-1/3 border p-2 rounded"
                        />
                      </div>
                    )
                  )}
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setNewEvent({ ...newEvent, imageFile: e.target.files[0] });
                  }
                }}
                className="w-full border p-2 rounded"
              />

              <select
                value={newEvent.category}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, category: e.target.value })
                }
                className="w-full border p-2 rounded"
              >
                <option value="Jazz">Jazz</option>
                <option value="Rock">Rock</option>
                <option value="Reggie">Reggie</option>
                <option value="Pop">Pop</option>
              </select>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="flex-1 border rounded p-2"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEvent}
                className="flex-1 bg-blue-600 text-white rounded p-2"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteEventId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-black">
            <h2 className="text-lg font-semibold mb-4">Delete Event</h2>
            <p>Are you sure you want to delete this event?</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setDeleteEventId(null)}
                className="flex-1 border rounded p-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteEvent(deleteEventId)}
                className="flex-1 bg-red-600 text-white rounded p-2"
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
