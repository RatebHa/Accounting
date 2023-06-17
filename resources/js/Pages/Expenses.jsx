import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Expenses = ({ expenses }) => {
    // Define the form data and form submission handling using Inertia useForm hook
    const { data, setData, post, processing, errors } = useForm({
      name: '',
      amount: '',
      expense_type_id: '',
    });
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      post(route('expenses.store'), data, {
        onSuccess: () => {
          Inertia.reload();
        },
      });
    };
  
    // Handle input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    return (
      <AuthenticatedLayout header={<h2 className="font-semibold text-3xl text-black leading-tight">Expenses</h2>}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Expense List</h3>
            <PrimaryButton
              onClick={() => Inertia.visit(route('expenses.create'))}
              className="ml-2"
            >
              Add Expense
            </PrimaryButton>
          </div>
  
          {/* Render the list of expenses */}
          <table className="w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Expense Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.name}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.expense_type.name}</td>
                  <td>
                    <SecondaryButton
                      onClick={() => Inertia.visit(route('expenses.edit', expense.id))}
                    >
                      Edit
                    </SecondaryButton>
                    <SecondaryButton
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this expense?')) {
                          Inertia.delete(route('expenses.destroy', expense.id));
                        }
                      }}
                      className="ml-2"
                    >
                      Delete
                    </SecondaryButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          {/* Expense creation form */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Add Expense</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
              </div>
  
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  name="amount"
                  value={data.amount}
                  onChange={handleChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.amount && (
                  <div className="text-red-500 text-sm mt-1">{errors.amount}</div>
                )}
              </div>
  
              <div className="mb-4">
                <label htmlFor="expense_type_id" className="block text-sm font-medium text-gray-700">
                  Expense Type
                </label>
                <select
                  id="expense_type_id"
                  name="expense_type_id"
                  value={data.expense_type_id}
                  onChange={handleChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Select Expense Type</option>
                  {/* Render the list of expense types */}
                  {expenseTypes.map((expenseType) => (
                    <option key={expenseType.id} value={expenseType.id}>
                      {expenseType.name}
                    </option>
                  ))}
                </select>
                {errors.expense_type_id && (
                  <div className="text-red-500 text-sm mt-1">{errors.expense_type_id}</div>
                )}
              </div>
  
              <div className="mt-6">
                <SecondaryButton type="submit" disabled={processing}>
                  Add Expense
                </SecondaryButton>
              </div>
            </form>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  };
  
  export default Expenses;
  
