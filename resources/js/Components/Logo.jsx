import React from 'react';

const Logo = () => {
    return (
      <div className="flex items-center space-x-2">
        <img
          src="/path/to/logo.png"
          alt="Logo"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-gray-800 text-lg font-bold">Your Company</span>
      </div>
    );
  };

  export default Logo;
