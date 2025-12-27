import { ContactForm } from "@/components/forms/ContactForm";
import { FadeIn } from "@/components/animations/FadeIn";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gray-900 text-white pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/images/hero-banner.png"
                        alt="Contact Us"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <FadeIn direction="up">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Have questions or need assistance? We are here to help 24/7.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <FadeIn direction="right" className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Head Office</h4>
                                        <p className="text-gray-600">
                                            Storgatan 1<br />
                                            111 22 Stockholm<br />
                                            Sweden
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Phone</h4>
                                        <p className="text-gray-600">
                                            <a href="tel:+4681234567" className="hover:text-primary transition-colors">+46 8 123 45 67</a>
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">Mon-Fri, 08:00 - 18:00</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Email</h4>
                                        <p className="text-gray-600">
                                            <a href="mailto:support@forare.eu" className="hover:text-primary transition-colors">support@forare.eu</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 text-white p-8 rounded-xl shadow-sm">
                            <h3 className="text-xl font-bold mb-4">Emergency Support</h3>
                            <p className="text-gray-400 mb-4">
                                For urgent matters regarding ongoing rides or deliveries, please call our 24/7 emergency line.
                            </p>
                            <div className="text-2xl font-bold text-primary">
                                020-123 456
                            </div>
                        </div>
                    </FadeIn>

                    {/* Contact Form */}
                    <FadeIn direction="left" delay={0.2} className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="bg-primary p-6 text-white">
                                <h3 className="text-2xl font-bold">Send us a Message</h3>
                                <p className="opacity-90">We usually respond within 24 hours.</p>
                            </div>
                            <div className="p-0">
                                <ContactForm />
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
