import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      title: "Surat Local 8 Hours 80 Kms Package",
      price: "₹ 2,700",
      description: "Perfect for local sightseeing and city tours within Surat",
      features: ["8 hours service", "80 KM limit", "Professional driver", "AC vehicle"]
    },
    {
      title: "Surat to Ahmedabad Cab",
      price: "₹ 3,500",
      description: "Comfortable one-way journey from Surat to Ahmedabad",
      features: ["One-way trip", "Door-to-door service", "Professional driver", "Clean AC vehicle"]
    },
    {
      title: "Ahmedabad to Surat Cab",
      price: "₹ 3,500",
      description: "Reliable transportation from Ahmedabad to Surat",
      features: ["One-way trip", "Pickup from anywhere", "Experienced driver", "Safe journey"]
    },
    {
      title: "Surat to Mumbai Airport",
      price: "₹ 4,500",
      description: "Direct transfer service to Mumbai Airport",
      features: ["Airport drop", "Flight tracking", "On-time service", "Luggage assistance"]
    },
    {
      title: "Mumbai Airport to Surat Cab",
      price: "₹ 5,000",
      description: "Convenient pickup service from Mumbai Airport",
      features: ["Airport pickup", "Flight tracking", "Meet & greet", "Comfortable ride"]
    },
    {
      title: "Outstation Cab Service",
      price: "Contact for pricing",
      description: "Long-distance travel to various destinations across Gujarat and beyond",
      features: ["Multiple destinations", "Flexible packages", "Experienced drivers", "Well-maintained vehicles"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4 text-foreground">
            Our Services
          </h1>
          <p className="text-lg text-center text-foreground-secondary mb-12 max-w-2xl mx-auto">
            Choose from our wide range of taxi and cab services designed to meet all your travel needs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                  <div className="text-2xl font-bold text-primary mb-3">{service.price}</div>
                  <p className="text-foreground-secondary text-sm">{service.description}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-foreground-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                  Book Now
                </Button>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Card className="p-8 rounded-2xl shadow-lg bg-primary/10">
              <h2 className="text-2xl font-bold text-foreground mb-4">Need a Custom Package?</h2>
              <p className="text-foreground-secondary mb-6">
                We offer customized travel solutions for corporate events, weddings, and special occasions.
                Contact us to discuss your specific requirements.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8">
                Request Custom Quote
              </Button>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Services;