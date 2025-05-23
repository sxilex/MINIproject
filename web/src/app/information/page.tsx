import Image from "next/image";

export default function InformationPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="relative h-[40vh] w-full">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <Image
          src="#"
          alt="Information banner"
          fill
          priority
          className="object-cover"
        ></Image>
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Information
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Everything you need to know about attending our concerts
          </p>
        </div>
      </section>
      
     
    </main>
  );
}
