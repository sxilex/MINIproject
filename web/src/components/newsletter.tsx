"use client";

import React, { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("subscribing email:", email);
    setEmail("");
  };

  return (
    <section className="py-16 bg-zinc-900 mx-auto flex flex-col items-center justify-center text-center">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl font-bold text-white mb-4 space-y-4">
          <h2 className="text-3xl font-bold text-white">
            {" "}
            Give us some feedback
          </h2>
          <p className="text-zinc-300 mb-8 ">
            {" "}
            Subscribe to our newsletter and be the first to know about upcoming
            concerts, exclusive presales, and special offers.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-zinc-800 border-zinc-700 text-white flex flex-col items-center justify-center text-center mx-auto"
            ></input>
            <button
              type="submit"
              className="px-3 rounded-full bg-rose-600 hover:bg-rose-700"
            >
              Subscribe{" "}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
