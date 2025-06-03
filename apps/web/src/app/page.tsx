import FeaturedPost from "@/components/featured-post";
import FeaturedConcerts from "@/components/featured-concert";

import Newsletter from "@/components/newsletter";
import HeroPage from "@/components/home-page";


import ClickSpark from "../../Reactbits/ClickSpark";

export default function Home() {
  return (
    <main>
      <ClickSpark
        sparkColor="#fff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
       
        <HeroPage />
        <FeaturedConcerts />

        <FeaturedPost />

        <Newsletter />
      </ClickSpark>
    </main>
  );
}
