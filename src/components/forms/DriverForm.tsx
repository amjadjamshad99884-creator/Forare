"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Car, FileText, Briefcase, User, Mail, Phone, Check } from "lucide-react";
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
    address: z.string().min(5, "Address is required"),

    // License Information
    licenseType: z.array(z.string()).min(1, "Select at least one license type"),
    taxiLicenseNumber: z.string().optional(),
    truckLicenseNumber: z.string().optional(),

    // Service Preferences
    serviceInterest: z.array(z.string()).min(1, "Select at least one service"),
    availability: z.string().min(1, "Availability is required"),

    // Vehicle Information
    ownVehicle: z.string().min(1, "Please specify if you own a vehicle"),
    carModel: z.string().optional(),
    carYear: z.string().optional(),
    vehicleCapacity: z.string().optional(),

    // Experience
    yearsExperience: z.string().min(1, "Years of experience is required"),
    additionalInfo: z.string().optional(),

    consent: z.boolean().refine(val => val === true, "You must agree to the privacy policy"),
});

type DriverFormValues = z.infer<typeof driverSchema>;

export function DriverForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<DriverFormValues>({
        resolver: zodResolver(driverSchema),
        defaultValues: {
            licenseType: [],
            serviceInterest: [],
        }
    });

    const licenseTypes = watch("licenseType") || [];
    const ownVehicle = watch("ownVehicle");

    const onSubmit = async (data: DriverFormValues) => {
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
            {/* Personal Information */}
            <div className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b">
                    <User className="w-5 h-5 text-primary" /> Personal Information
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" placeholder="John" {...register("firstName")} />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" placeholder="Doe" {...register("lastName")} />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" type="tel" placeholder="+46 70 123 45 67" {...register("phone")} />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" placeholder="Stockholm" {...register("city")} />
                        {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Address *</Label>
                        <Input id="address" placeholder="Street name and number" {...register("address")} />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>
                </div>
            </div>

            {/* License Information */}
            <div className="space-y-6 pt-6 border-t">
                <h3 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b">
                    <FileText className="w-5 h-5 text-primary" /> License Information
                </h3>

                <div className="space-y-3">
                    <Label>What type of licenses do you have? *</Label>
                    <div className="grid md:grid-cols-2 gap-3">
                        <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                            <input
                                type="checkbox"
                                value="taxi"
                                className="accent-primary w-4 h-4"
                                {...register("licenseType")}
                            />
                            <div>
                                <span className="font-medium">Taxi License</span>
                                <p className="text-sm text-gray-600">For passenger transport</p>
                            </div>
                        </label>

                        <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                            <input
                                type="checkbox"
                                value="truck"
                                className="accent-primary w-4 h-4"
                                {...register("licenseType")}
                            />
                            <div>
                                <span className="font-medium">Truck/Van License</span>
                                <p className="text-sm text-gray-600">For moving & delivery</p>
                            </div>
                        </label>
                    </div>
                    {errors.licenseType && <p className="text-red-500 text-sm">{errors.licenseType.message}</p>}
                </div>

                {licenseTypes.includes("taxi") && (
                    <div className="space-y-2">
                        <Label htmlFor="taxiLicenseNumber">Taxi License Number</Label>
                        <Input id="taxiLicenseNumber" placeholder="TFL-XXXXXX" {...register("taxiLicenseNumber")} />
                    </div>
                )}

                {licenseTypes.includes("truck") && (
                    <div className="space-y-2">
                        <Label htmlFor="truckLicenseNumber">Truck/Van License Number</Label>
                        <Input id="truckLicenseNumber" placeholder="License number" {...register("truckLicenseNumber")} />
                    </div>
                )}
            </div>

            {/* Service Preferences */}
            <div className="space-y-6 pt-6 border-t">
                <h3 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b">
                    <Briefcase className="w-5 h-5 text-primary" /> Service Preferences
                </h3>

                <div className="space-y-3">
                    <Label>Which services are you interested in? *</Label>
                    <div className="grid md:grid-cols-3 gap-3">
                        <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                            <input
                                type="checkbox"
                                value="passenger"
                                className="accent-primary"
                                {...register("serviceInterest")}
                            />
                            <span className="text-sm font-medium">Passenger Rides</span>
                        </label>

                        <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                            <input
                                type="checkbox"
                                value="delivery"
                                className="accent-primary"
                                {...register("serviceInterest")}
                            />
                            <span className="text-sm font-medium">Delivery</span>
                        </label>

                        <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                            <input
                                type="checkbox"
                                value="moving"
                                className="accent-primary"
                                {...register("serviceInterest")}
                            />
                            <span className="text-sm font-medium">Moving</span>
                        </label>
                    </div>
                    {errors.serviceInterest && <p className="text-red-500 text-sm">{errors.serviceInterest.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="availability">Availability *</Label>
                    <select
                        id="availability"
                        className="flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        {...register("availability")}
                    >
                        <option value="">Select availability...</option>
                        <option value="full-time">Full-time (40+ hours/week)</option>
                        <option value="part-time">Part-time (20-40 hours/week)</option>
                        <option value="weekends">Weekends only</option>
                        <option value="flexible">Flexible/On-demand</option>
                    </select>
                    {errors.availability && <p className="text-red-500 text-sm">{errors.availability.message}</p>}
                </div>
            </div>

            {/* Vehicle Information */}
            <div className="space-y-6 pt-6 border-t">
                <h3 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b">
                    <Car className="w-5 h-5 text-primary" /> Vehicle Information
                </h3>

                <div className="space-y-2">
                    <Label>Do you own a vehicle? *</Label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input type="radio" value="yes" className="accent-primary" {...register("ownVehicle")} />
                            <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="radio" value="no" className="accent-primary" {...register("ownVehicle")} />
                            <span>No</span>
                        </label>
                    </div>
                    {errors.ownVehicle && <p className="text-red-500 text-sm">{errors.ownVehicle.message}</p>}
                </div>

                {ownVehicle === "yes" && (
                    <>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="carModel">Vehicle Model</Label>
                                <Input id="carModel" placeholder="Volvo V90" {...register("carModel")} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="carYear">Year</Label>
                                <Input id="carYear" placeholder="2023" {...register("carYear")} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="vehicleCapacity">Vehicle Capacity/Type</Label>
                            <select
                                id="vehicleCapacity"
                                className="flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                {...register("vehicleCapacity")}
                            >
                                <option value="">Select vehicle type...</option>
                                <option value="sedan">Sedan (4 passengers)</option>
                                <option value="suv">SUV (6-7 passengers)</option>
                                <option value="van">Van (8+ passengers)</option>
                                <option value="small-truck">Small Truck/Van (Delivery)</option>
                                <option value="large-truck">Large Truck (Moving)</option>
                            </select>
                        </div>
                    </>
                )}
            </div>

            {/* Experience */}
            <div className="space-y-6 pt-6 border-t">
                <div className="space-y-2">
                    <Label htmlFor="yearsExperience">Years of Professional Driving Experience *</Label>
                    <select
                        id="yearsExperience"
                        className="flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        {...register("yearsExperience")}
                    >
                        <option value="">Select experience...</option>
                        <option value="0-1">Less than 1 year</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                    </select>
                    {errors.yearsExperience && <p className="text-red-500 text-sm">{errors.yearsExperience.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                    <Textarea
                        id="additionalInfo"
                        placeholder="Tell us anything else you'd like us to know about your experience, certifications, or why you want to join Forare..."
                        className="min-h-[100px]"
                        {...register("additionalInfo")}
                    />
                </div>
            </div>

            {/* Consent */}
            <div className="space-y-4 pt-6 border-t">
                <label className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 accent-primary" {...register("consent")} />
                    <span className="text-sm text-gray-600">
                        I agree to the processing of my personal data in accordance with the Privacy Policy and GDPR. *
                    </span>
                </label>
                {errors.consent && <p className="text-red-500 text-sm">{errors.consent.message}</p>}
            </div>

            <Button type="submit" className="w-full text-lg h-12" disabled={isSubmitting}>
                {isSubmitting ? "Submitting Application..." : "Submit Application"}
            </Button>
        </form>
    );
}
