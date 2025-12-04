import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
            About Oneway Taxi Surat
          </h1>

          <Card className="p-8 rounded-2xl shadow-lg mb-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-foreground-secondary mb-6">
                Oneway Taxi Surat offers reliable and affordable car rental services in Surat-Gujarat.
                With a fleet of well-maintained vehicles and professional drivers, we ensure comfort,
                safety, and seamless travel for all your journeys.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">Our Services</h2>
              <ul className="space-y-2 text-foreground-secondary">
                <li>• Outstation Bus Service in Surat</li>
                <li>• Outstation Cab Service in Surat</li>
                <li>• Local taxi services with hourly packages</li>
                <li>• Airport transfers to Mumbai and other cities</li>
                <li>• Corporate travel solutions</li>
                <li>• Wedding and event transportation</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Why Choose Us?</h2>
              <ul className="space-y-2 text-foreground-secondary">
                <li>• 24x7 availability</li>
                <li>• Professional and experienced drivers</li>
                <li>• Well-maintained and clean vehicles</li>
                <li>• Competitive and transparent pricing</li>
                <li>• On-time service guarantee</li>
                <li>• Safe and comfortable travel experience</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}