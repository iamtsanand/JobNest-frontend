
import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api.js";
import { Job } from "@/types/userProfile";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard from "@/components/Jobcard";
import JobFilters from "@/components/JobFilters";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Briefcase } from "lucide-react";

const JobsPage = () => {
  const { data: jobs = [], error, isLoading } = useQuery<Job[]>({
    queryKey: ['getAllJobs'],
    queryFn: api.getAllJobs,
  });
  
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    employmentType: "",
    experienceLevel: "",
    salaryRange: [50000, 150000],
  });

  const [displayCount, setDisplayCount] = useState(6);
  useEffect(() => {
    if (isLoading) return;
    if (error) {
      toast({
        title: "Error fetching Jobs!",
        description: error instanceof Error ? error.message : "Something went wrong.",
      });
    }
  }, [isLoading, error]);
  
  if (isLoading) return <div>Loading jobs...</div>;
  console.log(jobs);
  

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, you might refetch data or filter client-side
    setDisplayCount(6); // Reset display count when filters change
  };

  const clearFilters = () => {
    const resetFilters = {
      keyword: "",
      location: "",
      employmentType: "",
      experienceLevel: "",
      salaryRange: [50000, 150000],
    };
    setFilters(resetFilters);
    setDisplayCount(6);
  };

  // Client-side filtering function
  const filteredJobs = jobs?.filter(job => {
    // Keyword search (case-insensitive)
    if (filters.keyword && !`${job.title} ${job.company} ${job.tags.join(' ')}`.toLowerCase().includes(filters.keyword.toLowerCase())) {
      return false;
    }
    
    // Location filter
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // Employment type filter
    if (filters.employmentType && job.employmentType !== filters.employmentType) {
      return false;
    }
    
    // Experience level filter
    if (filters.experienceLevel) {
      // This is a simplified check - in a real app, you'd need more sophisticated matching
      if (!job.experienceLevel.toLowerCase().includes(filters.experienceLevel.toLowerCase())) {
        return false;
      }
    }
    
    // Salary range filter - parse the salary string to get min and max values
    // if (filters.salaryRange) {
    //   const salaryString = job.salary;
    //   // Extract numbers from the salary string
    //   const salaryMatch = salaryString.match(/\$(\d+(?:,\d+)*)/g);
    //   if (salaryMatch && salaryMatch.length >= 1) {
    //     // Take the first number as min salary
    //     const minSalary = parseInt(salaryMatch[0].replace(/[$,]/g, ''), 10);
    //     // Check if min salary is within or above the filter range
    //     if (minSalary < filters.salaryRange[0]) {
    //       return false;
    //     }
    //   }
    // }
    
    return true;
  });

  const displayedJobs = filteredJobs?.slice(0, displayCount);
  const hasMoreJobs = filteredJobs && displayCount < filteredJobs.length;


  const loadMoreJobs = () => {
    setDisplayCount(prev => prev + 6);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Next Opportunity</h1>
          <p className="text-gray-600 mb-8">Browse through all available jobs that match your skills and experience</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters - left sidebar */}
            <div className="lg:col-span-1">
              <JobFilters onFilterChange={handleFilterChange} />
            </div>
            
            {/* Job listings - main content */}
            <div className="lg:col-span-3">
              {/* {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="animate-pulse bg-white rounded-lg p-6 shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-md mr-3"></div>
                        <div className="flex-1">
                          <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                      </div>
                      <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
                    </div>
                  ))}
                </div>
              ) : filteredJobs?.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No jobs found</h3>
                  <p className="mt-2 text-gray-500">Try adjusting your filters to find more opportunities.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4" 
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </Button>
                </div>
              ) : ( */}
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {displayedJobs?.map(job => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                  
                  {hasMoreJobs && (
                    <div className="mt-10 text-center">
                      <Button 
                        variant="outline" 
                        className="border-job-blue text-job-blue hover:bg-job-blue hover:text-white"
                        onClick={loadMoreJobs}
                      >
                        Load More Jobs
                      </Button>
                    </div>
                  )}
                </>
              {/* )} */}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobsPage;