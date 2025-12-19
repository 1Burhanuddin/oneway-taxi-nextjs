'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface UserDetailsFormProps {
  carData: any;
  tripData: any;
  onSubmit: (data: any) => void;
  onBack?: () => void;
}

const UserDetailsForm = ({ carData, tripData, onSubmit, onBack }: UserDetailsFormProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    mobile: tripData.mobile || "",
    specialRequest: "",
    pickupDate: tripData.pickupDate || "",
    pickupTime: tripData.pickupTime || "",
    pickupLocation: tripData.location || "",
    dropLocation: "",
    alternativeNumber: "",
    flightNumber: "",
    acceptTerms: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms || !formData.firstName || !formData.email || !formData.mobile) {
      return;
    }

    setLoading(true);
    try {
      // Get city IDs from the trip data
      const citiesResponse = await fetch('/api/cities');
      const cities = await citiesResponse.json();

      const pickupCity = cities.find((city: any) => city.name === tripData.pickupCity);
      const dropCity = cities.find((city: any) => city.name === tripData.dropCity);

      const bookingData = {
        tripType: tripData.tripType,
        pickupCityId: pickupCity?.id,
        dropCityId: dropCity?.id,
        pickupDate: formData.pickupDate,
        pickupTime: formData.pickupTime,
        journeyDays: tripData.journeyDays,
        location: formData.pickupLocation,
        customerName: formData.firstName,
        mobile: formData.mobile,
        email: formData.email,
        cabId: carData.cabId,
        totalPrice: carData.totalPrice
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        const booking = await response.json();
        onSubmit({ ...formData, booking, car: carData, trip: tripData });
      } else {
        console.error('Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setLoading(false);
    }
  };

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

      <div className="max-w-4xl mx-auto py-12 px-4 relative z-10">
        {/* Back Button */}
        {onBack && (
          <Button
            onClick={onBack}
            className="mb-6 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Cars
          </Button>
        )}

        <Card className="p-8 rounded-3xl shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20 relative overflow-hidden">
          {/* Liquid glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 via-transparent to-accent/10 rounded-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">Complete Your Booking</h2>

            {/* Trip Details Summary */}
            <Card className="p-4 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 relative overflow-hidden mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl" />
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-3 text-white drop-shadow">Trip Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-white/70">Trip Type:</span>
                    <p className="font-semibold text-white capitalize">{tripData.tripType || 'One Way'}</p>
                  </div>
                  {tripData.pickupCity && (
                    <div>
                      <span className="text-white/70">From:</span>
                      <p className="font-semibold text-white">{tripData.pickupCity}</p>
                    </div>
                  )}
                  {tripData.dropCity && (
                    <div>
                      <span className="text-white/70">To:</span>
                      <p className="font-semibold text-white">{tripData.dropCity}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-white/70">Vehicle:</span>
                    <p className="font-semibold text-white">{carData.name}</p>
                  </div>
                </div>
              </div>
            </Card>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First row - 3 fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white font-medium text-sm drop-shadow">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="h-11 rounded-lg border-2"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium text-sm drop-shadow">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-11 rounded-lg border-2"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-white font-medium text-sm drop-shadow">
                    Mobile No *
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="h-11 rounded-lg border-2"
                    required
                  />
                </div>
              </div>

              {/* Second row - 3 fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="alternativeNumber" className="text-white font-medium text-sm drop-shadow">
                    Alternative Number
                  </Label>
                  <Input
                    id="alternativeNumber"
                    type="tel"
                    value={formData.alternativeNumber}
                    onChange={(e) => setFormData({ ...formData, alternativeNumber: e.target.value })}
                    className="h-11 rounded-lg border-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickupDate" className="text-white font-medium text-sm drop-shadow">
                    Pickup Date *
                  </Label>
                  <Input
                    id="pickupDate"
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                    className="h-11 rounded-lg border-2"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickupTime" className="text-white font-medium text-sm drop-shadow">
                    Pickup Time *
                  </Label>
                  <Input
                    id="pickupTime"
                    type="time"
                    value={formData.pickupTime}
                    onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                    className="h-11 rounded-lg border-2"
                    required
                  />
                </div>
              </div>

              {/* Third row - 3 fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupLocation" className="text-white font-medium text-sm drop-shadow">
                    Pickup Location *
                  </Label>
                  <Input
                    id="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                    className="h-11 rounded-lg border-2"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dropLocation" className="text-white font-medium text-sm drop-shadow">
                    Drop Location *
                  </Label>
                  <Input
                    id="dropLocation"
                    value={formData.dropLocation}
                    onChange={(e) => setFormData({ ...formData, dropLocation: e.target.value })}
                    className="h-11 rounded-lg border-2"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="flightNumber" className="text-white font-medium text-sm drop-shadow">
                    Flight Number (Optional)
                  </Label>
                  <Input
                    id="flightNumber"
                    value={formData.flightNumber}
                    onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
                    className="h-11 rounded-lg border-2"
                  />
                </div>
              </div>

              {/* Special Request - Full width */}
              <div className="space-y-2">
                <Label htmlFor="specialRequest" className="text-white font-medium text-sm drop-shadow">
                  Special Request
                </Label>
                <Textarea
                  id="specialRequest"
                  value={formData.specialRequest}
                  onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                  className="rounded-lg border-2 min-h-[80px]"
                  placeholder="Any special requests or requirements..."
                />
              </div>

              <Card className="p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl" />
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 text-white drop-shadow">Price Details</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white/80">Total Amount:</span>
                    <span className="text-3xl font-bold text-yellow-400">₹{carData.totalPrice}</span>
                  </div>
                  <div className="space-y-2 text-sm text-white/70">
                    <p>• Bookings must be made at least 4 hours before pickup time</p>
                    <p>• For urgent bookings, please contact us directly</p>
                    <p>• Payment accepted via GPay, Paytm, or Bank Transfer</p>
                  </div>
                </div>
              </Card>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-white/80 cursor-pointer drop-shadow"
                >
                  I accept the Terms & Conditions
                </Label>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={!formData.acceptTerms || loading}
                className="w-full h-12 rounded-full text-lg font-semibold backdrop-blur-md bg-yellow-400/80 hover:bg-yellow-300/90 text-black border border-yellow-300/50 hover:border-yellow-200/70 transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-yellow-100/30 to-yellow-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">
                  {loading ? 'Creating Booking...' : 'Confirm Booking'}
                </span>
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserDetailsForm;