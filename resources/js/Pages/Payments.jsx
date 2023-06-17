import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const CreatePaymentModal = ({ onClose, invoice }) => {
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
        currency: invoice.currency, // Set the currency based on the selected invoice
        payment_date: '',
        invoice_id: invoice.id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('payments.store', invoice.id), data, {
            onSuccess: () => {
                onClose();
                Inertia.reload(); // Refresh the Payments page after successful payment creation
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
                <h2 className="text-2xl font-semibold mb-4">Add Payment</h2>
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
                        {errors.amount && (
                            <div className="text-red-500 text-sm mt-1">{errors.amount}</div>
                        )}
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
                            Add Payment
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Payments = ({ invoice, payments }) => {

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(false);

    const handleOpenCreateModal = (invoice) => {
        setShowCreateModal(true);
        setSelectedInvoice(invoice);
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    };

    const handleEditPayment = (paymentId) => {
        Inertia.visit(route('payments.edit', paymentId));
    };

    const handleDeletePayment = (paymentId) => {
        if (window.confirm('Are you sure you want to delete this payment?')) {
            Inertia.delete(route('payments.destroy', paymentId));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-3xl text-black leading-tight">Payments for Invoice #{invoice.invoice_number}</h2>}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Render your payments list here */}
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.id}>
                                <td>{payment.amount}</td>
                                <td>{payment.currency}</td>
                                <td>{payment.payment_date}</td>
                                <td>
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => handleEditPayment(payment.id)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeletePayment(payment.id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Add payment creation modal button */}
                <PrimaryButton onClick={handleOpenCreateModal}>Add Payment</PrimaryButton>

                {/* Render the payment creation modal */}
                {showCreateModal && <CreatePaymentModal onClose={handleCloseCreateModal} invoice={invoice} />}
            </div>
        </AuthenticatedLayout>
    );
};

export default Payments;