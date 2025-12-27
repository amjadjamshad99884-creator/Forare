import { BookingForm } from "@/components/forms/BookingForm";
import { FadeIn } from "@/components/animations/FadeIn";
import { CheckCircle2, MapPin, Shield, Star } from "lucide-react";
import Image from "next/image";

export default function PassengerPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gray-900 text-white pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/images/service-passenger.png"
                        alt="Passenger Service"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <FadeIn direction="up" className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Premium Passenger Rides
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            Experience the comfort and reliability of Forare. Whether it's a daily commute or a special event, we get you there in style.
                        </p>
                        <div className="flex gap-6 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-primary" /> Verified Drivers
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-primary" /> Top Rated
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left Column: Info */}
                    <FadeIn direction="right" delay={0.2}>
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-6">How it Works</h2>
                            <div className="space-y-8">
                                {[
                                    { title: "Book Your Ride", desc: "Enter your pickup and drop-off locations, choose your car type, and schedule your ride." },
                                    { title: "Get Confirmed", desc: "Receive instant confirmation with driver details and estimated arrival time." },
                                    { title: "Enjoy the Journey", desc: "Sit back and relax while our professional driver takes you to your destination." },
                                ].map((step, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                                            <p className="text-gray-600">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <h3 className="text-xl font-bold mb-4">Our Fleet</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {["Sedan", "SUV", "XL", "Premium", "Electric", "Accessible"].map((car) => (
                                    <div key={car} className="flex items-center gap-2 text-gray-700">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" /> {car}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* Right Column: Form */}
                    <FadeIn direction="left" delay={0.4}>
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="bg-primary p-6 text-white">
                                <h3 className="text-2xl font-bold">Book a Ride</h3>
                                <p className="opacity-90">Fill out the form below to schedule your trip.</p>
                            </div>
                            <div className="p-0">
                                <BookingForm />
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
