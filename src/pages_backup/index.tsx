import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OneWayForm from "@/components/OneWayForm";
import RoundTripForm from "@/components/RoundTripForm";
import LocalTripForm from "@/components/LocalTripForm";
import CarList from "@/components/CarList";
import UserDetailsForm from "@/components/UserDetailsForm";
import Confirmation from "@/components/Confirmation";
import InfoSections from "@/components/InfoSections";
import Footer from "@/components/Footer";

type Step = 'hero' | 'form' | 'cars' | 'details' | 'confirmation';
type TripType = 'oneway' | 'roundtrip' | 'local' | null;

export default function Home() {
  const [step, setStep] = useState<Step>('hero');
  const [tripType, setTripType] = useState<TripType>('oneway');
  const [tripData, setTripData] = useState<any>(null);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [bookingData, setBookingData] = useState<any>(null);

  const handleTripTypeSelect = (type: TripType) => {
    setTripType(type);
    setStep('form');
  };

  const handleFormSubmit = (data: any) => {
    setTripData({ ...data, tripType });
    setStep('cars');
  };

  const handleCarSelect = (car: any) => {
    setSelectedCar(car);
    setStep('details');
  };

  const handleDetailsSubmit = (data: any) => {
    setBookingData(data);
    setStep('confirmation');
  };

  const handleBackToHero = () => {
    setStep('hero');
    setTripData(null);
    setSelectedCar(null);
    setBookingData(null);
  };

  const handleBackToForm = () => {
    setStep('form');
    setSelectedCar(null);
    setBookingData(null);
  };

  const handleBackToCars = () => {
    setStep('cars');
    setSelectedCar(null);
    setBookingData(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {step === 'hero' && (
        <>
          <Hero onSelectTripType={handleTripTypeSelect} />
          <InfoSections />
        </>
      )}

      {step === 'form' && (
        <div 
          className="min-h-screen relative overflow-hidden flex items-center justify-center"
        >
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
            {tripType === 'oneway' && <OneWayForm onSubmit={handleFormSubmit} />}
            {tripType === 'roundtrip' && <RoundTripForm onSubmit={handleFormSubmit} />}
            {tripType === 'local' && <LocalTripForm onSubmit={handleFormSubmit} />}
          </div>
        </div>
      )}

      {step === 'cars' && tripData && (
        <CarList
          tripData={tripData}
          tripType={tripType || 'oneway'}
          onSelectCar={handleCarSelect}
          onBack={handleBackToForm}
        />
      )}

      {step === 'details' && selectedCar && tripData && (
        <UserDetailsForm
          carData={selectedCar}
          tripData={tripData}
          onSubmit={handleDetailsSubmit}
          onBack={handleBackToCars}
        />
      )}

      {step === 'confirmation' && bookingData && (
        <Confirmation
          bookingData={bookingData}
          onBack={handleBackToHero}
        />
      )}

      <Footer />
    </div>
  );
}