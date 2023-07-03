import React, { useState, useEffect } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import Fuse from 'fuse.js';
import AddExpenseModal from '@/Components/AddExpenseModal';

const Expenses = ({ auth, currency }) => {
  const { expenses } = usePage().props;
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [showAddModal, setShowAddModal] = useState(false);

  const fuse = new Fuse(expenses, {
    keys: ['name', 'description', 'type', 'amount', 'created_at'],
    includeScore: true,
    threshold: 0.3,
  });

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleSearch = () => {
    const searchResults = searchTerm ? fuse.search(searchTerm).map((result) => result.item) : expenses;
    setFilteredExpenses(searchResults);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const cardColor = (category) => {
    return category === 'in' ? 'bg-green-500' : 'bg-red-500';
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-3xl text-black leading-tight">Expenses</h2>}
    >
      <Head title="Expenses" />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className="flex items-center mb-4 ">
          <div className="relative ">
            <input
              type="text"
              placeholder="Search expenses"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-6 py-2 pr-12 "
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 ml-4"
          >
            <FaPlus className="mr-1" />
            Add Expense
          </button>
        </div>
        <div className="flex flex-wrap -m-4">
          {filteredExpenses.map((expense) => (
            <div key={expense.id} className="lg:w-1/3 sm:w-1/2 p-4">
              <div className={`shadow-xl rounded-xl p-6 ${cardColor(expense.category)} text-white`}>
                <div className="text-center font-bold mt-2">{formatDate(expense.created_at)}</div>
                <h2 className="mb-3 text-lg font-semibold">{expense.name}</h2>
                <p className="mb-2 text-sm">Description: {expense.description}</p>
                <p className="mb-2 text-sm">Type: {expense.type}</p>
                <p className="mb-2 text-lg font-bold">Amount: {expense.amount} {currency}</p>
                <div className='flex justify-center'>
                  <button className="flex text-white font-bold py-2 px-4 rounded m-2">
                    <FaEdit /> Edit
                  </button>
                  <button className="flex text-white font-bold py-2 px-4 rounded m-2">
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showAddModal && (
        <AddExpenseModal onCancel={() => setShowAddModal(false)} />
      )}
    </AuthenticatedLayout>
  );
};

export default Expenses;
