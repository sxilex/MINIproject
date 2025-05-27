import Image from "next/image";

export default function UpcomingEvents() {
  const events = [
    {
      id: 1,
      title: "Rock & Roll Revival",
      date: "June 25, 2025",
      location: "Stadium Arena",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Rock", "Live Band"],
    },
    {
      id: 2,
      title: "Hip Hop Showcase",
      date: "July 15, 2025",
      location: "Urban Center",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Hip Hop", "Rap"],
    },
    {
      id: 3,
      title: "Country Music Festival",
      date: "August 8, 2025",
      location: "Riverside Park",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Country", "Folk"],
    },
    {
      id: 4,
      title: "Indie Bands Night",
      date: "August 20, 2025",
      location: "The Underground",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Indie", "Alternative"],
    },
  ];

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">Upcoming Events</h2>
        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col md:flex-row gap-4 bg-zinc-900 rounded-lg overflow-hidden"
            >
              <div className="relative w-full md:w-48 h-48 md:h-auto">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-between p-6 w-full">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-zinc-400 mb-2">
                    {event.date} • {event.location}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag) => (
                      <button
                        key={tag}
                        className="bg-zinc-800 text-zinc-300 px-3 rounded-full hover:bg-zinc-500 transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button className="text-rose-500 p-0 hover:text-rose-400">
                    View Details
                  </button>
                  <button className="bg-rose-600 hover:bg-rose-700 px-4 rounded-full">
                    Get Tickets
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
