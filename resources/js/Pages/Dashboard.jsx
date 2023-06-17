import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Cards from '@/Components/Cards';
import ExchangeRates from '@/Components/ExchangeRates';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-3xl text-black leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <Cards/>
            <ExchangeRates/>

        </AuthenticatedLayout>
    );
}
