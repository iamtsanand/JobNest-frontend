
// import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative bg-gradient-to-r from-job-blue to-job-lightBlue overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")', backgroundSize: '15px' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Find Your Dream Job Today
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in animate-delay-100">
            Search thousands of job listings from top companies and find the perfect match for your skills and experience.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in animate-delay-200">
            {/* <Button variant="secondary" size="lg" className="font-medium">
              Upload Resume
            </Button> */}
            <Button onClick={() => navigate("/employer")} variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/20">
              For Employers
            </Button>
          </div>
        </div>
        
        <div className="animate-fade-in animate-delay-300">
          <SearchBar />
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-white/80 text-sm animate-fade-in animate-delay-400">
          <p>Popular: <span className="text-white font-medium">Software Engineer</span></p>
          <p>Marketing Specialist</p>
          <p>Data Analyst</p>
          <p>UX Designer</p>
          <p>Product Manager</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
