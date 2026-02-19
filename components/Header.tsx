
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md p-4 sm:p-6">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          <span className="block">Lesson Reuse AI</span>
        </h1>
        <nav>
          {/* Optional: Add navigation links here */}
          {/* <a href="#" className="text-white hover:text-indigo-200 text-lg">About</a> */}
        </nav>
      </div>
    </header>
  );
};
    