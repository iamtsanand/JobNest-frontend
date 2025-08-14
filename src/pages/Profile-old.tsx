import { useAuth } from '@/hooks/use-Auth';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Building, 
  FileText, 
  Briefcase, 
  Settings, 
  LogOut,
  Upload,
  Trash2,
  Edit,
  Save,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock user data
// const mockUser = {
//   name: "Alex Johnson",
//   email: "alex@example.com",
//   role: "job_seeker", // or "recruiter"
//   profilePicture: "https://github.com/shadcn.png",
//   bio: "Experienced software developer with 5+ years of experience in React and TypeScript.",
//   skills: ["React", "TypeScript", "Node.js", "UI/UX", "API Integration"],
//   education: [
//     {
//       degree: "BSc Computer Science",
//       institution: "University of Technology",
//       year: "2018 - 2022",
//     }
//   ],
//   experience: [
//     {
//       position: "Frontend Developer",
//       company: "Tech Solutions Inc.",
//       duration: "2022 - Present",
//       description: "Developing and maintaining React applications.",
//     },
//     {
//       position: "Web Developer Intern",
//       company: "Digital Agency",
//       duration: "2021 - 2022",
//       description: "Assisted in building responsive websites for clients.",
//     }
//   ],
//   social_links: {
//     linkedin: "https://linkedin.com/in/alexjohnson",
//     github: "https://github.com/alexj",
//     portfolio: "https://alexj.dev",
//   },
//   savedJobs: [
//     {
//       id: "1",
//       title: "Senior React Developer",
//       company: "InnoTech Solutions",
//       location: "San Francisco, CA",
//       postedDate: "2 days ago",
//     },
//     {
//       id: "2",
//       title: "UI/UX Designer",
//       company: "Creative Studio",
//       location: "Remote",
//       postedDate: "1 week ago",
//     }
//   ],
//   appliedJobs: [
//     {
//       id: "3",
//       title: "Full Stack Developer",
//       company: "Tech Innovators",
//       location: "New York, NY",
//       appliedDate: "2023-04-15",
//       status: "Interview",
//     },
//     {
//       id: "4",
//       title: "Frontend Engineer",
//       company: "WebApp Inc.",
//       location: "Boston, MA",
//       appliedDate: "2023-04-10",
//       status: "Pending",
//     }
//   ],
//   // recruiter specific fields
//   companyDetails: {
//     name: "Tech Solutions Inc.",
//     logo: "https://github.com/shadcn.png",
//     website: "https://techsolutions.com",
//     description: "Leading provider of innovative tech solutions.",
//   },
//   postedJobs: [
//     {
//       id: "101",
//       title: "Senior React Developer",
//       location: "San Francisco, CA",
//       postedDate: "2023-04-15",
//       applicants: 12,
//       views: 145,
//     },
//     {
//       id: "102",
//       title: "UI/UX Designer",
//       location: "Remote",
//       postedDate: "2023-04-10",
//       applicants: 8,
//       views: 97,
//     }
//   ],
//   applicants: [
//     {
//       id: "a1",
//       name: "Sarah Wilson",
//       email: "sarah@example.com",
//       jobId: "101",
//       jobTitle: "Senior React Developer",
//       appliedDate: "2023-04-16",
//       status: "Shortlisted",
//     },
//     {
//       id: "a2",
//       name: "Michael Brown",
//       email: "michael@example.com",
//       jobId: "101",
//       jobTitle: "Senior React Developer",
//       appliedDate: "2023-04-17",
//       status: "Pending",
//     },
//     {
//       id: "a3",
//       name: "Emily Davis",
//       email: "emily@example.com",
//       jobId: "102",
//       jobTitle: "UI/UX Designer",
//       appliedDate: "2023-04-11",
//       status: "Interview",
//     }
//   ],
//   teamMembers: [
//     {
//       id: "t1",
//       name: "John Doe",
//       email: "john@techsolutions.com",
//       role: "HR Manager",
//     },
//     {
//       id: "t2",
//       name: "Lisa Smith",
//       email: "lisa@techsolutions.com",
//       role: "Recruiter",
//     }
//   ]
// };



