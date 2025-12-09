'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface City {
  id: number;
  name: string;
  state: string;
}

interface RoundTripFormProps {
  onSubmit: (data: any) => void;
}

const RoundTripForm = ({ onSubmit }: RoundTripFormProps) => {
  const [cities, setCities] = useState<City[]>([]);
  const [formData, setFormData] = useState({
    pickupCity: "",
    pickupCityId: "",
    dropCity: "",
    dropCityId: "",
    pickupDate: "",
    pickupTime: "",
    journeyDays: "",
    mobile: "",
    location: "",
  });

  useEffect(() => {
    fetchCities();
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.pickupCity && formData.dropCity && formData.mobile) {
      onSubmit(formData);
    }
  };

  return (
    <Card className="p-6 rounded-3xl shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20 relative overflow-hidden">
      {/* Liquid glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-3xl" />
      <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 via-transparent to-accent/10 rounded-3xl" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-white text-center drop-shadow-lg">Round Trip</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickupCity" className="text-white font-medium text-sm drop-shadow">
                Pickup City
              </Label>
              <Select
                value={formData.pickupCityId}
                onValueChange={(value) => {
                  const city = cities.find(c => c.id.toString() === value);
                  if (city) {
                    setFormData({ ...formData, pickupCity: city.name, pickupCityId: value });
                  }
                }}
              >
                <SelectTrigger className="h-11 rounded-full border-2">
                  <SelectValue placeholder="Select pickup city" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id.toString()} className="rounded-md">
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dropCity" className="text-white font-medium text-sm drop-shadow">
                Drop City
              </Label>
              <Select
                value={formData.dropCityId}
                onValueChange={(value) => {
                  const city = cities.find(c => c.id.toString() === value);
                  if (city) {
                    setFormData({ ...formData, dropCity: city.name, dropCityId: value });
                  }
                }}
              >
                <SelectTrigger className="h-11 rounded-full border-2">
                  <SelectValue placeholder="Select drop city" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id.toString()} className="rounded-md">
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pickupDate" className="text-white font-medium text-sm drop-shadow">
                Pickup Date
              </Label>
              <Input
                id="pickupDate"
                type="date"
                value={formData.pickupDate}
                onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                className="h-11 rounded-full border-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pickupTime" className="text-white font-medium text-sm drop-shadow">
                Pickup Time
              </Label>
              <Input
                id="pickupTime"
                type="time"
                value={formData.pickupTime}
                onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                className="h-11 rounded-full border-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="journeyDays" className="text-white font-medium text-sm drop-shadow">
                Journey Days
              </Label>
              <Input
                id="journeyDays"
                type="number"
                placeholder="Number of days"
                value={formData.journeyDays}
                onChange={(e) => setFormData({ ...formData, journeyDays: e.target.value })}
                className="h-11 rounded-full border-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile" className="text-white font-medium text-sm drop-shadow">
                Mobile Number
              </Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="h-11 rounded-full border-2"
              />
            </div>

            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="location" className="text-white font-medium text-sm drop-shadow">
                Enter Location
              </Label>
              <Input
                id="location"
                type="text"
                placeholder="Enter your location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="h-11 rounded-full border-2"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full h-12 rounded-full text-lg font-semibold backdrop-blur-md bg-yellow-400/80 hover:bg-yellow-300/90 text-black border border-yellow-300/50 hover:border-yellow-200/70 transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-yellow-100/30 to-yellow-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Search Cars</span>
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default RoundTripForm;