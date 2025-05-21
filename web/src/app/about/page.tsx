import Image from "next/image";
import { Music, Users, Calendar, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-10">
          <Image
            src="/Bitmap2.jpg"
            alt="about us"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {" "}
            About El Concierto
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Connecting music lovers wth unforgettable live experiences since
            1885
          </p>
        </div>
      </section>

      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-zinc-300">
                <p>
                  El Concierto was founded in 2010 with a simple mission: to
                  make live music more accessible to everyone. What started as a
                  small ticketing platform for local venues has grown into one
                  of the leading concert discovery and ticketing services
                  nationwide.
                </p>
                <p>
                  Our team of music enthusiasts is dedicated to curating the
                  best live music experiences and making the ticket purchasing
                  process as seamless as possible. We partner with venues,
                  promoters, and artists to bring you exclusive access to the
                  hottest shows.
                </p>
                <p>
                  Over the years, weve helped millions of fans discover new
                  artists and attend unforgettable concerts. We believe in the
                  power of live music to create connections, inspire creativity,
                  and bring joy to peoples lives.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/Bitmap2.jpg?height=800&width=800"
                alt="Our team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-zinc-900 p-8 rounded-lg text-center">
              <Music className="h-12 w-12 text-rose-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">5,000+</div>
              <div className="text-zinc-400">Concerts Hosted</div>
            </div>
            <div className="bg-zinc-900 p-8 rounded-lg text-center">
              <Users className="h-12 w-12 text-rose-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">2M+</div>
              <div className="text-zinc-400">Happy Customers</div>
            </div>
            <div className="bg-zinc-900 p-8 rounded-lg text-center">
              <Calendar className="h-12 w-12 text-rose-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">15</div>
              <div className="text-zinc-400">Years of Experience</div>
            </div>
            <div className="bg-zinc-900 p-8 rounded-lg text-center">
              <Award className="h-12 w-12 text-rose-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-zinc-400">Industry Awards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {[
              {
                name: "Jepzec a.k.a Naufal",
                role: "Founder & CEO",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Sxilex a.k.a uus ",
                role: "Head of Operations",
                image: "/placeholder.svg?height=400&width=400",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-zinc-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">
                Passion for Music
              </h3>
              <p className="text-zinc-300">
                We are music lovers first and foremost. Our team is passionate
                about creating exceptional live music experiences that resonate
                with fans.
              </p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">
                Customer Focus
              </h3>
              <p className="text-zinc-300">
                We put our customers at the center of everything we do, ensuring
                a seamless and enjoyable experience from discovery to
                attendance.
              </p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
              <p className="text-zinc-300">
                We continuously innovate our platform and services to improve
                the concert experience for fans, artists, and venues alike.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
