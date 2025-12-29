"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { href: "/", label: "Home" },
    {
        label: "Services",
        dropdown: [
            { href: "/moving", label: "Moving" },
            { href: "/delivery", label: "Delivery" },
            { href: "/passenger", label: "Passenger" },
        ]
    },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileMenuOpen]);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/98 backdrop-blur-md shadow-sm py-2"
                    : "bg-white/95 backdrop-blur-md py-3"
                    }`}
            >
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center relative z-10 group"
                            aria-label="Forare Home"
                        >
                            <Image
                                src="/images/logo-dark.svg"
                                alt="Forare"
                                width={160}
                                height={40}
                                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                                priority
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
                            {navLinks.map((link) => {
                                if (link.dropdown) {
                                    return (
                                        <div key={link.label} className="relative group px-2 py-2">
                                            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">
                                                {link.label}
                                                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                                            </button>

                                            {/* Dropdown Menu */}
                                            <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top translate-y-2 group-hover:translate-y-0 p-2 z-50">
                                                {link.dropdown.map((sublink) => (
                                                    <Link
                                                        key={sublink.href}
                                                        href={sublink.href}
                                                        className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors duration-200"
                                                    >
                                                        {sublink.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }

                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href!}
                                        className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
                                            }`}
                                    >
                                        {link.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                                                initial={false}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 500,
                                                    damping: 30,
                                                }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Phone & CTA - Desktop */}
                        <div className="hidden lg:flex items-center gap-6">
                            <a
                                href="tel:+46721698124"
                                className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-primary transition-colors duration-200"
                            >
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Phone className="w-4 h-4" />
                                </div>
                                +46 721698124
                            </a>
                            <Link href="/passenger">
                                <Button
                                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 h-11 rounded-full transition-all duration-200"
                                >
                                    Book Now
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors duration-200"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6 text-gray-700" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-20 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-40 lg:hidden overflow-y-auto"
                        >
                            <nav className="flex flex-col p-6 gap-2" aria-label="Mobile navigation">
                                {navLinks.map((link) => {
                                    if (link.dropdown) {
                                        return (
                                            <div key={link.label} className="flex flex-col gap-1">
                                                <div className="px-4 py-3.5 text-base font-bold text-gray-900 border-l-4 border-transparent uppercase tracking-wider text-xs">
                                                    {link.label}
                                                </div>
                                                {link.dropdown.map((sublink) => (
                                                    <Link
                                                        key={sublink.href}
                                                        href={sublink.href}
                                                        className={`px-8 py-3 text-base font-medium rounded-lg transition-all duration-200 ${pathname === sublink.href
                                                            ? "bg-primary/10 text-primary border-l-4 border-primary"
                                                            : "text-gray-700 hover:bg-gray-50 hover:text-primary border-l-4 border-transparent"
                                                            }`}
                                                    >
                                                        {sublink.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        );
                                    }
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href!}
                                            className={`px-4 py-3.5 text-base font-medium rounded-lg transition-all duration-200 ${isActive
                                                ? "bg-primary/10 text-primary border-l-4 border-primary"
                                                : "text-gray-700 hover:bg-gray-50 hover:text-primary border-l-4 border-transparent"
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}

                                {/* Mobile Contact & CTA */}
                                <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-4">
                                    <a
                                        href="tel:+46721698124"
                                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:text-primary transition-colors duration-200"
                                    >
                                        <Phone className="w-5 h-5 text-primary" />
                                        <span className="font-bold">+46 721698124</span>
                                    </a>
                                    <Link href="/passenger" className="block">
                                        <Button
                                            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 rounded-xl shadow-md transition-all duration-200"
                                        >
                                            Book Now
                                        </Button>
                                    </Link>
                                </div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
