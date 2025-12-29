"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Send, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(2, "Subject is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    consent: z.boolean().refine(val => val === true, "You must agree to the privacy policy"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                alert('Failed to submit. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to submit. Please try again.');
        }
    };

    if (isSubmitted) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700 mb-6">
                    Thank you for contacting us. We will get back to you as soon as possible.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Send Another Message
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" {...register("name")} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" {...register("subject")} />
                    {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message..." className="min-h-[150px]" {...register("message")} />
                    {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1 accent-primary" {...register("consent")} />
                        <span className="text-sm text-gray-600">
                            I agree to the processing of my personal data in accordance with the Privacy Policy and GDPR.
                        </span>
                    </label>
                    {errors.consent && <p className="text-red-500 text-sm">{errors.consent.message}</p>}
                </div>
            </div>

            {/* Honeypot field - hidden from users, bots will fill it */}
            <input
                type="text"
                name="website"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
            />

            <Button type="submit" className="w-full text-lg h-12" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"} <Send className="ml-2 w-4 h-4" />
            </Button>
        </form>
    );
}
