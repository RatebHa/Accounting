import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';


const EditInvoicePage = ({ invoice, customers, auth }) => {
  const { data, setData, put, processing, errors } = useForm({
    invoice_number: invoice.invoice_number,
    description: invoice.description,
    date: invoice.date,
    customer_id: invoice.customer ? invoice.customer.id : '',
    amount_due: invoice.amount_due,
    currency: invoice.currency,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = data.date ? new Date(data.date).toISOString().split('T')[0] : null;
    put(route('invoices.update', invoice.id), {
      ...data,
      date: formattedDate,
      onSuccess: () => {
        // Handle success behavior, such as displaying a success message
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (

    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-3xl text-black leading-tight">Edit Invoice</h2>}
    >
      <Head title="Edit Invoice" />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="invoice_number" className="block font-semibold mb-1">
              Invoice Number
            </label>
            <input
              id="invoice_number"
              type="text"
              name="invoice_number"
              value={data.invoice_number}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            {errors.invoice_number && <div className="text-red-500">{errors.invoice_number}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block font-semibold mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={data.description}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            ></textarea>
            {errors.description && <div className="text-red-500">{errors.description}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block font-semibold mb-1">
              Date
            </label>
            <input
              id="date"
              type="date"
              name="date"
              value={data.date}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            {errors.date && <div className="text-red-500">{errors.date}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="customer_id" className="block font-semibold mb-1">
              Customer
            </label>
            <select
              id="customer_id"
              name="customer_id"
              value={data.customer_id}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.id} - {customer.name}
                </option>
              ))}
            </select>
            {errors.customer_id && <div className="text-red-500">{errors.customer_id}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="amount_due" className="block font-semibold mb-1">
              Amount Due
            </label>
            <input
              id="amount_due"
              type="number"
              name="amount_due"
              value={data.amount_due}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            {errors.amount_due && <div className="text-red-500">{errors.amount_due}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="currency" className="block font-semibold mb-1">
              Currency
            </label>
            <input
              id="currency"
              type="text"
              name="currency"
              value={data.currency}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            {errors.currency && <div className="text-red-500">{errors.currency}</div>}
          </div>

          <PrimaryButton className='mb-10' type="submit" disabled={processing}>Update Invoice</PrimaryButton>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default EditInvoicePage;
