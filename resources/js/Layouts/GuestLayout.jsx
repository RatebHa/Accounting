import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 dark:bg-gray-900">
      <div className="w-full sm:max-w-md px-6 py-8 bg-white dark:bg-gray-800 shadow-xl rounded-3xl	">
        <div className="mb-8">
          
        </div>
        {children}
      </div>
    </div>
  );
}
