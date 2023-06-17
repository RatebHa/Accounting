import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const EditPaymentPage = ({ payment }) => {
  const { data, setData, put, processing, errors } = useForm({
    amount: payment.amount,
    currency: payment.currency,
    payment_date: payment.payment_date,
    invoice_id: payment.invoice_id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('payments.update', payment.id), data, {
      onSuccess: () => {
        Inertia.reload();
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancel = () => {
    Inertia.reload();
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-4">Edit Payment</h2>
        <form onSubmit={handleSubmit}>
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
            {errors.amount && <div className="text-red-500 text-sm mt-1">{errors.amount}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="payment_date" className="block text-sm font-medium text-gray-700">
              Payment Date
            </label>
            <input
              id="payment_date"
              type="date"
              name="payment_date"
              value={data.payment_date}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {errors.payment_date && (
              <div className="text-red-500 text-sm mt-1">{errors.payment_date}</div>
            )}
          </div>

          <div className="mt-6">
            <SecondaryButton onClick={handleCancel} className="ml-2">
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={processing}>
              Update Payment
            </PrimaryButton>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default EditPaymentPage;