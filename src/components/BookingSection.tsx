"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Clock, Video } from "lucide-react";
import { ShinyButton } from "./magicui/shiny-button";

const BookingSection = () => {
    const CALENDLY_LINK = "https://calendly.com/creative-shakilofficial/30min";

    const benefits = [
        "30-Minute Strategy Session",
        "Project Architecture Review",
        "Tech Stack Consultation",
        "Cost & Timeline Estimation",
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
            {/* Background Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />

            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-purple-200/50 dark:border-purple-800/30 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xs shadow-sm">
                    <div className="flex flex-col lg:flex-row">
                        {/* Left Side: Info */}
                        <div className="flex-1 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-purple-200/50 dark:border-purple-800/30">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
                                    <Calendar className="w-3 h-3" />
                                    <span>Available for Projects</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif tracking-tight text-slate-900 dark:text-white">
                                    Let&apos;s Build Your <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Next Big Idea</span>
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
                                    Ready to transform your vision into a high-performance digital reality? Book a free strategy call to discuss your project requirements, architecture, and technical roadmap.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span className="text-sm font-medium">{benefit}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-6 items-center border-t border-purple-100 dark:border-purple-800/50 pt-8">
                                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                        <Clock className="w-5 h-5 text-purple-500" />
                                        <span className="text-sm font-semibold">30 Min Session</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                        <Video className="w-5 h-5 text-blue-500" />
                                        <span className="text-sm font-semibold">Google Meet / Zoom</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Side: CTA */}
                        <div className="lg:w-1/3 p-8 lg:p-12 flex flex-col items-center justify-center bg-gradient-to-br from-purple-500/5 to-blue-500/5">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                                    <Calendar className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 dark:text-white">Reserve Your Slot</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-[200px] mx-auto">
                                    Find a time that works best for you and your team.
                                </p>
                                <ShinyButton
                                    onClick={() => window.open(CALENDLY_LINK, "_blank")}
                                    className="w-full py-4 text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-xl hover:shadow-2xl shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1"
                                >
                                    Book Meeting Now
                                </ShinyButton>
                                <p className="mt-4 text-xs text-slate-400 uppercase tracking-widest font-bold">
                                    No Commitment Required
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingSection;
