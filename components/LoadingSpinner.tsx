
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );
};
    