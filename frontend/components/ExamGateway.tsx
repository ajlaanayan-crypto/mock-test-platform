'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BookOpen, Target, Award, Sparkles, GraduationCap, CheckCircle2 } from 'lucide-react';

const exams = [
    {
        id: 'neet',
        title: 'NEET Prep',
        desc: 'National Medical Entrance',
        icon: BookOpen,
        color: 'from-teal-500/90 via-emerald-500/80 to-cyan-500/90',
        href: '/neet',
        stat: '15k+ Medicos Active',
        badge: 'Medical Gateway',
        glow: 'shadow-teal-500/25',
        gradientHex: 'rgba(20,184,166,0.3)',
        features: [
            'All India NEET Mock Papers',
            'Detailed Bio-Visual Explanations',
            'Speed & Accuracy Analytics',
            'Physics & Chemistry Numerical Grid'
        ]
    },
    {
        id: 'jee-mains',
        title: 'JEE Mains',
        desc: 'Premium Engineering Prep',
        icon: Target,
        color: 'from-blue-600/90 via-indigo-600/80 to-indigo-700/90',
        href: '/jee-mains',
        stat: '25k+ Engineers Joined',
        badge: 'NTA Exam Standard',
        glow: 'shadow-blue-500/25',
        gradientHex: 'rgba(74,64,224,0.3)',
        features: [
            'Chapter-wise Micro Tests',
            'NTA Pattern Full Mock Tests',
            'Detailed Chapter-wise Notes',
            'Percentile & AIR Predictor'
        ]
    },
    {
        id: 'jee-adv',
        title: 'JEE Advanced',
        desc: 'IIT Entrance Specialist',
        icon: Award,
        color: 'from-rose-500/90 via-pink-500/80 to-purple-600/90',
        href: '/jee-advanced',
        stat: 'Top 100 IIT AIR Focus',
        badge: 'Elite IIT Standards',
        glow: 'shadow-rose-500/25',
        gradientHex: 'rgba(244,63,94,0.3)',
        features: [
            'Multi-Correct Options Matrix',
            'Integer & Numerical Grid Mock',
            'Advanced Subject Analytics',
            'Concept Mapping Explanations'
        ]
    },
    {
        id: 'cat',
        title: 'CAT Exam',
        desc: 'Premium MBA Entrance',
        icon: Sparkles,
        color: 'from-purple-600/85 via-violet-500/75 to-fuchsia-600/85',
        href: '#',
        stat: 'Coming Soon',
        badge: 'Management Prep',
        glow: 'shadow-purple-500/20',
        gradientHex: 'rgba(147,51,234,0.2)',
        isComingSoon: true,
        features: [
            'Quantitative Aptitude Mock',
            'Data Interpretation (DILR) Arena',
            'Verbal Comprehension Scorer',
            'AI Percentile Scaling'
        ]
    },
    {
        id: 'board',
        title: 'Boards 2026',
        desc: 'Class 10th & 12th',
        icon: GraduationCap,
        color: 'from-amber-500/85 via-orange-500/75 to-yellow-600/85',
        href: '#',
        stat: 'Coming Soon',
        badge: 'School Board Exams',
        glow: 'shadow-orange-500/20',
        gradientHex: 'rgba(245,158,11,0.2)',
        isComingSoon: true,
        features: [
            'CBSE Board Mock Papers',
            'ICSE/ISC Chapter-wise Grid',
            'Strict Subjective Solutions',
            'Topper Sheet Analysis'
        ]
    }
];

