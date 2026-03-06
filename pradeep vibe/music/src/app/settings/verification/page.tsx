import { getUser } from '@/app/actions/auth';
import { getVerificationStatus } from '@/app/actions/kyc';
import VerificationClient from '@/app/settings/verification/VerificationClient';
import { redirect } from 'next/navigation';

export default async function VerificationPage() {
    const user = await getUser();
    if (!user) redirect('/auth');

    const statusData = await getVerificationStatus();

    // Fallback if getVerificationStatus returns an error object instead of the data
    const kycStatus = (statusData as any).kycStatus || (user as any).kycStatus || 'none';
    const latestRequest = (statusData as any).latestRequest || null;

    return (
        <VerificationClient
            user={user}
            initialStatus={kycStatus}
            latestRequest={latestRequest}
        />
    );
}
