import { DriverForm } from "@/components/forms/DriverForm";
import { FadeIn } from "@/components/animations/FadeIn";
import { Banknote, Calendar, CheckCircle2, Shield, Star, Car, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function DriverPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section - Ultra Modern */}
            <section className="relative pt-32 pb-24 bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/passenger-hero.png"
                        alt="Join Forare"
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900/95" />
                </div>

                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <FadeIn direction="up" className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium">
                            <Car className="w-4 h-4" />
                            Join the Elite Fleet
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight leading-tight">
                            Drive with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-500 to-orange-500">Purpose</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
                            Join Sweden&apos;s fastest-growing transport network. Earn competitive rates, enjoy flexible hours, and be part of a community that values quality.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium backdrop-blur-sm">
                                <Banknote className="w-5 h-5 text-primary" /> Weekly Payouts
                            </div>
                            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium backdrop-blur-sm">
                                <Calendar className="w-5 h-5 text-primary" /> Flexible Schedule
                            </div>
                            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium backdrop-blur-sm">
                                <TrendingUp className="w-5 h-5 text-primary" /> High Demand
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-24">
                <div className="grid lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
                    {/* Left Column: Benefits & Requirements */}
                    <div className="lg:col-span-6 space-y-16">
                        <FadeIn direction="right">
                            <h2 className="text-4xl font-bold text-gray-900 mb-10 leading-tight">Why top drivers <br />choose Forare.</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { icon: Banknote, title: "Maximize Earnings", desc: "Keep more of what you earn with our industry-leading low commission rates." },
                                    { icon: Calendar, title: "Total Freedom", desc: "Be your own boss. Log in and drive whenever it fits your lifestyle." },
                                    { icon: Shield, title: "Safety Net", desc: "24/7 dedicated support and comprehensive safety features for every trip." },
                                    { icon: Star, title: "Performance Bonus", desc: "Unlock exclusive bonuses and incentives for maintaining high ratings." },
                                ].map((benefit, index) => (
                                    <div key={index} className="group p-6 rounded-3xl bg-gray-50 border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all duration-300">
                                        <benefit.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                        <h3 className="font-bold text-lg text-gray-900 mb-2">{benefit.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{benefit.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>

                        <FadeIn direction="right" delay={0.2}>
                            <div className="p-10 rounded-[40px] bg-gray-900 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
                                <h3 className="text-2xl font-bold mb-8 relative z-10">Requirements to Join</h3>
                                <ul className="space-y-4 relative z-10">
                                    {[
                                        "Valid Swedish Driver's License (B-Körkort)",
                                        "Taxi Driver License (Taxiförarlegitimation)",
                                        "Clean driving record (No major violations)",
                                        "Professional attitude and appearance",
                                        "Smartphone (iOS or Android) with data",
                                    ].map((req, index) => (
                                        <li key={index} className="flex items-start gap-4 text-gray-300">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mt-0.5">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                            </div>
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right Column: Application Form */}
                    <div className="lg:col-span-6">
                        <FadeIn direction="left" delay={0.3}>
                            <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden sticky top-32">
                                <div className="bg-gray-900 p-10 text-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
                                    <h3 className="text-3xl font-bold text-white mb-2 relative z-10">Apply Now</h3>
                                    <p className="text-gray-400 relative z-10">Start your journey with Forare today.</p>
                                </div>
                                <div className="p-10 md:p-12">
                                    <DriverForm />
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </div>
    );
}
