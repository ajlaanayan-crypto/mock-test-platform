'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { X, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GoogleLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode?: 'login' | 'signup';
}

export default function GoogleLoginModal({ isOpen, onClose, mode = 'login' }: GoogleLoginModalProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [loadingStage, setLoadingStage] = useState(0);
    const { signInWithGoogle } = useAuth();
    const router = useRouter();

    const isSignUp = mode === 'signup';

    const loadingStages = [
        'Connecting to secure servers...',
        'Authenticating with Google...',
        'Verifying your details...',
        'Syncing with APEX Cloud...'
    ];

    // Cycle through loading texts to create a high-fidelity dynamic scanning feel
    useEffect(() => {
        let interval: any;
        if (loading) {
            setLoadingStage(0);
            interval = setInterval(() => {
                setLoadingStage(prev => (prev + 1) % loadingStages.length);
            }, 1800);
        }
        return () => clearInterval(interval);
    }, [loading]);

    // Reset state on modal state change
    useEffect(() => {
        if (!isOpen) {
            setError('');
            setLoading(false);
            setLoadingStage(0);
        }
    }, [isOpen]);

    const handleGoogleSignIn = async () => {
        setError('');
        setLoading(true);

        try {
            await signInWithGoogle();
            router.push('/dashboard');
            onClose();
        } catch (err: any) {
            console.error('Google Sign-In Error:', err);
            if (err.code === 'auth/popup-closed-by-user') {
                setError('Sign-in cancelled. Please click the button to sign in again.');
            } else if (err.code === 'auth/popup-blocked') {
                setError('Popup was blocked. Please allow popups/redirects in your browser settings.');
            } else {
                setError(err.message || 'Failed to authenticate with Google. Please try again.');
            }
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
                    {/* Glassmorphic Backdrop overlay matching the Vanta Clouds aesthetic */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#eef2ff]/30 backdrop-blur-xl"
                        style={{
                            background: 'radial-gradient(circle at center, rgba(220, 229, 255, 0.4) 0%, rgba(138, 108, 201, 0.15) 100%)'
                        }}
                    />

                    {/* Premium Card Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 15 }}
                        transition={{ type: 'spring', duration: 0.55, bounce: 0.28 }}
                        className="relative max-w-md w-full bg-white/70 backdrop-blur-3xl rounded-[3rem] shadow-[0_50px_100px_rgba(74,64,224,0.12)] border border-white/60 p-8 md:p-10 overflow-hidden"
                    >
                        {/* Decorative Vanta-themed animated color blobs in background */}
                        <motion.div 
                            animate={{ 
                                scale: [1, 1.15, 1],
                                rotate: [0, 90, 0],
                                x: [0, 10, 0],
                                y: [0, -10, 0]
                            }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-20 -left-20 w-52 h-52 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" 
                        />
                        <motion.div 
                            animate={{ 
                                scale: [1, 1.2, 1],
                                rotate: [0, -90, 0],
                                x: [0, -15, 0],
                                y: [0, 15, 0]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-24 -right-24 w-60 h-60 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" 
                        />

                        {/* Top Accent Gradient Border */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#4a40e0] to-[#702ae1] opacity-90 rounded-t-[3rem]" />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-2xl bg-white/80 border border-slate-200/50 shadow-xs hover:bg-slate-100 hover:text-slate-900 text-slate-400 transition-all active:scale-95 disabled:opacity-50 z-20"
                            aria-label="Close modal"
                            disabled={loading}
                        >
                            <X size={16} />
                        </button>

                        {/* Modal Header */}
                        <div className="text-center mb-8 relative z-10 flex flex-col items-center select-none">
                            {/* Logo Wrapper with pulsing bounce animation */}
                            <motion.div 
                                initial={{ y: -10 }}
                                animate={{ y: 0 }}
                                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                                className="relative mb-6 flex items-center justify-center cursor-pointer group"
                            >
                                <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full scale-150 animate-pulse" />
                                <motion.img 
                                    whileHover={{ scale: 1.06, rotate: [0, -1, 1, 0] }}
                                    src="/logo.png" 
                                    alt="Apex Logo" 
                                    className="h-16 md:h-20 w-auto object-contain relative z-10 filter drop-shadow-[0_8px_20px_rgba(74,64,224,0.15)]" 
                                />
                            </motion.div>

                            {/* Active Trust Badge */}
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 border border-indigo-100 rounded-full mb-3.5 shadow-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-indigo-500" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-700">
                                    {isSignUp ? 'New Aspirant Portal' : 'Aspirant Gateway Active'}
                                </span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight uppercase">
                                {isSignUp ? 'Create Account' : 'Welcome to APEX'}
                            </h2>
                            <p className="text-xs md:text-sm font-semibold text-slate-550 mt-2.5 max-w-xs mx-auto leading-relaxed">
                                {isSignUp 
                                    ? 'Sign up to start free mock series, track analytics, and analyze your percentile ranking.'
                                    : 'Log in to access India\'s elite JEE/NEET/CAT mock test series, customized schedules, and expert visual solutions.'
                                }
                            </p>
                        </div>

                        {/* Error Handling Box */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-rose-50 border border-rose-200/60 text-rose-700 p-4 rounded-2xl text-xs font-bold flex items-start gap-2.5 mb-6 shadow-xs leading-relaxed"
                            >
                                <span className="text-sm leading-none shrink-0">⚠️</span>
                                <span className="flex-1 font-semibold">{error}</span>
                            </motion.div>
                        )}

                        {/* Google Sign-In Action Block (Only Google Login Option) */}
                        <div className="relative z-10 space-y-4">
                            <motion.button
                                whileHover={{ scale: loading ? 1 : 1.015 }}
                                whileTap={{ scale: loading ? 1 : 0.985 }}
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                                className="w-full relative overflow-hidden group/btn flex justify-center items-center gap-3.5 py-4.5 px-6 rounded-2xl font-black text-base transition-all duration-300 shadow-lg text-white border"
                                style={{
                                    background: 'linear-gradient(135deg, #4a40e0 0%, #702ae1 100%)',
                                    borderColor: 'rgba(74, 64, 224, 0.4)',
                                    boxShadow: '0 15px 30px rgba(74, 64, 224, 0.25)'
                                }}
                            >
                                {/* Slide sheen effect on hover */}
                                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover/btn:translate-x-[250%] transition-transform duration-1000 ease-out pointer-events-none" />

                                {loading ? (
                                    <div className="flex items-center gap-2.5">
                                        <Loader2 className="animate-spin text-white" size={18} />
                                        <span className="text-sm font-extrabold tracking-wide">{loadingStages[loadingStage]}</span>
                                    </div>
                                ) : (
                                    <>
                                        {/* Circular Clean Google Icon Frame */}
                                        <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center p-1 shadow-xs shrink-0 group-hover/btn:rotate-6 transition-transform duration-300">
                                            <svg viewBox="0 0 24 24" className="w-full h-full">
                                                <path
                                                    fill="#4285F4"
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                />
                                                <path
                                                    fill="#34A853"
                                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                />
                                                <path
                                                    fill="#FBBC05"
                                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                />
                                                <path
                                                    fill="#EA4335"
                                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                />
                                            </svg>
                                        </div>
                                        <span className="tracking-wide flex items-center gap-1">
                                            {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
                                        </span>
                                    </>
                                )}
                            </motion.button>

                            {/* Trust badges strip inside the glass box */}
                            <div className="flex justify-center items-center gap-6 pt-5 border-t border-slate-200/40 mt-6">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                                    <ShieldCheck size={14} className="text-emerald-500" /> SSL SECURE
                                </div>
                                <div className="w-1.5 h-1.5 bg-slate-200/80 rounded-full" />
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                                    🛡️ Privacy Protected
                                </div>
                            </div>
                        </div>

                        {/* Terms & Privacy footer notes */}
                        <p className="mt-8 text-center text-[10px] md:text-xs text-slate-450 leading-relaxed max-w-xs mx-auto font-medium">
                            By continuing, you agree to our{' '}
                            <a href="/terms" className="text-indigo-600 hover:underline font-bold transition-colors">Terms of Service</a>
                            {' '}and{' '}
                            <a href="/privacy" className="text-indigo-600 hover:underline font-bold transition-colors">Privacy Policy</a>.
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
