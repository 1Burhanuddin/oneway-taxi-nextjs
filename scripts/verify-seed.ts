
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🔍 Verifying seeded data...')

    const adminCount = await prisma.admin.count()
    console.log(`👤 Admin count: ${adminCount}`)

    const locationCount = await prisma.location.count()
    console.log(`📍 Location count: ${locationCount}`)

    const cabCount = await prisma.cab.count()
    console.log(`🚗 Cab count: ${cabCount}`)

    const oneWayPackageCount = await prisma.oneWayPackage.count()
    console.log(`📦 OneWayPackage count: ${oneWayPackageCount}`)

    const localPackageCount = await prisma.localPackage.count()
    console.log(`🏠 LocalPackage count: ${localPackageCount}`)

    const roundTripRateCount = await prisma.roundTripRate.count()
    console.log(`🔄 RoundTripRate count: ${roundTripRateCount}`)

    if (adminCount > 0 && locationCount > 0 && cabCount > 0) {
        console.log('✅ Data verification PASSED: Data exists in the database.')
    } else {
        console.error('❌ Data verification FAILED: Some data is missing.')
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
