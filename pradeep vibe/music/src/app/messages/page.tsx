import { getUser } from '@/app/actions/auth';
import { getConversations } from '@/app/actions/message';
import { redirect } from 'next/navigation';
import MessagesClient from './MessagesClient';

export const metadata = { title: 'Messages | Swaramthala' };

export default async function MessagesPage() {
    const user = await getUser();
    if (!user) {
        redirect('/auth');
    }

    const conversations = await getConversations();

    return <MessagesClient currentUser={user} initialConversations={conversations} />;
}
