import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Services() {
  const services = [
    {
      title: "Local Cabs Service -Surat",
      description: "Oneway Taxi Cabs is one of the leading providers of high-quality local Taxi Service services. Our top priorities are customer satisfaction and security. We guarantee our customers an exceptional car hire experience at the lowest possible cost.",
      image: "/services/local-taxi.png"
    },
    {
      title: "One Way Booking Cab Service",
      description: "India’s mass transit is overcrowded and uncomfortable for many travellers. If you want to travel comfortably from one location to the other, Oneway rental car booking is a perfect idea. You can make a reservation for a Oneway and plan your trip around your schedule.",
      image: "/services/oneway-trip.png"
    },
    {
      title: "Outstation Cab Service",
      description: "Oneway Taxi Cab in Surat, the Brand of Cab Service is known for Outstation Cab services in India and one way cabs in India. Oneway Taxi is specialized in Drop Taxi Services. We provide outstation taxi services from multiple cities and states of India.",
      image: "/services/outstation-cab.png"
    },
    {
      title: "Wedding Event Cab Service",
      description: "Oneway Taxi Cab Service is one of the leading providers of high-quality local Taxi Service services. Our top priorities are customer satisfaction and security. We guarantee our customers an exceptional car hire experience at the lowest possible cost.",
      image: "/services/wedding-car.png"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <div className="container mx-auto px-4 py-24 flex-grow">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white drop-shadow-lg">
              Our Services
            </h1>
            <p className="text-lg text-center text-white/90 mb-12 max-w-2xl mx-auto drop-shadow">
              Choose from our wide range of taxi and cab services designed to meet all your travel needs
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="p-8 rounded-3xl shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                  {/* Liquid glass effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 via-transparent to-accent/10 pointer-events-none" />

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-6 relative w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">{service.title}</h3>
                    <p className="text-white/80 leading-relaxed text-lg drop-shadow">{service.description}</p>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Card className="p-8 rounded-3xl shadow-2xl backdrop-blur-xl bg-yellow-400/10 border border-yellow-400/20 relative overflow-hidden">
                {/* Liquid glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />

                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Need a Custom Package?</h2>
                  <p className="text-white/90 mb-8 text-lg drop-shadow max-w-2xl mx-auto">
                    We offer customized travel solutions for corporate events, weddings, and special occasions.
                    Contact us to discuss your specific requirements.
                  </p>
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    Request Custom Quote
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}