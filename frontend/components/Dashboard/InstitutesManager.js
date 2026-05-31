'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash, Layers, BookOpen, ChevronLeft, Search, CheckCircle, XCircle } from 'lucide-react';
import { API_BASE_URL } from '@/lib/config';
import { useAuth } from '@/context/AuthContext';

export default function InstitutesManager() {
    const { user } = useAuth();
    const [institutes, setInstitutes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', instituteCode: '' });

    // Content Management State
    const [selectedInstitute, setSelectedInstitute] = useState(null);
    const [activeTab, setActiveTab] = useState('tests'); // tests, series, notes
    const [globalContent, setGlobalContent] = useState({ tests: [], series: [], notes: [] });
    const [searchQuery, setSearchQuery] = useState('');
    const [processingId, setProcessingId] = useState(null);

    useEffect(() => {
        if (user) {
            fetchInstitutes();
            fetchAllGlobalContent();
        }
    }, [user]);

    const fetchInstitutes = async () => {
        try {
            const token = await user?.getIdToken();
            const res = await fetch(`${API_BASE_URL}/api/admin/institutes`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setInstitutes(data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const fetchAllGlobalContent = async () => {
        try {
            const token = await user?.getIdToken();
            const headers = { Authorization: `Bearer ${token}` };

            const [testsRes, seriesRes, notesRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/tests`, { headers }),
                fetch(`${API_BASE_URL}/api/tests/series`, { headers }),
                fetch(`${API_BASE_URL}/api/notes/sections`, { headers })
            ]);

            const tests = testsRes.ok ? await testsRes.json() : [];
            const series = seriesRes.ok ? await seriesRes.json() : [];
            const notes = notesRes.ok ? await notesRes.json() : [];

            setGlobalContent({ tests, series, notes });
        } catch (e) {
            console.error("Failed to fetch global content:", e);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = await user?.getIdToken();
            const res = await fetch(`${API_BASE_URL}/api/admin/institutes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                alert('Institute Created');
                setShowForm(false);
                setFormData({ name: '', instituteCode: '' });
                fetchInstitutes();
            } else {
                const err = await res.json();
                alert(err.error || 'Failed to create');
            }
        } catch (e) {
            console.error(e);
            alert('Error creating institute');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this institute? Tests and Students under this code will remain but lose their explicit association context.')) return;
        try {
            const token = await user?.getIdToken();
            const res = await fetch(`${API_BASE_URL}/api/admin/institutes/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                setInstitutes(prev => prev.filter(i => i.id !== id));
            } else {
                alert('Failed to delete');
            }
        } catch (e) {
            console.error(e);
            alert('Error deleting institute');
        }
    };

    const handleAssignContent = async (item, type, isAssigning) => {
        const itemId = item.id || item._id;
        setProcessingId(itemId);
        try {
            const token = await user?.getIdToken();
            const endpoint = isAssigning ? 'assign' : 'unassign';
            const reqType = type === 'notes' ? 'notesSections' : type === 'series' ? 'testSeries' : 'tests';

            const res = await fetch(`${API_BASE_URL}/api/admin/institutes/${selectedInstitute.instituteCode}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ type: reqType, id: itemId })
            });

            if (res.ok) {
                // Optimistically update global content state to reflect new instituteCode
                setGlobalContent(prev => {
                    const updated = { ...prev };
                    updated[type] = updated[type].map(content => {
                        const contentId = content.id || content._id;
                        if (contentId === itemId) {
                            return { ...content, instituteCode: isAssigning ? selectedInstitute.instituteCode : '' };
                        }
                        return content;
                    });
                    return updated;
                });
            } else {
                alert('Failed to update assignment');
            }
        } catch (e) {
            console.error(e);
            alert('Error updating assignment');
        } finally {
            setProcessingId(null);
        }
    };

    const renderContentManager = () => {
        const items = globalContent[activeTab] || [];
        const filteredItems = items.filter(item => 
            (item.title || item.name || '').toLowerCase().includes(searchQuery.toLowerCase())
        );

        const assignedItems = filteredItems.filter(item => item.instituteCode === selectedInstitute.instituteCode);
        const unassignedItems = filteredItems.filter(item => !item.instituteCode || item.instituteCode !== selectedInstitute.instituteCode);

        return (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                <button 
                    onClick={() => setSelectedInstitute(null)}
                    className="flex items-center gap-1.5 text-indigo-605 font-black text-xs uppercase tracking-wider hover:text-indigo-805 transition-colors"
                >
                    <ChevronLeft size={16} strokeWidth={2.5} /> Back to Institutes
                </button>

                <div className="bg-white/60 backdrop-blur-xl border border-slate-200/60 p-8 rounded-3xl shadow-sm">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                        {selectedInstitute.name} <span className="text-indigo-500 font-extrabold">({selectedInstitute.instituteCode})</span>
                    </h2>
                    <p className="text-sm font-semibold text-slate-500 mt-1">Assign private content specifically for this institute.</p>
                </div>

                {/* Tabs */}
                <div className="bg-slate-100/80 backdrop-blur-md border border-slate-200/40 p-1.5 rounded-2xl flex gap-1.5 w-fit">
                    {['tests', 'series', 'notes'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                                activeTab === tab 
                                ? 'bg-white text-indigo-650 shadow-sm' 
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-8 space-y-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder={`Search ${activeTab}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                        />
                    </div>

                    <div className="space-y-8">
                        {/* Assigned Section */}
                        <div>
                            <h3 className="text-base font-black text-slate-800 mb-4 flex items-center gap-2">
                                <CheckCircle className="text-emerald-500" size={18} /> 
                                Assigned {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} ({assignedItems.length})
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {assignedItems.map(item => (
                                    <div key={item.id || item._id} className="flex items-center justify-between p-5 rounded-2xl border border-emerald-250 bg-emerald-50/20 group/item transition-all hover:border-emerald-300">
                                        <div>
                                            <p className="font-bold text-slate-900">{item.title || item.name}</p>
                                            <p className="text-xs font-semibold text-slate-500 mt-0.5">{item.field || item.category || 'General'}</p>
                                        </div>
                                        <button
                                            onClick={() => handleAssignContent(item, activeTab, false)}
                                            disabled={processingId === (item.id || item._id)}
                                            className="px-3.5 py-2 bg-white border border-rose-250 text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-black transition-all shadow-sm disabled:opacity-50"
                                        >
                                            {processingId === (item.id || item._id) ? '...' : 'Remove'}
                                        </button>
                                    </div>
                                ))}
                                {assignedItems.length === 0 && <p className="text-sm font-semibold text-slate-400 col-span-2 py-4 italic">No items assigned yet.</p>}
                            </div>
                        </div>

                        {/* Available Section */}
                        <div>
                            <h3 className="text-base font-black text-slate-800 mb-4 flex items-center gap-2">
                                <Layers className="text-slate-400" size={18} /> 
                                Available {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} ({unassignedItems.length})
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {unassignedItems.map(item => (
                                    <div key={item.id || item._id} className="flex items-center justify-between p-5 rounded-2xl border border-slate-200/60 bg-white hover:border-indigo-300 hover:shadow-md transition-all group/item">
                                        <div>
                                            <p className="font-bold text-slate-900 line-clamp-1">{item.title || item.name}</p>
                                            <p className="text-xs font-semibold text-slate-500 mt-0.5">
                                                {item.field || item.category || 'General'} 
                                                {item.instituteCode ? ` • (Currently: ${item.instituteCode})` : ''}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleAssignContent(item, activeTab, true)}
                                            disabled={processingId === (item.id || item._id)}
                                            className="px-3.5 py-2 bg-indigo-50 border border-indigo-150 text-indigo-750 hover:bg-indigo-100 rounded-xl text-xs font-black transition-all shadow-sm disabled:opacity-50 ml-2 whitespace-nowrap"
                                        >
                                            {processingId === (item.id || item._id) ? '...' : 'Assign'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (selectedInstitute) {
        return renderContentManager();
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/60 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 p-2">
                        <img src="/logo.png" alt="Apex Logo" className="h-full w-auto object-contain brightness-0 invert" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Institutes Management</h1>
                        <p className="text-sm font-semibold text-slate-500 mt-0.5">Manage partner coaching institutes and their codes.</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-md transition-all flex items-center gap-2"
                >
                    <Plus size={18} /> Add Institute
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-8 max-w-2xl animate-in slide-in-from-top-4 duration-300">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2 mb-6">
                        <img src="/logo.png" alt="Apex Logo" className="h-5 w-auto object-contain" /> New Institute Details
                    </h3>
                    <form onSubmit={handleCreate} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Institute Full Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="block w-full bg-slate-50 border border-slate-200/60 rounded-2xl px-4 py-3.5 text-sm font-semibold text-slate-805 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                placeholder="e.g. Apex Mock Coaching Center"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Unique Institute Code</label>
                            <input
                                type="text"
                                required
                                value={formData.instituteCode}
                                onChange={e => setFormData({ ...formData, instituteCode: e.target.value })}
                                className="block w-full bg-slate-50 border border-slate-200/60 rounded-2xl px-4 py-3.5 text-sm font-semibold text-slate-850 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                placeholder="e.g. APEX2026"
                            />
                            <p className="text-xs text-slate-450 mt-2 font-medium">Students will use this code to join. Must be exact.</p>
                        </div>
                        <div className="pt-2 flex gap-3">
                            <button type="submit" disabled={loading} className="px-6 py-3 bg-indigo-650 hover:bg-indigo-750 text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50">
                                {loading ? 'Saving...' : 'Save Institute'}
                            </button>
                            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-3 text-slate-650 border border-slate-200 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col group transition-all hover:shadow-md">
                <table className="min-w-full divide-y divide-slate-100">
                    <thead className="bg-slate-50/70">
                        <tr>
                            <th className="px-6 py-4.5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Institute Code</th>
                            <th className="px-6 py-4.5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                            <th className="px-6 py-4.5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Created</th>
                            <th className="px-6 py-4.5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                        {institutes.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-slate-400 font-semibold italic">No institutes created yet.</td>
                            </tr>
                        ) : institutes.map((inst) => (
                            <tr key={inst.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group" onClick={() => setSelectedInstitute(inst)}>
                                <td className="px-6 py-4.5 whitespace-nowrap">
                                    <span className="px-3.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-xs rounded-full shadow-inner">
                                        {inst.instituteCode}
                                    </span>
                                </td>
                                <td className="px-6 py-4.5 whitespace-nowrap text-sm font-bold text-slate-900 group-hover:text-indigo-650 transition-colors">
                                    {inst.name}
                                </td>
                                <td className="px-6 py-4.5 whitespace-nowrap text-sm font-semibold text-slate-500">
                                    {new Date(inst.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4.5 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(inst.id);
                                        }} 
                                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2.5 rounded-xl transition-all border border-red-100 inline-flex items-center justify-center shadow-sm"
                                    >
                                        <Trash size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
