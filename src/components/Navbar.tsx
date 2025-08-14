
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "@/hooks/use-Auth";


const Navbar = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const { isAuthenticated, profile, logout } = useAuth();
  // console.log('from navbar:', isAuthenticated);
  
  // Check if we're on login/register pages to hide those links
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-job-blue">
              <span className="text-job-darkBlue">Job</span>
              <span className="text-job-lightBlue">Nest</span>
            </Link>
          </div>
          
          {!isMobile ? (
            <div className="flex space-x-8">
              <Link to="/all-jobs" className="text-gray-600 hover:text-job-blue transition-colors">
                Find Jobs
              </Link>
              {/* <Link to="/" className="text-gray-600 hover:text-job-blue transition-colors">
                Companies
              </Link>
              <Link to="/" className="text-gray-600 hover:text-job-blue transition-colors">
                Resources
              </Link>*/
              <Link to="/employer" className="text-gray-600 hover:text-job-blue transition-colors">
                For Employers
              </Link>}
            </div>
          ) : null}

          <div className="flex items-center">
            {!isMobile ? (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center gap-4">
                    <Link to="/profile" className="text-gray-700 hover:text-job-blue flex items-center gap-1">
                      <User size={18} />
                      {profile?.name || "Profile"}
                    </Link>
                    <Button variant="ghost" onClick={logout}>
                      Logout
                    </Button>
                  </div>

                ) : (
                  !isAuthPage && (
                    <>
                      <Button variant="ghost" className="mr-2" asChild>
                        <Link to="/login">Sign In</Link>
                      </Button>
                      <Button className="bg-job-blue hover:bg-job-darkBlue" asChild>
                        <Link to="/register">Register</Link>
                      </Button>
                    </>
                  )
                )}
              </>
            ) : (
              <button onClick={toggleMobileMenu} className="text-gray-600">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="bg-white shadow-lg rounded-b-lg animate-fade-in">
          <div className="px-4 py-2 space-y-3">
            {/* <Link to="/" className="block text-gray-600 hover:text-job-blue transition-colors py-2">
              Find Jobs
            </Link>
            <Link to="/" className="block text-gray-600 hover:text-job-blue transition-colors py-2">
              Companies
            </Link>
            <Link to="/" className="block text-gray-600 hover:text-job-blue transition-colors py-2">
              Resources
            </Link>
            <Link to="/" className="block text-gray-600 hover:text-job-blue transition-colors py-2">
              For Employers
            </Link> */}
            
            {isAuthenticated ? (
              <Link to="/profile" className="block text-gray-600 hover:text-job-blue transition-colors py-2">
                Profile
              </Link>
            ) : (
              !isAuthPage && (
                <div className="pt-2 pb-3 border-t border-gray-200 flex flex-col space-y-2">
                  <Button variant="ghost" className="justify-center" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button className="bg-job-blue hover:bg-job-darkBlue justify-center" asChild>
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
