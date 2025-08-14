

import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Briefcase, Users, User, Edit, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/use-Auth";


const EmployerPage = () => {
  const { isAuthenticated, profile } = useAuth();
  const navigate = useNavigate();
    const employer = profile.companyDetails;

  const handlePostJob = () => {
    if (!isAuthenticated) {
      toast("Please sign in as an employer", {
        description: "You need an employer account to post jobs",
        action: {
          label: "Sign In",
          onClick: () => window.location.href = "/login",
        },
      });
      return;
    }

    if (profile.role !== "recruiter") {
      toast("Only employers can post jobs", {
        description: "You need an employer account to post jobs",
      });
      return;
    }

    navigate('/post-job');
  };

  const handleJoinTeam = () => {
    if (!isAuthenticated) {
      toast("Please sign in first", {
        description: "You need an account to join as a recruiter",
        action: {
          label: "Sign In",
          onClick: () => window.location.href = "/login",
        },
      });
      return;
    }

    toast("Feature coming soon", {
      description: "Team joining functionality will be available soon!",
    });
  };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="container mx-auto py-16 px-4">
//           <div className="flex flex-col items-center justify-center h-[50vh]">
//             <div className="animate-pulse w-full max-w-4xl">
//               <div className="h-20 bg-gray-200 rounded-md mb-8"></div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="h-64 bg-gray-200 rounded-md"></div>
//                 <div className="h-64 bg-gray-200 rounded-md md:col-span-2"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

  if (!employer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-16 px-4">
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Employer Not Found</h2>
            <p className="text-gray-600 mb-8">We couldn't find the employer information.</p>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-white shadow-sm">
        <div className="container mx-auto py-12 px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-lg bg-white shadow-md overflow-hidden flex-shrink-0">
              <img src={employer.logo} alt={employer.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{employer.name}</h1>
              <p className="text-lg text-gray-600 mt-2">{employer.description}</p>
              <div className="flex flex-wrap gap-6 mt-4 justify-center md:justify-start">
                <div>
                  <span className="text-gray-500">Founded</span>
                  <p className="font-medium">{employer.founded}</p>
                </div>
                <div>
                  <span className="text-gray-500">Headquarters</span>
                  <p className="font-medium">{employer.location}</p>
                </div>
                <div>
                  <span className="text-gray-500">Industry</span>
                  <p className="font-medium">{employer.industry}</p>
                </div>
                <div>
                  <span className="text-gray-500">Team Size</span>
                  <p className="font-medium">{employer.employees}</p>
                </div>
                <div>
                  <span className="text-gray-500">Open Positions</span>
                  <p className="font-medium">{employer.open_positions}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col gap-3">
              <Button className="bg-job-blue hover:bg-job-darkBlue" onClick={handlePostJob}>
                <Plus className="w-4 h-4 mr-2" />
                Post a Job
              </Button>
              <Button variant="outline" className="border-job-blue text-job-blue hover:bg-job-blue hover:text-white" asChild>
                <a href={employer.website} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-12 px-4">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex mb-8">
            <TabsTrigger value="about">
              <User className="w-4 h-4 mr-2" />
              About
            </TabsTrigger>
            <TabsTrigger value="jobs">
              <Briefcase className="w-4 h-4 mr-2" />
              Jobs
            </TabsTrigger>
            <TabsTrigger value="team">
              <Users className="w-4 h-4 mr-2" />
              Team
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">About {employer.name}</h2>
                <Separator className="mb-4" />
                
                <p className="text-gray-700">
                  {employer.name} is a {employer.industry} company founded in {employer.founded}. 
                  With a team of {employer.employees} talented professionals based in {employer.location}, 
                  we're dedicated to delivering exceptional products and services to our clients worldwide.
                </p>
                
                <p className="text-gray-700 mt-4">
                  Our mission is to revolutionize the industry through innovative technology solutions
                  that solve real-world problems. We believe in fostering a culture of creativity, 
                  collaboration, and continuous learning.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Why Work With Us</h2>
                <Separator className="mb-4" />
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Benefits & Perks</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {employer.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center mr-2 mt-0.5">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8">
                  <Button className="bg-job-blue hover:bg-job-darkBlue" onClick={handleJoinTeam}>
                    Join Our Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Open Positions</h2>
              <Button className="bg-job-blue hover:bg-job-darkBlue" onClick={handlePostJob}>
                <Plus className="w-4 h-4 mr-2" />
                Post a Job
              </Button>
            </div>
            
            {employer.featured_jobs.map((job) => (
              <Card key={job.id} className="border hover:border-job-blue transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-gray-600">
                        <span className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {employer.name}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {job.applications} applicants
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {isAuthenticated && profile.role === "recruiter" && (
                        <Button variant="outline" size="sm" className="border-gray-300">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      )}
                      <Button 
                        className="bg-job-blue hover:bg-job-darkBlue" 
                        size="sm" 
                        asChild
                      >
                        <Link to={`/jobs/${job.id}`}>
                          View Job
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="border-job-blue text-job-blue hover:bg-job-blue hover:text-white">
                View All Jobs
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Our Team</h2>
                <Separator className="mb-4" />
                
                <p className="text-gray-700 mb-6">
                  Our diverse team of professionals is dedicated to creating exceptional experiences for both job seekers and employers.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Team members would be displayed here */}
                  <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg border border-dashed border-gray-300">
                    <div className="text-center p-6">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">Join Our Team</h3>
                      <p className="mt-1 text-sm text-gray-500">We're always looking for talented people</p>
                      <Button 
                        className="mt-4 bg-job-blue hover:bg-job-darkBlue"
                        onClick={handleJoinTeam}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default EmployerPage;