'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Target, FileText } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                        <ArrowLeft size={24} className="text-slate-800" />
                        <img src="/logo.png" alt="APEX MOCK" className="h-10 md:h-12 w-auto object-contain" />
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="flex justify-center mb-4">
                            <div className="bg-indigo-100 p-4 rounded-full">
                                <FileText className="text-indigo-600" size={40} />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
                            Terms & Conditions
                        </h1>
                        <p className="text-slate-600 text-lg">
                            APEX MOCK – An initiative of SR Club
                        </p>
                        <p className="text-slate-500 mt-2">
                            Last updated: 31-05-2026
                        </p>
                    </motion.div>

                    {/* Terms Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100"
                    >
                        <p className="text-slate-700 mb-8 text-lg leading-relaxed">
                            By accessing or using APEX MOCK, you agree to the following terms and policies.
                        </p>

                        <div className="space-y-10">
                            {/* Section 1 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">01.</span> Binding Legal Agreement
                                </h2>
                                <p className="text-slate-750 leading-relaxed">
                                    By accessing, registering, or interacting with <strong>APEX MOCK</strong> (hereinafter referred to as "the Platform"), which is owned, operated, and maintained by <strong>SR Club</strong>, you unequivocally agree to be legally bound by these Terms and Conditions. If you do not agree to all provisions, you are strictly prohibited from using the platform.
                                </p>
                            </section>

                            {/* Section 2 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">02.</span> Eligibility & Registration Guidelines
                                </h2>
                                <p className="text-slate-750 leading-relaxed mb-3">
                                    To use the platform, users must fulfill the following criteria:
                                </p>
                                <ul className="list-disc list-inside text-slate-705 space-y-2 ml-4 leading-relaxed">
                                    <li>Be at least 13 years of age. Users under the age of 18 must use the platform under the active supervision and with the explicit consent of a parent or legal guardian.</li>
                                    <li>Provide verified, active credentials via Google Single Sign-On (SSO).</li>
                                    <li>Maintain account credential confidentiality. You are solely responsible for all activities occurring under your authenticated profile.</li>
                                </ul>
                            </section>

                            {/* Section 3 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">03.</span> Intellectual Property & Proprietary Material
                                </h2>
                                <p className="text-slate-750 leading-relaxed mb-3">
                                    All contents, questions, detailed visual explanations, algorithms, designs, logos, software codes, and features on APEX MOCK are protected under intellectual property laws:
                                </p>
                                <ul className="list-disc list-inside text-slate-705 space-y-2 ml-4 leading-relaxed">
                                    <li><strong>Sole Ownership:</strong> All questions, detailed structural formulas, LaTeX segments, and notes solutions are the proprietary assets of <em>SR Club</em>.</li>
                                    <li><strong>Limited User License:</strong> Users are granted a highly restrictive, non-assignable, non-transferable, personal license to view and execute assessments solely for self-training purposes.</li>
                                    <li><strong>Strict Prohibition:</strong> Any scraping, reproduction, capture, commercial redistribution, publishing in public channels (including YouTube, Telegram, or WhatsApp), or commercial monetization of exam contents without written consent is strictly illegal and will trigger instant legal proceedings.</li>
                                </ul>
                            </section>

                            {/* Section 4 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">04.</span> Payment Terms & Razorpay Transactions
                                </h2>
                                <p className="text-slate-750 leading-relaxed">
                                    Enrollments in premium mock series require secure financial transactions processed through our integrated payment provider, Razorpay. By initiating checkout, you warrant that you are authorized to use the payment profile provided. You agree to settle all charges, including applicable government taxes and processing overheads, as displayed during payment checks.
                                </p>
                            </section>

                            {/* Section 5 */}
                            <section className="border-b border-slate-100 pb-8 text-rose-800">
                                <h2 className="text-2xl font-black text-rose-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    ❌ <span className="text-rose-600">05.</span> Strict No-Refund & Cancellation Policy
                                </h2>
                                <p className="text-slate-750 leading-relaxed bg-rose-50/50 border border-rose-100 p-5 rounded-2xl">
                                    <strong>Immediate Access Rule:</strong> Due to the immediate, non-tangible, and digital-access nature of the premium mock test series, practice questions, and notes packages, all payments, purchases, and checkout enrollments are completely **non-refundable** and **non-cancelable** once transaction credits are settled. No partial refunds or rollbacks are provided under any circumstances.
                                </p>
                            </section>

                            {/* Section 6 */}
                            <section className="border-b border-slate-100 pb-8 text-rose-800">
                                <h2 className="text-2xl font-black text-rose-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    ⚠️ <span className="text-rose-600">06.</span> Code of Conduct & Anti-Abuse Policies
                                </h2>
                                <p className="text-slate-750 leading-relaxed mb-3">
                                    We maintain a zero-tolerance policy against any actions that disrupt site infrastructure or standard aspirant workflows:
                                </p>
                                <ul className="list-disc list-inside text-rose-700/80 space-y-2 ml-4 leading-relaxed text-sm">
                                    <li><strong>No DDoS / Attack Vectors:</strong> Prohibited from introducing malware, trojans, worms, or executing automated denial-of-service (DDoS) loops.</li>
                                    <li><strong>No Extraction / Crawling:</strong> Prohibited from using web-scraping scripts, headless browsers, curl scripts, or APIs to crawl the platform question directory.</li>
                                    <li><strong>No Profile Sharing:</strong> Prohibited from sharing verified credentials with other students to allow unauthorized dual-device parallel test attempts.</li>
                                </ul>
                            </section>

                            {/* Section 7 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight text-indigo-800">
                                    🎯 <span className="text-indigo-600">07.</span> Exam Session Conduct & Ranks Invalidation
                                </h2>
                                <p className="text-slate-750 leading-relaxed mb-4">
                                    Leaderboards and Nationwide Percentile predictions require organic, honest exam conditions. Our engine maintains automatic monitoring protocols:
                                </p>
                                <div className="p-5 rounded-2xl bg-indigo-50/20 border border-indigo-100 text-sm text-slate-700 space-y-2.5">
                                    <p><strong>Viewport Deviations:</strong> Leaving the active test browser context (e.g. searching answers in separate windows, minimized states, tab switching) is auto-recorded.</p>
                                    <p><strong>Rank Strip Penalties:</strong> High exit frequencies or verified violations will trigger automatic disqualification of the attempt from the official nationwide rank lists.</p>
                                    <p><strong>Admin Overrides:</strong> <em>SR Club</em> system administrators preserve absolute authority to invalidate any mock attempt if suspicious anomalies or bot attempts are flagged in database traces.</p>
                                </div>
                            </section>

                            {/* Section 8 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">08.</span> Warranties Disclaimer ("As-Is" Service Standard)
                                </h2>
                                <p className="text-slate-750 leading-relaxed">
                                    All mock assessments, solutions, percentiles, ranking reports, and resources provided on APEX MOCK are delivered "as is" and "as available," without warranties of any kind, whether express or implied. <strong>SR Club</strong> makes no guarantees regarding exam outcomes, actual scores in national JEE/NEET/CAT papers, continuous site access speeds, or error-free rendering of visual graphics.
                                </p>
                            </section>

                            {/* Section 9 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">09.</span> Limitation of Liability
                                </h2>
                                <p className="text-slate-750 leading-relaxed">
                                    In no event shall <strong>SR Club</strong>, its founders, executive board members, advisors, developers, or student leaders be liable for any direct, indirect, incidental, consequential, punitive, or special damages, including database losses, profit losses, actual exam outcomes, or device disruptions resulting from the use or inability to use the Platform.
                                </p>
                            </section>

                            {/* Section 10 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">10.</span> Account Suspension & Forceful Termination
                                </h2>
                                <p className="text-slate-750 leading-relaxed">
                                    SR Club reserves the absolute right to suspend, terminate, or delete your account immediately and without prior notice if it is determined, in our sole discretion, that you have violated these Terms, engaged in fraudulent actions, or compromised the security and academic integrity of the Platform.
                                </p>
                            </section>

                            {/* Section 11 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">11.</span> Privacy & Data Alignment
                                </h2>
                                <p className="text-slate-750 leading-relaxed">
                                    Our collection, storage, and processing of your personal and educational metrics are governed by our updated, comprehensive <Link href="/privacy" className="text-indigo-600 hover:underline font-bold">Privacy Policy</Link>. By agreeing to these Terms, you also acknowledge the clauses detailed in the Privacy Policy.
                                </p>
                            </section>

                            {/* Section 12 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">12.</span> Governing Law & Judicial Jurisdiction
                                </h2>
                                <p className="text-slate-750 leading-relaxed">
                                    These Terms and Conditions are governed and interpreted under the active state and federal laws of India. Any litigation, legal dispute, claims, or arbitration processes arising out of or in connection with the Platform must be submitted exclusively to the legal courts located in the registered judicial center of the parent organization, <em>SR Club</em>.
                                </p>
                            </section>

                            {/* Section 13 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">13.</span> Severability & Non-Waiver
                                </h2>
                                <p className="text-slate-750 leading-relaxed">
                                    If any provision of these Terms is determined to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining terms shall continue in full force and effect. Any failure by SR Club to enforce any right or clause outlined in these Terms does not constitute a waiver of future enforcement.
                                </p>
                            </section>

                            {/* Section 14 */}
                            <section>
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">14.</span> Official Support & Secretariat Channels
                                </h2>
                                <p className="text-slate-750 leading-relaxed mb-4">
                                    If you require clarifications regarding these terms, payment enrollments, or legal compliance, please contact our support desk:
                                </p>
                                <div className="p-5 rounded-2xl bg-indigo-50/20 border border-indigo-100 flex flex-col md:flex-row justify-between gap-4 text-slate-700 text-sm">
                                    <div>
                                        <p className="font-bold text-slate-900 text-base">SR Club Secretariat</p>
                                        <p className="text-slate-500 mt-1">Attn: Legal & Compliance Division</p>
                                        <p className="text-slate-500">APEX MOCK Initiative Office</p>
                                    </div>
                                    <div className="flex flex-col gap-1.5 md:items-end justify-center">
                                        <p className="flex items-center gap-2 font-bold">
                                            📧 <a href="mailto:officialsrcounselling@gmail.com" className="text-indigo-600 hover:underline">
                                                officialsrcounselling@gmail.com
                                            </a>
                                        </p>
                                        <p className="text-xs text-slate-400">Response SLA: Under 48 Business Hours</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </motion.div>

                </div>
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-300 py-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                    <img src="/logo.png" alt="APEX MOCK" className="h-12 w-auto object-contain mb-4 grayscale brightness-200" />
                    <p className="mb-4">© 2025 APEX MOCK - An initiative of SR Club. All rights reserved.</p>
                    <div className="flex justify-center gap-6 text-sm">
                        <Link href="/about" className="hover:text-white transition">About</Link>
                        <Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link>
                        <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
