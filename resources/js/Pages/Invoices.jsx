import React, { useState } from 'react';
import { Link, Head, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';

import SecondaryButton from '@/Components/SecondaryButton';


const CreateInvoiceModal = ({ onClose, onCreateInvoice, customers }) => {
    const { data, setData, post, processing, errors } = useForm({
        invoice_number: '',
        description: '',
        date: '',
        customer_id: '',
        amount_due: '',
        currency: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedDate = data.date ? new Date(data.date).toISOString().split('T')[0] : null;
        post(route('invoices.store'), {
            ...data,
            date: formattedDate,
            onSuccess: (invoice) => {
                onCreateInvoice(invoice);
                onClose();
            },
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-4">Create Invoice</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="invoice_number" className="block text-sm font-medium text-gray-700">
                            Invoice Number
                        </label>
                        <input
                            id="invoice_number"
                            type="text"
                            name="invoice_number"
                            value={data.invoice_number}
                            onChange={handleChange}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors.invoice_number && (
                            <div className="text-red-500 text-sm mt-1">{errors.invoice_number}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <input
                            id="description"
                            type="text"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors.description && (
                            <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Date
                        </label>
                        <input
                            id="date"
                            type="date"
                            name="date"
                            value={data.date}
                            onChange={handleChange}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors.date && (
                            <div className="text-red-500 text-sm mt-1">{errors.date}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="customer_id" className="block text-sm font-medium text-gray-700">
                            Customer
                        </label>
                        <select
                            id="customer_id"
                            name="customer_id"
                            value={data.customer_id}
                            onChange={handleChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="">Select a customer</option>
                            {customers && customers.length > 0 ? (
                                customers.map((customer) => (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.id} - {customer.name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No customers available</option>
                            )}
                        </select>
                        {errors.customer_id && (
                            <div className="text-red-500 text-sm mt-1">{errors.customer_id}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="amount_due" className="block text-sm font-medium text-gray-700">
                            Amount Due
                        </label>
                        <input
                            id="amount_due"
                            type="number"
                            name="amount_due"
                            value={data.amount_due}
                            onChange={handleChange}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors.amount_due && (
                            <div className="text-red-500 text-sm mt-1">{errors.amount_due}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                            Currency
                        </label>
                        <select
                            id="currency"
                            name="currency"
                            value={data.currency}
                            onChange={handleChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="">Select a currency</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="GBP">TRY</option>
                        </select>
                        {errors.currency && (
                            <div className="text-red-500 text-sm mt-1">{errors.currency}</div>
                        )}
                    </div>

                    <div className="mt-6">
                        <SecondaryButton onClick={handleCancel} className="ml-2">
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton type="submit" disabled={processing}>
                            Create Invoice
                        </PrimaryButton>

                    </div>
                </form>
            </div>
        </div>
    );
};



const Invoices = ({ invoices, customers, auth }) => {
    const { post, delete: deleteRequest } = usePage().props;
    const [showCreateModal, setShowCreateModal] = useState(false);
  
    const handleCreateInvoice = async (invoiceData) => {
      try {
        await post(route('invoices.store'), invoiceData);
        setShowCreateModal(false);
        Inertia.reload({ only: ['invoices'] });
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleDeleteInvoice = async (invoiceId) => {
      try {
        await deleteRequest(route('invoices.destroy', invoiceId));
        Inertia.reload({ only: ['invoices'] });
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-3xl text-black leading-tight">Invoices</h2>}>
        <Head title="Invoices" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PrimaryButton onClick={() => setShowCreateModal(true)}>Create Invoice</PrimaryButton>
          {showCreateModal && (
            <CreateInvoiceModal onClose={() => setShowCreateModal(false)} onCreateInvoice={handleCreateInvoice} customers={customers} />
          )}
  
          <table className="w-full">
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Description</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Amount Due</th>
                <th>Currency</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.invoice_number}</td>
                  <td>{invoice.description}</td>
                  <td>{invoice.date}</td>
                  <td>{invoice.customer ? invoice.customer.name : ''}</td>
                  <td>{invoice.amount_due}</td>
                  <td>{invoice.currency}</td>
                  <td>
                    <div className="space-x-2">
                      <Link href={route('invoices.edit', invoice.id)} className="text-blue-600 hover:underline">
                        Edit
                      </Link>
                      <button onClick={() => handleDeleteInvoice(invoice.id)} className="text-red-600 hover:underline">
                        Delete
                      </button>
                      <Link
                        href={route('payments.index', invoice.id)}
                        className="text-blue-600 hover:underline"
                      >
                        Payments
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AuthenticatedLayout>
    );
  };

export default Invoices;
