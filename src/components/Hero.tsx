import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface HeroProps {
  onSelectTripType: (type: 'oneway' | 'roundtrip' | 'local') => void;
  children?: React.ReactNode;
  activeTripType?: 'oneway' | 'roundtrip' | 'local';
}

const Hero = ({ onSelectTripType, children, activeTripType = 'oneway' }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-0" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0" />

      <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col">
        {/* Header Section */}
        <div className="pt-20 pb-4">
        </div>

        {/* Trip Type Selection */}
        <div className="max-w-5xl mx-auto w-full mb-8">
          <Card className="p-6 rounded-3xl shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20 relative overflow-hidden">
            {/* Liquid glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-3xl" />
            <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 via-transparent to-accent/10 rounded-3xl" />

            <div className="relative z-10">
              <h2 className="text-lg font-semibold mb-6 text-white text-center drop-shadow-lg">Select Your Trip Type</h2>
              <div className="flex justify-between items-center max-w-2xl mx-auto gap-4">
                <Button
                  onClick={() => onSelectTripType('oneway')}
                  className={`flex-1 md:flex-none md:w-48 justify-center px-2 md:px-6 py-2 rounded-full text-sm font-medium backdrop-blur-md border transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 relative overflow-hidden group ${activeTripType === 'oneway'
                    ? 'bg-yellow-300/90 border-yellow-200/70 text-black shadow-lg scale-105'
                    : 'bg-yellow-400/80 hover:bg-yellow-300/90 text-black border-yellow-300/50 hover:border-yellow-200/70'
                    }`}
                >
                  {/* Liquid glass button overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-yellow-100/30 to-yellow-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span>One Way</span>
                  </div>
                </Button>

                <Button
                  onClick={() => onSelectTripType('roundtrip')}
                  className={`flex-1 md:flex-none md:w-48 justify-center px-2 md:px-6 py-2 rounded-full text-sm font-medium backdrop-blur-md border transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 relative overflow-hidden group ${activeTripType === 'roundtrip'
                    ? 'bg-yellow-300/90 border-yellow-200/70 text-black shadow-lg scale-105'
                    : 'bg-yellow-400/80 hover:bg-yellow-300/90 text-black border-yellow-300/50 hover:border-yellow-200/70'
                    }`}
                >
                  {/* Liquid glass button overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-yellow-100/30 to-yellow-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <span>Round Trip</span>
                  </div>
                </Button>

                <Button
                  onClick={() => onSelectTripType('local')}
                  className={`flex-1 md:flex-none md:w-48 justify-center px-2 md:px-6 py-2 rounded-full text-sm font-medium backdrop-blur-md border transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 relative overflow-hidden group ${activeTripType === 'local'
                    ? 'bg-yellow-300/90 border-yellow-200/70 text-black shadow-lg scale-105'
                    : 'bg-yellow-400/80 hover:bg-yellow-300/90 text-black border-yellow-300/50 hover:border-yellow-200/70'
                    }`}
                >
                  {/* Liquid glass button overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-yellow-100/30 to-yellow-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Local</span>
                  </div>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Form Section */}
        {children && (
          <div className="max-w-5xl mx-auto w-full pb-16">
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;