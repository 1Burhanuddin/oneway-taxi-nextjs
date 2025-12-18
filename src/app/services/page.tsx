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
      image: "https://imgs.search.brave.com/k0A3t-is4LuHn9Vzcp9HoqOVQoe6RDbHYmLEqw96ntQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG5p/Lmljb25zY291dC5j/b20vaWxsdXN0cmF0/aW9uL3ByZW1pdW0v/dGh1bWIvY2FiLWJv/b2tpbmctYXBwLWls/bHVzdHJhdGlvbi1k/b3dubG9hZC1pbi1z/dmctcG5nLWdpZi1m/aWxlLWZvcm1hdHMt/LXRheGktb25saW5l/LXBpY2t1cC1zZXJ2/aWNlLXBhY2stdmVo/aWNsZS1pbGx1c3Ry/YXRpb25zLTY2MzM2/MTYucG5n"
    },
    {
      title: "One Way Booking Cab Service",
      description: "India’s mass transit is overcrowded and uncomfortable for many travellers. If you want to travel comfortably from one location to the other, Oneway rental car booking is a perfect idea. You can make a reservation for a Oneway and plan your trip around your schedule.",
      image: "https://imgs.search.brave.com/Jauf4Sjw2RAlywxxbgA1ZImOYfo5KpyuOn3Do323Isk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG5p/Lmljb25zY291dC5j/b20vaWxsdXN0cmF0/aW9uL3ByZW1pdW0v/dGh1bWIvY2FiLWJv/b2tpbmctc2Vydmlj/ZS1pbGx1c3RyYXRp/b24tZG93bmxvYWQt/aW4tc3ZnLXBuZy1n/aWYtZmlsZS1mb3Jt/YXRzLS10cmFja2lu/Zy10YXhpLXRyYWNr/LWxvY2F0aW9uLW9u/bGluZS1wYWNrLXZl/aGljbGUtaWxsdXN0/cmF0aW9ucy0zOTMy/ODA2LnBuZw"
    },
    {
      title: "Outstation Cab Service",
      description: "Oneway Taxi Cab in Surat, the Brand of Cab Service is known for Outstation Cab services in India and one way cabs in India. Oneway Taxi is specialized in Drop Taxi Services. We provide outstation taxi services from multiple cities and states of India.",
      image: "https://imgs.search.brave.com/7ZeJiErOrNMXEtO3bI2vWD5hUtw5qfyRD5WXpjdG6x4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9vdXRz/dGF0aW9uLm9sYWNh/YnMuY29tL21lZGlh/L3d5c2l3eWcvY2Fi/X3NpemUuc3Zn"
    },
    {
      title: "Wedding Event Cab Service",
      description: "Oneway Taxi Cab Service is one of the leading providers of high-quality local Taxi Service services. Our top priorities are customer satisfaction and security. We guarantee our customers an exceptional car hire experience at the lowest possible cost.",
      image: "https://imgs.search.brave.com/7ZeJiErOrNMXEtO3bI2vWD5hUtw5qfyRD5WXpjdG6x4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9vdXRz/dGF0aW9uLm9sYWNh/YnMuY29tL21lZGlh/L3d5c2l3eWcvY2Fi/X3NpemUuc3Zn"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-0" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0" />

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
                <Card key={index} className="rounded-3xl shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 flex flex-col">
                  {/* Liquid glass effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 via-transparent to-accent/10 pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Image Container - Full Width */}
                    <div className="relative w-full h-64 overflow-hidden border-b border-white/10">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0" />
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">{service.title}</h3>
                      <p className="text-white/80 leading-relaxed text-lg drop-shadow flex-grow">{service.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>


          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}