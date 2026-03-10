import BookingSection from "@/components/BookingSection";
import Certifications from "@/components/Certifications";
import Experience from "@/components/Experience";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/HeroSection";
import LatestBlogs from "@/components/LatestBlogs";
import MyService from "@/components/MyService";
import TechSkills from "@/components/TechSkills";
import Testimonials from "@/components/Testimonials";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <TechSkills />
      <Experience />
      <MyService />
      <FeaturedProjects />
      <BookingSection />
      <Certifications />
      <LatestBlogs />
      <Testimonials />
      <BookingSection />
    </div>
  );
};

export default HomePage;
