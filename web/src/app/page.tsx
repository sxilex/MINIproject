import FeaturedPost from "@/components/featured-post";
import FeaturedConcerts from "@/components/featured-concert";

import Newsletter from "@/components/newsletter";
import HeroPage from "@/components/home-page";
import UpcomingEvents from "@/components/upcoming-event";

export default function Home() {
  return (
    <main>
      <HeroPage />
      <FeaturedConcerts />
      <FeaturedPost />
      <UpcomingEvents />
      <Newsletter />
    </main>
  );
}
