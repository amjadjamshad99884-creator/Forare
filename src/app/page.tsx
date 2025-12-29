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

      {/* Core Services Section - Premium & Clean (Uber-inspired) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Our Core Services</h2>
            <p className="text-xl text-gray-600">
              Professional transport solutions for every need
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 1. Moving Logistics */}
            <FadeIn delay={0.1} className="group">
              <div className="relative h-full bg-white border border-gray-200 rounded-3xl p-10 hover:shadow-2xl hover:border-orange-200 transition-all duration-500">
                {/* Subtle gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    <Truck className="w-8 h-8 text-orange-600" />
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-bold mb-4 text-gray-900">
                    Moving Logistics
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    Professional relocation services for homes and offices with expert handling and secure packing.
                  </p>

                  {/* Features */}
                  <div className="space-y-4 mb-10">
                    {['Expert Handling Team', 'Secure Packing', 'Full Insurance'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-700">
                        <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link href="/moving">
                    <Button className="w-full bg-gray-900 hover:bg-orange-600 text-white h-14 rounded-2xl font-semibold text-base transition-all duration-300">
                      Get Quote
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>

            {/* 2. Delivery Solutions */}
            <FadeIn delay={0.2} className="group">
              <div className="relative h-full bg-white border border-gray-200 rounded-3xl p-10 hover:shadow-2xl hover:border-blue-200 transition-all duration-500">
                {/* Subtle gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-bold mb-4 text-gray-900">
                    Delivery Solutions
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    Fast and secure delivery network ensuring your items reach safely and on time, every time.
                  </p>

                  {/* Features */}
                  <div className="space-y-4 mb-10">
                    {['Real-time Tracking', 'Same-day Options', 'Digital Proof'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-700">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link href="/delivery">
                    <Button className="w-full bg-gray-900 hover:bg-blue-600 text-white h-14 rounded-2xl font-semibold text-base transition-all duration-300">
                      Ship Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>

            {/* 3. Passenger Rides */}
            <FadeIn delay={0.3} className="group">
              <div className="relative h-full bg-white border border-gray-200 rounded-3xl p-10 hover:shadow-2xl hover:border-primary/30 transition-all duration-500">
                {/* Subtle gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-bold mb-4 text-gray-900">
                    Passenger Rides
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    Premium passenger transport for daily commutes or special occasions with verified drivers.
                  </p>

                  {/* Features */}
                  <div className="space-y-4 mb-10">
                    {['Verified Drivers', 'Premium Fleet', 'Fixed Pricing'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-700">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link href="/passenger">
                    <Button className="w-full bg-gray-900 hover:bg-primary text-white h-14 rounded-2xl font-semibold text-base transition-all duration-300">
                      Book Ride
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
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

      {/* Become a Partner - Minimalistic & Premium */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-[#151B2B] to-[#0B1120]">
        {/* Abstract background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Glass card effect */}
            <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-16 overflow-hidden">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-50" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-sm font-medium text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Now Hiring Drivers
                  </div>

                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                    Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-300">Us</span>
                  </h2>

                  <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl">
                    Join the fastest growing transport network. Whether you have a car, van, or truck, we have opportunities for you.
                  </p>

                  {/* Benefits */}
                  <div className="grid sm:grid-cols-3 gap-4 mb-10">
                    {[
                      { icon: '💰', label: 'Weekly Payouts' },
                      { icon: '⏰', label: 'Flexible Schedule' },
                      { icon: '🎁', label: 'Sign-up Bonus' }
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <span className="text-2xl">{benefit.icon}</span>
                        <span className="text-sm font-medium text-gray-300">{benefit.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link href="/join-us">
                    <Button size="lg" className="bg-gradient-to-r from-primary to-yellow-400 text-black hover:shadow-2xl hover:shadow-primary/50 h-14 px-10 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105">
                      Apply Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>

                {/* Stats */}
                <div className="lg:w-80 grid grid-cols-2 gap-4">
                  {[
                    { value: '1000+', label: 'Active Drivers' },
                    { value: '€3.5k', label: 'Avg. Monthly' },
                    { value: '4.9★', label: 'Driver Rating' },
                    { value: '24/7', label: 'Support' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                      <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Dark & Modern */}
      <section className="py-32 bg-gradient-to-b from-[#0B1120] to-[#151B2B]">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Trusted by Thousands</h2>
            <p className="text-xl text-gray-400">Real stories from our satisfied customers</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Anna S.", role: "Regular Commuter", text: "The most reliable service I've used. The cars are always clean and the drivers are professional.", rating: 5 },
              { name: "TechSolutions Ltd.", role: "Corporate Partner", text: "Forare transformed our local logistics. The automated billing and tracking features are a game changer.", rating: 5 },
              { name: "Maria K.", role: "Home Mover", text: "Moving house was actually pleasant with their team. They handled everything with such care.", rating: 5 },
            ].map((testimonial, index) => (
              <FadeIn key={index} delay={index * 0.1} className="group">
                <div className="relative h-full bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] transition-all duration-500">
                  {/* Quote icon */}
                  <div className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                    </svg>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <p className="text-gray-300 text-lg leading-relaxed mb-8 italic">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
