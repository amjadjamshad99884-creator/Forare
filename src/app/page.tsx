import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowRight, CheckCircle2, Clock, Map as MapIcon, Shield, Star, Truck, User } from "lucide-react";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getContent() {
  try {
    const content = await prisma.siteContent.findMany({
      where: { section: 'home' }
    });
    return content.reduce((acc: Record<string, string>, item: { key: string; value: string }) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);
  } catch (error) {
    console.log('Database not available during build, using defaults');
    return {};
  }
}

export default async function Home() {
  const content = await getContent();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section - Minimalist & Professional */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0B1120]">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[40%] -right-[10%] w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute -bottom-[40%] -left-[10%] w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[100px]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <FadeIn direction="up" duration={0.8}>
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-gray-300 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Now accepting new corporate partners
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-[1.1] text-white">
              {content['home_hero_title'] || "Drive the Future with Forare"}
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2} duration={0.8}>
            <p className="text-xl md:text-2xl mb-12 text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              {content['home_hero_subtitle'] || "The trusted partner for corporate transport and logistics. Reliable, efficient, and scalable solutions for your business."}
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.4} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link href="/business">
              <Button size="lg" className="w-full sm:w-auto text-lg h-16 px-10 rounded-full bg-white text-black hover:bg-gray-100 border-none transition-all duration-300 font-semibold">
                Partner with Us
              </Button>
            </Link>
            <Link href="/join-us">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-16 px-10 rounded-full border-white/20 bg-transparent hover:bg-white/10 text-white transition-all duration-300">
                Become a Driver
              </Button>
            </Link>
          </FadeIn>
        </div>

        {/* Trust Strip - Integrated & Minimal */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-white/[0.02] backdrop-blur-sm py-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest whitespace-nowrap">Trusted by industry leaders</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {['TechCorp', 'LogiStick', 'MoveFast', 'GlobalTrade', 'EcoDrive'].map((name) => (
                <span key={name} className="text-lg font-bold text-white/60 hover:text-white transition-colors cursor-default">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Corporate Clients", value: "500+", icon: User },
              { label: "Monthly Deliveries", value: "50k+", icon: Truck },
              { label: "Cities Covered", value: "25+", icon: MapIcon },
              { label: "On-Time Rate", value: "99.9%", icon: Star },
            ].map((stat, index) => (
              <FadeIn key={index} delay={index * 0.1} className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gray-900 text-white">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-500 font-medium">{stat.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Pillar Services Section - Card Layout */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Our Core Services</h2>
            <p className="text-xl text-gray-600">
              Comprehensive transport solutions tailored to your needs. Professional, reliable, and always on time.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 1. Moving Logistics Card */}
            <FadeIn delay={0.1} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group border border-gray-100">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/service-moving.png"
                  alt="Moving Logistics"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold tracking-wide uppercase">
                    Moving
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-orange-600 transition-colors">Seamless Relocation</h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                  Professional moving services for homes and offices. We handle heavy lifting and packing with extreme care.
                </p>
                <div className="space-y-3 mb-8">
                  {['Expert Handling Team', 'Secure Packing', 'Full Insurance'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/moving" className="mt-auto">
                  <Button className="w-full bg-gray-900 text-white hover:bg-orange-600 h-12 rounded-xl text-base font-semibold transition-colors">
                    Get Moving Quote <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </FadeIn>

            {/* 2. Delivery Solutions Card */}
            <FadeIn delay={0.2} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group border border-gray-100">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/service-delivery.png"
                  alt="Delivery Solutions"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-bold tracking-wide uppercase">
                    Delivery
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">Fast & Secure Delivery</h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                  From urgent documents to bulk cargo, our delivery network ensures your items reach safely and on time.
                </p>
                <div className="space-y-3 mb-8">
                  {['Real-time Tracking', 'Same-day Options', 'Digital Proof'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/delivery" className="mt-auto">
                  <Button className="w-full bg-gray-900 text-white hover:bg-blue-600 h-12 rounded-xl text-base font-semibold transition-colors">
                    Ship Now <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </FadeIn>

            {/* 3. Passenger Rides Card */}
            <FadeIn delay={0.3} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group border border-gray-100">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/service-passenger.png"
                  alt="Passenger Rides"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-bold tracking-wide uppercase">
                    Passenger
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors">Travel in Comfort</h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                  Experience the new standard in passenger transport. Daily commutes or special occasions in style.
                </p>
                <div className="space-y-3 mb-8">
                  {['Verified Drivers', 'Premium Fleet', 'Fixed Pricing'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/passenger" className="mt-auto">
                  <Button className="w-full bg-gray-900 text-white hover:bg-primary h-12 rounded-xl text-base font-semibold transition-colors">
                    Book a Ride <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Choose Forare (Redesigned) */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Why Industry Leaders Choose Forare</h2>
            <p className="text-xl text-gray-600">We combine cutting-edge technology with premium service to deliver unmatched reliability.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Safety & Security",
                desc: "Every driver is vetted, every ride is insured. We prioritize your safety above all else with 24/7 monitoring.",
                icon: Shield,
              },
              {
                title: "Smart Technology",
                desc: "Advanced routing algorithms and real-time tracking ensure the most efficient path for your journey or delivery.",
                icon: MapIcon,
              },
              {
                title: "Premium Fleet",
                desc: "From luxury sedans to high-capacity trucks, our vehicles are modern, clean, and regularly inspected.",
                icon: Star,
              },
            ].map((feature, index) => (
              <FadeIn key={index} delay={index * 0.1} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 rounded-2xl bg-gray-900 text-white flex items-center justify-center mb-8">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Driver CTA (Redesigned) */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-900">
          <Image
            src="/images/driver-enrollment.png"
            alt="Driver Background"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-primary rounded-3xl p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
            <div className="md:w-1/2 text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Become a Partner</h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Join the fastest growing transport network. Whether you have a car, van, or truck, we have work for you.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-semibold">Weekly Payouts</div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-semibold">Flexible Schedule</div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-semibold">Sign-up Bonus</div>
              </div>
            </div>
            <div className="md:w-auto">
              <Link href="/join-us">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 h-16 px-12 rounded-full text-xl font-bold shadow-xl">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Refined) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Trusted by Thousands</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Anna S.", role: "Regular Commuter", text: "The most reliable service I've used. The cars are always clean and the drivers are professional." },
              { name: "TechSolutions Ltd.", role: "Corporate Partner", text: "Forare transformed our local logistics. The automated billing and tracking features are a game changer." },
              { name: "Maria K.", role: "Home Mover", text: "Moving house was actually pleasant with their team. They handled everything with such care." },
            ].map((testimonial, index) => (
              <FadeIn key={index} delay={index * 0.1} className="bg-gray-50 p-10 rounded-3xl relative">
                <div className="absolute top-10 right-10 text-primary/20">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" /></svg>
                </div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 shadow-lg">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic text-lg leading-relaxed">"{testimonial.text}"</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
