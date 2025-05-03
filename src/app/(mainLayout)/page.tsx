import Certifications from "@/components/Certifications";
import Experience from "@/components/Experience";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/HeroSection";
import LatestBlogs from "@/components/LatestBlogs";
import MyService from "@/components/MyService";
import TechSkills from "@/components/TechSkills";

const HomePage = () => {
  return (
    <div className="flex flex-col">
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
