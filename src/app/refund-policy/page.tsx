"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

export default function RefundPolicy() {
    return (
        <div className="min-h-screen text-white relative overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
                }}
            />

            <Header />

            <div className="relative z-10 container mx-auto px-4 pt-32 pb-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                        Cancellation & Refund Policy
                    </h1>

                    <Card className="p-8 rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl space-y-8 text-white/80 leading-relaxed">
                        <section>
                            <p className="mb-4">
                                In case of dissatisfaction from our services, clients have the liberty to cancel their projects and request a refund from us. Our Policy for the cancellation and refund will be as follows:
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-yellow-400 mb-4">CANCELLATION POLICY</h2>
                            <p>
                                For Cancellations, please contact the us via contact us link. <a href="/contact" className="text-yellow-400 hover:underline">https://onewaytaxicabs.com/contact</a>
                                <br />
                                Requests received later than 5 business days prior to the end of the current service period will be treated as cancellation of services for the next service period.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-yellow-400 mb-4">REFUND POLICY</h2>
                            <p>
                                We will try our best to create the suitable design concepts for our clients. In case any client is not completely satisfied with our products we can provide a refund. If paid by credit card, refunds will be issued to the original credit card provided at the time of purchase and in case of payment gateway name payments refund will be made to the same account.
                            </p>
                        </section>
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    );
}
