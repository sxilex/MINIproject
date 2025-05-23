import Image from "next/image";

export default function HeroPage() {
  return (
    <section className="flex min-h-screen flex-col">
      <div className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="/crowd-concert.jpg?height=1080&width=1920"
          alt="Concert crowd"
          fill
          priority
          className="object-cover mt-10"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-start">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Live your <span className="text-rose-500">Life</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-8">
            Discover and book tickets for the hottest concerts and music events
            happening around you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 ">
            <button className="bg-rose-600 hover:bg-rose-700 px-4 rounded-full">
              Browse Events
            </button>
            <button className="text-white border-white hover:bg-white/10 px-4 rounded-full">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
