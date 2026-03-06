import { prisma } from '@/lib/db';
import CartClient from './CartClient';

export default async function CartPage() {
    // Simulated cart: fetch 2 recent listings as the cart items for the premium UI check
    const cartItemsData = await prisma.listing.findMany({
        take: 2,
        orderBy: { createdAt: 'desc' },
        include: { seller: true }
    });

    const formattedCartItems = cartItemsData.map((item: any) => ({
        ...item,
        images: JSON.parse(item.images),
        tags: JSON.parse(item.tags),
        qty: 1
    }));

    return <CartClient initialCartItems={formattedCartItems} />;
}
