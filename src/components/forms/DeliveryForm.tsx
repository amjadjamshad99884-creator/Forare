"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Building2, Mail, Phone, User, FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const deliverySchema = z.object({
    companyName: z.string().min(2, "Company name is required"),
    contactPerson: z.string().min(2, "Contact person is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(5, "Phone number is required"),
    serviceType: z.string().min(1, "Service type is required"),
    notes: z.string().optional(),
    consent: z.boolean().refine(val => val === true, "You must agree to the privacy policy"),
});

type DeliveryFormValues = z.infer<typeof deliverySchema>;

export function DeliveryForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<DeliveryFormValues>({
        resolver: zodResolver(deliverySchema),
    });

    const onSubmit = async (data: DeliveryFormValues) => {
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
                <h3 className="text-2xl font-bold text-green-800 mb-2">Request Sent!</h3>
                <p className="text-green-700 mb-6">
                    Thank you for your interest. Our business team will contact you shortly.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Send Another Request
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
            <div className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" /> Company Details
                </h3>

                <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" placeholder="Your Company AB" {...register("companyName")} />
                    {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input id="contactPerson" placeholder="Jane Smith" {...register("contactPerson")} />
                    {errors.contactPerson && <p className="text-red-500 text-sm">{errors.contactPerson.message}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="jane@company.com" {...register("email")} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+46 70 123 45 67" {...register("phone")} />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="serviceType">Type of Delivery Service Needed</Label>
                    <select
                        id="serviceType"
                        className="flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        {...register("serviceType")}
                    >
                        <option value="">Select a service...</option>
                        <option value="Regular Delivery">Regular Delivery</option>
                        <option value="Express Delivery">Express Delivery</option>
                        <option value="Food Delivery">Food Delivery</option>
                        <option value="Last Mile">Last Mile</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.serviceType && <p className="text-red-500 text-sm">{errors.serviceType.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea id="notes" placeholder="Tell us more about your needs..." {...register("notes")} />
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

            <Button type="submit" className="w-full text-lg h-12" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Submit Partnership Request"}
            </Button>
        </form>
    );
}
