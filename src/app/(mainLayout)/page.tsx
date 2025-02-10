import Certifications from "@/components/Certifications";
import Hero from "@/components/Hero";
import LatestBlogs from "@/components/LatestBlogs";

import MyService from "@/components/MyService";
import Skills from "@/components/Skills";

const HomePage = () => {
  return (
    <div className="w-full mx-auto px-4 py-12 lg:py-20 flex flex-col gap-12">
      <Hero />
      <Skills />
      <MyService />
      <Certifications />
      <LatestBlogs />
      {/* featured projects */}
      {/* recent blog posts */}
    </div>
  );
};

export default HomePage;
