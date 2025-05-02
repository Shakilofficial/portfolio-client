import Certifications from "@/components/Certifications";
import Experience from "@/components/Experience";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/HeroSection";

import LatestBlogs from "@/components/LatestBlogs";
import MyService from "@/components/MyService";
import TechSkills from "@/components/TechSkills";

const HomePage = () => {
  return (
    <div className="w-full mx-auto px-4 py-12 lg:py-20 flex flex-col gap-12">
      {/*  <Hero /> */}
      <Hero />
      <TechSkills />
      <Experience />
      <MyService />
      <FeaturedProjects />
      <Certifications />
      <LatestBlogs />
    </div>
  );
};

export default HomePage;
