import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash, Settings, Copy, CheckCircle } from 'lucide-react';

import { API_BASE_URL } from '@/lib/config';

const PercentileConfig = ({ user }) => {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // UI states
    const [activeTab, setActiveTab] = useState('overall');
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        fetchConfig();
    }, [user]);

    const fetchConfig = async () => {
        try {
            const token = await user?.getIdToken();
            const res = await fetch(`${API_BASE_URL}/api/admin/percentile-data`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                // Ensure arrays exist even if backend returns empty document initially
                setConfig({
                    overallMappings: data.overallMappings || [],
                    shiftwiseMappings: data.shiftwiseMappings || []
                });
            }
        } catch (error) {
            console.error("Failed to fetch config", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!config) return;
        setSaving(true);
        try {
            const token = await user?.getIdToken();
            const res = await fetch(`${API_BASE_URL}/api/admin/percentile-data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(config)
            });

            if (res.ok) {
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
            } else {
                alert("Failed to save configuration.");
            }
        } catch (error) {
            console.error("Save error", error);
            alert("Error saving configuration");
        } finally {
            setSaving(false);
        }
    };

    // Overall Mappings Handlers
    const addOverallRow = () => {
        setConfig(prev => ({
            ...prev,
            overallMappings: [...prev.overallMappings, { percentileRange: "", expectedRankRange: "", marksRequired: "" }]
        }));
    };

    const updateOverallRow = (idx, field, value) => {
        const newMappings = [...config.overallMappings];
        newMappings[idx][field] = value;
        setConfig({ ...config, overallMappings: newMappings });
    };

    const removeOverallRow = (idx) => {
        const newMappings = [...config.overallMappings];
        newMappings.splice(idx, 1);
        setConfig({ ...config, overallMappings: newMappings });
    };

    // Shift Handlers
    const addShiftRow = () => {
        setConfig(prev => ({
            ...prev,
            shiftwiseMappings: [...prev.shiftwiseMappings, {
                percentile: "",
                "21 S1": "", "21 S2": "", "22 S1": "", "22 S2": "", "23 S1": "", "23 S2": "", "24 S1": "", "24 S2": "", "28 S1": "", "28 S2": ""
            }]
        }));
    };

    const updateShiftRow = (idx, field, value) => {
        const newMappings = [...config.shiftwiseMappings];
        newMappings[idx][field] = value;
        setConfig({ ...config, shiftwiseMappings: newMappings });
    };

    const removeShiftRow = (idx) => {
        const newMappings = [...config.shiftwiseMappings];
        newMappings.splice(idx, 1);
        setConfig({ ...config, shiftwiseMappings: newMappings });
    };


    if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Loading Configuration...</div>;
    if (!config) return <div className="p-8 text-center text-red-500">Failed to load configuration.</div>;

    const availableShifts = ["21 S1", "21 S2", "22 S1", "22 S2", "23 S1", "23 S2", "24 S1", "24 S2", "28 S1", "28 S2"];

    return (
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col group transition-all hover:shadow-md p-8 relative mb-8">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                    <img src="/logo.png" alt="Apex Logo" className="h-6 w-auto object-contain" /> Percentile Prediction Config
                </h3>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`px-6 py-2.5 rounded-2xl font-bold text-white shadow-sm transition-all flex items-center gap-2 text-sm ${saveSuccess ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-indigo-600 hover:bg-indigo-700'
                        } disabled:opacity-50`}
                >
                    {saving ? 'Saving...' : saveSuccess ? <><CheckCircle size={18} /> Saved!</> : <><Save size={18} /> Save Settings</>}
                </button>
            </div>

            <p className="text-sm text-slate-500 mb-6 max-w-3xl leading-relaxed">
                Configure the NTA Marks vs Percentile data. This data is used by the student dashboard and result pages to estimate a student's final JEE percentile and AIR rank based on their mock test scores.
            </p>

            <div className="bg-slate-100/80 backdrop-blur-md border border-slate-200/40 p-1.5 rounded-2xl flex gap-1.5 w-fit mb-8 flex-wrap">
                <button
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'overall' ? 'bg-white text-indigo-650 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                    onClick={() => setActiveTab('overall')}
                >
                    Overall Mappings (Expected vs Marks)
                </button>
                <button
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'shift' ? 'bg-white text-indigo-650 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                    onClick={() => setActiveTab('shift')}
                >
                    Advanced Shift-wise Mappings
                </button>
            </div>

            {/* Overall Tab */}
            {activeTab === 'overall' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="bg-indigo-50 border border-indigo-100/60 p-4 rounded-2xl text-xs font-bold text-indigo-850 mb-6 leading-relaxed">
                        Define broad mark ranges for percentile estimates. Format values exactly as you want them displayed (e.g., "99.0 - 99.5 %ile" or "180 - 210").
                    </div>

                    <div className="overflow-x-auto border border-slate-200/60 rounded-2xl shadow-sm mb-4">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/70 border-b border-slate-250">
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Percentile Range</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Expected Rank (AIR)</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Marks Required (/300)</th>
                                    <th className="px-6 py-4 w-20 text-center"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100">
                                {(config?.overallMappings || []).map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-3">
                                            <input
                                                className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-2 text-sm font-semibold text-slate-805 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                                value={row.percentileRange}
                                                onChange={e => updateOverallRow(idx, 'percentileRange', e.target.value)}
                                                placeholder="99.0 - 99.5 %ile"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-2 text-sm font-semibold text-slate-805 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                                value={row.expectedRankRange}
                                                onChange={e => updateOverallRow(idx, 'expectedRankRange', e.target.value)}
                                                placeholder="6,000 - 12,000"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-2 text-sm font-black text-indigo-705 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                                value={row.marksRequired}
                                                onChange={e => updateOverallRow(idx, 'marksRequired', e.target.value)}
                                                placeholder="180 - 210"
                                            />
                                        </td>
                                        <td className="p-3 text-center">
                                            <button onClick={() => removeOverallRow(idx)} className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2.5 rounded-xl transition-all border border-red-100 inline-flex items-center justify-center shadow-sm">
                                                <Trash size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={addOverallRow} className="mt-2 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-indigo-650 hover:text-indigo-805 bg-indigo-50 hover:bg-indigo-100 px-4 py-2.5 rounded-xl transition-colors border border-indigo-100/60">
                        <Plus size={16} /> Add Range
                    </button>
                </div>
            )}

            {/* Shiftwise Tab */}
            {activeTab === 'shift' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="bg-amber-50 border border-amber-250 p-4 rounded-2xl text-xs font-bold text-amber-900 mb-6 flex items-start gap-3 leading-relaxed">
                        <span className="text-2xl mt-[-2px] shrink-0">⚠️</span>
                        <div>
                            <strong>Shift Normalization Data</strong><br />
                            Enter actual NTA-normalized data. The predictive model will automatically interpolate missing values if a student scores between two defined marks. Do not change the shift header names without developer assistance.
                        </div>
                    </div>

                    <div className="overflow-x-auto border border-slate-200/60 rounded-2xl shadow-sm mb-4">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-900 text-white border-b border-slate-800">
                                    <th className="px-4 py-3 text-[10px] font-black sticky left-0 bg-slate-950 border-r border-slate-800 z-10 text-indigo-400 uppercase tracking-widest">%ile</th>
                                    {availableShifts.map(s => (
                                        <th key={s} className="px-4 py-3 text-[10px] font-black text-slate-350 text-center uppercase tracking-wider">{s}</th>
                                    ))}
                                    <th className="px-4 py-3 w-16 text-center bg-slate-900"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100">
                                {(config?.shiftwiseMappings || []).map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="p-2 sticky left-0 bg-white group-hover:bg-slate-50 border-r border-slate-200/60 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                                            <input
                                                className="w-20 bg-indigo-50/40 border border-indigo-150 rounded-xl py-2 text-center text-sm font-black focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-indigo-900 transition-all"
                                                value={row.percentile}
                                                onChange={e => updateShiftRow(idx, 'percentile', e.target.value)}
                                                placeholder="99"
                                            />
                                        </td>
                                        {availableShifts.map(s => (
                                            <td key={s} className="p-1 min-w-[75px]">
                                                <input
                                                    className="w-full bg-slate-50/20 border border-transparent hover:border-slate-250 focus:border-indigo-500 rounded-xl py-2 text-center text-sm font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                                    value={row[s] || ''}
                                                    onChange={e => updateShiftRow(idx, s, e.target.value)}
                                                    placeholder="-"
                                                />
                                            </td>
                                        ))}
                                        <td className="p-2 text-center">
                                            <button onClick={() => removeShiftRow(idx)} className="text-red-550 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2.5 rounded-xl border border-red-100 transition-all opacity-40 hover:opacity-100 inline-flex items-center justify-center">
                                                <Trash size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <button onClick={addShiftRow} className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-indigo-650 hover:text-indigo-805 bg-indigo-50 hover:bg-indigo-100 px-4 py-2.5 rounded-xl transition-colors border border-indigo-100/60">
                            <Plus size={16} /> Add Percentile Row
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PercentileConfig;
