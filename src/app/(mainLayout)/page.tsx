import Hero from "@/components/Hero";
import Skills from "@/components/Skills";

const HomePage = () => {
  return (
    <div className="w-full mx-auto px-4 py-12 lg:py-20 flex flex-col gap-12">
      <Hero />
      <Skills />
    </div>
  );
};

export default HomePage;
