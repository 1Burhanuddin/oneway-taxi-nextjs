'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface City {
    id: number;
    name: string;
    state: string;
}

interface BookingInquiryDialogProps {
    isOpen: boolean;
    onClose: () => void;
    cabName: string;
}

const BookingInquiryDialog = ({ isOpen, onClose, cabName }: BookingInquiryDialogProps) => {
    const [mobile, setMobile] = useState("");
    const [pickupCity, setPickupCity] = useState("");
    const [dropCity, setDropCity] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // City selection state
    const [cities, setCities] = useState<City[]>([]);
    const [openPickup, setOpenPickup] = useState(false);
    const [openDrop, setOpenDrop] = useState(false);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch('/api/cities');
                if (response.ok) {
                    const data = await response.json();
                    setCities(data);
                }
            } catch (error) {
                console.error('Failed to fetch cities:', error);
            }
        };

        if (isOpen) {
            fetchCities();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const route = `${pickupCity} to ${dropCity}`;

        try {
            const response = await fetch('/api/booking-inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile, city: route, cabName })
            });

            if (response.ok) {
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    setMobile("");
                    setPickupCity("");
                    setDropCity("");
                    onClose();
                }, 2000);
            } else {
                console.error('Failed to submit request');
            }
        } catch (error) {
            console.error('Error submitting request:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog Content */}
            <Card className="relative w-full max-w-md p-8 rounded-3xl shadow-2xl backdrop-blur-xl bg-black/40 border border-white/20 overflow-visible animate-in fade-in zoom-in duration-300">
                {/* Liquid glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-3xl pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white drop-shadow-lg">Book Inquiry</h2>
                            <p className="text-white/60 text-sm mt-1">For {cabName}</p>
                        </div>

                        <button
                            onClick={onClose}
                            className="text-white/60 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {submitted ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50">
                                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Request Sent!</h3>
                            <p className="text-white/80">We will call you back shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Pickup City */}
                            <div className="space-y-2">
                                <Label className="text-white font-medium">Pickup City</Label>
                                <Popover open={openPickup} onOpenChange={setOpenPickup}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openPickup}
                                            className="w-full h-12 justify-between rounded-full border-2 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
                                        >
                                            {pickupCity || "Select pickup city"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[300px] p-0 bg-white text-black z-[200]">
                                        <Command>
                                            <CommandInput placeholder="Search city..." className="h-9" />
                                            <CommandList>
                                                <CommandEmpty>No city found.</CommandEmpty>
                                                <CommandGroup>
                                                    {cities.map((city) => (
                                                        <CommandItem
                                                            key={city.id}
                                                            value={city.name}
                                                            onSelect={(currentValue) => {
                                                                setPickupCity(currentValue === pickupCity ? "" : currentValue)
                                                                setOpenPickup(false)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    pickupCity === city.name ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {city.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Drop City */}
                            <div className="space-y-2">
                                <Label className="text-white font-medium">Drop City</Label>
                                <Popover open={openDrop} onOpenChange={setOpenDrop}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openDrop}
                                            className="w-full h-12 justify-between rounded-full border-2 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
                                        >
                                            {dropCity || "Select drop city"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[300px] p-0 bg-white text-black z-[200]">
                                        <Command>
                                            <CommandInput placeholder="Search city..." className="h-9" />
                                            <CommandList>
                                                <CommandEmpty>No city found.</CommandEmpty>
                                                <CommandGroup>
                                                    {cities.map((city) => (
                                                        <CommandItem
                                                            key={city.id}
                                                            value={city.name}
                                                            onSelect={(currentValue) => {
                                                                setDropCity(currentValue === dropCity ? "" : currentValue)
                                                                setOpenDrop(false)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    dropCity === city.name ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {city.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="inquiry-mobile" className="text-white font-medium">
                                    Mobile Number
                                </Label>
                                <Input
                                    id="inquiry-mobile"
                                    type="tel"
                                    placeholder="Enter your mobile number"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    className="h-12 rounded-full border-2 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-yellow-400/50 focus:ring-yellow-400/20"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 rounded-full text-lg font-semibold backdrop-blur-md bg-yellow-400 hover:bg-yellow-300 text-black border border-yellow-300/50 transition-all duration-300 hover:scale-105 shadow-lg"
                                disabled={!pickupCity || !dropCity || !mobile}
                            >
                                Send Inquiry
                            </Button>
                        </form>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default BookingInquiryDialog;
