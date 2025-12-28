import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <Link href="/" className="inline-block mb-6">
                            <Image
                                src="/images/logo-white.svg"
                                alt="Forare"
                                width={160}
                                height={40}
                                className="h-8 w-auto"
                            />
                        </Link>
                        <p className="text-gray-400 mb-6">
                            Premium transport, delivery, and logistics services across Sweden.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6">Services</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link href="/passenger" className="hover:text-white transition-colors">Passenger Rides</Link></li>
                            <li><Link href="/delivery" className="hover:text-white transition-colors">Delivery Solutions</Link></li>
                            <li><Link href="/moving" className="hover:text-white transition-colors">Moving & Logistics</Link></li>
                            <li><Link href="/join-us" className="hover:text-white transition-colors">Become a Driver</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6">Company</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6">Contact</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li>Stockholm, Sweden</li>
                            <li>support@forare.eu</li>
                            <li>+46 8 123 45 67</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Forare. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
