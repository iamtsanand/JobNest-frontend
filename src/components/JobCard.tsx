
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, CalendarIcon, DollarSign, Clock } from "lucide-react";
import { Job } from "@/types/userProfile";
import { format } from "date-fns";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  // Format the application deadline
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "Deadline not specified";
    }
  };

  return (
    <Card className="job-card border shadow-sm hover:border-job-blue overflow-hidden transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-md bg-gray-100 overflow-hidden mr-3 flex-shrink-0">
            <img
              src={job.logo}
              alt={job.company}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <Link to={`/jobs/${job.id}`} className="block">
              <h3 className="font-bold text-lg mb-1 hover:text-job-blue transition-colors line-clamp-2">
                {job.title}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm">{job.company}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-start">
            <MapPin className="w-4 h-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-600">{job.location}</p>
          </div>
          
          <div className="flex items-start">
            <DollarSign className="w-4 h-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-600">{job.salary}</p>
          </div>
          
          <div className="flex items-start">
            <Briefcase className="w-4 h-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-600">{job.employmentType}</p>
          </div>
          
          <div className="flex items-start">
            <CalendarIcon className="w-4 h-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-600">Apply by: {formatDate(job.applicationDeadline)}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {/* {job.tags.slice(0, 3).map((tag, i) => (
            <Badge key={i} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))} */}
          {/* {job.tags.length > 3 && (
            <Badge variant="outline" className="font-normal">
              +{job.tags.length - 3} more
            </Badge>
          )} */}
        </div>

        <Button className="w-full bg-job-blue hover:bg-job-darkBlue" asChild>
          <Link to={`/jobs/${job.id}`}>
            Apply Now
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;