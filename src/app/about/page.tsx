import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowRight, Globe, Leaf, Shield, Zap, Award, Users, Heart, CheckCircle2, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section - Ultra Modern */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-20">
                {/* Animated gradient orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <div className="relative z-10 container mx-auto px-4 py-20 text-center">
                    <FadeIn direction="up" duration={0.8} className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 mb-8 px-6 py-3 rounded-full bg-white border border-gray-200 shadow-sm">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-gray-700">The team behind your seamless transport</span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold mb-8 tracking-tight leading-[1.1] text-gray-900">
                            We're on a mission to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-500 to-orange-500">
                                Move the World better.
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Forare isn't just a transport company. We're a technology-driven logistics ecosystem designed to simplify how people and goods move across Europe.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Vision & Trust Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <FadeIn direction="right" className="relative">
                            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/service-passenger.png"
                                    alt="Our Vision"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8 text-white">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                                            ))}
                                        </div>
                                        <span className="text-sm font-medium">Joined by 10k+ users in 2024</span>
                                    </div>
                                    <p className="text-lg font-semibold italic">"The most reliable partner we've had in 10 years of operations."</p>
                                </div>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl -z-10" />
                        </FadeIn>

                        <FadeIn direction="left">
                            <h2 className="text-base font-bold text-primary uppercase tracking-wider mb-4">Our Core Vision</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                                Built on Trust, <br />
                                Powered by Integrity.
                            </h3>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Founded with a clear goal: to eliminate the friction in modern transport. In an era where speed is a requirement, we ensure reliability isn't a luxury. Every ride, every delivery, and every relocation is a commitment we take personally.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { title: "Fully Managed & Insured", desc: "Your safety and security are built into our business model." },
                                    { title: "Real-time Accountability", desc: "Technology that keeps us transparent and you informed." },
                                    { title: "Professional Standards", desc: "Every driver and team member is strictly vetted and trained." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{item.title}</h4>
                                            <p className="text-gray-600 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Values Grid - Dark Theme */}
            <section className="relative py-24 bg-gray-900 overflow-hidden">
                {/* Gradient glow effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/15 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Values we live by</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Beyond transport, we are building a foundation for a more connected and efficient world.</p>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                icon: Shield,
                                title: "Security First",
                                desc: "We don't just move things; we protect them. Our safety protocols are the strictest in the industry."
                            },
                            {
                                icon: Heart,
                                title: "Human Centric",
                                desc: "Technology is our fuel, but people are our engine. We prioritize mental well-being for our drivers and joy for our clients."
                            },
                            {
                                icon: Zap,
                                title: "Hyper Efficient",
                                desc: "We are obsessed with removing waste—time, cost, and energy—to provide you the fastest service possible."
                            },
                        ].map((value, index) => (
                            <FadeIn key={index} delay={index * 0.1} className="group text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 mb-8 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-yellow-500/20 group-hover:border-primary/30 transition-all duration-300">
                                    <value.icon className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors duration-300" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 transition-colors group-hover:text-primary">{value.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{value.desc}</p>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Support Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-[32px] p-10 md:p-16 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Have questions about our operations?</h2>
                            <p className="text-gray-600 mb-8">
                                Our support team is available 24/7 to provide clarity and assistance. We take transparency seriously.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="tel:+46721698124" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl group">
                                    <Phone className="w-5 h-5 group-hover:animate-bounce" />
                                    +46 721698124
                                </a>
                                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-900 rounded-full font-bold hover:border-gray-900 transition-all">
                                    Contact Message
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                        <div className="w-full md:w-64 aspect-square relative rounded-2xl overflow-hidden bg-gray-100">
                            {/* Decorative support image placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Users className="w-20 h-20 text-gray-200" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Ready to experience the Forare difference?</h2>
                        <Link href="/passenger">
                            <Button size="lg" className="h-16 px-12 bg-primary hover:bg-primary/90 text-gray-900 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300">
                                Get Started Now
                                <ArrowRight className="ml-2 w-6 h-6" />
                            </Button>
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}
