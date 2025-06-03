


import { CalendarDays, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function FeaturedConcerts() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-lg overflow-hidden">
            {" "}
            <Image
              src="/reggae-concert.webp?height=800&width=1200"
              alt="Featured concert"
              fill
              className="object-cover"
            />
    
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            {" "}
            <div className="inline-block px-4 py-1 bg-rose-600 text-white text-sm font-medium rounded-full">
              Featured Event
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Reggae Rastaman Fest 2025
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-rose-500" />
                <span>November 20-22, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-rose-500" />
                <span>Gates open at 5:00 pm</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-rose-500" />
                <span>Greenland Field, Oklahoma</span>
              </div>
            </div>
            <p className="text-gray-300">
              Join us for three days of non-stop music featuring over 30 bands
              across 4 stages. Early bird tickets available now with special
              Anomaly packages.
            </p>
            <Link
              href="https://www.purwadhika.com"
              className="bg-rose-600 hover:bg-rose-700 mt-4 px-4 rounded-full"
            >
              Get Tickets
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
