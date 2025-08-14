
import React, { useState, useEffect } from "react";

const stats = [
  { id: 1, value: 2, unit: "M+", label: "Active Jobs" },
  { id: 2, value: 45, unit: "K+", label: "Companies" },
  { id: 3, value: 8, unit: "M+", label: "Job Seekers" },
  { id: 4, value: 95, unit: "%", label: "Success Rate" }
];

const Statistics = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("stats-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="stats-section" className="py-16 bg-job-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Our Platform in Numbers</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Trusted by millions of job seekers and thousands of companies worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.id} 
              className="flex flex-col items-center animate-fade-in"
              style={{ animationDelay: hasAnimated ? `${index * 150}ms` : '0ms' }}
            >
              <div className="flex items-end mb-2">
                <span className="text-4xl font-bold">{stat.value}</span>
                <span className="text-2xl font-bold">{stat.unit}</span>
              </div>
              <p className="text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
