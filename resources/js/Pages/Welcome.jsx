import React from 'react';

const Welcome = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-200">
            Welcome to Your Website!
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            We're excited to have you here. Start exploring and enjoy your stay.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;