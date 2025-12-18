'use client'

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RequestCallBackDialog from "@/components/RequestCallBackDialog";

const Footer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const services = [
    { name: "Outstation Bus" },
    { name: "Outstation Cab" },
    { name: "Surat Local Package" },
    { name: "Surat to Ahmedabad Cab" },
    { name: "Ahmedabad to Surat Cab" },
    { name: "Surat to Mumbai Airport" },
    { name: "Mumbai Airport to Surat Cab" },
  ];

  return (
    <>
      <footer className="relative border-t border-white/10 text-white py-1 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
          }}
        />

        <div className=" relative z-10">
          <div className=" md:p-10 rounded-3xl shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20 relative overflow-hidden">
            {/* Liquid glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 via-transparent to-accent/10 rounded-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* About Section */}
              <div className="mb-12 text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <img
                    src="/onewaytaxicablogo/logo.jpg"
                    alt="Oneway Taxi Surat Logo"
                    className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
                  />
                  <h2 className="text-3xl font-bold text-white drop-shadow-lg">Oneway Taxi Surat</h2>
                </div>

                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="mt-6 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Request Call Back!
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Contact Info */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-yellow-400">Contact Info</h3>
                  <div className="space-y-3 text-white/80">
                    <p className="flex items-start gap-2">
                      <svg className="w-5 h-5 mt-1 flex-shrink-0 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>L9/2 Shreenathji Complex, Ram Nagar Char Rasta, Rander Surat, 395005</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <svg className="w-5 h-5 flex-shrink-0 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href="tel:+918511680364" className="hover:text-yellow-400 transition-colors">+91 85116 80364</a>
                    </p>
                    <p className="flex items-start gap-2">
                      <svg className="w-5 h-5 mt-1 flex-shrink-0 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="flex flex-col gap-1">
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=reservations@onewaytaxicabs.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">reservations@onewaytaxicabs.com</a>
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=rajlaxmidhar175@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">rajlaxmidhar175@gmail.com</a>
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <svg className="w-5 h-5 mt-1 flex-shrink-0 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Available 24x7</span>
                    </p>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-yellow-400">Services</h3>
                  <ul className="space-y-2 text-white/80">
                    {services.map((service, index) => (
                      <li key={index} className="flex items-start justify-between gap-2">
                        <span className="flex items-start gap-2 flex-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0 mt-2" />
                          <span className="text-sm hover:text-yellow-400 transition-colors cursor-pointer">{service.name}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social & Quick Links */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-yellow-400">Find us on:</h3>
                  <div className="flex gap-4 mb-6">
                    <a href="https://www.facebook.com/share/14Sh9UCRJtC/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black transition-all duration-300 flex items-center justify-center border border-white/10" title="Facebook">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/choice_taxi_surat/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black transition-all duration-300 flex items-center justify-center border border-white/10" title="Instagram">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m0 2A3.8 3.8 0 0 0 4 7.8v8.4a3.8 3.8 0 0 0 3.8 3.8h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8m12.9 1.3a1 1 0 1 1-2 0 1 1 0 0 1 2 0M12 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12m0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8" />
                      </svg>
                    </a>
                    <a href="https://wa.me/+918511680364" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black transition-all duration-300 flex items-center justify-center border border-white/10" title="WhatsApp">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.04 2c-5.45 0-9.91 4.46-9.91 9.91 0 1.75.5 3.45 1.46 4.95L2.09 22l5.25-1.38c1.45.79 3.08 1.21 4.7 1.21 5.46 0 9.91-4.46 9.91-9.91S17.5 2 12.04 2zm0 1.67c4.58 0 8.24 3.75 8.24 8.24 0 4.58-3.66 8.24-8.24 8.24-1.45 0-2.86-.37-4.09-1.08L4.66 20.4l1.3-4.72c-.8-1.29-1.24-2.77-1.24-4.31 0-4.58 3.67-8.24 8.24-8.24zm-4.7 5.03c-.2.01-.49.01-.71.01-.2 0-.57.07-.82.3-.24.2-.93.91-.93 2.22 0 1.3.95 2.58 1.08 2.76.14.17 1.87 2.85 4.54 3.96 2.67 1.11 3.22.88 3.8.83.58-.05 1.87-.76 2.12-1.49.25-.73.25-1.36.18-1.49-.07-.13-.26-.2-.55-.35-.29-.14-1.72-.85-1.99-.95-.27-.11-.47-.16-.66.14-.2.3-.77.95-.94 1.14-.17.2-.34.22-.63.08-.29-.15-1.2-.44-2.29-1.41-1.09-.96-1.82-2.16-2.03-2.5-.2-.34-.02-.52.12-.64.13-.13.29-.34.44-.52.15-.18.2-.3.3-.5.09-.2.05-.37-.02-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.66-.51z" />
                      </svg>
                    </a>
                  </div>
                  <div className="space-y-2 text-white/60 text-sm">
                    <p>© 2025 Oneway Taxi Surat. All rights reserved.</p>
                    <div className="flex gap-4">
                      <a href="/privacy-policy" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
                      <a href="/terms" className="hover:text-yellow-400 transition-colors">Terms of Service</a>
                      <a href="/refund-policy" className="hover:text-yellow-400 transition-colors">Refund Policy</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <RequestCallBackDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </>
  );
};

export default Footer;