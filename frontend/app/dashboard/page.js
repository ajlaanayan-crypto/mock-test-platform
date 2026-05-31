'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
const StudentDashboard = dynamic(() => import('@/components/Dashboard/StudentDashboard'), { ssr: false });
const AdminDashboard = dynamic(() => import('@/components/Dashboard/AdminDashboard'), { ssr: false });
import DashboardLoader from '@/components/ui/DashboardLoader';

import { LogOut, Sparkles } from 'lucide-react';

export default function Dashboard() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
        // If user is authenticated but hasn't completed signup (missing required fields)
        // If user is authenticated but hasn't completed signup (missing required fields)
        // Note: Field can be 'category' or 'selectedField' depending on schema version
        const hasField = user?.selectedField || user?.category;

        if (!loading && user && (!user.name || !user.email || !user.class || !hasField || !user.state || !user.city)) {
            console.log('User profile incomplete, redirecting to signup-details');
            router.push('/signup-details');
        }
    }, [user, loading, router]);

    if (loading) return <DashboardLoader />;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50/50">
            <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/75 border-b border-slate-200/60 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-3">
                            <span 
                                className="text-xl font-black text-slate-900 tracking-tight cursor-pointer flex items-center gap-2" 
                                onClick={() => router.push('/')}
                            >
                                <img src="/logo.png" alt="Apex Mock Test" className="h-10 md:h-12 w-auto object-contain" />
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col text-right hidden sm:flex">
                                <span className="text-sm font-bold text-slate-800 leading-tight">Welcome, {user.name}</span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{user.email}</span>
                            </div>
                            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${
                                user.role === 'admin' 
                                ? 'bg-indigo-50 text-indigo-700 border-indigo-200/60' 
                                : 'bg-blue-50 text-blue-700 border-blue-200/60'
                            }`}>
                                {user.role}
                            </span>
                            <button
                                onClick={logout}
                                className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100/80 border border-rose-200 text-rose-600 rounded-xl font-bold text-xs transition-all active:scale-95 shadow-sm"
                            >
                                <LogOut size={13} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8 text-black">
                {user.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />}
            </main>
        </div>
    );
}
