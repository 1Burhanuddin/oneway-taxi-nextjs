'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Cab {
    id: number;
    name: string;
    type: string;
    capacityPassengers: number;
    baseImageUrl: string | null;
    features: any;
}

const FleetSection = () => {
    const [cabs, setCabs] = useState<Cab[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCabs = async () => {
            try {
                const response = await fetch('/api/cabs');
                if (response.ok) {
                    const data = await response.json();
                    setCabs(data);
                }
            } catch (error) {
                console.error('Failed to fetch fleet:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCabs();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const parseFeatures = (features: any) => {
        if (!features) return [];
        if (typeof features === 'string') {
            try {
                return JSON.parse(features);
            } catch {
                return [];
            }
        }
        return Array.isArray(features) ? features : [];
    };

    if (loading) {
        return <div className="py-20 text-center">Loading fleet...</div>;
    }

    return (
        <section className="relative py-20 overflow-hidden min-h-screen">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed "
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
                }}
            />
            {/* Background overlays */}
            {/* Removed colored gradient as per user request */}

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <div className="inline-block p-8 rounded-3xl backdrop-blur-xl border border-white/10 shadow-xl w-full bg-gradient-to-tl from-primary/10 via-transparent to-accent/10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">Our Premium Fleet</h2>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto drop-shadow">
                            Choose from our wide range of comfortable and well-maintained vehicles for your journey.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cabs.map((cab) => (
                        <Card key={cab.id} className="group overflow-hidden rounded-3xl border border-white/20 shadow-2xl backdrop-blur-xl bg-white/10 hover:bg-white/15 transition-all duration-300">
                            {/* Liquid glass effect overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-3xl pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 via-transparent to-accent/10 rounded-3xl pointer-events-none" />

                            <div className="relative h-64 overflow-hidden z-10">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                <img
                                    src={cab.baseImageUrl || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80"}
                                    alt={cab.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute bottom-4 left-4 z-20">
                                    <Badge className="bg-yellow-400 text-black hover:bg-yellow-500 mb-2 border-0">
                                        {cab.type}
                                    </Badge>
                                    <h3 className="text-2xl font-bold text-white drop-shadow-md">{cab.name}</h3>
                                </div>
                            </div>

                            <div className="p-6 relative z-10">
                                <div className="flex items-center gap-4 mb-6 text-sm text-white/80">
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        {cab.capacityPassengers} Passengers
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Verified
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {parseFeatures(cab.features).slice(0, 3).map((feature: string, idx: number) => (
                                        <span key={idx} className="text-xs px-2 py-1 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-md">
                                            {feature}
                                        </span>
                                    ))}
                                    {parseFeatures(cab.features).length > 3 && (
                                        <span className="text-xs px-2 py-1 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-md">
                                            +{parseFeatures(cab.features).length - 3} more
                                        </span>
                                    )}
                                </div>

                                <Button
                                    onClick={scrollToTop}
                                    className="w-full !rounded-full font-semibold backdrop-blur-md bg-yellow-400/80 hover:bg-yellow-300/90 text-black border border-yellow-300/50 hover:border-yellow-200/70 transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden group h-12 text-lg"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-yellow-100/30 to-yellow-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative z-10">Book Now</span>
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FleetSection;
