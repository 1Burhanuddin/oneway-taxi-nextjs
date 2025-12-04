'use client'

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
import FleetSection from "@/components/FleetSection";

type Step = 'hero' | 'form' | 'cars' | 'details' | 'confirmation';
type TripType = 'oneway' | 'roundtrip' | 'local' | null;

export default function Home() {
  const [step, setStep] = useState<Step>('hero');
  const [tripType, setTripType] = useState<TripType>('oneway');
  const [tripData, setTripData] = useState<any>(null);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [bookingData, setBookingData] = useState<any>(null);
  const [showForm, setShowForm] = useState<boolean>(true); // Show form by default

  const handleTripTypeSelect = (type: TripType) => {
    setTripType(type);
    setShowForm(true);
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
    setShowForm(true);
    setTripData(null);
    setSelectedCar(null);
    setBookingData(null);
  };

  const handleBackToForm = () => {
    setStep('hero');
    setShowForm(true);
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
          <Hero onSelectTripType={handleTripTypeSelect} activeTripType={tripType || 'oneway'}>
            {showForm && (
              <>
                {tripType === 'oneway' && <OneWayForm onSubmit={handleFormSubmit} />}
                {tripType === 'roundtrip' && <RoundTripForm onSubmit={handleFormSubmit} />}
                {tripType === 'local' && <LocalTripForm onSubmit={handleFormSubmit} />}
              </>
            )}
          </Hero>
          <FleetSection />
          <InfoSections />
        </>
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