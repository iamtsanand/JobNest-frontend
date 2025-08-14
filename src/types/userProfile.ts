export interface Project {
    id: number;
    name: string;
    description: string;
    start_date: string;
    completion_date: string;
    github_link: string;
    deployment_link: string;
  }
  
  export interface Resume {
    id: number;
    file_name: string;
    file_path: string;
    uploaded_at: string;
  }
  
  export interface CompanyDetails {
    id: number;
    name: string;
    website: string;
    description: string;
    location: string;
    founded_year?: number;         // Optional if it might be null
    industry?: string;
    employees?: number;
    logo?: string;
    benefits?: string[];           // Parsed JSON array
    open_positions?: number;       // Count of open jobs
    featured_jobs?: {
      id: number;
      title: string;
      location: string;
      created_at: string;
      applications: number;
    }[];
  }
  
  export interface PostedJob {
    id: number;
    title: string;
    location: string;
    created_at: string;
  }
  
  export interface Applicant {
    id: number;
    job_id: number;
    status: string;
    applied_at: string;
    job_title: string;
    user_id: number;
    name: string;
    email: string;
  }
  
  export interface UserProfile {
    id: number;
    name: string;
    email: string;
    role: string;
    joined_at: string;
    profile_pic: string | null;
    phone: string;
    saved_jobs: number[] | 'NA';
    applied_jobs: number[] | 'NA';
    skills: string[] | 'NA';
    experience_level: string | 'NA';
    experience: string | 'NA';
    bio: string | 'NA';
    education: string | 'NA';
    social_links: string | 'NA';
    projects: Project[] | 'NA';
    resumes: Resume[] | 'NA';
    uploaded_jobs_id: number[] | 'NA';
    companyDetails: CompanyDetails | 'NA';
    postedJobs: PostedJob[] | 'NA';
    applicants: Applicant[] | 'NA';
  }
  
  

  export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    logo: string;
    tags: string[];
    posted?: string;
    postedDate: string;
    applicationDeadline: string;
    employmentType: string;
    experienceLevel: string;
    companyDescription: string;
    jobDescription: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
  }

export interface Employer {
  name: string;
  description: string;
  founded: string;
  headquarters: string;
  industry: string;
  employees: string;
  website: string;
  openPositions: number;
  logo: string;
  benefits: string[];
  featuredJobs: {
    id: string;
    title: string;
    location: string;
    applications: number;
  }[];
}