import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowRight, Globe, Leaf, Shield, Zap } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gray-900 text-white pt-32 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/hero_banner_v2_1763954770951.png"
                        alt="About Forare"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <FadeIn direction="up">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            The Future of Transport
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Forare is redefining mobility in Sweden. We combine technology, sustainability, and service to create a seamless transport experience.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <FadeIn direction="right">
                            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                To provide safe, reliable, and eco-friendly transport solutions for everyone. We believe that moving people and goods should be effortless and sustainable.
                            </p>
                            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                To become the leading multi-service transport platform in the Nordics, setting new standards for quality and innovation.
                            </p>
                        </FadeIn>
                        <FadeIn direction="left">
                            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/service-passenger.png"
                                    alt="Vision"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
                    </FadeIn>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Shield, title: "Safety", desc: "We prioritize the safety of our passengers, drivers, and cargo above all else." },
                            { icon: Leaf, title: "Sustainability", desc: "We are committed to reducing our carbon footprint through electric vehicles and smart logistics." },
                            { icon: Zap, title: "Innovation", desc: "We constantly improve our technology to provide the best possible user experience." },
                        ].map((value, index) => (
                            <FadeIn key={index} delay={index * 0.1} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                                    <value.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Future Roadmap */}
            <section className="py-24 bg-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">What's Next?</h2>
                        <p className="text-gray-400">Our roadmap for the coming years.</p>
                    </FadeIn>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { year: "2025", title: "AI Integration", desc: "Smart routing and predictive demand analysis to optimize fleet efficiency." },
                            { year: "2026", title: "Electric Fleet", desc: "Transitioning to 100% electric vehicles for all passenger rides." },
                            { year: "2027", title: "Nordic Expansion", desc: "Launching services in Oslo, Copenhagen, and Helsinki." },
                        ].map((item, index) => (
                            <FadeIn key={index} delay={index * 0.1} className="relative pl-8 border-l-2 border-primary">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                                <div className="text-primary font-bold mb-2">{item.year}</div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-400">{item.desc}</p>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
