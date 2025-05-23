import Image from "next/image";
import { CalendarDays, Clock, MapPin } from "lucide-react";

export default function FeaturedPost() {
  const concerts = [
    {
      id: 1,
      title: "Electronic Music Festival",
      date: "July 10, 2025",
      time: "7:00 PM",
      location: "Skyline Arena",
      image: "/placeholder.svg?height=400&width=600",
      price: "Rp 100.000",
    },
    {
      id: 2,
      title: "Jazz Night Live",
      date: "August 5, 2025",
      time: "8:30 PM",
      location: "Blue Note Club",
      image: "/placeholder.svg?height=400&width=600",
      price: "Rp. 50.000,00",
    },
    {
      id: 3,
      title: "Classical Symphony",
      date: "September 15, 2025",
      time: "6:00 PM",
      location: "Grand Concert Hall",
      image: "/placeholder.svg?height=400&width=600",
      price: "$60",
    },
  ];

  return (
    <section className="py-16 bg-zinc-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">
          Featured Concerts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concerts.map((concert) => (
            <div
              key={concert.id}
              className="bg-zinc-800 rounded-lg overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={concert.image || "/placeholder.svg"}
                  alt={concert.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {concert.title}
                </h3>
                <div className="space-y-2 mb-4 text-zinc-300">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-rose-500" />
                    <span className="text-sm">{concert.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-rose-500" />
                    <span className="text-sm">{concert.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-rose-500" />
                    <span className="text-sm">{concert.location}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">{concert.price}</span>
                  <button className=" px-3 rounded-full bg-rose-600 hover:bg-rose-700 ">
                    Buy Ticket
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button className=" px-3 rounded-full text-white border-white hover:bg-white/10">
            View All Concerts
          </button>
        </div>
      </div>
    </section>
  );
}
