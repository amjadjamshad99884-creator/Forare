"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/passenger", label: "Passenger" },
    { href: "/delivery", label: "Delivery" },
    { href: "/moving", label: "Moving" },
    { href: "/join-us", label: "Join as Driver" },
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
                    ? "bg-white/95 backdrop-blur-lg shadow-sm py-2"
                    : "bg-transparent py-4"
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
                                src={scrolled ? "/images/logo-dark.svg" : "/images/logo-white.svg"}
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
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${scrolled
                                            ? (isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900")
                                            : (isActive ? "text-white" : "text-white/80 hover:text-white")
                                            }`}
                                    >
                                        {link.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className={`absolute bottom-0 left-0 right-0 h-0.5 ${scrolled ? "bg-primary" : "bg-white"}`}
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

                        {/* CTA Button - Desktop */}
                        <div className="hidden lg:flex items-center gap-4">
                            <Link href="/passenger">
                                <Button
                                    className={`${scrolled
                                        ? "bg-primary hover:bg-primary/90 text-gray-900"
                                        : "bg-white hover:bg-gray-100 text-gray-900"
                                        } font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105`}
                                >
                                    Book Now
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${scrolled
                                ? "hover:bg-gray-100 text-gray-700"
                                : "hover:bg-white/10 text-white"
                                }`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? (
                                <X className={`w-6 h-6 ${scrolled ? "text-gray-700" : "text-white"}`} />
                            ) : (
                                <Menu className={`w-6 h-6 ${scrolled ? "text-gray-700" : "text-white"}`} />
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
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`px-4 py-3.5 text-base font-medium rounded-lg transition-all duration-200 ${isActive
                                                ? "bg-primary/10 text-primary border-l-4 border-primary"
                                                : "text-gray-700 hover:bg-gray-50 hover:text-primary border-l-4 border-transparent"
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}

                                {/* Mobile CTA */}
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <Link href="/passenger" className="block">
                                        <Button
                                            className="w-full bg-primary hover:bg-primary/90 text-gray-900 font-semibold py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
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
