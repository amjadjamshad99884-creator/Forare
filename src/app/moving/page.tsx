import { MovingForm } from "@/components/forms/MovingForm";
import { FadeIn } from "@/components/animations/FadeIn";
import { Box, Calendar, CheckCircle2, Truck } from "lucide-react";
import Image from "next/image";

export default function MovingPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gray-900 text-white pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/images/service-moving.png"
                        alt="Moving Service"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <FadeIn direction="up" className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Stress-Free Moving
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            Professional moving services for households and offices. We handle your belongings with care and precision.
                        </p>
                        <div className="flex gap-4">
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
                                <Box className="w-5 h-5 text-primary" /> Packing Services
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
                                <Truck className="w-5 h-5 text-primary" /> Secure Transport
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
                            <h2 className="text-3xl font-bold mb-6">Our Services</h2>
                            <div className="space-y-6">
                                {[
                                    { title: "Household Moving", desc: "Complete home relocation services, from small apartments to large villas." },
                                    { title: "Office Relocation", desc: "Efficient business moving with minimal downtime." },
                                    { title: "Heavy Transport", desc: "Specialized handling for pianos, safes, and other heavy items." },
                                    { title: "Packing & Storage", desc: "Professional packing and secure short/long-term storage options." },
                                ].map((service, index) => (
                                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-primary">
                                        <h3 className="font-bold text-lg mb-1">{service.title}</h3>
                                        <p className="text-gray-600">{service.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <h3 className="text-xl font-bold mb-6">How It Works</h3>
                            <div className="space-y-6">
                                {[
                                    { icon: Calendar, text: "Request a quote with your move details." },
                                    { icon: CheckCircle2, text: "Receive a custom plan and fixed price." },
                                    { icon: Truck, text: "We pack, load, and move you safely." },
                                ].map((step, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0">
                                            <step.icon className="w-5 h-5" />
                                        </div>
                                        <p className="font-medium text-gray-700">{step.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* Right Column: Form */}
                    <FadeIn direction="left" delay={0.4}>
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="bg-primary p-6 text-white">
                                <h3 className="text-2xl font-bold">Get a Free Quote</h3>
                                <p className="opacity-90">Tell us about your move.</p>
                            </div>
                            <div className="p-0">
                                <MovingForm />
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
