import React, { useState, useEffect } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { FaPlus } from 'react-icons/fa'
import Fuse from 'fuse.js';

// AddCustomerModal component
const AddCustomerModal = ({ onCancel }) => {

    useEffect(() => {
        // Clear the form data when the modal mounts
        setData({
          name: '',
          email: '',
          phone: '',
          country: '',
        });
      }, []);



    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
        phone: '',
        country: '',
    });

    const submit = async (newCustomer) => {
        try {
            // Handle adding the new customer to the database or API
            await post(route('customers.store'), newCustomer);
            // Refresh the page by visiting the current page
            Inertia.visit(window.location.href, {
                preserveScroll: true, // Preserve the scroll position after the reload
            });
        } catch (error) {
            console.error(error);
        } finally {
            // Close the modal
            setShowAddModal(false);
        }
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 text-center">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <form onSubmit={submit}>
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Add Customer
                                </h3>
                                <div className="mt-2">
                                    <div className="mb-4">
                                        <InputLabel htmlFor="name" value="Name" />

                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            autoComplete="name"
                                            isFocused={true}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <InputLabel htmlFor="email" value="Email" />

                                        <TextInput
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="email"
                                            isFocused={true}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <InputLabel htmlFor="phone" value="Phone" />

                                        <TextInput
                                            id="phone"
                                            name="phone"
                                            value={data.phone}
                                            className="mt-1 block w-full"
                                            autoComplete="phone"
                                            isFocused={true}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <InputLabel htmlFor="country" value="Country" />

                                        <TextInput
                                            id="country"
                                            name="country"
                                            value={data.country}
                                            className="mt-1 block w-full"
                                            autoComplete="country"
                                            isFocused={true}
                                            onChange={(e) => setData('country', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <PrimaryButton
                                disabled={processing}
                                className="sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Save
                            </PrimaryButton>
                            <button
                                onClick={onCancel}
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Customers component
const Customers = ({ auth }) => {
    const { customers } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState(customers);
    const [showAddModal, setShowAddModal] = useState(false);

    const fuse = new Fuse(customers, {
        keys: ['name', 'email', 'phone'], // Define the searchable keys
        includeScore: true, // Include search score for fuzzy search
        threshold: 0.3, // Define the search threshold for fuzzy search
    });

    useEffect(() => {
        handleSearch();
    }, [searchTerm]);

    const handleSearch = () => {
        const searchResults = searchTerm ? fuse.search(searchTerm).map((result) => result.item) : customers;
        setFilteredCustomers(searchResults);
    };

    const handleAddCustomer = (newCustomer) => {
        // Handle adding the new customer to the database or API
        console.log('New Customer:', newCustomer);
        // Close the modal
        setShowAddModal(false);
        // Refresh the customer list or add the new customer to the existing list
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-3xl text-black leading-tight">Customers</h2>}
        >
            <Head title="Customers" />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className="flex items-center mb-4 ">
                    <div className="relative ">
                        <input
                            type="text"
                            placeholder="Search customers"
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
                        Add Customer
                    </button>
                </div>
                <ul>
                    {filteredCustomers.map((customer) => (
                        <li key={customer.id} className="border border-gray-300 rounded px-4 py-2 mb-2">
                            <div>
                                <strong className="text-lg">{customer.name}</strong>
                                <span className="block">{customer.email}</span>
                                <span className="block">{customer.phone}</span>
                                <span className="block">Country: {customer.country}</span>
                                <span className="block">Number of invoices: {customer.invoices_count}</span>
                                <span className="block">Amount Owned: {customer.amount_owned} USD</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {showAddModal && (
                <AddCustomerModal onSubmit={handleAddCustomer} onCancel={() => setShowAddModal(false)} />
            )}
        </AuthenticatedLayout>
    );
};

export default Customers;