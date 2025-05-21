import FeaturedConcerts from "@/components/featured-post";
import FooterSection from "@/components/footer-section";
import Newsletter from "@/components/newsletter";
import { News_Cycle } from "next/font/google";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="/https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D?height=1080&width=1920"
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
        </div>
      </section>
      <FeaturedConcerts />
      <Newsletter />
      <FooterSection />
    </main>
  );
}
