
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const rawCities = [
    { name: "Ahmedabad ", state: "Gujarat" },
    { name: "Amreli ", state: "Gujarat" },
    { name: "Andheri ", state: "Maharashtra" },
    { name: "Ankleshwar ", state: "Gujarat" },
    { name: "Bangalore", state: "Karnataka" },
    { name: "Bharuch ", state: "Gujarat" },
    { name: "Borivali ", state: "Maharashtra" },
    { name: "Botad", state: "Gujarat" },
    { name: "Chennai", state: "Tamil Nadu" },
    { name: "Dahej", state: "Gujarat" },
    { name: "Daman", state: "Gujarat" },
    { name: "Dhoraji", state: "Gujarat" },
    { name: "Dwarka ", state: "Gujarat" },
    { name: "Godhra ", state: "Gujarat" },
    { name: "Hyderabad ", state: "Telangana" },
    { name: "Indore", state: "Madhya Pradesh" },
    { name: "Jamnagar ", state: "Gujarat" },
    { name: "Jodhpur", state: "Rajasthan" },
    { name: "Karjan", state: "Gujarat" },
    { name: "Kevadiya", state: "Gujarat" },
    { name: "Kolkata", state: "West Bengal" },
    { name: "Lucknow", state: "Uttar Pradesh" },
    { name: "Lunavada ", state: "Gujarat" },
    { name: "Mahuva bandr ", state: "Gujarat" },
    { name: "Modasa ", state: "Gujarat" },
    { name: "Morbi ", state: "Gujarat" },
    { name: "Mumbai", state: "Maharashtra" },
    { name: "Mumbai Airport", state: "Maharashtra" },
    { name: "Mumbai Central ", state: "Maharashtra" },
    { name: "Nadiad ", state: "Gujarat" },
    { name: "Nashik", state: "Maharashtra" },
    { name: "Navi mumbai ", state: "Maharashtra" },
    { name: "Navsari ", state: "Gujarat" },
    { name: "Pune", state: "Maharashtra" },
    { name: "Pune Airport", state: "Maharashtra" },
    { name: "Rajkot", state: "Gujarat" },
    { name: "Rajkot Airport", state: "Gujarat" },
    { name: "Rajula", state: "Gujarat" },
    { name: "Savarkundla ", state: "Gujarat" },
    { name: "Silvassa ", state: "Gujarat" },
    { name: "Somnath ", state: "Gujarat" },
    { name: "Surat", state: "Gujarat" },
    { name: "Surat Airport", state: "Gujarat" },
    { name: "Talasari", state: "Maharashtra" },
    { name: "Thane", state: "Maharashtra" },
    { name: "Vadodara", state: "Gujarat" },
    { name: "Vadodara Airport", state: "Gujarat" },
    { name: "Vakaner", state: "Gujarat" },
    { name: "Valsad", state: "Gujarat" },
    { name: "Vapi", state: "Gujarat" },
    { name: "Vasai-Virar", state: "Maharashtra" }
];

async function main() {
    console.log('🌍 Starting city import...');
    let addedCount = 0;
    let skippedCount = 0;

    for (const city of rawCities) {
        const cityName = city.name.trim(); // Remove trailing spaces
        const state = city.state.trim();
        const isAirport = cityName.toLowerCase().includes('airport');

        // Check if exists
        const existing = await prisma.location.findUnique({
            where: { cityName: cityName }
        });

        if (existing) {
            console.log(`⚠️  Skipped ${cityName} (already exists)`);
            skippedCount++;
        } else {
            await prisma.location.create({
                data: {
                    cityName: cityName,
                    state: state,
                    isAirport: isAirport
                }
            });
            console.log(`✅ Added ${cityName}`);
            addedCount++;
        }
    }

    console.log(`\n🎉 Import completed! Added: ${addedCount}, Skipped: ${skippedCount}`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
