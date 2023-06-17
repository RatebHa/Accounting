import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FaCalculator } from 'react-icons/fa';

const AuthenticatedNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { auth } = usePage().props;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-green-400 via-blue-500 to-indigo-500 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            
              <Link href="/dashboard">
                <FaCalculator className="text-white h-6 w-6" />
              </Link>
              {auth.user && (
                <span className="ml-2 text-white text-xl">{auth.user.name}</span>
              )}
            
            
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
            <div
              className="relative ml-4"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <Link
                href="/dashboard"
                className="px-3 py-3 rounded-md text-sm font-medium text-white hover:bg-blue-600 dark:hover:bg-gray-800"
              >
                Dashboard
              </Link>
              {isOpen && (
                <div className="absolute top-full left-0 z-10 mt-2 space-y-2 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:border-gray-700">
                  <Link
                    href="/customers"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Customers
                  </Link>
                  <Link
                    href="/invoices"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Invoices
                  </Link>
                  <Link
                    href="/expenses"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Expenses
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Settings
                  </Link>
                </div>
              )}
            </div>

              <Link
                href="/profile"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-600 dark:hover:bg-gray-800"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-600 dark:hover:bg-gray-800"
              >
                Settings
              </Link>
              <Link
                href="/logout"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-600 dark:hover:bg-gray-800"
              >
                Logout
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 dark:bg-gray-800"
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 dark:bg-gray-800"
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 dark:bg-gray-800"
            >
              Settings
            </Link>
            <Link
              href="/logout"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 dark:bg-gray-800"
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AuthenticatedNavbar;
