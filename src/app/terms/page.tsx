import { FadeIn } from "@/components/animations/FadeIn";
import Link from "next/link";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            <section className="pt-32 pb-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>
                        <p className="text-gray-600">Last updated: December 29, 2025</p>
                    </FadeIn>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <FadeIn direction="up">
                        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
                                <p>
                                    These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Forare ("we," "us" or "our"), concerning your access to and use of our transport services, including any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services</h2>
                                <p>
                                    Forare provides a platform connecting users with transport services, including passenger rides, delivery solutions, and relocation services. By using our Services, you agree to comply with all local laws regarding transport and safety.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Representations</h2>
                                <p>
                                    By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information; (3) you have the legal capacity and you agree to comply with these Terms of Use; (4) you are not a minor in the jurisdiction in which you reside.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Prohibited Activities</h2>
                                <p>
                                    You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Liability</h2>
                                <p>
                                    Forare takes every precaution to ensure safe transport. However, to the maximum extent permitted by law, Forare shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Governing Law</h2>
                                <p>
                                    These Terms shall be governed by and defined following the laws of Sweden. Forare and yourself irrevocably consent that the courts of Sweden shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
                                <p>
                                    In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at support@forare.eu or call us at +46 721698124.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}
