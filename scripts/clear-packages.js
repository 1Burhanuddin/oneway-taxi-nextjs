
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🗑️  Deleting all OneWayPackage and RoundTripRate records as requested...');

    try {
        const deletedOneWay = await prisma.oneWayPackage.deleteMany();
        console.log(`✅ Deleted ${deletedOneWay.count} One-Way Packages.`);

        const deletedRoundTrip = await prisma.roundTripRate.deleteMany();
        console.log(`✅ Deleted ${deletedRoundTrip.count} Round-Trip Rates.`);

    } catch (error) {
        console.error('Error deleting packages:', error);
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