const Profile = () => {

  const { profile, isAuthenticated, logout } = useAuth();
  const userData = profile;
  useEffect(() => {
    if (profile) {
      console.log("User profile:", profile);
    }
  }, [profile]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState(user);
  const [activeTab, setActiveTab] = useState("overview");
  
  // This would normally come from authentication context
  const userRole = user.role; // "job_seeker" or "recruiter"

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditableUser({...user});
  };

  const handleSaveProfile = () => {
    setUser(editableUser);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditableUser(user);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableUser({
      ...editableUser,
      [name]: value,
    });
  };

  const handleLogout = () => {
    logout(); // ✅ Clear auth token and user state
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deleted",
      description: "Your account has been deleted successfully.",
      variant: "destructive",
    });
    navigate("/register");
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      toast({
        title: "Resume uploaded",
        description: "Your resume has been uploaded successfully.",
      });
    }
  };

  const handleFetchResume = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      toast({
        title: "Resume uploaded",
        description: "Your resume has been uploaded successfully.",
      });
    }
  };
  const handleContactApplicant = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      toast({
        title: "Resume uploaded",
        description: "Your resume has been uploaded successfully.",
      });
    }
  };

  

  const handleStatusChange = (applicantId: string, newStatus: string) => {
    // In a real app, you'd update this through an API
    toast({
      title: "Status updated",
      description: `Applicant status changed to ${newStatus}.`,
    });
  };

  const handleWithdrawApplication = (jobId: string) => {
    // In a real app, you'd call an API to withdraw
    toast({
      title: "Application withdrawn",
      description: "Your application has been withdrawn.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <Card className="shadow-md">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-24 h-24 border-2 border-job-blue">
                    <img 
                      src={user.profile_picture} 
                      alt={user.name} 
                      className="rounded-full object-cover w-full h-full" 
                    />
                  </Avatar>
                </div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <Badge className="mt-2 bg-job-blue text-white w-fit">{user.role == 'job_seeker'? 'Job Seeker' : 'Employer'}</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button onClick={handleEditProfile} className="w-full gap-2" variant="outline">
                    <Edit size={16} />
                    Edit Profile
                  </Button>
                  
                  <Button onClick={handleLogout} className="w-full gap-2" variant="outline">
                    <LogOut size={16} />
                    Logout
                  </Button>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Button asChild variant="ghost" className="w-full justify-start gap-2 text-gray-600">
                      <div>
                        <Settings size={16} />
                        Notification Settings
                      </div>
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="w-full gap-2">
                        <Trash2 size={16} />
                        Delete Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDeleteAccount}>Yes, Delete Account</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-2">
            {isEditing ? (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name"
                        value={editableUser.name} 
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        value={editableUser.email} 
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio / Summary</Label>
                      <textarea 
                        id="bio" 
                        name="bio"
                        className="w-full min-h-[100px] p-2 border rounded-md"
                        value={editableUser.bio} 
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    {userRole === "recruiter" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Company Name</Label>
                          <Input 
                            id="companyName" 
                            name="companyDetails.name"
                            value={editableUser.companyDetails.name} 
                            onChange={(e) => setEditableUser({
                              ...editableUser, 
                              companyDetails: {
                                ...editableUser.companyDetails,
                                name: e.target.value
                              }
                            })}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="website">Company Website</Label>
                          <Input 
                            id="website" 
                            name="website"
                            value={editableUser.companyDetails.website} 
                            onChange={(e) => setEditableUser({
                              ...editableUser, 
                              companyDetails: {
                                ...editableUser.companyDetails,
                                website: e.target.value
                              }
                            })}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="companyDescription">Company Description</Label>
                          <textarea 
                            id="companyDescription" 
                            name="companyDescription"
                            className="w-full min-h-[100px] p-2 border rounded-md"
                            value={editableUser.companyDetails.description} 
                            onChange={(e) => setEditableUser({
                              ...editableUser, 
                              companyDetails: {
                                ...editableUser.companyDetails,
                                description: e.target.value
                              }
                            })}
                          />
                        </div>
                      </>
                    )}
                    
                    {userRole === "job_seeker" && (
                      <div className="space-y-2">
                        <Label htmlFor="skills">Skills (comma separated)</Label>
                        <Input 
                          id="skills" 
                          name="skills"
                          value={editableUser.skills.join(", ")} 
                          onChange={(e) => setEditableUser({
                            ...editableUser,
                            skills: e.target.value.split(", ").map(skill => skill.trim())
                          })}
                        />
                      </div>
                    )}
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="space-y-6">
                <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    
                    {userRole === "job_seeker" ? (
                      <>
                        <TabsTrigger value="resume">Resume</TabsTrigger>
                        <TabsTrigger value="applications">Applications</TabsTrigger>
                      </>
                    ) : (
                      <>
                        <TabsTrigger value="jobs">Posted Jobs</TabsTrigger>
                        <TabsTrigger value="applicants">Applicants</TabsTrigger>
                      </>
                    )}
                  </TabsList>
                  
                  <TabsContent value="overview">
                    <Card className="shadow-md">
                      <CardHeader>
                        <CardTitle>Profile Overview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* Common info for both roles */}
                          <div>
                            <h3 className="text-lg font-medium">About</h3>
                            <p className="text-gray-600 mt-2">{user.bio}</p>
                          </div>
                          
                          {userRole === "job_seeker" && (
                            <>
                              <div>
                                <h3 className="text-lg font-medium">Skills</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {user.skills.map((skill, index) => (
                                    <Badge key={index} variant="outline" className="bg-gray-100">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="text-lg font-medium">Education</h3>
                                <div className="space-y-3 mt-2">
                                  {user.education.map((edu, index) => (
                                    <div key={index} className="border-l-2 border-job-blue pl-4">
                                      <h4 className="font-medium">{edu.degree}</h4>
                                      <p className="text-gray-600">{edu.institution}</p>
                                      <p className="text-sm text-gray-500">{edu.year}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="text-lg font-medium">Work Experience</h3>
                                <div className="space-y-4 mt-2">
                                  {user.experience.map((exp, index) => (
                                    <div key={index} className="border-l-2 border-job-blue pl-4">
                                      <h4 className="font-medium">{exp.title}</h4>
                                      <p className="text-gray-600">{exp.company}</p>
                                      <p className="text-sm text-gray-500">{exp.duration}</p>
                                      <p className="text-sm mt-1">{exp.description}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h3 className="text-lg font-medium">Projects</h3>
                                <div className="space-y-4 mt-2">
                                  {user.projects.map((pjts, index) => (
                                    <div key={index} className="border-l-2 border-job-blue pl-4">
                                      <h4 className="font-medium">{pjts.name}</h4>
                                      <p className="text-job-blue text-sm hover:underline">Repo : {pjts.github_link}</p>
                                      <p className="text-job-blue text-sm hover:underline">Live : {pjts.deployment_link}</p>
                                      <p className="text-gray-600">{pjts.completion_date}</p>
                                      <p className="text-sm mt-1">{pjts.description}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="text-lg font-medium">Social Links</h3>
                                <div className="flex space-x-4 mt-2">
                                  <Button variant="outline" size="sm" asChild>
                                    <a href={user.social_links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                  </Button>
                                  <Button variant="outline" size="sm" asChild>
                                    <a href={user.social_links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                                  </Button>
                                  <Button variant="outline" size="sm" asChild>
                                    <a href={user.social_links.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a>
                                  </Button>
                                </div>
                              </div>
                            </>
                          )}
                          
                          {userRole === "recruiter" && (
                            <>
                              <div>
                                <h3 className="text-lg font-medium">Company Details</h3>
                                <div className="flex items-center space-x-4 mt-2">
                                  {/* <img 
                                    src={user.companyDetails.logo} 
                                    alt={user.companyDetails.name}
                                    className="w-16 h-16 rounded-md object-cover" 
                                  /> */}
                                  <div>
                                    <p className="font-medium">{user.companyDetails.name}</p>
                                    <p className="font-sm text-gray-600">{user.companyDetails.location}</p>
                                    <a href={user.companyDetails.website} className="text-job-blue text-sm hover:underline">
                                      {user.companyDetails.website}
                                    </a>
                                  </div>
                                </div>
                                <p className="text-gray-600 mt-4">
                                  {user.companyDetails.description}
                                </p>
                              </div>
                              
                              {/* <div>
                                <h3 className="text-lg font-medium">Team Members</h3>
                                <div className="mt-2 space-y-3">
                                  {user.teamMembers.map((member) => (
                                    <div key={member.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                                      <div>
                                        <p className="font-medium">{member.name}</p>
                                        <p className="text-gray-600 text-sm">{member.email}</p>
                                      </div>
                                      <Badge>{member.role}</Badge>
                                    </div>
                                  ))}
                                </div>
                              </div> */}
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  {userRole === "job_seeker" && (
                    <>
                      <TabsContent value="resume">
                        <Card className="shadow-md">
                          <CardHeader>
                            <CardTitle>Resume / CV</CardTitle>
                            <CardDescription>Upload and manage your resume here</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-6">
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <input 
                                  type="file" 
                                  id="resume-upload" 
                                  className="hidden"
                                  accept=".pdf,.doc,.docx" 
                                  onChange={handleResumeUpload}
                                />
                                <label htmlFor="resume-upload" className="cursor-pointer">
                                  <div className="flex flex-col items-center">
                                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                    <p className="text-sm font-medium mb-1">Drop your resume here, or click to browse</p>
                                    <p className="text-xs text-gray-500">Supports PDF, DOC, DOCX (Max 5MB)</p>
                                  </div>
                                </label>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium mb-4">Resume Preview</h4>
                                <div className="p-4 bg-gray-100 rounded-md text-center">
                                  <p>No resume uploaded yet</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="applications">
                        <Card className="shadow-md">
                          <CardHeader>
                            <CardTitle>Job Applications</CardTitle>
                            <CardDescription>Track your job application status</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-lg font-medium mb-4">Applied Jobs</h4>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Job Title</TableHead>
                                      <TableHead>Company</TableHead>
                                      <TableHead>Applied Date</TableHead>
                                      <TableHead>Status</TableHead>
                                      <TableHead>Action</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                  {user.applied_jobs.map((application) => (
                                    <TableRow key={application.id}>
                                      <TableCell className="font-medium">{application.job.title}</TableCell>
                                      <TableCell>{application.job.company}</TableCell>
                                      <TableCell>{new Date(application.applied_at).toLocaleDateString()}</TableCell>
                                      <TableCell>
                                        <Badge className={
                                          application.status === "Interview" ? "bg-green-100 text-green-800" : 
                                          application.status === "Rejected" ? "bg-red-100 text-red-800" : 
                                          "bg-yellow-100 text-yellow-800"
                                        }>
                                          {application.status}
                                        </Badge>
                                      </TableCell>
                                      <TableCell>
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          onClick={() => handleWithdrawApplication(application.id)}
                                        >
                                          Withdraw
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}

                                  </TableBody>
                                </Table>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium mb-4">Saved Jobs</h4>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Job Title</TableHead>
                                      <TableHead>Company</TableHead>
                                      <TableHead>Location</TableHead>
                                      <TableHead>Posted</TableHead>
                                      <TableHead>Action</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {user.saved_jobs.map((job) => (
                                      <TableRow key={job.id}>
                                        <TableCell className="font-medium">{job.title}</TableCell>
                                        <TableCell>{job.company}</TableCell>
                                        <TableCell>{job.location}</TableCell>
                                        <TableCell>{job.postedDate}</TableCell>
                                        <TableCell>
                                          <Button variant="outline" size="sm">View Job</Button>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </>
                  )}
                  
                  {userRole === "recruiter" && (
                    <>
                      <TabsContent value="jobs">
                        <Card className="shadow-md">
                          <CardHeader>
                            <CardTitle>Posted Jobs</CardTitle>
                            <CardDescription>Manage your job listings</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-4">
                              <Button className="bg-job-blue hover:bg-job-darkBlue">
                                <FileText className="mr-2 h-4 w-4" /> Post New Job
                              </Button>
                            </div>
                            
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Job Title</TableHead>
                                  <TableHead>Location</TableHead>
                                  <TableHead>Posted Date</TableHead>
                                  <TableHead>Applicants</TableHead>
                                  <TableHead>Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {user.postedJobs.map((job) => (
                                  <TableRow key={job.id}>
                                    <TableCell className="font-medium">{job.title}</TableCell>
                                    <TableCell>{job.location}</TableCell>
                                    <TableCell>{job.created_at}</TableCell>
                                    <TableCell>
                                      {job.applicants.length > 0 ? (
                                        <ul>
                                          {job.applicants.map((applicant) => (
                                            <li key={applicant.user_id}>{applicant.user_name}</li>
                                          ))}
                                        </ul>
                                      ) : (
                                        "No applicants"
                                      )}
                                    </TableCell>
                                    <TableCell className="flex space-x-2">
                                      <Button variant="outline" size="sm">Edit</Button>
                                      <Button variant="outline" size="sm">View</Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="applicants">
                        <Card className="shadow-md">
                          <CardHeader>
                            <CardTitle>Applicant Tracking</CardTitle>
                            <CardDescription>Manage applications for your job listings</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Job Title</TableHead>
                                  <TableHead>Applied Date</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead>Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                              {user.postedJobs.map((job) =>
                                job.applicants.length > 0 ? (
                                  job.applicants.map((applicant) => (
                                    <TableRow key={`${job.id}-${applicant.user_id}`}>
                                      <TableCell className="font-medium">{applicant.user_name}</TableCell>
                                      <TableCell>{job.title}</TableCell>
                                      <TableCell>{applicant.applied_at}</TableCell>
                                      <TableCell>
                                        <select
                                          className="border rounded p-1 text-sm"
                                          value={applicant.status}
                                          onChange={(e) => handleStatusChange(applicant.user_id, e.target.value)}
                                        >
                                          <option value="Pending">Pending</option>
                                          <option value="Shortlisted">Shortlisted</option>
                                          <option value="Interview">Interview</option>
                                          <option value="Rejected">Rejected</option>
                                        </select>
                                      </TableCell>
                                      <TableCell className="flex space-x-2">
                                        <Button variant="outline" size="sm" onClick={handleFetchResume}>View CV</Button>
                                        <Button variant="outline" size="sm"onClick={handleContactApplicant}>Contact</Button>
                                      </TableCell>
                                    </TableRow>
                                  ))
                                ) : (
                                  <TableRow key={job.id}>
                                    <TableCell colSpan={5}>No applicants for {job.title}</TableCell>
                                  </TableRow>
                                )
                              )}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </>
                  )}
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;



