import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log("Fetching listings...");
    try {
        const data = await prisma.listing.findMany();
        let errorCount = 0;
        for (const item of data) {
            try {
                JSON.parse(item.images);
                JSON.parse(item.tags);
            } catch (e: any) {
                console.log('Bad item:', item.id, item.title);
                console.log('Error:', e.message);
                console.log('Images JSON:', item.images);
                console.log('Tags JSON:', item.tags);
                console.log('---');
                errorCount++;
            }
        }
        console.log(`Done scanning. Found ${errorCount} records with invalid JSON.`);
    } catch (err: any) {
        console.log("DB connection or query failed:", err.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
