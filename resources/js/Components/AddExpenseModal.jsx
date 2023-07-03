import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Inertia } from '@inertiajs/inertia';

const AddExpenseModal = ({ onCancel }) => {
    const { data, setData, post, processing } = useForm({
        type: '',
        category: '',
        description: '',
        amount: '',
    });

    const submit = async (e) => {
        e.preventDefault();
        try {
            await post(route('expenses.store'), data);
            Inertia.visit(window.location.href, {
                preserveScroll: true,
            });
        } catch (error) {
            console.error(error);
        } finally {
            onCancel();
        }
    };

    useEffect(() => {
        setData({
            type: '',
            category: '',
            description: '',
            amount: '',
        });
    }, []);

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 text-center">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <form onSubmit={submit}>
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Add Expense</h3>
                                <div className="mt-2">
                                    <div className="mb-4">
                                        <InputLabel htmlFor="type" value="Type" />
                                        <select
                                            id="type"
                                            name="type"
                                            value={data.type}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('type', e.target.value)}
                                            required
                                        >
                                            <option value="">Select...</option>
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="annually">Annually</option>
                                            <option value="one_time">One Time</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <InputLabel htmlFor="category" value="Category" />
                                        <select
                                            id="category"
                                            name="category"
                                            value={data.category}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('category', e.target.value)}
                                            required
                                        >
                                            <option value="">Select...</option>
                                            <option value="in">Income</option>
                                            <option value="out">Outcome</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <InputLabel htmlFor="description" value="Description" />
                                        <TextInput
                                            id="description"
                                            name="description"
                                            value={data.description}
                                            className="mt-1 block w-full"
                                            autoComplete="description"
                                            isFocused={true}
                                            onChange={(e) => setData('description', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <InputLabel htmlFor="amount" value="Amount" />
                                        <input
                                            id="amount"
                                            name="amount"
                                            type="number"
                                            step="0.01"
                                            value={data.amount}
                                            className="mt-1 block w-full"
                                            autoComplete="amount"
                                            isFocused={true}
                                            onChange={(e) => setData('amount', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <PrimaryButton disabled={processing} className="sm:ml-3 sm:w-auto sm:text-sm">
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

export default AddExpenseModal;
