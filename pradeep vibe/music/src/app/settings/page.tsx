import { getUser } from '@/app/actions/auth';
import { getAddresses } from '@/app/actions/address';
import { redirect } from 'next/navigation';
import SettingsClient from './SettingsClient';

export const metadata = { title: 'Settings | Swaramthala' };

export default async function SettingsPage() {
    const user = await getUser();
    if (!user) {
        redirect('/auth');
    }

    const addresses = await getAddresses();

    return <SettingsClient user={user} initialAddresses={addresses} />;
}
