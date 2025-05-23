import FeaturedPost from "@/components/featured-post";
import FeaturedConcerts from "@/components/featured-concert";
import FooterSection from "@/components/footer-section";
import Newsletter from "@/components/newsletter";
import HeroPage from "@/components/home-page";

export default function Home() {
  return (
    <main>
      <HeroPage />
      <FeaturedConcerts />
      <FeaturedPost />
      <Newsletter />
      <FooterSection />
    </main>
  );
}
