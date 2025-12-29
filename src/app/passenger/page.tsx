import { BookingForm } from "@/components/forms/BookingForm";
import { FadeIn } from "@/components/animations/FadeIn";
import { CheckCircle2, MapPin, Shield, Star, Car, Clock, Zap, Users } from "lucide-react";
import Image from "next/image";

export default function PassengerPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section - Ultra Modern */}
            <section className="relative pt-32 pb-24 bg-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <FadeIn direction="up">
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium">
                                <Zap className="w-4 h-4" />
                                Instant Booking Available
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
                                Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-500 to-orange-500">Passenger</span> Rides
                            </h1>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
                                Experience mobility redefined. Professional drivers, premium fleet, and unmatched reliability for your every journey.
                            </p>
                            <div className="flex flex-wrap justify-center gap-8 text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-primary" /> Verified Drivers
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-primary" /> 4.9/5 Rating
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" /> 24/7 Service
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-24">
                <div className="grid lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
                    {/* Left Column: Info & Fleet */}
                    <div className="lg:col-span-5 space-y-16">
                        <FadeIn direction="right">
                            <h2 className="text-4xl font-bold text-gray-900 mb-10">How it Works</h2>
                            <div className="space-y-12">
                                {[
                                    { title: "Book Instant", desc: "Select pickup, destination, and vehicle type in seconds.", icon: Car },
                                    { title: "Driver Dispatched", desc: "Get matched with a top-rated professional near you.", icon: Zap },
                                    { title: "Enjoy the Journey", desc: "Premium comfort and safety at every turn.", icon: Heart }
                                ].map((step, index) => (
                                    <div key={index} className="flex gap-6 group">
                                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                                            <span className="text-2xl font-bold text-gray-900">{index + 1}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>

                        <FadeIn direction="right" delay={0.2}>
                            <div className="bg-gray-50 rounded-[40px] p-10 border border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                    <Car className="w-6 h-6 text-primary" />
                                    Our Fleet Selection
                                </h3>
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { car: "Executive Sedan", cap: "4 Seats" },
                                        { car: "Premium SUV", cap: "6 Seats" },
                                        { car: "First Class", cap: "3 Seats" },
                                        { car: "Business Van", cap: "8 Seats" },
                                        { car: "Electric Select", cap: "4 Seats" },
                                        { car: "Accessible", cap: "4 Seats" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex flex-col gap-1 p-4 bg-white rounded-2xl border border-gray-200">
                                            <span className="font-bold text-gray-900">{item.car}</span>
                                            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">{item.cap}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-7">
                        <FadeIn direction="left" delay={0.3}>
                            <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                                <div className="bg-gray-900 p-10 md:p-14 text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2" />
                                    <h3 className="text-3xl font-bold mb-4">Book Your Ride</h3>
                                    <p className="text-gray-400">Fill in the details below and we&apos;ll handle the rest.</p>
                                </div>
                                <div className="p-10 md:p-14">
                                    <BookingForm />
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper icon not imported
function Heart(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    )
}
