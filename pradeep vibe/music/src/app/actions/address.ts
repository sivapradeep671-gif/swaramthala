'use server';

import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function getAddresses() {
    const { user, error } = await getAuthUser();
    if (error || !user) return [];

    return prisma.address.findMany({
        where: { userId: user.id },
        orderBy: { isDefault: 'desc' }
    });
}

export async function addAddress(formData: FormData) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: error || 'Unauthorized' };

    const street = formData.get('street') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const pincode = formData.get('pincode') as string;
    const isDefault = formData.get('isDefault') === 'on';

    try {
        if (isDefault) {
            // Unset other default addresses
            await prisma.address.updateMany({
                where: { userId: user.id },
                data: { isDefault: false }
            });
        }

        const address = await prisma.address.create({
            data: {
                street,
                city,
                state,
                pincode,
                isDefault,
                userId: user.id
            }
        });

        revalidatePath('/dashboard/profile');
        revalidatePath('/checkout');
        return { success: true, address };
    } catch (error) {
        console.error("AddAddress error:", error);
        return { error: 'Failed to add address' };
    }
}

export async function updateAddress(id: string, formData: FormData) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: error || 'Unauthorized' };

    const street = formData.get('street') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const pincode = formData.get('pincode') as string;
    const isDefault = formData.get('isDefault') === 'on';

    try {
        if (isDefault) {
            await prisma.address.updateMany({
                where: { userId: user.id, NOT: { id } },
                data: { isDefault: false }
            });
        }

        await prisma.address.update({
            where: { id, userId: user.id },
            data: { street, city, state, pincode, isDefault }
        });

        revalidatePath('/dashboard/profile');
        revalidatePath('/checkout');
        return { success: true };
    } catch (error) {
        console.error("UpdateAddress error:", error);
        return { error: 'Failed to update address' };
    }
}

export async function deleteAddress(id: string) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: error || 'Unauthorized' };

    try {
        await prisma.address.delete({
            where: { id, userId: user.id }
        });

        revalidatePath('/dashboard/profile');
        revalidatePath('/checkout');
        return { success: true };
    } catch (error) {
        console.error("DeleteAddress error:", error);
        return { error: 'Failed to delete address' };
    }
}

export async function setDefaultAddress(id: string) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: error || 'Unauthorized' };

    try {
        await prisma.address.updateMany({
            where: { userId: user.id },
            data: { isDefault: false }
        });

        await prisma.address.update({
            where: { id, userId: user.id },
            data: { isDefault: true }
        });

        revalidatePath('/dashboard/profile');
        revalidatePath('/checkout');
        return { success: true };
    } catch (error) {
        console.error("SetDefaultAddress error:", error);
        return { error: 'Failed to set default address' };
    }
}
