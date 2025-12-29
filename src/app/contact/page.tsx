import { ContactForm } from "@/components/forms/ContactForm";
import { FadeIn } from "@/components/animations/FadeIn";
import { Mail, MapPin, Phone, MessageSquare, Clock, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section - Ultra Modern */}
            <section className="relative pt-32 pb-24 bg-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <FadeIn direction="up">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium">
                            <MessageSquare className="w-4 h-4" />
                            24/7 Support Available
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
                            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-500 to-orange-500">Touch</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Have questions or need assistance? Our team is dedicated to providing you with the support you need, whenever you need it.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <div className="container mx-auto px-4 py-24">
                <div className="grid lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-4 space-y-10">
                        <FadeIn direction="right">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Direct Contact</h2>

                            <div className="space-y-8">
                                <div className="group flex items-start gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                                        <Phone className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Phone Number</h4>
                                        <a href="tel:+46721698124" className="text-xl font-bold text-gray-900 hover:text-primary transition-colors">+46 721698124</a>
                                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            Professional Support 24/7
                                        </p>
                                    </div>
                                </div>

                                <div className="group flex items-start gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                                        <Mail className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Email Address</h4>
                                        <a href="mailto:support@forare.eu" className="text-xl font-bold text-gray-900 hover:text-primary transition-colors">support@forare.eu</a>
                                        <p className="text-sm text-gray-500 mt-1">Expected response: &lt; 2 hours</p>
                                    </div>
                                </div>

                                <div className="group flex items-start gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                                        <MapPin className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Stockholm Office</h4>
                                        <p className="text-lg font-bold text-gray-900">Storgatan 1, 111 22 Stockholm</p>
                                        <p className="text-sm text-gray-500 mt-1">Sweden Operations Hub</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 p-8 rounded-3xl bg-gray-900 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2" />
                                <ShieldCheck className="w-10 h-10 text-primary mb-6" />
                                <h3 className="text-xl font-bold mb-4">Enterprise Safety</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    Are you a corporate partner looking for custom logistics framework? Contact our business division directly.
                                </p>
                                <button className="text-primary font-bold hover:underline flex items-center gap-2">
                                    Business Solutions <Image src="/images/arrow-right.svg" alt="" width={16} height={16} className="invert" />
                                </button>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Contact Form Main */}
                    <div className="lg:col-span-8">
                        <FadeIn direction="left" delay={0.2}>
                            <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                                <div className="px-10 py-12 md:px-16 md:py-16">
                                    <div className="mb-12">
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h3>
                                        <p className="text-gray-600">Please provide as much detail as possible so we can assist you better.</p>
                                    </div>
                                    <ContactForm />
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* Map Section or Trust Badge section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <h2 className="text-2xl font-bold text-gray-900 mb-12">Global standards, local expertise.</h2>
                        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
                            {/* Placeholder for partner logos or trust badges */}
                            <span className="text-xl font-black italic">TRUSTED</span>
                            <span className="text-xl font-black italic">SECURE</span>
                            <span className="text-xl font-black italic">FAST</span>
                            <span className="text-xl font-black italic">INSURED</span>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}
