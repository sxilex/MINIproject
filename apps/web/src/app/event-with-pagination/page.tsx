"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function EventWithPagination() {
  const searchParams = useSearchParams();

  const pageParam = parseInt(searchParams.get("page") || "1");
  const limitParam = parseInt(searchParams.get("limit") || "2");

  const [page, setPage] = useState(pageParam);
  const [limit, setLimit] = useState(limitParam);
  const [events, setEvents] = useState(null);

  useEffect(() => {
    async function getAllEvents() {
      const res = await fetch(
        `http://localhost:2012/api/v1/events?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      setEvents(data);
    }

    getAllEvents();
  }, []);

  //   console.log(totalPages);

  return (
    <main className="pt-20">
      {events?.data?.map((event) => (
        <article key={event.id}>
          <h2>{event.title}</h2>
        </article>
      ))}

      {Array.from({ length: events?.totalPages }, (_, index) => {
        return <button key={index}>{index + 1}</button>;
      })}
    </main>
  );
}
