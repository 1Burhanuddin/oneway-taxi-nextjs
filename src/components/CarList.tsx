'use client'

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { calculateTripPrice } from "@/lib/distances";

interface Car {
  id: number; // This will be the Package ID or Rate ID (unique for list key)
  cabId: number; // This is the actual Cab ID
  name: string;
  type: string;
  capacity: number;
  pricePerKm: number;
  image: string;
  features: string;
  available: boolean;
  // Added fields for backend data
  priceFixed?: number;
  minKm?: number;
  driverAllowance?: number;
  hoursIncluded?: number;
  kmIncluded?: number;
  extraKmRate?: number;
  extraHourRate?: number;
  distance?: number; // Added distance field
}

interface CarListProps {
  tripData: any;
  tripType: string;
  onSelectCar: (car: Car & { totalPrice: number }) => void;
  onBack?: () => void;
}

const CarList = ({ tripData, tripType, onSelectCar, onBack }: CarListProps) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [roundTripRates, setRoundTripRates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCar, setExpandedCar] = useState<number | null>(null);

  useEffect(() => {
    fetchCabs();
  }, []);

  const fetchCabs = async () => {
    setLoading(true);
    try {
      let url = `/api/packages?tripType=${tripType}`;

      if (tripType === 'oneway' && tripData.pickupCityId && tripData.dropCityId) {
        url += `&sourceId=${tripData.pickupCityId}&destinationId=${tripData.dropCityId}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

        // Map different response types to unified Car interface
        let mappedCars: Car[] = [];

        if (tripType === 'oneway') {
          // data is OneWayPackage[]
          mappedCars = (Array.isArray(data) ? data : [])
            .filter((pkg: any) => pkg && pkg.cab)
            .map((pkg: any) => ({
              id: pkg.id, // Use Package ID for unique key
              cabId: pkg.cab?.id,
              name: pkg.cab?.name || 'Unknown Cab',
              type: pkg.cab?.type || 'Standard',
              capacity: pkg.cab?.capacityPassengers || 4,
              pricePerKm: 0, // Not used for fixed price
              image: pkg.cab?.baseImageUrl || '',
              features: JSON.stringify(pkg.cab?.features || []),
              available: true,
              priceFixed: pkg.priceFixed,
              distance: pkg.distanceKm // Map distance from package
            }));
        } else if (tripType === 'local') {
          // data is LocalPackage[]
          mappedCars = (Array.isArray(data) ? data : [])
            .filter((pkg: any) => pkg && pkg.cab)
            .map((pkg: any) => ({
              id: pkg.id, // Use Package ID for unique key
              cabId: pkg.cab?.id,
              name: pkg.cab?.name || 'Unknown Cab',
              type: pkg.cab?.type || 'Standard',
              capacity: pkg.cab?.capacityPassengers || 4,
              pricePerKm: 0,
              image: pkg.cab?.baseImageUrl || '',
              features: JSON.stringify(pkg.cab?.features || []),
              available: true,
              priceFixed: pkg.priceFixed,
              hoursIncluded: pkg.hoursIncluded,
              kmIncluded: pkg.kmIncluded,
              extraKmRate: pkg.extraKmRate,
              extraHourRate: pkg.extraHourRate
            }));
        } else if (tripType === 'roundtrip') {
          // data is RoundTripRate[]
          const validRates = (Array.isArray(data) ? data : []).filter((rate: any) => rate && rate.cab);
          mappedCars = validRates
            .map((rate: any) => ({
              id: rate.id, // Use Rate ID for unique key
              cabId: rate.cab?.id,
              name: rate.cab?.name || 'Unknown Cab',
              type: rate.cab?.type || 'Standard',
              capacity: rate.cab?.capacityPassengers || 4,
              pricePerKm: rate.ratePerKm,
              image: rate.cab?.baseImageUrl || '',
              features: JSON.stringify(rate.cab?.features || []),
              available: true,
              minKm: rate.dailyKmLimit,
              driverAllowance: rate.driverAllowancePerDay
            }));
          setRoundTripRates(validRates); // Keep raw rates for detailed calc if needed
        }

        setCars(mappedCars);
      }
    } catch (error) {
      console.error('Failed to fetch cabs:', error);
    } finally {
      setLoading(false);
    }
  };

  interface PriceDetails {
    totalPrice: number;
    distance: number;
    breakdown: {
      baseFare: number;
      distanceFare: number;
      driverAllowance: number;
      returnFare?: number;
    };
  }

  const calculatePrice = (car: Car): PriceDetails => {
    // For One Way and Local, use the fixed price from backend
    if (tripType === 'oneway' || tripType === 'local') {
      return {
        totalPrice: car.priceFixed || 0,
        distance: tripType === 'local' ? (car.kmIncluded || 0) : (car.distance || 0),
        breakdown: {
          baseFare: car.priceFixed || 0,
          distanceFare: 0,
          driverAllowance: 0
        }
      };
    }

    // For Round Trip, calculate based on rates
    if (tripType === 'roundtrip') {
      const days = parseInt(tripData.journeyDays) || 1;
      const dailyKmLimit = car.minKm || 300; // This is actually dailyKmLimit now
      const totalKmForDays = dailyKmLimit * days;

      // Calculate cost: days * dailyKmLimit * ratePerKm + driver allowance
      const distanceFare = totalKmForDays * car.pricePerKm;
      const driverAllowance = (car.driverAllowance || 0) * days;
      const totalPrice = distanceFare + driverAllowance;

      return {
        totalPrice,
        distance: totalKmForDays,
        breakdown: {
          baseFare: 0,
          distanceFare,
          driverAllowance
        }
      };
    }

    return {
      totalPrice: 0,
      distance: 0,
      breakdown: { baseFare: 0, distanceFare: 0, driverAllowance: 0 }
    };
  };

  const parseFeatures = (features: string | null) => {
    if (!features) return [];
    try {
      return JSON.parse(features);
    } catch {
      return [];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading available cabs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      />
      {/* Background overlays */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />

      <div className="max-w-7xl mx-auto pt-20 pb-6 px-2 relative z-10">
        {/* Back Button */}
        {onBack && (
          <Button
            onClick={onBack}
            className="mb-6 px-4 py-2 !rounded-full text-sm font-medium backdrop-blur-md bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Search
          </Button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar */}
          <Card className="md:col-span-1 p-6 rounded-3xl h-fit md:sticky md:top-24 shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20 relative overflow-hidden">
            {/* Liquid glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-3xl" />
            <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 via-transparent to-accent/10 rounded-3xl" />

            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4 text-white drop-shadow-lg">Trip Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-white/70 shrink-0">Trip Type:</span>
                  <span className="font-semibold text-white capitalize text-right">{tripType}</span>
                </div>
                {tripData.pickupCity && (
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-white/70 shrink-0">From:</span>
                    <span className="font-semibold text-white text-right break-words">{tripData.pickupCity}</span>
                  </div>
                )}
                {tripData.dropCity && (
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-white/70 shrink-0">To:</span>
                    <span className="font-semibold text-white text-right break-words">{tripData.dropCity}</span>
                  </div>
                )}
                {tripData.pickupCity && tripData.dropCity && tripType !== 'local' && (
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-white/70 shrink-0">Distance:</span>
                    <span className="font-semibold text-white text-right">{calculatePrice(cars[0] || { pricePerKm: 10 } as Car).distance} km</span>
                  </div>
                )}
                <div className="flex justify-between items-start gap-4">
                  <span className="text-white/70 shrink-0">Date:</span>
                  <span className="font-semibold text-white text-right">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-white/70 shrink-0">Time:</span>
                  <span className="font-semibold text-white text-right">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                {tripData.mobile && (
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-white/70 shrink-0">Mobile:</span>
                    <span className="font-semibold text-white text-right">{tripData.mobile}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Car List */}
          <div className="md:col-span-2 lg:col-span-3 space-y-6">
            {cars.map((car) => {
              const priceCalculation = calculatePrice(car);
              const features = parseFeatures(car.features);

              return (
                <Card key={car.id} className="p-4 rounded-3xl shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20 relative overflow-hidden hover:bg-white/15 transition-all duration-300">
                  {/* Liquid glass effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-3xl" />
                  <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 via-transparent to-accent/10 rounded-3xl" />

                  <div className="relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1 h-full rounded-2xl overflow-hidden">
                        <img
                          src={car.image || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop"}
                          alt={car.name}
                          className="w-full h-full object-contain rounded-2xl min-h-[10rem]"
                        />
                      </div>

                      <div className="md:col-span-2 flex flex-col justify-between h-full">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-bold text-white drop-shadow">{car.name}</h3>
                              <p className="text-white/70 capitalize text-sm">{car.type}</p>
                              {tripType === 'oneway' && (
                                <p className="text-white/60 text-xs">Fixed Price Package</p>
                              )}
                              {tripType === 'local' && (
                                <p className="text-white/60 text-xs">{car.hoursIncluded} Hr / {car.kmIncluded} Km Package</p>
                              )}
                              {tripType === 'roundtrip' && (
                                <p className="text-white/60 text-xs">₹{car.pricePerKm}/km • {car.minKm}km/day limit</p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-yellow-400 drop-shadow">₹{priceCalculation.totalPrice}</p>
                            </div>
                          </div>



                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className="rounded-full px-2 py-0.5 text-xs bg-white/20 text-white border border-white/30">
                              {car.capacity} Seats
                            </Badge>
                            {features.map((feature: string) => (
                              <Badge key={feature} className="rounded-full px-2 py-0.5 text-xs bg-white/20 text-white border border-white/30">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            onClick={() => onSelectCar({ ...car, totalPrice: priceCalculation.totalPrice })}
                            disabled={false}
                            size="sm"
                            className="flex-1 !rounded-full font-semibold backdrop-blur-md bg-yellow-400/80 hover:bg-yellow-300/90 text-black border border-yellow-300/50 hover:border-yellow-200/70 transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-yellow-100/30 to-yellow-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative z-10">Book Now</span>
                          </Button>

                          <Button
                            onClick={() => setExpandedCar(expandedCar === car.id ? null : car.id)}
                            size="sm"
                            className="!rounded-full backdrop-blur-md bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 transition-all duration-300"
                          >
                            {expandedCar === car.id ? "Hide" : "View"} Fare Details
                          </Button>
                        </div>

                        {expandedCar === car.id && (
                          <div className="mt-4 p-4 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 animate-in slide-in-from-top-4 fade-in duration-300">
                            <div className="space-y-2 text-sm text-white">
                              <div className="border-b border-white/10 pb-2 mb-2 space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-white/70">Trip Type:</span>
                                  <span className="font-semibold capitalize">{tripType}</span>
                                </div>
                                {tripData.pickupCity && (
                                  <div className="flex justify-between">
                                    <span className="text-white/70">From:</span>
                                    <span className="font-semibold text-right">{tripData.pickupCity}</span>
                                  </div>
                                )}
                                {tripData.dropCity && (
                                  <div className="flex justify-between">
                                    <span className="text-white/70">To:</span>
                                    <span className="font-semibold text-right">{tripData.dropCity}</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span className="text-white/70">Date:</span>
                                  <span className="font-semibold">{new Date().toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/70">Time:</span>
                                  <span className="font-semibold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/70">Distance:</span>
                                <span className="font-semibold">{priceCalculation.distance} km</span>
                              </div>
                              {tripType === 'roundtrip' && (
                                <>
                                  <div className="flex justify-between">
                                    <span className="text-white/70">Distance Cost ({priceCalculation.distance} km):</span>
                                    <span className="font-semibold">₹{priceCalculation.breakdown.distanceFare}</span>
                                  </div>
                                </>
                              )}
                              {tripType === 'local' && (
                                <>
                                  <div className="flex justify-between">
                                    <span className="text-white/70">Extra Km Rate:</span>
                                    <span className="font-semibold">₹{car.extraKmRate}/km</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-white/70">Extra Hour Rate:</span>
                                    <span className="font-semibold">₹{car.extraHourRate}/hr</span>
                                  </div>
                                </>
                              )}
                            </div>
                            {priceCalculation.breakdown.driverAllowance > 0 && (
                              <div className="flex justify-between text-sm text-white mt-2 px-4">
                                <span className="text-white/70">Driver Allowance:</span>
                                <span className="font-semibold">₹{priceCalculation.breakdown.driverAllowance}</span>
                              </div>
                            )}
                            {tripType === 'roundtrip' && (
                              <div className="text-xs text-white/50 mt-1 px-4">
                                *Based on {car.minKm || 300}km per day limit
                              </div>
                            )}
                            <div className="border-t border-white/20 pt-2 flex justify-between font-bold text-white mt-2 px-4">
                              <span>Total:</span>
                              <span className="text-yellow-400">₹{priceCalculation.totalPrice}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {cars.length === 0 && (
          <div className="text-center py-12">
            <div className="text-white text-xl mb-4">No cabs available</div>
            <div className="text-white/70">Please try again later or contact support</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarList;