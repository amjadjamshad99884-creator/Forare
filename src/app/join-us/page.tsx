import { DriverForm } from "@/components/forms/DriverForm";
import { FadeIn } from "@/components/animations/FadeIn";
import { Banknote, Calendar, CheckCircle2, Shield, Star } from "lucide-react";
import Image from "next/image";

export default function DriverPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gray-900 text-white pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/images/driver-enrollment.png"
                        alt="Driver Background"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <FadeIn direction="up" className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Drive with Forare
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            Join Sweden's fastest-growing transport network. Earn competitive rates with flexible hours.
                        </p>
                        <div className="flex gap-4">
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
                                <Banknote className="w-5 h-5 text-primary" /> Weekly Payouts
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" /> Flexible Schedule
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
                            <h2 className="text-3xl font-bold mb-6">Why Drive with Us?</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { icon: Banknote, title: "High Earnings", desc: "Keep more of what you earn with our low commission rates." },
                                    { icon: Calendar, title: "Flexibility", desc: "Be your own boss. Drive when and where you want." },
                                    { icon: Shield, title: "Safety First", desc: "24/7 support and safety features for every trip." },
                                    { icon: Star, title: "Bonuses", desc: "Performance-based bonuses and incentives." },
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
                            <h3 className="text-xl font-bold mb-6">Requirements</h3>
                            <ul className="space-y-4">
                                {[
                                    "Valid Swedish Driver's License (B-Körkort)",
                                    "Taxi Driver License (Taxiförarlegitimation)",
                                    "Clean driving record",
                                    "Professional attitude and appearance",
                                    "Smartphone (iOS or Android)",
                                ].map((req, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-700">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeIn>

                    {/* Right Column: Form */}
                    <FadeIn direction="left" delay={0.4}>
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="bg-primary p-6 text-white">
                                <h3 className="text-2xl font-bold">Apply Now</h3>
                                <p className="opacity-90">Start your journey with Forare today.</p>
                            </div>
                            <div className="p-0">
                                <DriverForm />
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
