"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Link from "next/link";
import RotatingText from "../../../Reactbits/RotatingText";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

interface EventType {
  id: string;
  userId: string;
  title: string;
  type: string;
  location: string;
  quota: number;
  image: string;
  startedDate: Date;
  startedTime: string;
  User: [{ firstname: string; lastname: string }];
  Images: [{}];
}

export default function EventWithPagination() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = parseInt(searchParams.get("page") || "1");
  const limitParam = parseInt(searchParams.get("limit") || "3");
  const titleParam = searchParams.get("title") || "";

  const [page, setPage] = useState(pageParam);
  const [limit, setLimit] = useState(limitParam);
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState(titleParam);
  const [events, setEvents] = useState<EventType[]>([]);
  const [debouncedTitle, setDebouncedTitle] = useState<EventType[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);

      router.replace(
        `?page=${pageNumber}&limit=${limit}&title=${debouncedTitle}`,
        { scroll: false }
      );
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedTitle(title);

      setPage(1);
      router.replace(
        `?page=1&limit=${limit}&title=${title}&type=${type}&location=${location}`,
        { scroll: false }
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [title, type, location]);

  useEffect(() => {
    async function getAllEvents() {
      try {
        const res = await fetch(
          `http://localhost:2012/api/v1/events?page=${page}&limit=${limit}&title=${debouncedTitle}&type=${type}&location=${location}`
        );
        const data = await res.json();
        setEvents(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("error fetching event", error);
      }
    }
    getAllEvents();
  }, [page, limit, debouncedTitle, type, location]);

  //   console.log(totalPages);

  return (
    <main className="pt-[50px]  grid bg-black min-h-screen">
      <section className="py-[30px] bg-zinc-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-white whitespace-nowrap">
              Explore what you
            </h2>

            <RotatingText
              texts={["Loved", "Like", "Prefer"]}
              mainClassName="px-5 sm:px-4 md:px-6 bg-red-500 text-black overflow-hidden py-0.5 sm:py-2 md:py-2 justify-center rounded-lg font-bold text-3xl"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="" className="text-slate-700">
                All Types
              </option>
              <option value="FREE" className="text-slate-700">
                Free
              </option>
              <option value="PAID" className="text-slate-700">
                Paid
              </option>
            </select>
            <input
              type="text"
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={() => {
                setPage(1);
                router.replace(
                  `?page=1&limit=${limit}&title=${title}&type=${type}&location=${location}`,
                  { scroll: false }
                );
              }}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Filter
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(events) &&
              events.map((event: EventType) => (
                <div
                  key={event.id}
                  className="bg-zinc-800 rounded-lg overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={event.image || "/maintenance.jpg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    <div className="space-y-2 mb-4 text-zinc-300">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-rose-500" />
                        <span className="text-sm">
                          {format(new Date(event.startedDate), "MMMM dd, yyyy")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-rose-500" />
                        <span className="text-sm">{event.startedTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-rose-500" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">{event.type}</span>
                      <Link
                        href={`/events/${event.id}`}
                        className=" px-3 rounded-full bg-rose-600 hover:bg-rose-700 "
                      >
                        Buy Ticket
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="col-span-full flex justify-center mt-12 space-x-2">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          {totalPages > 1 &&
            Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`px-4 py-2 rounded-md border ${
                  page === index + 1
                    ? "bg-red-900 text-white"
                    : "bg-white text-black hover:bg-blue-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}
