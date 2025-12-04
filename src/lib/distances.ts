// Distance matrix for major Indian cities (in kilometers)
// This is a simplified version - in production, you'd use Google Maps Distance Matrix API

export const cityDistances: { [key: string]: { [key: string]: number } } = {
    'Mumbai': {
        'Surat': 280,
        'Ahmedabad': 525,
        'Pune': 150,
        'Vadodara': 390,
        'Rajkot': 470,
        'Nashik': 165,
        'Gandhinagar': 545
    },
    'Surat': {
        'Mumbai': 280,
        'Ahmedabad': 265,
        'Pune': 420,
        'Vadodara': 130,
        'Rajkot': 205,
        'Nashik': 445,
        'Gandhinagar': 285
    },
    'Ahmedabad': {
        'Mumbai': 525,
        'Surat': 265,
        'Pune': 665,
        'Vadodara': 110,
        'Rajkot': 220,
        'Nashik': 690,
        'Gandhinagar': 25
    },
    'Pune': {
        'Mumbai': 150,
        'Surat': 420,
        'Ahmedabad': 665,
        'Vadodara': 530,
        'Rajkot': 610,
        'Nashik': 210,
        'Gandhinagar': 685
    },
    'Vadodara': {
        'Mumbai': 390,
        'Surat': 130,
        'Ahmedabad': 110,
        'Pune': 530,
        'Rajkot': 150,
        'Nashik': 555,
        'Gandhinagar': 135
    },
    'Rajkot': {
        'Mumbai': 470,
        'Surat': 205,
        'Ahmedabad': 220,
        'Pune': 610,
        'Vadodara': 150,
        'Nashik': 635,
        'Gandhinagar': 245
    },
    'Nashik': {
        'Mumbai': 165,
        'Surat': 445,
        'Ahmedabad': 690,
        'Pune': 210,
        'Vadodara': 555,
        'Rajkot': 635,
        'Gandhinagar': 710
    },
    'Gandhinagar': {
        'Mumbai': 545,
        'Surat': 285,
        'Ahmedabad': 25,
        'Pune': 685,
        'Vadodara': 135,
        'Rajkot': 245,
        'Nashik': 710
    }
};

export function getDistance(fromCity: string, toCity: string): number {
    // Return 0 for same city
    if (fromCity === toCity) {
        return 0;
    }

    // Check if distance exists in matrix
    if (cityDistances[fromCity] && cityDistances[fromCity][toCity]) {
        return cityDistances[fromCity][toCity];
    }

    // Check reverse direction
    if (cityDistances[toCity] && cityDistances[toCity][fromCity]) {
        return cityDistances[toCity][fromCity];
    }

    // Default fallback distance if cities not found
    console.warn(`Distance not found for ${fromCity} to ${toCity}, using default 200km`);
    return 200;
}

export function calculateTripPrice(
    fromCity: string,
    toCity: string,
    pricePerKm: number,
    tripType: 'oneway' | 'roundtrip' | 'local' = 'oneway',
    roundTripConfig?: {
        minKmPerDay: number;
        driverAllowance: number;
        days: number;
    }
): {
    distance: number;
    baseFare: number;
    distanceFare: number;
    totalPrice: number;
    breakdown: {
        baseFare: number;
        distanceFare: number;
        returnFare?: number;
        driverAllowance?: number;
        minKmCharge?: number;
        total: number;
    };
} {
    const baseFare = 500; // Fixed base fare

    if (tripType === 'local') {
        // For local trips, use a fixed 50km distance
        const distance = 50;
        const distanceFare = distance * pricePerKm;
        const totalPrice = baseFare + distanceFare;

        return {
            distance,
            baseFare,
            distanceFare,
            totalPrice,
            breakdown: {
                baseFare,
                distanceFare,
                total: totalPrice
            }
        };
    }

    const distance = getDistance(fromCity, toCity);
    const distanceFare = distance * pricePerKm;

    if (tripType === 'roundtrip' && roundTripConfig) {
        const { minKmPerDay, driverAllowance, days } = roundTripConfig;

        // Calculate minimum km charge
        const minKmTotal = minKmPerDay * days;
        const actualRoundTripDistance = distance * 2;

        // Chargeable distance is max of actual round trip distance or minimum km per day * days
        const chargeableDistance = Math.max(actualRoundTripDistance, minKmTotal);

        const distanceFare = chargeableDistance * pricePerKm;
        const totalDriverAllowance = driverAllowance * days;

        const totalPrice = distanceFare + totalDriverAllowance;

        return {
            distance: chargeableDistance, // Show chargeable distance
            baseFare: 0, // No separate base fare for round trip in this model
            distanceFare,
            totalPrice,
            breakdown: {
                baseFare: 0,
                distanceFare,
                minKmCharge: minKmTotal,
                driverAllowance: totalDriverAllowance,
                total: totalPrice
            }
        };
    } else if (tripType === 'roundtrip') {
        // Fallback for old logic if config missing
        const returnFare = distance * pricePerKm;
        const totalPrice = baseFare + distanceFare + returnFare;

        return {
            distance: distance * 2,
            baseFare,
            distanceFare: distanceFare + returnFare,
            totalPrice,
            breakdown: {
                baseFare,
                distanceFare,
                returnFare,
                total: totalPrice
            }
        };
    }

    // One-way trip
    const totalPrice = baseFare + distanceFare;

    return {
        distance,
        baseFare,
        distanceFare,
        totalPrice,
        breakdown: {
            baseFare,
            distanceFare,
            total: totalPrice
        }
    };
}