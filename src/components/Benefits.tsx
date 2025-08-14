
import React from "react";

const benefits = [
  {
    id: 1,
    title: "Find the Perfect Match",
    description: "Our AI-powered matching algorithm connects you with jobs that align with your skills and career goals.",
    icon: (
      <svg className="w-12 h-12 text-job-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
      </svg>
    )
  },
  {
    id: 2,
    title: "Apply with Ease",
    description: "One-click applications, resume builder, and personalized profiles make job hunting simple and efficient.",
    icon: (
      <svg className="w-12 h-12 text-job-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    )
  },
  {
    id: 3,
    title: "Career Growth Tools",
    description: "Access salary insights, company reviews, and career advice to make informed decisions about your future.",
    icon: (
      <svg className="w-12 h-12 text-job-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
      </svg>
    )
  }
];

const Benefits = () => {
  return (
    <section className="py-16 bg-job-lightGray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-job-darkBlue mb-4">Why Choose SeekSpark</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're more than just a job board. Our platform provides tools and resources to help you succeed in your career journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.id} 
              className="flex flex-col items-center text-center animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="mb-6 rounded-full bg-white p-4 shadow-lg">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
