import { DeliveryForm } from "@/components/forms/DeliveryForm";
import { FadeIn } from "@/components/animations/FadeIn";
import { Building2, Clock, Globe, Truck, CheckCircle2, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function DeliveryPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section - Ultra Modern */}
            <section className="relative pt-32 pb-24 bg-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]" />
                    <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <FadeIn direction="up">
                        <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium">
                            <Clock className="w-4 h-4" />
                            Fastest Supply Chain Network
                        </div>
                        <h1 className="text-5xl md:text-7.5xl font-bold mb-8 text-white tracking-tight leading-tight">
                            Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-500 to-orange-500">Delivery</span> Solutions
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
                            From instant last-mile delivery to complex global logistics. Forare connects your business to its destination with pinpoint accuracy.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            {["Same-day Routing", "Global Tracking", "Insured Freight"].map((feat, i) => (
                                <div key={i} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-primary" />
                                    {feat}
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-24">
                <div className="grid lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
                    {/* Left Column: Business Benefits */}
                    <div className="lg:col-span-6 space-y-16">
                        <FadeIn direction="right">
                            <h2 className="text-4xl font-bold text-gray-900 mb-10 leading-tight">Why the world&apos;s brands <br />choose Forare.</h2>
                            <div className="grid sm:grid-cols-2 gap-8">
                                {[
                                    { icon: Clock, title: "Unmatched Speed", desc: "Automated routing algorithms that find the fastest path, every time." },
                                    { icon: Truck, title: "Extreme Reliability", desc: "99.99% successful delivery rate across all service tiers." },
                                    { icon: Globe, title: "Total Coverage", desc: "Serving all major Nordic hubs including Stockholm & Malmö." },
                                    { icon: ShieldCheck, title: "Full Insurance", desc: "Premium protection for high-value and sensitive cargo." },
                                ].map((benefit, index) => (
                                    <div key={index} className="group p-8 rounded-3xl bg-gray-50 border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all duration-300">
                                        <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                            <benefit.icon className="w-6 h-6 text-white group-hover:text-gray-900" />
                                        </div>
                                        <h3 className="font-bold text-xl text-gray-900 mb-3">{benefit.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{benefit.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>

                        <FadeIn direction="right" delay={0.2}>
                            <div className="p-10 rounded-[40px] bg-gray-900 text-white relative overflow-hidden">
                                <h3 className="text-2xl font-bold mb-8">Integrated Industries</h3>
                                <div className="flex flex-wrap gap-3">
                                    {["E-commerce", "Health Care", "Luxury Retail", "Tech Logistics", "Aviation", "Industrial"].map((partner) => (
                                        <span key={partner} className="px-5 py-2.5 rounded-full bg-white/10 border border-white/10 text-white text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors cursor-default">
                                            {partner}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-10 pt-10 border-t border-white/10">
                                    <p className="text-gray-400 text-sm mb-6 italic">&quot;Forare has reduced our shipping overhead by 22% in the first quarter.&quot;</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-800" />
                                        <div>
                                            <p className="text-sm font-bold">Nordic Tech Hub</p>
                                            <p className="text-xs text-gray-500">Logistics Partner</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-6">
                        <FadeIn direction="left" delay={0.3}>
                            <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden sticky top-32">
                                <div className="bg-primary p-12 text-gray-900 text-center">
                                    <h3 className="text-3xl font-bold mb-2">Become a Partner</h3>
                                    <p className="font-medium opacity-80">Request a corporate consultation.</p>
                                </div>
                                <div className="p-10 md:p-14">
                                    <DeliveryForm />
                                </div>
                                <div className="px-14 pb-14 text-center">
                                    <p className="text-xs text-gray-400">By submitting this form you agree to our Terms & Privacy Policy.</p>
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
