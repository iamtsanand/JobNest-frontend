
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturedJobs from "../components/FeaturedJobs";
import JobCategories from "../components/JobCategories";
import Benefits from "../components/Benefits";
import Statistics from "../components/Statistics";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <JobCategories />
        <FeaturedJobs />
        <Benefits />
        <Statistics />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
