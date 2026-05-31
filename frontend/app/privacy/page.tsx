'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Target, Shield } from 'lucide-react';

export default function PrivacyPage() {
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
                            <div className="bg-green-100 p-4 rounded-full">
                                <Shield className="text-green-600" size={40} />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
                            Privacy Policy
                        </h1>
                        <p className="text-slate-600 text-lg">
                            APEX MOCK – An initiative of SR Club
                        </p>
                        <p className="text-slate-500 mt-2">
                            Last updated: 31-05-2026
                        </p>
                    </motion.div>

                    {/* Privacy Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100"
                    >
                        <p className="text-slate-700 mb-8 text-lg leading-relaxed">
                            At APEX MOCK, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
                            use, and safeguard your personal information.
                        </p>

                        <div className="space-y-10">
                            {/* Section 1 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">01.</span> Information We Collect (Data Catalog)
                                </h2>
                                <p className="text-slate-750 leading-relaxed mb-4">
                                    APEX MOCK collects several categories of personal, educational, and technical information to guarantee the platform operates securely and delivers accurate assessment metrics.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <h4 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wider">A. Information Provided Directly By You</h4>
                                        <ul className="list-disc list-inside text-xs text-slate-600 space-y-1.5 ml-1">
                                            <li>Google Account Details (Name, verified Email Address, Profile photo URL).</li>
                                            <li>Academic profile configuration (selected streams: JEE, NEET, CAT).</li>
                                            <li>Secondary contact details and country or regional location coordinates.</li>
                                            <li>Offline query support history and messages sent via our official contact address.</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <h4 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wider">B. Automatically Logged Infrastructure Data</h4>
                                        <ul className="list-disc list-inside text-xs text-slate-600 space-y-1.5 ml-1">
                                            <li>Technical identifiers (IP address, Browser fingerprint, Operating System vendor).</li>
                                            <li>Exam navigation sequences, clickstreams, and real-time response durations.</li>
                                            <li>Browser visibility and state changes (tab shifts, minimization history).</li>
                                            <li>Payment gateway parameters and secure token reference hashes (no raw card data).</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Section 2 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">02.</span> How We Process & Use Your Information
                                </h2>
                                <p className="text-slate-750 leading-relaxed mb-3">
                                    We use the acquired data based on absolute functional requirements and legitimate educational interests:
                                </p>
                                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 leading-relaxed">
                                    <li><strong>Mock Series Administration:</strong> Generating test instances, compiling score records, and assigning customized student schedules.</li>
                                    <li><strong>Adaptive Percentile Computations:</strong> Running statistical rank engines to calculate your precise nationwide percentile ranking among ten-thousand active aspirants.</li>
                                    <li><strong>High-Speed Support Delivery:</strong> Pinpointing technical issues in test execution instantly via matching server-side transaction logs.</li>
                                    <li><strong>Platform Maintenance:</strong> Running database queries to prune stagnant session logs and optimizing page load speeds using cache systems.</li>
                                </ul>
                            </section>

                            {/* Section 3 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight text-emerald-800">
                                    🛡️ <span className="text-emerald-600">03.</span> Strict Anti-Commercialization & Zero Data Selling Guarantee
                                </h2>
                                <p className="text-slate-750 leading-relaxed bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl">
                                    <strong>Our Solid Commitment:</strong> APEX MOCK, as a non-profit-oriented initiative of <em>SR Club</em>, maintains a strict zero-data-selling guarantee. We do not sell, rent, lease, or license your personal information, test attempt performance logs, contact details, or performance reports to private coaching institutes, advertising brokers, or third-party educational commercial systems. Your data stays entirely private and is exclusively used to power your own analytics dashboard.
                                </p>
                            </section>

                            {/* Section 4 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight text-rose-800">
                                    ⚠️ <span className="text-rose-600">04.</span> Academic Integrity & Anti-Cheating Monitoring
                                </h2>
                                <p className="text-slate-750 leading-relaxed mb-4">
                                    To preserve absolute national rank credibility during high-stakes mock test attempts, our testing engine executes local browser integrity checks:
                                </p>
                                <div className="p-5 rounded-2xl bg-rose-50/30 border border-rose-100 space-y-3 text-slate-700 text-sm">
                                    <p className="flex items-start gap-2">
                                        <span className="shrink-0 mt-1">🚫</span>
                                        <span><strong>Tab Change Logging:</strong> If you leave the test viewport, change active tabs, or minimize the window during an active assessment, our engine logs the exit count. Repeated infractions trigger warnings and can invalidate your all-India leaderboard ranks.</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="shrink-0 mt-1">🚫</span>
                                        <span><strong>Fullscreen Enforcement:</strong> Premium national mock tests require fullscreen status. Temporary exits are recorded as potential academic integrity warnings.</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="shrink-0 mt-1">🚫</span>
                                        <span><strong>Clipboard Lockout:</strong> The test engine blocks standard text copying, pasting, and screen-grabbing inside the exam viewport to protect premium questions and verify organic scores.</span>
                                    </p>
                                </div>
                            </section>

                            {/* Section 5 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">05.</span> Security Standards & Hashing Protocols
                                </h2>
                                <p className="text-slate-750 leading-relaxed mb-3">
                                    Data security is our primary priority. We defend all aspirant records using high-grade digital barriers:
                                </p>
                                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 leading-relaxed">
                                    <li><strong>TLS 1.3 Transport Security:</strong> All client-to-server networks are encrypted via 256-bit Secure Socket Layer / Transport Layer Security.</li>
                                    <li><strong>Structured Firestore Security Rules:</strong> No user can read, edit, or access another student's profile information, billing reference, or rank records due to robust role-based firewalls.</li>
                                    <li><strong>SHA-256 Signature Handshakes:</strong> Payment sequences and enrollment handshakes verify integrity using HMAC SHA-256 signatures to block middle-man injections.</li>
                                </ul>
                            </section>

                            {/* Section 6 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">06.</span> Cookies, Local Storage & Pixels Matrix
                                </h2>
                                <p className="text-slate-750 leading-relaxed mb-4">
                                    We use modern cookies and local storage tokens to preserve session context and ensure fast navigations.
                                </p>
                                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                                    <table className="w-full text-left text-xs border-collapse">
                                        <thead>
                                            <tr className="bg-slate-100 border-b border-slate-200">
                                                <th className="p-3 font-bold text-slate-800 uppercase tracking-wider">Cookie Name / Key</th>
                                                <th className="p-3 font-bold text-slate-800 uppercase tracking-wider">Category</th>
                                                <th className="p-3 font-bold text-slate-800 uppercase tracking-wider">Purpose</th>
                                                <th className="p-3 font-bold text-slate-800 uppercase tracking-wider">Expiration</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-150">
                                            <tr>
                                                <td className="p-3 font-mono text-indigo-700 font-semibold">firebase:host:uid</td>
                                                <td className="p-3 font-bold text-emerald-600 uppercase">Essential</td>
                                                <td className="p-3 text-slate-650">Maintains secure authenticated aspirant user session.</td>
                                                <td className="p-3 text-slate-500">Persistent</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 font-mono text-indigo-700 font-semibold">_ga, _gid</td>
                                                <td className="p-3 font-bold text-blue-600 uppercase">Performance</td>
                                                <td className="p-3 text-slate-650">Aggregates completely anonymized site usage and latency parameters.</td>
                                                <td className="p-3 text-slate-500">Up to 2 years</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 font-mono text-indigo-700 font-semibold">rzp_device_id</td>
                                                <td className="p-3 font-bold text-indigo-600 uppercase">Functional</td>
                                                <td className="p-3 text-slate-650">Required by Razorpay to verify checkout integrity and block frauds.</td>
                                                <td className="p-3 text-slate-500">1 Year</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 font-mono text-indigo-700 font-semibold">apex_auth_mode</td>
                                                <td className="p-3 font-bold text-slate-600 uppercase">Preference</td>
                                                <td className="p-3 text-slate-650">Identifies preferred landing/auth pathways (Login/Signup).</td>
                                                <td className="p-3 text-slate-500">Session</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* Section 7 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">07.</span> Third-Party Subprocessors
                                </h2>
                                <p className="text-slate-750 leading-relaxed mb-4">
                                    We transmit specialized variables to selected industry-standard subprocessors to orchestrate basic cloud hosting, payment infrastructure, and core authentication services:
                                </p>
                                <div className="space-y-3">
                                    {[
                                        { name: 'Google Firebase', role: 'Authentication & Cloud Firestore hosting.', data: 'Name, email, UID, attempt logs, preference details.' },
                                        { name: 'Razorpay Software', role: 'Payment processing gateway infrastructure.', data: 'Email, phone, transaction references, billing state.' },
                                        { name: 'Vercel Inc.', role: 'Global CDN and application frontend edge hosting.', data: 'IP logs, CDN routing parameters, local asset configurations.' },
                                        { name: 'Google Gemini API', role: 'OCR parse assistance for administrative test creator.', data: 'Administrative question sheets, structural text segments.' }
                                    ].map(sub => (
                                        <div key={sub.name} className="flex justify-between items-start p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs md:text-sm">
                                            <div className="w-1/3">
                                                <span className="font-bold text-slate-900">{sub.name}</span>
                                                <p className="text-[10px] text-slate-400 mt-0.5">Subprocessor</p>
                                            </div>
                                            <div className="w-1/3 text-slate-600 pr-2">
                                                <span className="font-semibold text-slate-800">Role:</span> {sub.role}
                                            </div>
                                            <div className="w-1/3 text-slate-500 italic text-[11px]">
                                                <span className="font-semibold text-slate-700 not-italic">Shared:</span> {sub.data}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Section 8 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">08.</span> Data Retention, Backup Lifecycle & Log Archival
                                </h2>
                                <p className="text-slate-750 leading-relaxed mb-3">
                                    We preserve personal data profiles only for as long as your aspirant portal is active.
                                </p>
                                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 leading-relaxed">
                                    <li><strong>Active Portals:</strong> Retention persists throughout your educational life cycle (e.g. while actively preparing).</li>
                                    <li><strong>Database Backups:</strong> System backups are maintained in cold storage with AES-256 encryption. Backup rotations are overwritten or purged every 90 days.</li>
                                    <li><strong>Platform Log Audits:</strong> Inactive network log files are automatically compressed and destroyed after 12 months.</li>
                                </ul>
                            </section>

                            {/* Section 9 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">09.</span> User Rights Portfolio (GDPR, CCPA & DPDPA Compliance)
                                </h2>
                                <p className="text-slate-750 leading-relaxed mb-3">
                                    Regardless of your residency, APEX MOCK implements a robust suite of data protections matching top international standards:
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                                    <div className="p-4 bg-indigo-50/40 rounded-xl border border-indigo-100/50 text-center">
                                        <span className="text-xl">📁</span>
                                        <h5 className="font-bold text-slate-900 mt-1 text-sm">Right to Export</h5>
                                        <p className="text-[11px] text-slate-500 mt-1">Request a structured JSON export of all your academic metrics and logs.</p>
                                    </div>
                                    <div className="p-4 bg-indigo-50/40 rounded-xl border border-indigo-100/50 text-center">
                                        <span className="text-xl">✏️</span>
                                        <h5 className="font-bold text-slate-900 mt-1 text-sm">Right to Rectify</h5>
                                        <p className="text-[11px] text-slate-500 mt-1">Modify account names or academic preferentials instantly inside the profile center.</p>
                                    </div>
                                    <div className="p-4 bg-indigo-50/40 rounded-xl border border-indigo-100/50 text-center">
                                        <span className="text-xl">🚫</span>
                                        <h5 className="font-bold text-slate-900 mt-1 text-sm">Right to Restrict</h5>
                                        <p className="text-[11px] text-slate-500 mt-1">Halt optional analytic processing pipelines at any point of time.</p>
                                    </div>
                                </div>
                            </section>

                            {/* Section 10 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight text-rose-800">
                                    🛑 <span className="text-rose-600">10.</span> Account Deletion & Permanent Wiping Protocol
                                </h2>
                                <p className="text-slate-750 leading-relaxed mb-3">
                                    If you decide to cease your preparation, you can request full account deletion. We implement a clean data wiping workflow:
                                </p>
                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-150 text-sm text-slate-700 leading-relaxed space-y-2">
                                    <p><strong>Step 1:</strong> Email your deletion request directly from your registered Google email address to <a href="mailto:officialsrcounselling@gmail.com" className="text-indigo-600 hover:underline font-bold">officialsrcounselling@gmail.com</a>.</p>
                                    <p><strong>Step 2 (30-Day Cool-Off):</strong> Your account enters a deactivated state for exactly 30 days to allow recovery of scores if requested. During this phase, it is hidden from leaderboard rankings.</p>
                                    <p><strong>Step 3 (Irreversible Wiping):</strong> Upon expiry of the 30-day window, our database scripts execute a complete purge, erasing all Firestore document links, score history, and profile fields irreversibly.</p>
                                </div>
                            </section>

                            {/* Section 11 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">11.</span> Children's Privacy (Under 18 Guidelines)
                                </h2>
                                <p className="text-slate-750 leading-relaxed">
                                    APEX MOCK is designed for secondary high school and college aspirants. We require users under 18 years of age to access the platform under the active guidance and consent of a parent or legal guardian. We do not deliberately solicit personal contact indexes from children under 13 without direct parent/guardian endorsement.
                                </p>
                            </section>

                            {/* Section 12 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">12.</span> Governing Law & Arbitration Jurisdiction
                                </h2>
                                <p className="text-slate-750 leading-relaxed">
                                    All terms, data procedures, and compliance specifications outlined in this Privacy Policy are governed and interpreted under the active state and federal laws of India. Any litigation, dispute, or arbitration concerning user data handling or transaction validity falls exclusively under the legal courts of the city in which the executive office of the parent initiative, <em>SR Club</em>, is registered.
                                </p>
                            </section>

                            {/* Section 13 */}
                            <section className="border-b border-slate-100 pb-8">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">13.</span> Amendments to This Privacy Policy
                                </h2>
                                <p className="text-slate-750 leading-relaxed">
                                    SR Club reserves the right to append, adjust, or alter these terms at any point. Major alterations (such as adjustments in processing scopes or subprocessor lists) are highlighted through visible alerts in your aspirant dashboard. Continued usage of APEX MOCK mock series after alerts constitute organic agreement to the updated clauses.
                                </p>
                            </section>

                            {/* Section 14 */}
                            <section>
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight">
                                    <span className="text-indigo-600">14.</span> Official Contact Channels & Data Representative
                                </h2>
                                <p className="text-slate-750 leading-relaxed mb-4">
                                    If you have any questions, wish to exercise your rights, or want to trigger account deletions, contact our Data Protection Officer through the verified channels below:
                                </p>
                                <div className="p-5 rounded-2xl bg-indigo-50/20 border border-indigo-100 flex flex-col md:flex-row justify-between gap-4 text-slate-700 text-sm">
                                    <div>
                                        <p className="font-bold text-slate-900 text-base">SR Club Secretariat</p>
                                        <p className="text-slate-500 mt-1">Attn: Data Privacy & Security Unit</p>
                                        <p className="text-slate-500">APEX MOCK Initiative Office</p>
                                    </div>
                                    <div className="flex flex-col gap-1.5 md:items-end justify-center">
                                        <p className="flex items-center gap-2 font-bold">
                                            📧 <a href="mailto:officialsrcounselling@gmail.com" className="text-indigo-600 hover:underline">
                                                officialsrcounselling@gmail.com
                                            </a>
                                        </p>
                                        <p className="text-xs text-slate-400">Response time guarantee: Under 48 Business Hours</p>
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
