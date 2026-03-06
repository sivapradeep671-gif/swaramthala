import { Prisma } from '@prisma/client';

type MessageInclude = Prisma.MessageInclude;
const include: MessageInclude = {
    sender: true,
    receiver: true,
    // @ts-ignore
    listing: true,
};
