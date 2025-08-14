const API_BASE_URL = "http://localhost:5000/api";
import React, { useState } from "react";
import { 
  User, 
  FileText, 
  Edit,
  Upload,
  Trash2,
  Save,
  LogOut,
  Settings,
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
import { useAuth } from "@/hooks/use-Auth";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/lib/api";
import { handleResumeUpload } from "@/lib/api";

const JobSeekerProfile = () => {
  const { profile, token, logout } = useAuth();
  const user = profile;
 const pp_url = user.profile_pic
  ? `${API_BASE_URL.replace(/\/+$|\/+$/, '')}/${user.profile_pic.replace(/^\/+/, '')}`
  : null;
  // console.log(profile);
  const [resumePath, setResumePath] = useState<string | null>(null);
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState(user);
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleEditProfile = () => {
    setIsEditing(true);
    setEditableUser({...user});
  };

  const handleSaveProfile = async () => {
    try {
      const payload = {
              name: editableUser.name,
              email: editableUser.email,
              bio: editableUser.bio,
              skills: editableUser.skills,
              experience_level: 'redacted functionality',
              education: editableUser.education,
              experience: editableUser.experience,
              phone: editableUser.phone,
              social_links: editableUser.social_links,
            };
  
      await api.updateProfile(payload);
  
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
  
      setEditableUser(editableUser);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast({
        title: "Update failed",
        description: err.message || "Could not update profile.",
        variant: "destructive",
      });
    }
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

  // const handleDeleteAccount = () => {
  //   toast({
  //     title: "Account deleted",
  //     description: "Your account has been deleted successfully.",
  //     variant: "destructive",
  //   });
  //   logout();
  // };

  const handleResumeUploadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
  
      try {
        const path = await handleResumeUpload(file);
        setResumePath(path);
        toast({
          title: "Resume uploaded",
          description: "Your resume has been uploaded successfully.",
        });
      } catch (error) {
        toast({
          title: "Upload failed",
          description: error.message || "Could not upload resume.",
          variant: "destructive",
        });
      }
    }
  };

  const handleWithdrawApplication = (jobId: string) => {
          api.withdrawApplication({
            jobId: jobId
          }); 
    toast({
      title: "Application withdrawn",
      description: "Your application has been withdrawn.",
    });
  };

  const handleGetResume = (filePath: string) => {
    const fullUrl = `http://localhost:5000/api${filePath}`; // Assuming /uploads/resumes/xyz.pdf
  
    // Open in new tab or trigger download
    window.open(fullUrl, '_blank');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Profile Sidebar */}
      <div className="md:col-span-1">
        <Card className="shadow-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="w-24 h-24 border-2 border-job-blue">
                <img 
                  src={pp_url} 
                  alt={user.name} 
                  className="rounded-full object-cover w-full h-full" 
                />
              </Avatar>
            </div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
            <Badge className="mt-2 bg-job-blue text-white w-fit">Job Seeker</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button onClick={handleEditProfile} className="w-full gap-2" variant="outline">
                <Edit size={16} />
                Edit Profile
              </Button>
              
              <Button onClick={logout} className="w-full gap-2" variant="outline">
                <LogOut size={16} />
                Logout
              </Button>
              
              {/* <Separator />
              
              <div className="space-y-2">
                <Button asChild variant="ghost" className="w-full justify-start gap-2 text-gray-600">
                  <div>
                    <Settings size={16} />
                    Notification Settings
                  </div>
                </Button>
              </div>
              
              <Separator /> */}
              
              {/* <Dialog>
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
                    <Button variant="outline" onClick={() => {}}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDeleteAccount}>Yes, Delete Account</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog> */}
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
                  <Label htmlFor="bio">About</Label>
                  <textarea 
                    id="bio" 
                    name="bio"
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    value={editableUser.bio} 
                    onChange={handleInputChange}
                  />
                </div>
                
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
                <TabsTrigger value="resume">Resume</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Profile Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">About</h3>
                        <p className="text-gray-600 mt-2">{user.bio}</p>
                      </div>
                      
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
                          {user.education.map((edu: any, index: number) => (
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
                          {user.experience.map((exp: any, index: number) => (
                            <div key={index} className="border-l-2 border-job-blue pl-4">
                              <h4 className="font-medium">{exp.position}</h4>
                              <p className="text-gray-600">{exp.company}</p>
                              <p className="text-sm text-gray-500">{exp.duration}</p>
                              <p className="text-sm mt-1">{exp.description}</p>
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

                      <div>
                        <h3 className="text-lg font-medium">Contact</h3>
                        <div className="space-y-4 mt-2">
                          <h4 className="font-sm">Phone: <span className="text-blue-500">{user.phone}</span></h4>
                        </div>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
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
                          onChange={handleResumeUploadChange}
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
                          <div className="space-y-4">

                          
                          {user.resumes.map((exp, index) => {
                            const fileName = exp.file_path.split("/").pop(); // e.g., "resume-10-1746400463286.pdf"
                            
                            // Extract the timestamp (assuming it's after the last hyphen and before `.pdf`)
                            const timestampMatch = fileName?.match(/-(\d+)\.pdf$/);
                            const timestamp = timestampMatch ? parseInt(timestampMatch[1], 10) : null;

                            // Format the timestamp if valid
                            const formattedDate = timestamp
                              ? new Date(timestamp).toLocaleString(undefined, {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit",
                                })
                              : "Unknown date";

                            return (
                              <div key={index} className="border-l-2 border-job-blue pl-4">
                                <Button variant="default" className="w-full gap-2" onClick={() => handleGetResume(exp.file_path)}>
                                  {`Uploaded at ${formattedDate}`}
                                </Button>
                              </div>
                            );
                          })}
                        </div>
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
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSeekerProfile;