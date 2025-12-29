"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { ChevronDown, ChevronUp, Search, Phone, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";

const faqs = [
    {
        category: "Passenger Rides",
        questions: [
            {
                q: "How do I book a passenger ride?",
                a: "You can book directly through our website by clicking the 'Book Now' button in the navigation or visiting the Passenger page. Simply enter your pickup and drop-off locations, select your vehicle type, and confirm your booking."
            },
            {
                q: "Are the drivers verified?",
                a: "Yes, 100%. Every driver on the Forare platform undergoes a rigorous background check, document verification, and safety training before they are allowed to accept rides."
            },
            {
                q: "What types of vehicles are available?",
                a: "We offer a range of vehicles from Standard Sedans to Premium Luxury cars and even Vans for group travel. You can choose the vehicle that best fits your needs during the booking process."
            }
        ]
    },
    {
        category: "Delivery & Logistics",
        questions: [
            {
                q: "How fast is the delivery service?",
                a: "We offer various delivery tiers including Same-Day, Next-Day, and Standard delivery. Express options are available in major cities across Sweden."
            },
            {
                q: "Can I track my package in real-time?",
                a: "Absolutely. Once your order is picked up, you will receive a tracking link via email or SMS that allows you to follow your delivery's progress on a live map."
            },
            {
                q: "What items can I send?",
                a: "We handle everything from small documents to large parcels. For specialized items or heavy freight, please contact our support team for a custom quote."
            }
        ]
    },
    {
        category: "Moving Services",
        questions: [
            {
                q: "Do you provide packing materials?",
                a: "Yes, we offer complete packing solutions including boxes, bubble wrap, and tape. Our professional teams can also handle the entire packing and unpacking process for you."
            },
            {
                q: "Is my move insured?",
                a: "Every relocation with Forare is covered by comprehensive insurance. We take extreme care with your belongings, but in the unlikely event of damage, you are fully protected."
            },
            {
                q: "How far in advance should I book?",
                a: "We recommend booking at least 1-2 weeks in advance for local moves and 3-4 weeks for long-distance or international relocations to ensure your preferred date is available."
            }
        ]
    }
];

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggleFAQ = (category: string, index: number) => {
        const key = `${category}-${index}`;
        setOpenIndex(openIndex === key ? null : key);
    };

    const filteredFaqs = faqs.map(cat => ({
        ...cat,
        questions: cat.questions.filter(q =>
            q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.a.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(cat => cat.questions.length > 0);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Header section */}
            <section className="relative pt-32 pb-20 bg-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <FadeIn>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">How can we help?</h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                            Find answers to frequently asked questions about our passenger, delivery, and moving services.
                        </p>

                        <div className="max-w-2xl mx-auto relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search for answers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-16 pl-14 pr-6 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg"
                            />
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Content section */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((cat, catIdx) => (
                                <div key={catIdx} className="mb-16">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100 flex items-center gap-3">
                                        <div className="w-2 h-8 bg-primary rounded-full" />
                                        {cat.category}
                                    </h2>
                                    <div className="space-y-4">
                                        {cat.questions.map((faq, idx) => {
                                            const isOpen = openIndex === `${cat.category}-${idx}`;
                                            return (
                                                <div
                                                    key={idx}
                                                    className={`border rounded-2xl transition-all duration-300 ${isOpen ? "border-primary/30 bg-gray-50/50 shadow-sm" : "border-gray-100 bg-white hover:border-gray-200"}`}
                                                >
                                                    <button
                                                        onClick={() => toggleFAQ(cat.category, idx)}
                                                        className="w-full px-8 py-6 flex items-center justify-between text-left"
                                                    >
                                                        <span className={`text-lg font-semibold transition-colors ${isOpen ? "text-primary" : "text-gray-900"}`}>
                                                            {faq.q}
                                                        </span>
                                                        {isOpen ? (
                                                            <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                                                        ) : (
                                                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                        )}
                                                    </button>
                                                    {isOpen && (
                                                        <div className="px-8 pb-8 text-gray-600 leading-relaxed">
                                                            <FadeIn direction="up" duration={0.3}>
                                                                {faq.a}
                                                            </FadeIn>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-xl text-gray-500 italic">No results found for &quot;{searchTerm}&quot;</p>
                            </div>
                        )}

                        {/* Still need help? */}
                        <div className="mt-20 bg-gray-900 rounded-[32px] p-10 md:p-16 text-center text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                            <FadeIn>
                                <h3 className="text-3xl font-bold mb-4">Still have questions?</h3>
                                <p className="text-gray-400 mb-10 max-w-xl mx-auto">
                                    Our experts are always here to help you with any specific queries you might have.
                                </p>
                                <div className="flex flex-wrap justify-center gap-6">
                                    <a href="tel:+46721698124" className="flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-primary transition-all shadow-xl">
                                        <Phone className="w-5 h-5" />
                                        +46 721698124
                                    </a>
                                    <Link href="/contact" className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all">
                                        <MessageSquare className="w-5 h-5" />
                                        Message Us
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
