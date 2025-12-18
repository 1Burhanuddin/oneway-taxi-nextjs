'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface RequestCallBackDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const RequestCallBackDialog = ({ isOpen, onClose }: RequestCallBackDialogProps) => {
    const [mobile, setMobile] = useState("");
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/request-callback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile })
            });

            if (response.ok) {
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    setMobile("");
                    onClose();
                }, 2000);
            } else {
                console.error('Failed to submit request');
                // Optional: Show error state
            }
        } catch (error) {
            console.error('Error submitting request:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog Content */}
            <Card className="relative w-full max-w-md p-8 rounded-3xl shadow-2xl backdrop-blur-xl bg-black/40 border border-white/20 overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Liquid glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-3xl pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white drop-shadow-lg">Request Call Back</h2>
                        <button
                            onClick={onClose}
                            className="text-white/60 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {submitted ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50">
                                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Request Sent!</h3>
                            <p className="text-white/80">We will call you back shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="callback-mobile" className="text-white font-medium">
                                    Mobile Number
                                </Label>
                                <Input
                                    id="callback-mobile"
                                    type="tel"
                                    placeholder="Enter your mobile number"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    className="h-12 rounded-full border-2 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-yellow-400/50 focus:ring-yellow-400/20"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 rounded-full text-lg font-semibold backdrop-blur-md bg-yellow-400 hover:bg-yellow-300 text-black border border-yellow-300/50 transition-all duration-300 hover:scale-105 shadow-lg"
                            >
                                Submit Request
                            </Button>
                        </form>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default RequestCallBackDialog;
