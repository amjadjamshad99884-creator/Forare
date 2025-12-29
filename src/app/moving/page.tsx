import { MovingForm } from "@/components/forms/MovingForm";
import { FadeIn } from "@/components/animations/FadeIn";
import { Box, Calendar, CheckCircle2, Truck, ShieldCheck, Zap, Star, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function MovingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section - Ultra Modern */}
            <section className="relative pt-32 pb-24 bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/moving-hero.jpg"
                        alt="Moving Services"
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/90" />
                </div>

                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]" />
                    <div className="absolute top-1/2 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <FadeIn direction="up">
                        <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium">
                            <Box className="w-4 h-4" />
                            Premium Relocation Services
                        </div>
                        <h1 className="text-5xl md:text-7.5xl font-bold mb-8 text-white tracking-tight leading-tight">
                            Your World, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-500 to-orange-500">Safely</span> Relocated
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
                            Expert handling, secure transport, and total peace of mind. Whether it's a home or an entire corporation, we move what matters most to you.
                        </p>
                        <div className="flex flex-wrap justify-center gap-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <ShieldCheck className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-white font-medium">Fully Insured</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <Star className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-white font-medium">Expert Teams</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-white font-medium">Nordic Coverage</span>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-24">
                <div className="grid lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
                    {/* Left Column: Relocation Services */}
                    <div className="lg:col-span-6 space-y-16">
                        <FadeIn direction="right">
                            <h2 className="text-4xl font-bold text-gray-900 mb-10 leading-tight">Comprehensive <br />Relocation Framework</h2>
                            <div className="space-y-6">
                                {[
                                    { title: "Household Redefined", desc: "White-glove service for your most precious belongings, from packing to final placement." },
                                    { title: "Corporate Velocity", desc: "Streamlined office relocations designed to minimize downtime and maximize speed." },
                                    { title: "Technical Heavy Lifting", desc: "Specialized equipment for pianos, servers, and industrial machinery." },
                                    { title: "Secure Custody", desc: "Climate-controlled storage solutions for transitions of any length." },
                                ].map((service, index) => (
                                    <div key={index} className="group p-8 rounded-[32px] bg-gray-50 border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all duration-300">
                                        <div className="flex items-start gap-6">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gray-900 text-primary flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                                                0{index + 1}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                                                <p className="text-gray-600 leading-relaxed text-sm">{service.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>

                        <FadeIn direction="right" delay={0.2} className="relative">
                            <div className="p-10 rounded-[40px] bg-gray-50 border border-gray-100 flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-8">
                                    <Zap className="w-10 h-10 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Moving in a Rush?</h3>
                                <p className="text-gray-600 mb-8 max-w-xs leading-relaxed">
                                    Our Express Team can often mobilize within 24 hours for urgent relocation needs.
                                </p>
                                <a href="tel:+46721698124" className="font-bold text-gray-900 hover:text-primary transition-all flex items-center gap-2">
                                    WhatsApp Support <ArrowRight className="w-5 h-5" />
                                </a>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl -z-10" />
                        </FadeIn>
                    </div>

                    {/* Right Column: Form Container */}
                    <div className="lg:col-span-6">
                        <FadeIn direction="left" delay={0.3}>
                            <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                                <div className="bg-gray-900 p-12 text-white relative overflow-hidden">
                                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
                                    <h3 className="text-3xl font-bold mb-4">Get a Free Quote</h3>
                                    <p className="text-gray-400">Tell us about your move, and we'll provide a custom price framework.</p>
                                </div>
                                <div className="p-10 md:p-14">
                                    <MovingForm />
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* Bottom Proof Section */}
            <section className="py-24 bg-white border-t border-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <FadeIn>
                            <div className="mb-10 text-6xl opacity-10 font-black tracking-tighter select-none">TRUSTED PARTNER</div>
                            <p className="text-lg text-gray-500 italic leading-relaxed">
                                "The relocation of our Stockholm tech headquarters was flawless. The Forare team handled over 200 workstations with zero equipment failure and total adherence to the 48-hour timeline."
                            </p>
                            <div className="mt-8 flex flex-col items-center">
                                <p className="font-bold text-gray-900">Erik Jönsson</p>
                                <p className="text-sm text-gray-500 uppercase tracking-widest">Operations Director, Nordic Flow Ltd.</p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </div>
    );
}
