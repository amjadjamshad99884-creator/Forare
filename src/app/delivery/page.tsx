import { DeliveryForm } from "@/components/forms/DeliveryForm";
import { FadeIn } from "@/components/animations/FadeIn";
import { Building2, Clock, Globe, Truck } from "lucide-react";
import Image from "next/image";

export default function DeliveryPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gray-900 text-white pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/images/service-delivery.png"
                        alt="Delivery Service"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <FadeIn direction="up" className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Smart Delivery Solutions
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            Reliable logistics for businesses of all sizes. From last-mile delivery to complex supply chain solutions.
                        </p>
                        <div className="flex gap-4">
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
                                <Clock className="w-5 h-5 text-primary" /> Same-day Delivery
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
                                <Globe className="w-5 h-5 text-primary" /> Real-time Tracking
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
                            <h2 className="text-3xl font-bold mb-6">Why Partner with Forare?</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { icon: Clock, title: "Speed", desc: "Fastest delivery times in the city." },
                                    { icon: Truck, title: "Reliability", desc: "99.9% on-time delivery rate." },
                                    { icon: Globe, title: "Coverage", desc: "Serving greater Stockholm & Malmö." },
                                    { icon: Building2, title: "Scalable", desc: "Solutions that grow with you." },
                                ].map((benefit, index) => (
                                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                        <benefit.icon className="w-8 h-8 text-primary mb-4" />
                                        <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                                        <p className="text-gray-600 text-sm">{benefit.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <h3 className="text-xl font-bold mb-6">Who We Work With</h3>
                            <div className="flex flex-wrap gap-4">
                                {["E-commerce", "Restaurants", "Retail", "Pharmacies", "Offices", "Industrial"].map((partner) => (
                                    <span key={partner} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                                        {partner}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* Right Column: Form */}
                    <FadeIn direction="left" delay={0.4}>
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="bg-primary p-6 text-white">
                                <h3 className="text-2xl font-bold">Become a Partner</h3>
                                <p className="opacity-90">Request a consultation for your business.</p>
                            </div>
                            <div className="p-0">
                                <DeliveryForm />
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
