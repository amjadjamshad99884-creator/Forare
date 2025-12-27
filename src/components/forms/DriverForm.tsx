"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Car, FileText, MapPin, User, Mail, Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const driverSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(5, "Phone number is required"),
    city: z.string().min(2, "City is required"),
    licenseNumber: z.string().min(5, "Taxi license number is required"),
    carModel: z.string().min(2, "Car model is required"),
    carYear: z.string().min(4, "Car year is required"),
    experience: z.string().optional(),
    consent: z.boolean().refine(val => val === true, "You must agree to the privacy policy"),
});

type DriverFormValues = z.infer<typeof driverSchema>;

export function DriverForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<DriverFormValues>({
        resolver: zodResolver(driverSchema),
    });

    const onSubmit = async (data: DriverFormValues) => {
        console.log("Driver application data:", data);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Application Received!</h3>
                <p className="text-green-700 mb-6">
                    Thank you for applying to drive with Forare. Our team will review your application and contact you shortly.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Submit Another Application
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" /> Personal Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" {...register("firstName")} />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" {...register("lastName")} />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
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
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Stockholm" {...register("city")} />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Car className="w-5 h-5 text-primary" /> Vehicle & License
                </h3>

                <div className="space-y-2">
                    <Label htmlFor="licenseNumber">Taxi License Number</Label>
                    <Input id="licenseNumber" placeholder="TFL-XXXXXX" {...register("licenseNumber")} />
                    {errors.licenseNumber && <p className="text-red-500 text-sm">{errors.licenseNumber.message}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="carModel">Car Model</Label>
                        <Input id="carModel" placeholder="Volvo V90" {...register("carModel")} />
                        {errors.carModel && <p className="text-red-500 text-sm">{errors.carModel.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="carYear">Year</Label>
                        <Input id="carYear" placeholder="2023" {...register("carYear")} />
                        {errors.carYear && <p className="text-red-500 text-sm">{errors.carYear.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="experience">Driving Experience (Years)</Label>
                    <Textarea id="experience" placeholder="Tell us about your experience..." {...register("experience")} />
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
                {isSubmitting ? "Submitting Application..." : "Submit Application"}
            </Button>
        </form>
    );
}
