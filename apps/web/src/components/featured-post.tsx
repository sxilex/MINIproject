"use client";
import Image from "next/image";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";

interface EventType {
  id: string;
  userId: string;
  title: string;
  location: string;
  quota: number;
  image: string;
  startedDate: Date;
  startedTime: string;
  User: [{ firstname: string; lastname: string }];
  Images: [{}];
}

export default function FeaturedPost() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = parseInt(searchParams.get("page") || "1");
  const limitParam = parseInt(searchParams.get("limit") || "3");

  const [page, setPage] = useState(pageParam);
  const [limit, setLimit] = useState(limitParam);
  const [events, setEvents] = useState<EventType[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);

      router.replace(`?page=${pageNumber}&limit=${limit}`, { scroll: false });
    }
  };

  useEffect(() => {
    async function getAllEvents() {
      try {
        const res = await fetch(
          `http://localhost:2012/api/v1/events?page=${page}&limit=${limit}`
        );
        const data = await res.json();
        setEvents(data.data);
        setTotalPages(data.totalPages);
        console.log(data);
        console.log(data.data);
      } catch (error) {
        console.error("error fetching event", error);
      }
    }
    getAllEvents();
  }, [page, limit]);

  return (
    <section className="py-16 bg-zinc-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">
          Featured Concerts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event: EventType) => (
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
                  <span className="text-white font-bold">{event.price}</span>
                  <Link
                    href={`/events/${event.id}`}
                    className=" px-3 rounded-full hover:underline"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="./events"
            className=" px-3 rounded-full text-white border-white hover:bg-white/10"
          >
            View All Concerts
          </Link>
        </div>
      </div>
    </section>
  );
}
