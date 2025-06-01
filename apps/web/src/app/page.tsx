import FeaturedPost from "@/components/featured-post";
import FeaturedConcerts from "@/components/featured-concert";

import Newsletter from "@/components/newsletter";
import HeroPage from "@/components/home-page";
import UpcomingEvents from "@/components/upcoming-event";
import EventWithPagination from "./event-with-pagination/page";

export default function Home() {
  return (
    <main>
      <HeroPage />
      <FeaturedConcerts />
      <EventWithPagination />
      <FeaturedPost />
      <UpcomingEvents />
      <Newsletter />
    </main>
  );
}
