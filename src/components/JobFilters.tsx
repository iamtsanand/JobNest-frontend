
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface JobFiltersProps {
  onFilterChange: (filters) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    employmentType: "",
    experienceLevel: "",
    salaryRange: [50000, 150000],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleSliderChange = (values: number[]) => {
    setFilters({ ...filters, salaryRange: values });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
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
    onFilterChange(resetFilters);
  };

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="keyword">Search by Keyword</Label>
            <Input
              id="keyword"
              name="keyword"
              placeholder="Job title, company, skills..."
              value={filters.keyword}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="City, state, or 'Remote'"
              value={filters.location}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <Label htmlFor="employmentType">Employment Type</Label>
            <Select 
              value={filters.employmentType}
              onValueChange={(value) => handleSelectChange("employmentType", value)}
            >
              <SelectTrigger id="employmentType">
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Temporary">Temporary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="experienceLevel">Experience Level</Label>
            <Select
              value={filters.experienceLevel}
              onValueChange={(value) => handleSelectChange("experienceLevel", value)}
            >
              <SelectTrigger id="experienceLevel">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Levels</SelectItem>
                <SelectItem value="Entry">Entry Level</SelectItem>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Mid">Mid-Level</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
                <SelectItem value="Lead">Lead/Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="mb-2 block">Salary Range</Label>
            <div className="pt-2 px-2">
              <Slider
                defaultValue={filters.salaryRange}
                min={30000}
                max={250000}
                step={5000}
                onValueChange={handleSliderChange}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>${filters.salaryRange[0].toLocaleString()}</span>
              <span>${filters.salaryRange[1].toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1 bg-job-blue hover:bg-job-darkBlue">
              Apply Filters
            </Button>
            <Button type="button" variant="outline" onClick={clearFilters}>
              Clear
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobFilters;