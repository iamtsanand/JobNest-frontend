import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-Auth";
import Navbar from "@/components/Navbar";
import JobSeekerProfile from "@/components/profile/JobSeekerProfile";
import RecruiterProfile from "@/components/profile/RecruiterProfile";

const Profile = () => {
  const { isAuthenticated, profile } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        {profile.role === "job_seeker" ? (
          <JobSeekerProfile />
        ) : profile.role === "recruiter" ? (
          <RecruiterProfile />
        ) : (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-800">Unknown user role</h2>
            <p className="text-gray-600 mt-2">Please log out and log back in.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;