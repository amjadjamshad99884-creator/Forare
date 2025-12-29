"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, MapPin, User, Mail, Phone, Truck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const movingSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(5, "Phone number is required"),
    fromAddress: z.string().min(5, "From address is required"),
    toAddress: z.string().min(5, "To address is required"),
    moveType: z.string().min(1, "Type of move is required"),
    date: z.string().min(1, "Preferred date is required"),
    notes: z.string().optional(),
    consent: z.boolean().refine(val => val === true, "You must agree to the privacy policy"),
});

type MovingFormValues = z.infer<typeof movingSchema>;

export function MovingForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<MovingFormValues>({
        resolver: zodResolver(movingSchema),
    });

    const onSubmit = async (data: MovingFormValues) => {
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
                <h3 className="text-2xl font-bold text-green-800 mb-2">Request Received!</h3>
                <p className="text-green-700 mb-6">
                    Thank you for your request. We will calculate a quote and contact you shortly.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Request Another Quote
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
            <div className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" /> Move Details
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="fromAddress">From Address</Label>
                        <Input id="fromAddress" placeholder="Current address" {...register("fromAddress")} />
                        {errors.fromAddress && <p className="text-red-500 text-sm">{errors.fromAddress.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="toAddress">To Address</Label>
                        <Input id="toAddress" placeholder="New address" {...register("toAddress")} />
                        {errors.toAddress && <p className="text-red-500 text-sm">{errors.toAddress.message}</p>}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="moveType">Type of Move</Label>
                        <select
                            id="moveType"
                            className="flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            {...register("moveType")}
                        >
                            <option value="">Select type...</option>
                            <option value="Household Moving">Household Moving</option>
                            <option value="Office Relocation">Office Relocation</option>
                            <option value="Heavy Item Transport">Heavy Item Transport</option>
                            <option value="Packing & Storage">Packing & Storage</option>
                        </select>
                        {errors.moveType && <p className="text-red-500 text-sm">{errors.moveType.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date">Preferred Date</Label>
                        <Input id="date" type="date" {...register("date")} />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Items list, floor number, elevator access, etc.)</Label>
                    <Textarea id="notes" placeholder="Describe your move..." {...register("notes")} />
                </div>
            </div>

            <div className="space-y-6 pt-6 border-t">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" /> Contact Information
                </h3>

                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" {...register("name")} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+46 70 123 45 67" {...register("phone")} />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
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
                {isSubmitting ? "Submitting..." : "Get a Free Quote"}
            </Button>
        </form>
    );
}
