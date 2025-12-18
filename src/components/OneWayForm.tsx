'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
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

interface OneWayFormProps {
  onSubmit: (data: any) => void;
}

const OneWayForm = ({ onSubmit }: OneWayFormProps) => {
  const [cities, setCities] = useState<City[]>([]);
  const [openPickup, setOpenPickup] = useState(false)
  const [openDrop, setOpenDrop] = useState(false)
  const [formData, setFormData] = useState({
    pickupCity: "",
    pickupCityId: "",
    dropCity: "",
    dropCityId: "",
    mobile: "",
  });

  useEffect(() => {
    const fetchCities = async () => {
      console.log('🚀 OneWayForm: Fetching cities...');
      try {
        console.log('📡 OneWayForm: Making request to /api/cities');
        const response = await fetch('/api/cities');
        console.log('📊 OneWayForm: Response status:', response.status);
        console.log('📋 OneWayForm: Response ok:', response.ok);

        if (response.ok) {
          const data = await response.json();
          console.log('✅ OneWayForm: Cities received:', data.length);
          console.log('🏙️ OneWayForm: Cities data:', data);
          setCities(data);
        } else {
          const errorText = await response.text();
          console.error('❌ OneWayForm: Response not ok:', response.status, errorText);
        }
      } catch (error) {
        console.error('❌ OneWayForm: Failed to fetch cities:', error);
      }
    };

    fetchCities();
  }, []);

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
        <h2 className="text-2xl font-bold mb-6 text-white text-center drop-shadow-lg">One Way Trip</h2>


        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Single row with 3 fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickupCity" className="text-white font-medium text-sm drop-shadow">
                Pickup City
              </Label>
              <Popover open={openPickup} onOpenChange={setOpenPickup}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPickup}
                    className="w-full h-11 justify-between rounded-full border-2 bg-white text-black"
                  >
                    {formData.pickupCityId
                      ? cities.find((city) => city.id.toString() === formData.pickupCityId)?.name
                      : "Select pickup city"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search city..." />
                    <CommandList>
                      <CommandEmpty>No city found.</CommandEmpty>
                      <CommandGroup>
                        {cities.map((city) => (
                          <CommandItem
                            key={city.id}
                            value={city.name}
                            onSelect={() => {
                              setFormData({
                                ...formData,
                                pickupCity: city.name,
                                pickupCityId: city.id.toString()
                              })
                              setOpenPickup(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.pickupCityId === city.id.toString() ? "opacity-100" : "opacity-0"
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
              <Label htmlFor="dropCity" className="text-white font-medium text-sm drop-shadow">
                Drop City
              </Label>
              <Popover open={openDrop} onOpenChange={setOpenDrop}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openDrop}
                    className="w-full h-11 justify-between rounded-full border-2 bg-white text-black"
                  >
                    {formData.dropCityId
                      ? cities.find((city) => city.id.toString() === formData.dropCityId)?.name
                      : "Select drop city"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search city..." />
                    <CommandList>
                      <CommandEmpty>No city found.</CommandEmpty>
                      <CommandGroup>
                        {cities.map((city) => (
                          <CommandItem
                            key={city.id}
                            value={city.name}
                            onSelect={() => {
                              setFormData({
                                ...formData,
                                dropCity: city.name,
                                dropCityId: city.id.toString()
                              })
                              setOpenDrop(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.dropCityId === city.id.toString() ? "opacity-100" : "opacity-0"
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

export default OneWayForm;