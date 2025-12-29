import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowRight, CheckCircle2, Clock, Map as MapIcon, Shield, Star, Truck, User, Zap, Globe, Award } from "lucide-react";
import { prisma } from '@/lib/prisma';

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
      {/* Hero Section - Ultra Modern */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-32">
          <FadeIn direction="up" duration={0.8} className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-6 py-3 rounded-full bg-white border border-gray-200 shadow-sm">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-gray-700">Trusted by 500+ businesses across Europe</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-[1.1]">
              <span className="text-gray-900">Transport</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-500 to-orange-500">
                Redefined
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Premium logistics and passenger services powered by technology. Fast, reliable, and always on time.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/business">
                <Button size="lg" className="h-14 px-8 bg-gray-900 hover:bg-gray-800 text-white rounded-full text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="h-14 px-8 border-2 border-gray-300 hover:border-gray-900 rounded-full text-base font-semibold transition-all duration-300">
                  Contact Sales
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>99.9% On-time</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Fully Insured</span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Section - Dark with Gradient Glow */}
      <section className="relative py-32 bg-gray-900 overflow-hidden">
        {/* Gradient glow effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/15 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { value: "500+", label: "Corporate Clients", icon: User },
              { value: "50k+", label: "Monthly Deliveries", icon: Truck },
              { value: "25+", label: "Cities Covered", icon: Globe },
              { value: "99.9%", label: "On-Time Rate", icon: Award },
            ].map((stat, index) => (
              <FadeIn key={index} delay={index * 0.1} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-yellow-500/20 group-hover:border-primary/30 transition-all duration-300">
                  <stat.icon className="w-7 h-7 text-gray-400 group-hover:text-primary transition-colors duration-300" />
                </div>
                <div className="text-5xl md:text-6xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-yellow-500 transition-all duration-300">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors duration-300">
                  {stat.label}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Services - Elegant & Brand Consistent */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              Everything you need
            </h2>
            <p className="text-xl text-gray-600">
              Three core services, one seamless experience
            </p>
          </FadeIn>

          {/* Elegant 3-Column Grid */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Moving */}
            <FadeIn delay={0.1} className="group">
              <div className="relative h-full bg-white border border-gray-200 rounded-3xl p-10 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center mb-6 group-hover:from-primary group-hover:to-yellow-500 transition-all duration-300">
                    <Truck className="w-7 h-7 text-gray-700 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h3 className="text-3xl font-bold mb-4 text-gray-900">Moving</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Professional relocation services with expert handling and secure packing.
                  </p>

                  <div className="space-y-3 mb-10">
                    {['Expert Team', 'Secure Packing', 'Full Insurance'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        <span className="font-medium text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/moving">
                    <Button className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-primary hover:to-yellow-500 hover:shadow-lg text-white h-12 rounded-full font-semibold transition-all duration-300">
                      Get Quote
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>

            {/* Delivery */}
            <FadeIn delay={0.2} className="group">
              <div className="relative h-full bg-white border border-gray-200 rounded-3xl p-10 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center mb-6 group-hover:from-primary group-hover:to-yellow-500 transition-all duration-300">
                    <svg className="w-7 h-7 text-gray-700 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>

                  <h3 className="text-3xl font-bold mb-4 text-gray-900">Delivery</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Fast and secure delivery network for all your shipping needs.
                  </p>

                  <div className="space-y-3 mb-10">
                    {['Real-time Tracking', 'Same-day Options', 'Digital Proof'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        <span className="font-medium text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/delivery">
                    <Button className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-primary hover:to-yellow-500 hover:shadow-lg text-white h-12 rounded-full font-semibold transition-all duration-300">
                      Ship Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>

            {/* Passenger */}
            <FadeIn delay={0.3} className="group">
              <div className="relative h-full bg-white border border-gray-200 rounded-3xl p-10 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center mb-6 group-hover:from-primary group-hover:to-yellow-500 transition-all duration-300">
                    <svg className="w-7 h-7 text-gray-700 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>

                  <h3 className="text-3xl font-bold mb-4 text-gray-900">Passenger</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Premium rides with verified drivers and premium fleet.
                  </p>

                  <div className="space-y-3 mb-10">
                    {['Verified Drivers', 'Premium Fleet', 'Fixed Pricing'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        <span className="font-medium text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/passenger">
                    <Button className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-primary hover:to-yellow-500 hover:shadow-lg text-white h-12 rounded-full font-semibold transition-all duration-300">
                      Book Ride
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Why Choose Us - Elegant Dark Card */}
          <FadeIn delay={0.4} className="mt-20">
            <div className="bg-gray-900 rounded-3xl p-12 md:p-16 max-w-5xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-12 text-white text-center">Why choose Forare?</h3>
              <div className="grid md:grid-cols-3 gap-12">
                {[
                  { icon: Shield, title: "Safety First", desc: "Every driver vetted, every ride insured" },
                  { icon: Zap, title: "Lightning Fast", desc: "Real-time tracking and smart routing" },
                  { icon: Star, title: "Premium Quality", desc: "Modern fleet, professional service" },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 mb-6">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Join Us CTA - Minimal & Powerful */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Zap className="w-4 h-4" />
                Now Hiring Drivers
              </div>

              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                Drive with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Forare</span>
              </h2>

              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Join thousands of drivers earning on their own schedule. Flexible hours, weekly payouts, and full support.
              </p>

              <div className="flex flex-wrap justify-center gap-8 mb-12">
                {[
                  { icon: "💰", label: "Weekly Payouts" },
                  { icon: "⏰", label: "Flexible Schedule" },
                  { icon: "🎁", label: "Sign-up Bonus" },
                  { icon: "📱", label: "Easy App" }
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-3xl">{benefit.icon}</span>
                    <span className="text-gray-700 font-medium">{benefit.label}</span>
                  </div>
                ))}
              </div>

              <Link href="/join-us">
                <Button size="lg" className="h-14 px-10 bg-gray-900 hover:bg-gray-800 text-white rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials - Clean Cards */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Loved by thousands</h2>
            <p className="text-xl text-gray-600">Real stories from our customers</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Anna S.", role: "Regular Commuter", text: "The most reliable service I've used. Clean cars, professional drivers, always on time.", rating: 5 },
              { name: "TechSolutions Ltd.", role: "Corporate Partner", text: "Forare transformed our logistics. The tracking and billing features are game-changing.", rating: 5 },
              { name: "Maria K.", role: "Home Mover", text: "Moving was stress-free with their team. They handled everything with such care and professionalism.", rating: 5 },
            ].map((testimonial, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
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
