import { Card } from "@/components/ui/card";

const InfoSections = () => {
  const carsPerKm = [
    { name: "Sedan", priceRange: "₹10-15/km", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=200&fit=crop" },
    { name: "SUV", priceRange: "₹15-20/km", image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=300&h=200&fit=crop" },
    { name: "Luxury", priceRange: "₹20-30/km", image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=300&h=200&fit=crop" },
  ];

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80')`
        }}
      />
      {/* Background overlays */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="container mx-auto px-4 relative z-10">
        {/* About Section */}
        <section className="max-w-4xl mx-auto">
          <Card className="p-8 rounded-3xl shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20 relative overflow-hidden">
            {/* Liquid glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-3xl pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6 text-center text-white drop-shadow-lg">About Our Company</h2>
              <div className="prose prose-lg max-w-none text-white/90">
                <p className="mb-4 drop-shadow">
                  We are a leading cab service provider committed to delivering exceptional transportation experiences.
                  With years of expertise in the industry, we pride ourselves on our reliable, safe, and comfortable services.
                </p>
                <p className="mb-4 drop-shadow">
                  Our fleet of well-maintained vehicles and professional drivers ensure that every journey with us is
                  pleasant and hassle-free. Whether it&apos;s a quick city ride or a long-distance journey, we&apos;ve got you covered.
                </p>
                <p className="drop-shadow">
                  Customer satisfaction is at the heart of everything we do. We continuously strive to improve our services
                  and provide the best value for your money.
                </p>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default InfoSections;