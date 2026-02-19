
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center text-sm mt-8">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Lesson Reuse AI. All rights reserved.</p>
        <p className="mt-2 text-gray-400">Powered by Gemini API</p>
      </div>
    </footer>
  );
};
    