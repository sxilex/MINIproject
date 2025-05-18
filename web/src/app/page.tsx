import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Concert crowd"
          fill
          priority
          className="object-cover"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-start">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Live the <span className="text-rose-500">Experience</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-8">
            Discover and book tickets for the hottest concerts and music events
            happening around you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
              Browse Events
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
