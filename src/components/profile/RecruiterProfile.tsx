const API_BASE_URL = "http://localhost:5000/api";
import React, { useState } from "react";
import { 
  Building, 
  FileText, 
  Briefcase, 
  Edit,
  Trash2,
  LogOut,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
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

const EmployerProfile = () => {
  const navigate = useNavigate();
  const { profile, isAuthenticated, token, logout } = useAuth();
  const user = profile;
  const pp_url = user.profile_pic
  ? `${API_BASE_URL.replace(/\/+$|\/+$/, '')}/${user.profile_pic.replace(/^\/+/, '')}`
  : null;
  console.log(pp_url);
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState(user);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  const handleEditProfile = () => {
    setIsEditing(true);
    setEditableUser({...user});
  };

  const handleSaveProfile = async () => {
    try {
      const payload = {
              phone: editableUser.phone ? editableUser.phone : null,
              company_id: profile.companyDetails !== "NA" ? profile.companyDetails.id : null,
              name: editableUser.name ? editableUser.name : null,
              company_name: editableUser.companyDetails !== "NA" ? editableUser.companyDetails.name: null,
              company_website: editableUser.companyDetails !== "NA" ? editableUser.companyDetails.website : null,
              company_description: editableUser.companyDetails !== "NA" ? editableUser.companyDetails.description : null,
              company_location: editableUser.companyDetails !== "NA" ? editableUser.companyDetails.location : null

            };
            console.log(payload);
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

  const handlePostNewJob = () => {
    navigate('/post-job');
  };

  const handleStatusChange = (applicantId: string, newStatus: string) => {
    // In a real app, you'd update this through an API
    toast({
      title: "Status updated",
      description: `Applicant status changed to ${newStatus}.`,
    });
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
            <Badge className="mt-2 bg-job-blue text-white w-fit">Recruiter</Badge>
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
                    </DialogDescription>createJobP
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
                
                {/* <div className="space-y-2">
                  <Label htmlFor="bio">Bio / Summary</Label>
                  <textarea 
                    id="bio" 
                    name="bio"
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    value={editableUser.bio} 
                    onChange={handleInputChange}
                  />
                </div> */}
                
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input 
                    id="companyName" 
                    name="companyDetails.name"
                    value={editableUser.companyDetails !== "NA" ? editableUser.companyDetails.name : null} 
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
                    value={editableUser.companyDetails !== "NA" ? editableUser.companyDetails.website : null} 
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
                  <Label htmlFor="location">Company Location</Label>
                  <Input 
                    id="location" 
                    name="location"
                    value={editableUser.companyDetails !== "NA" ? editableUser.companyDetails.location: null} 
                    onChange={(e) => setEditableUser({
                      ...editableUser, 
                      companyDetails: {
                        ...editableUser.companyDetails,
                        location: e.target.value
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
                    value={editableUser.companyDetails !== "NA" ? editableUser.companyDetails.description : null} 
                    onChange={(e) => setEditableUser({
                      ...editableUser, 
                      companyDetails: {
                        ...editableUser.companyDetails,
                        description: e.target.value
                      }
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
                <TabsTrigger value="jobs">Posted Jobs</TabsTrigger>
                <TabsTrigger value="applicants">Applicants</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Profile Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* <div>
                        <h3 className="text-lg font-medium">About</h3>
                        <p className="text-gray-600 mt-2">{user.bio}</p>
                      </div> */}
                      
                      <div>
                        <h3 className="text-lg font-medium">Company Details</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          {/* <img 
                            src={user.companyDetails.logo} 
                            alt={user.companyDetails.name}
                            className="w-16 h-16 rounded-md object-cover" 
                          /> */}
                          <div>
                            <p className="font-medium">{editableUser.companyDetails !== "NA" ? editableUser.companyDetails.name : null}</p>
                            <p className="font-sm text-gray-600">{editableUser.companyDetails !== "NA" ? editableUser.companyDetails.location : null}</p>
                            <a href={editableUser.companyDetails !== "NA" ? editableUser.companyDetails.website : null} className="text-job-blue text-sm hover:underline">
                              {editableUser.companyDetails !== "NA" ? editableUser.companyDetails.website : null}
                            </a>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-4">
                          {editableUser.companyDetails !== "NA" ? editableUser.companyDetails.description : null}
                        </p>
                      </div>
                      
                      {/* <div>
                        <h3 className="text-lg font-medium">Team Members</h3>
                        <div className="mt-2 space-y-3">
                          {user.teamMembers.map((member: any) => (
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
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="jobs">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Posted Jobs</CardTitle>
                    <CardDescription>Manage your job listings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Button className="bg-job-blue hover:bg-job-darkBlue" onClick={handlePostNewJob}>
                        <FileText className="mr-2 h-4 w-4"/> Post New Job
                      </Button>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Job Title</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Posted Date</TableHead>
                          <TableHead>Applicants</TableHead>
                          {/* <TableHead>Views</TableHead> */}
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                                {user.postedJobs.map((job) => (
                                  <TableRow key={job.id}>
                                    <TableCell className="font-medium">{job.title}</TableCell>
                                    <TableCell>{job.location}</TableCell>
                                    <TableCell>
                                    {new Date(job.created_at).toLocaleString(undefined, {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                      hour: "numeric",
                                      minute: "2-digit",
                                    })}
                                  </TableCell>
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
                                      <TableCell>
                                      {new Date(applicant.applied_at).toLocaleString(undefined, {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                      hour: "numeric",
                                      minute: "2-digit",
                                    })}
                                      </TableCell>
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
                                        <Button variant="outline" size="sm" /*onClick={handleFetchResume}*/>View CV</Button>
                                        <Button variant="outline" size="sm" /*onClick={handleContactApplicant}*/>Contact</Button>
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
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerProfile;