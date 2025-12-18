
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🗑️  Deleting all TripBooking records as requested...');

    try {
        const deletedBookings = await prisma.tripBooking.deleteMany();
        console.log(`✅ Deleted ${deletedBookings.count} Trip Bookings.`);

    } catch (error) {
        console.error('Error deleting bookings:', error);
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