export default function ExamGateway() {
    const [hovered, setHovered] = useState<string | null>(null);
    const [mouseCoords, setMouseCoords] = useState<{ [key: string]: { x: number; y: number } }>({});

    const handleMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouseCoords(prev => ({
            ...prev,
            [id]: {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }
        }));
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 mb-24 relative select-none">
            {/* Header elements with high-fidelity sparkles */}
            <div className="text-center mb-16 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-indigo-500/10 blur-[100px] pointer-events-none rounded-full" />
                <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none uppercase inline-flex items-center gap-3">
                    <span className="w-12 h-1 bg-gradient-to-r from-[#4a40e0] to-transparent rounded-full hidden sm:block"></span>
                    Select Your Exam Goal
                    <span className="w-12 h-1 bg-gradient-to-l from-[#4a40e0] to-transparent rounded-full hidden sm:block"></span>
                </h3>
                <p className="text-slate-500 text-sm md:text-base font-semibold mt-3 max-w-lg mx-auto">
                    Interactive preparatory pathways with adaptive national scoring matrices.
                </p>
            </div>

            {/* Desktop: Dynamic Spring-Loaded Accordion Grid */}
            <div className="hidden lg:flex gap-6 h-[480px] items-stretch justify-center relative z-10 px-4">
                {exams.map((exam) => {
                    const isHovered = hovered === exam.id;
                    const coords = mouseCoords[exam.id] || { x: 0, y: 0 };

                    return (
                        <motion.div
                            key={exam.id}
                            layout
                            transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.8 }}
                            onMouseEnter={() => setHovered(exam.id)}
                            onMouseLeave={() => setHovered(null)}
                            onMouseMove={(e) => handleMouseMove(exam.id, e)}
                            className={`relative rounded-[2.5rem] overflow-hidden transition-all duration-300 border ${
                                isHovered 
                                    ? 'flex-[2.8] border-white bg-white shadow-2xl' 
                                    : hovered 
                                        ? 'flex-[0.8] border-slate-200/40 opacity-55 scale-[0.98] blur-[1px]' 
                                        : 'flex-1 border-white/60 bg-white/40'
                            }`}
                            style={{
                                boxShadow: isHovered 
                                    ? `0 35px 70px -15px ${exam.gradientHex}, 0 0 100px -30px ${exam.gradientHex}` 
                                    : '0 10px 30px rgba(74,64,224,0.03)',
                                backdropFilter: 'blur(16px)'
                            }}
                        >
                            {/* Gradient Background underlay */}
                            <div 
                                className={`absolute inset-0 bg-gradient-to-br ${exam.isComingSoon ? 'from-slate-100 to-slate-200' : exam.color} transition-all duration-700 ease-out ${
                                    isHovered ? 'opacity-100 scale-105' : 'opacity-85'
                                }`} 
                            />

                            {/* Cursor-Tracking Spotlight Effect */}
                            <div 
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                                style={{
                                    opacity: isHovered ? 1 : 0,
                                    background: `radial-gradient(circle 220px at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.22), transparent)`
                                }}
                            />

                            {/* Background Grid Pattern Overlay */}
                            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] mix-blend-overlay" />

                            {/* Main Content Layout */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                                {/* Top Badging / Icon Wrapper */}
                                <div className="flex justify-between items-center">
                                    {/* Icon bouncing micro-animation */}
                                    <motion.div 
                                        animate={isHovered ? { y: [-2, 3, -2], rotate: [0, -3, 3, 0] } : {}}
                                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                        className="bg-white/90 p-4 rounded-3xl border border-white/20 shadow-md flex items-center justify-center shrink-0"
                                    >
                                        <exam.icon className={`${exam.isComingSoon ? 'text-slate-500' : 'text-indigo-600'}`} size={28} />
                                    </motion.div>

                                    {/* High-Fidelity Stats / Goal Indicator Badge */}
                                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/90 border border-slate-100 shadow-sm text-slate-800">
                                        {exam.stat}
                                    </span>
                                </div>

                                {/* Intermediate Staggered Feature Checklist (Exclusive to Expanded card) */}
                                <div className="h-0 flex-grow flex flex-col justify-center overflow-hidden">
                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.div 
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                variants={{
                                                    visible: { transition: { staggerChildren: 0.08 } }
                                                }}
                                                className="space-y-3 my-4 pr-2"
                                            >
                                                {exam.features.map((feature, i) => (
                                                    <motion.div
                                                        key={i}
                                                        variants={{
                                                            hidden: { opacity: 0, x: -15 },
                                                            visible: { opacity: 1, x: 0 }
                                                        }}
                                                        transition={{ type: 'spring', stiffness: 100, damping: 12 }}
                                                        className="flex items-center gap-2.5 text-white/90"
                                                    >
                                                        <CheckCircle2 size={16} className="text-white shrink-0 opacity-80" />
                                                        <span className="text-xs md:text-sm font-bold tracking-wide leading-tight">{feature}</span>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Title / Description / CTA Block */}
                                <div className="space-y-2">
                                    <span className="text-[9px] font-black uppercase tracking-widest bg-black/20 text-white/90 px-3 py-1 rounded-full w-fit">
                                        {exam.badge}
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase select-none">
                                        {exam.title}
                                    </h2>
                                    <p className="text-white/80 font-semibold text-xs md:text-sm tracking-wide">
                                        {exam.desc}
                                    </p>

                                    {/* Action preparation trigger button */}
                                    {!exam.isComingSoon ? (
                                        <Link href={exam.href}>
                                            <motion.button 
                                                whileHover={{ scale: 1.04 }}
                                                whileTap={{ scale: 0.97 }}
                                                className="mt-5 flex items-center justify-center gap-2 px-6 py-3.5 bg-white rounded-2xl font-black text-xs md:text-sm text-slate-900 border border-indigo-50 shadow-md hover:shadow-lg transition-all duration-300 w-full uppercase tracking-wider"
                                            >
                                                Start Preparation <ArrowRight size={16} className="text-[#4a40e0]" />
                                            </motion.button>
                                        </Link>
                                    ) : (
                                        <div className="mt-5 p-3.5 rounded-2xl bg-white/10 border border-white/20 text-center text-[10px] md:text-xs font-black uppercase tracking-widest text-white/90 backdrop-blur-sm shadow-inner select-none">
                                            ⌛ Pathway Unlocking Soon
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Mobile / Tablet: Responsive Bento Glass Cards with subtle tap scaling */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-5 px-4 z-10 relative">
                {exams.map((exam) => (
                    <motion.div
                        key={exam.id}
                        whileHover={{ scale: 1.015 }}
                        whileTap={exam.isComingSoon ? {} : { scale: 0.98 }}
                        className={`relative rounded-[2.2rem] bg-gradient-to-br ${exam.isComingSoon ? 'from-slate-100 to-slate-200' : exam.color} border border-white/40 overflow-hidden`}
                        style={{
                            boxShadow: '0 15px 35px rgba(74,64,224,0.05)',
                            backdropFilter: 'blur(12px)'
                        }}
                    >
                        {/* Background Grid Pattern Overlay */}
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:14px_14px] mix-blend-overlay" />

                        {/* Card Layout */}
                        <div className="p-6 md:p-8 flex flex-col justify-between h-[250px] relative z-10">
                            {/* Mobile Header Row */}
                            <div className="flex justify-between items-start">
                                <div className="bg-white/95 p-3.5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                                    <exam.icon className={`${exam.isComingSoon ? 'text-slate-500' : 'text-indigo-600'}`} size={24} />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/95 text-slate-800 shadow-sm border border-slate-100">
                                    {exam.stat}
                                </span>
                            </div>

                            {/* Mobile Footer Area */}
                            <div className="space-y-1.5 mt-4">
                                <span className="text-[8px] font-black uppercase tracking-widest bg-black/20 text-white/90 px-2.5 py-0.5 rounded-full w-fit">
                                    {exam.badge}
                                </span>
                                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase leading-none">{exam.title}</h3>
                                <p className="text-white/80 font-semibold text-[11px] md:text-xs leading-normal">{exam.desc}</p>
                                
                                {/* Trigger pathways */}
                                {!exam.isComingSoon ? (
                                    <Link href={exam.href}>
                                        <button className="w-full mt-3 py-3 px-5 rounded-xl bg-white text-slate-900 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform duration-200">
                                            Start Prep <ArrowRight size={14} className="text-indigo-600" />
                                        </button>
                                    </Link>
                                ) : (
                                    <div className="w-full mt-3 py-3 px-5 rounded-xl bg-white/15 border border-white/25 text-white/90 text-center font-black text-xs uppercase tracking-widest shadow-inner">
                                        Coming Soon
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

