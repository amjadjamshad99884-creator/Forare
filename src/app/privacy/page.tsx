import { FadeIn } from "@/components/animations/FadeIn";
import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white">
            <section className="pt-32 pb-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
                        <p className="text-gray-600">Last updated: December 29, 2025</p>
                    </FadeIn>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <FadeIn direction="up">
                        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                                <p>
                                    Welcome to Forare. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at support@forare.eu.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                                <p>
                                    We collect personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and services, when you participate in activities on the Website or otherwise when you contact us.
                                </p>
                                <ul className="list-disc pl-6 mt-4 space-y-2">
                                    <li><strong>Personal Data:</strong> Name, email address, phone number, and address.</li>
                                    <li><strong>Payment Data:</strong> We may collect data necessary to process your payment if you make purchases.</li>
                                    <li><strong>Location Data:</strong> We may collect information about your device's location to provide transport services.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                                <p>
                                    We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                                </p>
                                <ul className="list-disc pl-6 mt-4 space-y-2">
                                    <li>To facilitate account creation and logon process.</li>
                                    <li>To post testimonials with your consent.</li>
                                    <li>To request feedback and contact you about your use of our Website.</li>
                                    <li>To protect our Services.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Sharing Your Information</h2>
                                <p>
                                    We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Privacy Rights</h2>
                                <p>
                                    In some regions (like the EEA), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
                                <p>
                                    If you have questions or comments about this notice, you may email us at support@forare.eu or call us at +46 721698124.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}
