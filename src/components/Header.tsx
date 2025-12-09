"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import RequestCallBackDialog from "@/components/RequestCallBackDialog";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Login", href: "/login" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'backdrop-blur-xl bg-black/20 border-b border-white/10 shadow-2xl'
          : 'backdrop-blur-xl bg-white/10 border-b border-white/20'
          }`}
      >
        {/* Liquid glass effect overlays - Matching Hero Section */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 via-transparent to-accent/10 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img
                src="/onewaytaxicablogo/logo.jpg"
                alt="Oneway Taxi Surat Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400/50 shadow-lg"
              />
              <div>
                <h1 className="text-xl font-bold text-white drop-shadow-lg">Oneway Taxi Surat</h1>
                <p className="text-xs text-white/80 drop-shadow">Reliable Car Rental Services</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-colors font-medium drop-shadow ${isActive(link.href) ? "text-yellow-400" : "text-white/90 hover:text-yellow-400"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Contact Info & CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-right">
                <a href="tel:+918511680364" className="text-sm font-semibold text-white drop-shadow hover:text-yellow-400 transition-colors">
                  +91 85116 80364
                </a>
                <p className="text-xs text-white/80 drop-shadow">Available 24x7</p>
              </div>
              <Button
                size="sm"
                onClick={() => setIsDialogOpen(true)}
                className="backdrop-blur-md bg-yellow-400/80 hover:bg-yellow-300/90 text-black border border-yellow-300/50 hover:border-yellow-200/70 font-semibold rounded-full transition-all duration-300 hover:scale-105 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-yellow-100/30 to-yellow-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Request Call Back</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg backdrop-blur-md bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 rounded-b-2xl">
              <nav className="flex flex-col gap-4 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`transition-colors font-medium drop-shadow ${isActive(link.href) ? "text-yellow-400" : "text-white/90 hover:text-yellow-400"
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-white/10">
                  <a href="tel:+918511680364" className="block text-sm font-semibold text-white mb-1 drop-shadow hover:text-yellow-400 transition-colors">
                    +91 85116 80364
                  </a>
                  <p className="text-xs text-white/80 mb-3 drop-shadow">Available 24x7</p>
                  <Button
                    size="sm"
                    onClick={() => setIsDialogOpen(true)}
                    className="backdrop-blur-md bg-yellow-400/80 hover:bg-yellow-300/90 text-black border border-yellow-300/50 hover:border-yellow-200/70 font-semibold w-full rounded-full transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-yellow-100/30 to-yellow-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">Request Call Back</span>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
      <RequestCallBackDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </>
  );
};

export default Header;