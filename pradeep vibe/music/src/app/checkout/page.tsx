import { getListingById } from '../actions/query';
import { getUser } from '../actions/auth';
import { getAddresses } from '../actions/address';
import { notFound, redirect } from 'next/navigation';
import CheckoutClient from './CheckoutClient';

export default async function CheckoutPage({ searchParams }: { searchParams: { id: string, type: string } }) {
    const user = await getUser();
    if (!user) {
        redirect('/auth?callbackUrl=/checkout?id=' + searchParams.id + '&type=' + searchParams.type);
    }

    const [listing, addresses] = await Promise.all([
        getListingById(searchParams.id),
        getAddresses(),
    ]);

    if (!listing) {
        notFound();
    }

    return (
        <CheckoutClient
            listing={listing}
            type={searchParams.type as 'buy' | 'rent'}
            user={user}
            initialAddresses={addresses}
        />
    );
}

