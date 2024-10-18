import React from "react";

import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="mt-4">
      <div className="container mx-auto flex flex-col gap-6 lg:flex-row items-center">
        {/* Left Column */}
        <div className="lg:w-1/2 text-slate-700">
          <h1 className="text-5xl font-bold mb-6">Welcome to Dev Diary</h1>
          <p className="text-lg mb-8">
            Explore insightful articles, tips, and stories that inspire and inform.
          </p>
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200 hover:bg-blue-700">
            Login
          </Link>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <img
            src="https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Blog"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
