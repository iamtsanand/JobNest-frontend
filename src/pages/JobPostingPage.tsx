
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/use-Auth";
import { Navigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

type JobFormData = {
  title: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  salary: string;
  applicationDeadline: Date;
  jobDescription: string;
  responsibilities: string[];
  requiredSkills: string[];
  benefits: string[];
  tags: string[];
};

const JobPostingPage = () => {
  const { isAuthenticated, profile } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<JobFormData>({
    defaultValues: {
      title: "",
      location: "",
      employmentType: "",
      experienceLevel: "",
      salary: "",
      jobDescription: "",
      responsibilities: [""],
      requiredSkills: [""],
      benefits: [""],
      tags: [""],
    },
  });

  // Redirect if user is not authenticated or not an employer
  if (!isAuthenticated || profile.role !== "recruiter") {
    return <Navigate to="/login" />;
  }

  const onSubmit = async (data: JobFormData) => {
    // Remove any empty array items
    const cleanedData = {
      ...data,
      responsibilities: data.responsibilities.filter(item => item.trim() !== ""),
      requiredSkills: data.requiredSkills.filter(item => item.trim() !== ""),
      benefits: data.benefits.filter(item => item.trim() !== ""),
      tags: data.tags.filter(item => item.trim() !== ""),
    };
    
    console.log("Form data:", cleanedData);
    
    
    try {
      await api.createJobPosting({
        title: cleanedData.title,
        description: cleanedData.jobDescription,
        location: cleanedData.location,
        salary: cleanedData.salary,
        type: cleanedData.employmentType,
        requiredSkills: cleanedData.requiredSkills,
        experienceLevel: cleanedData.experienceLevel,
        application_deadline: cleanedData.applicationDeadline
      }); 
      toast({
        title: "Job Posted Successfully!",
        description: "Your job listing is now live.",
      });
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong.";
      toast({
        title: "Job Posting failed!",
        description: errorMessage,
      });
    }
    
  };

//   List handlers for array fields
  const handleAddListItem = (fieldName: "responsibilities" | "requiredSkills" | "benefits" | "tags") => {
    const currentItems = form.getValues(fieldName);
    form.setValue(fieldName, [...currentItems, ""]);
  };

  const handleRemoveListItem = (fieldName: "responsibilities" | "requiredSkills" | "benefits" | "tags", index: number) => {
    const currentItems = form.getValues(fieldName);
    if (currentItems.length > 1) {
      const updatedItems = currentItems.filter((_, i) => i !== index);
      form.setValue(fieldName, updatedItems);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Post a New Job</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Job Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Senior Frontend Developer" {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. San Francisco, CA or Remote" {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="salary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary Range*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. $80,000 - $120,000" {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="employmentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employment Type*</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            required
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select employment type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Full-time">Full-time</SelectItem>
                              <SelectItem value="Part-time">Part-time</SelectItem>
                              <SelectItem value="Contract">Contract</SelectItem>
                              <SelectItem value="Freelance">Freelance</SelectItem>
                              <SelectItem value="Internship">Internship</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="experienceLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience Level*</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            required
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Entry Level">Entry Level</SelectItem>
                              <SelectItem value="Junior">Junior</SelectItem>
                              <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                              <SelectItem value="Senior">Senior</SelectItem>
                              <SelectItem value="Lead">Lead</SelectItem>
                              <SelectItem value="Executive">Executive</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="applicationDeadline"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Application Deadline*</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 6))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="jobDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the job role, responsibilities, and requiredSkills"
                            className="min-h-[150px]"
                            {...field}
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              {/* <Card>
                <CardHeader>
                  <CardTitle>Responsibilities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {form.watch("responsibilities").map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`responsibilities.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input 
                                placeholder="e.g. Develop user-facing features using React.js"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveListItem("responsibilities", index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="flex gap-1 items-center"
                    onClick={() => handleAddListItem("responsibilities")}
                  >
                    <Plus className="h-4 w-4" />
                    Add Responsibility
                  </Button>
                </CardContent>
              </Card> */}
              
              <Card>
                <CardHeader>
                  <CardTitle>Required Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {form.watch("requiredSkills").map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`requiredSkills.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input 
                                placeholder="e.g. React.js"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveListItem("requiredSkills", index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="flex gap-1 items-center"
                    onClick={() => handleAddListItem("requiredSkills")}
                  >
                    <Plus className="h-4 w-4" />
                    Add Requirement
                  </Button>
                </CardContent>
              </Card>
              
              {/* <Card>
                <CardHeader>
                  <CardTitle>Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {form.watch("benefits").map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`benefits.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input 
                                placeholder="e.g. Health, dental, and vision insurance"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveListItem("benefits", index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="flex gap-1 items-center"
                    onClick={() => handleAddListItem("benefits")}
                  >
                    <Plus className="h-4 w-4" />
                    Add Benefit
                  </Button>
                </CardContent>
              </Card> */}
              
              {/* <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {form.watch("tags").map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`tags.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input 
                                placeholder="e.g. React, TypeScript, Remote"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveListItem("tags", index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="flex gap-1 items-center"
                    onClick={() => handleAddListItem("tags")}
                  >
                    <Plus className="h-4 w-4" />
                    Add Tag
                  </Button>
                </CardContent>
              </Card> */}
              
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-job-blue hover:bg-job-darkBlue">
                  Post Job
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default JobPostingPage;