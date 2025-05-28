"use client";

import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";

export default function EventsPage() {
  type Item = {
    id: number;
    name: string;
    title: string;
    
  };

  const data: Item[] = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
  }));

  const ITEMS_PER_PAGE = 10;

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Item[]>(data);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      const lower = search.toLowerCase();
      const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(lower)
      );
      setFiltered(filteredData);
    }, 300);

    return () => clearTimeout(handler);
  }, [search, data]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative h-[40vh] w-full">
        <div className="absoluter inset-0 bg-black/70 z-10">
          <Image
            src="/Bitmap.jpg"
            alt="event"
            fill
            priority
            className="object-cover"
          ></Image>
        </div>

        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col  justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {" "}
            Lets explore the event
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            sint tempore repudiandae corporis quibusdam?
          </p>
        </div>
        <div className="p-4 max-w-xl mx-auto font-sans">
          <h1 className="text-2xl font-bold mb-4"> Search & Pagination</h1>
          <input
            type="text"
            placeholder="search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 w-full rounded mb-4"
          />

          <ul className="space-y-2">
            {paginatedData.map((item) => (
              <li key={item.id} className="border p-2 rounded">
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 bg-blue-400 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page{currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>

      <section>
        <div></div>
      </section>
    </main>
  );
}
