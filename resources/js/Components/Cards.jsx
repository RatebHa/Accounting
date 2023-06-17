import { RiUserFill, RiFileList2Fill, RiMoneyDollarCircleFill, RiPieChart2Fill, RiSettings5Fill } from 'react-icons/ri';
import { Link } from '@inertiajs/react';

export default function Cards() {
  return (
    
      <div className="flex flex-wrap justify-center text-center max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/customers" className="card">
          <div className="w-64 p-4 m-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg shadow-md cursor-pointer transform transition duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <RiUserFill className="text-white text-4xl" />
            </div>
            <h2 className="text-white text-xl mb-4">Customers</h2>
            <p className="text-white">Manage your customer information.</p>
          </div>
        </Link>

        <Link href="/invoices" className="card">
          <div className="w-64 p-4 m-4 bg-gradient-to-br from-gray-400 to-indigo-500 rounded-lg shadow-md cursor-pointer transform transition duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <RiFileList2Fill className="text-white text-4xl" />
            </div>
            <h2 className="text-white text-xl mb-4">Invoices</h2>
            <p className="text-white">Create and manage your invoices.</p>
          </div>
        </Link>

        <Link href="/expenses" className="card">
          <div className="w-64 p-4 m-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg shadow-md cursor-pointer transform transition duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <RiMoneyDollarCircleFill className="text-white text-4xl" />
            </div>
            <h2 className="text-white text-xl mb-4">Expenses</h2>
            <p className="text-white">Track and manage your business expenses.</p>
          </div>
        </Link>

        <Link href="/reports" className="card">
          <div className="w-64 p-4 m-4 bg-gradient-to-br from-gray-400 to-indigo-500 rounded-lg shadow-md cursor-pointer transform transition duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <RiPieChart2Fill className="text-white text-4xl" />
            </div>
            <h2 className="text-white text-xl mb-4">Reports</h2>
            <p className="text-white">Access financial reports and analytics.</p>
          </div>
        </Link>

        <Link href="/settings" className="card">
          <div className="w-64 p-4 m-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg shadow-md cursor-pointer transform transition duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <RiSettings5Fill className="text-white text-4xl" />
            </div>
            <h2 className="text-white text-xl mb-4">Settings</h2>
            <p className="text-white">Customize your account settings.</p>
          </div>
        </Link>
      </div>
    
  );
}
