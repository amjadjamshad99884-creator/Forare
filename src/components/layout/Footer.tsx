import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block transition-transform hover:scale-105">
                            <Image
                                src="/images/logo-white.svg"
                                alt="Forare"
                                width={160}
                                height={40}
                                className="h-10 w-auto"
                            />
                        </Link>
                        <p className="text-gray-400 leading-relaxed max-w-xs">
                            Premium transport ecosystem redefining mobility transitions across Sweden. Fast, reliable, and technology-driven operations.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-gray-900 transition-all duration-300">
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h3 className="text-xl font-bold mb-8 text-white">Our Services</h3>
                        <ul className="space-y-4">
                            <li><Link href="/moving" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"><div className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />Moving & Relocation</Link></li>
                            <li><Link href="/delivery" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"><div className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />Express Delivery</Link></li>
                            <li><Link href="/passenger" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"><div className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />Passenger Rides</Link></li>
                            <li><Link href="/join-us" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"><div className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />Drive with Us</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-xl font-bold mb-8 text-white">Company</h3>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-gray-400 hover:text-primary transition-colors">About Forare</Link></li>
                            <li><Link href="/faq" className="text-gray-400 hover:text-primary transition-colors">Help & FAQ</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact Support</Link></li>
                            <li><Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="text-xl font-bold mb-8 text-white">Get in Touch</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 text-gray-400">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-primary" />
                                </div>
                                <span className="pt-2">Stockholm, Sweden</span>
                            </li>
                            <li>
                                <a href="tel:+46721698124" className="flex items-start gap-4 text-gray-400 group hover:text-white transition-colors">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                                        <Phone className="w-5 h-5 group-hover:text-gray-900 transition-colors" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Call Us</span>
                                        <span className="font-bold">+46 721698124</span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:support@forare.eu" className="flex items-start gap-4 text-gray-400 group hover:text-white transition-colors">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                                        <Mail className="w-5 h-5 group-hover:text-gray-900 transition-colors" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Email Us</span>
                                        <span className="font-bold lowercase">support@forare.eu</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Forare transport & logistics. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Image src="/images/visa-mastercard.png" alt="Payments" width={120} height={30} className="opacity-40 grayscale hover:grayscale-0 transition-all" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
