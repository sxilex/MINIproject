"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

interface EventType {
  id: string;
  userId: string;
  title: string;
  location: string;
  quota: number;
  User: [{ firstname: string; lastname: string }];
}

export default function EventWithPagination() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = parseInt(searchParams.get("page") || "1");
  const limitParam = parseInt(searchParams.get("limit") || "4");

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

  //   console.log(totalPages);

  return (
    <main className="pt-20  grid justify-center bg-gray-800">
      <section className="min-h-screen grid place-items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {events.map((event: EventType) => (
            <article
              key={event.id}
              className="text-gray-800 border border-gray-200 rounded-2xl shadow-md bg-white w-full p-6 transition-transform hover:scale-[1.02] hover:shadow-xl"
            >
              <h2 className="text-lg font-semibold mb-2">{event.title}</h2>
              <Link
                className="underline hover:text-zinc-500"
                href={`/events/${event.id}`}
              >
                see more
              </Link>
            </article>
          ))}
        </div>

        <div className="col-span-full flex justify-center mt-12 space-x-2">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`px-4 py-2 rounded-md border ${
                page === index + 1
                  ? "bg-blue-700 text-white"
                  : "bg-white text-blue-700 hover:bg-blue-100"
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
