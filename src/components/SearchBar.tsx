
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', { jobTitle, location });
    // In a real app, this would trigger a search
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4 transition-all"
    >
      <div className="flex-1">
        <div className="flex items-center border-b-2 border-gray-200 py-2">
          <Search size={20} className="text-gray-400 mr-2" />
          <Input
            type="text"
            placeholder="Job title, keywords, or company"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="border-none focus-visible:ring-0 text-lg placeholder:text-gray-400"
          />
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center border-b-2 border-gray-200 py-2">
          <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <Input
            type="text"
            placeholder="City, state, or remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-none focus-visible:ring-0 text-lg placeholder:text-gray-400"
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="bg-job-blue hover:bg-job-darkBlue text-white px-8 py-6 text-lg btn-hover-effect"
      >
        Search Jobs
      </Button>
    </form>
  );
};

export default SearchBar;
