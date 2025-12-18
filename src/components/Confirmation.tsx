import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

interface ConfirmationProps {
  bookingData: any;
  onBack?: () => void;
}

const Confirmation = ({ bookingData, onBack }: ConfirmationProps) => {
  const bookingNumber = useMemo(() => `BK${Date.now().toString().slice(-8)}`, []);

  return (
    <div className="max-w-4xl mx-auto pt-20 pb-12 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary mb-4">
          <svg className="w-10 h-10 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
        <p className="text-xl text-foreground-secondary">Your ride has been successfully booked</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Traveler Information</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-foreground-secondary">Booking Number</p>
              <p className="text-lg font-semibold text-primary">{bookingNumber}</p>
            </div>
            <div>
              <p className="text-sm text-foreground-secondary">Name</p>
              <p className="text-lg font-semibold text-foreground">{bookingData.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-foreground-secondary">Email</p>
              <p className="text-lg font-semibold text-foreground">{bookingData.email}</p>
            </div>
            <div>
              <p className="text-sm text-foreground-secondary">Mobile</p>
              <p className="text-lg font-semibold text-foreground">{bookingData.mobile}</p>
            </div>
            <div>
              <p className="text-sm text-foreground-secondary">Amount</p>
              <p className="text-2xl font-bold text-primary">₹{bookingData.car.totalPrice}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Trip Information</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-foreground-secondary">Pickup Location</p>
              <p className="text-lg font-semibold text-foreground">{bookingData.pickupLocation}</p>
            </div>
            <div>
              <p className="text-sm text-foreground-secondary">Drop Location</p>
              <p className="text-lg font-semibold text-foreground">{bookingData.dropLocation}</p>
            </div>
            <div>
              <p className="text-sm text-foreground-secondary">Pickup Date</p>
              <p className="text-lg font-semibold text-foreground">{bookingData.pickupDate}</p>
            </div>
            <div>
              <p className="text-sm text-foreground-secondary">Pickup Time</p>
              <p className="text-lg font-semibold text-foreground">{bookingData.pickupTime}</p>
            </div>
            <div>
              <p className="text-sm text-foreground-secondary">Vehicle</p>
              <p className="text-lg font-semibold text-foreground">{bookingData.car.name}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 rounded-2xl shadow-lg bg-primary/10 border-2 border-primary/20 mb-8">
        <h3 className="text-xl font-bold mb-3 text-foreground">Next Steps</h3>
        <ul className="space-y-2 text-foreground-secondary">
          <li>✓ You will receive a confirmation email shortly</li>
          <li>✓ Our driver will contact you 30 minutes before pickup</li>
          <li>✓ Please be ready at your pickup location on time</li>
          <li>✓ For any changes or queries, contact our support team</li>
        </ul>
      </Card>

      <div className="flex justify-center gap-4">
        {onBack && (
          <Button
            onClick={onBack}
            size="lg"
            variant="outline"
            className="rounded-xl px-8 border-2 font-semibold"
          >
            Book Another Ride
          </Button>
        )}
        <Button
          onClick={() => window.print()}
          size="lg"
          className="rounded-xl px-8 bg-primary hover:bg-primary/90 font-semibold"
        >
          Print Confirmation
        </Button>
      </div>
    </div>
  );
};

export default Confirmation;