import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      />

      <Header />

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl shadow-2xl border-white/10 rounded-3xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            About Oneway Taxi Surat
          </h1>

          <Card className="p-8 md:p-12 rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Oneway Taxi Surat offers reliable and affordable car rental services in Surat-Gujarat.
                With a fleet of well-maintained vehicles and professional drivers, we ensure comfort,
                safety, and seamless travel for all your journeys.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-yellow-400/20 flex items-center justify-center text-yellow-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </span>
                    Our Services
                  </h2>
                  <ul className="space-y-3 text-white/70">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      Outstation Bus Service in Surat
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      Outstation Cab Service in Surat
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      Local taxi services with hourly packages
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      Airport transfers to Mumbai and other cities
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      Corporate travel solutions
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      Wedding and event transportation
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-yellow-400/20 flex items-center justify-center text-yellow-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </span>
                    Why Choose Us?
                  </h2>
                  <ul className="space-y-3 text-white/70">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      24x7 availability
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      Professional and experienced drivers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      Well-maintained and clean vehicles
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      Competitive and transparent pricing
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      On-time service guarantee
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      Safe and comfortable travel experience
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}