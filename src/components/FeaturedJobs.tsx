
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const featuredJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA (Remote)",
    salary: "$120,000 - $150,000",
    tags: ["React", "TypeScript", "5+ years"],
    posted: "2 days ago",
    logo: "https://picsum.photos/seed/tech1/200"
  },
  {
    id: 2,
    title: "Product Marketing Manager",
    company: "GrowthLabs",
    location: "New York, NY",
    salary: "$95,000 - $120,000",
    tags: ["Marketing", "SaaS", "Analytics"],
    posted: "1 day ago",
    logo: "https://picsum.photos/seed/growth2/200"
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "DataWorks",
    location: "Remote",
    salary: "$110,000 - $140,000",
    tags: ["Python", "ML", "Statistics"],
    posted: "3 days ago",
    logo: "https://picsum.photos/seed/data3/200"
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Creative Solutions",
    location: "Austin, TX (Hybrid)",
    salary: "$90,000 - $115,000",
    tags: ["Figma", "User Research", "Prototyping"],
    posted: "Just now",
    logo: "https://picsum.photos/seed/design4/200"
  }
];

const FeaturedJobs = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 bg-job-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-job-darkBlue mb-4">Featured Jobs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover opportunities from leading companies that match your skills and experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredJobs.map((job, index) => (
            <Card key={job.id} className="job-card border shadow-sm hover:border-job-blue overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden mr-3">
                    <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium text-job-darkBlue">{job.company}</h3>
                    <p className="text-xs text-gray-500">{job.posted}</p>
                  </div>
                </div>
                
                <h3 className="font-bold text-lg mb-2">{job.title}</h3>
                
                <div className="flex items-start mb-3">
                  <svg className="w-4 h-4 text-gray-500 mt-0.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <p className="text-sm text-gray-600">{job.location}</p>
                </div>
                
                <div className="flex items-start mb-4">
                  <svg className="w-4 h-4 text-gray-500 mt-0.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="text-sm text-gray-600">{job.salary}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-5">
                  {job.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="font-normal">{tag}</Badge>
                  ))}
                </div>
                
                <Button className="w-full bg-job-blue hover:bg-job-darkBlue btn-hover-effect">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" className="font-medium border-job-blue text-job-blue hover:bg-job-blue hover:text-white" onClick={() => navigate('/all-jobs')}>
            <Briefcase className="mr-2 h-4 w-4" />
            View All Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
