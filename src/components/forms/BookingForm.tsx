"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, Car, MapPin, User, Mail, Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const bookingSchema = z.object({
    pickup: z.string().min(2, "Pickup location is required"),
    dropoff: z.string().min(2, "Drop-off location is required"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    carType: z.enum(["Sedan", "SUV", "XL", "Premium", "EV", "Accessible"]),
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(5, "Phone number is required"),
    confirmationMethod: z.enum(["Email", "Phone"]),
    consent: z.boolean().refine(val => val === true, "You must agree to the privacy policy"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function BookingForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            carType: "Sedan",
            confirmationMethod: "Email",
        },
    });

    const onSubmit = async (data: BookingFormValues) => {
        // Simulate API call
        console.log("Booking data:", data);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Booking Received!</h3>
                <p className="text-green-700 mb-6">
                    Thank you for booking with Forare. We have sent a confirmation to your email.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Book Another Ride
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" /> Ride Details
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="pickup">Pickup Location</Label>
                        <Input id="pickup" placeholder="Enter pickup address" {...register("pickup")} />
                        {errors.pickup && <p className="text-red-500 text-sm">{errors.pickup.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="dropoff">Drop-off Location</Label>
                        <Input id="dropoff" placeholder="Enter destination" {...register("dropoff")} />
                        {errors.dropoff && <p className="text-red-500 text-sm">{errors.dropoff.message}</p>}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" {...register("date")} />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input id="time" type="time" {...register("time")} />
                        {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="carType">Car Type</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {["Sedan", "SUV", "XL", "Premium", "EV", "Accessible"].map((type) => (
                            <label
                                key={type}
                                className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5"
                            >
                                <input
                                    type="radio"
                                    value={type}
                                    className="accent-primary"
                                    {...register("carType")}
                                />
                                <span className="text-sm font-medium">{type}</span>
                            </label>
                        ))}
                    </div>
                    {errors.carType && <p className="text-red-500 text-sm">{errors.carType.message}</p>}
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" /> Contact Details
                </h3>

                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" {...register("name")} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
                    <Label>Confirmation Method</Label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input type="radio" value="Email" className="accent-primary" {...register("confirmationMethod")} />
                            <span>Email</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="radio" value="Phone" className="accent-primary" {...register("confirmationMethod")} />
                            <span>Phone Call</span>
                        </label>
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
                {isSubmitting ? "Booking..." : "Confirm Booking"}
            </Button>
        </form>
    );
}
