import { prisma } from '@/lib/db';
import { getUser } from '@/app/actions/auth';
import { redirect } from 'next/navigation';
import VerificationsClient from '@/app/admin/verifications/VerificationsClient';

export default async function AdminVerificationsPage() {
    const user = await getUser();
    if (!user || user.role !== 'admin') {
        redirect('/');
    }

    const requests = await prisma.verificationRequest.findMany({
        where: { status: 'pending' },
        include: { user: true },
        orderBy: { createdAt: 'desc' }
    });

    return <VerificationsClient initialRequests={requests} />;
}
