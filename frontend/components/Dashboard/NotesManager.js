'use client';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { API_BASE_URL } from '@/lib/config';
import {
    Plus, Trash2, Save, BookOpen, FolderPlus, Upload, X, Search,
    ChevronDown, ChevronRight, Edit2, Eye, FileText, Download,
    ToggleLeft, ToggleRight, Loader2, AlertCircle, Crown, Unlock,
    FolderOpen, MoreVertical, RefreshCw, ExternalLink, Sparkles
} from 'lucide-react';

const FIELDS = ['JEE Main', 'JEE Advanced', 'NEET', 'CAT', 'Board Exam', 'Others'];
const EMOJIS = ['📄', '📝', '📚', '🧪', '🔬', '📐', '🧮', '🧠', '🎯', '📊', '🌡️', '⚛️', '🧬', '🔢', '✏️', '📖', '💡', '🎓'];

export default function NotesManager() {
    const { user } = useAuth();
    const [sections, setSections] = useState([]);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeField, setActiveField] = useState('JEE Main');
    const [activeSubTab, setActiveSubTab] = useState('sections'); // sections | upload | library | preview

    // Section form
    const [showSectionForm, setShowSectionForm] = useState(false);
    const [editingSection, setEditingSection] = useState(null);
    const [sectionForm, setSectionForm] = useState({ title: '', field: 'JEE Main', parentId: '', type: 'free', icon: '📄', description: '', order: 0, price: 499 });

    // Upload
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState([]);
    const [uploadSectionId, setUploadSectionId] = useState('');
    const [uploadType, setUploadType] = useState('free');
    const [uploadDownloadable, setUploadDownloadable] = useState(false);
    const fileInputRef = useRef(null);
    // Two-step upload: staged files waiting for confirmation
    const [stagedUploads, setStagedUploads] = useState([]); // [{...stageData, editTitle, editType, editDownloadable}]

    // Library
    const [searchQuery, setSearchQuery] = useState('');
    const [editingNote, setEditingNote] = useState(null);

    useEffect(() => {
        fetchData();
    }, [user]);

    const getToken = async () => {
        if (!user) return null;
        return await user.getIdToken();
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            if (!token) return;

            const [sectionsRes, notesRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/notes/sections`, { headers: { Authorization: `Bearer ${token}` } }),
                fetch(`${API_BASE_URL}/api/notes/admin/all`, { headers: { Authorization: `Bearer ${token}` } })
            ]);

            if (sectionsRes.ok) setSections(await sectionsRes.json());
            if (notesRes.ok) setNotes(await notesRes.json());
        } catch (err) {
            console.error('Fetch Error:', err);
        } finally {
            setLoading(false);
        }
    };

    // ===== SECTION CRUD =====
    const openSectionForm = (section = null) => {
        if (section) {
            setEditingSection(section);
            setSectionForm({
                title: section.title, field: section.field, parentId: section.parentId || '',
                type: section.type, icon: section.icon || '📄', description: section.description || '', order: section.order || 0,
                price: section.price || 499
            });
        } else {
            setEditingSection(null);
            setSectionForm({ title: '', field: activeField, parentId: '', type: 'free', icon: '📄', description: '', order: 0, price: 499 });
        }
        setShowSectionForm(true);
    };

    const saveSection = async () => {
        const token = await getToken();
        if (!token) return;
        if (!sectionForm.title.trim()) return alert('Title is required');

        try {
            const url = editingSection
                ? `${API_BASE_URL}/api/notes/sections/${editingSection.id}`
                : `${API_BASE_URL}/api/notes/sections`;

            const res = await fetch(url, {
                method: editingSection ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ ...sectionForm, parentId: sectionForm.parentId || null })
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed');
            }

            setShowSectionForm(false);
            fetchData();
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    const deleteSection = async (id) => {
        if (!confirm('Delete this section? This will delete all subsections and their notes permanently. This action cannot be undone.')) return;
        const token = await getToken();
        try {
            const res = await fetch(`${API_BASE_URL}/api/notes/sections/${id}`, {
                method: 'DELETE', headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error);
            }
            fetchData();
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    // ===== TWO-STEP PDF UPLOAD =====
    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        if (!uploadSectionId) return alert('Please select a section first');

        const token = await getToken();
        if (!token) return;

        setUploading(true);
        const progress = files.map((f, i) => ({ name: f.name, status: 'pending', index: i }));
        setUploadProgress([...progress]);

        for (let i = 0; i < files.length; i++) {
            progress[i].status = 'uploading';
            setUploadProgress([...progress]);

            try {
                const formData = new FormData();
                formData.append('pdf', files[i]);
                formData.append('sectionId', uploadSectionId);
                formData.append('field', activeField);

                const res = await fetch(`${API_BASE_URL}/api/notes/upload-stage`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData
                });

                if (!res.ok) throw new Error('Stage upload failed');
                const stageData = await res.json();

                // Add to staged list with editable defaults
                setStagedUploads(prev => [...prev, {
                    ...stageData,
                    editTitle: stageData.suggestedTitle,
                    editType: uploadType,
                    editDownloadable: uploadDownloadable,
                    editPrice: uploadType === 'paid' ? 99 : 0
                }]);

                progress[i].status = 'staged';
            } catch (err) {
                progress[i].status = 'error';
                console.error(`Stage error for ${files[i].name}:`, err);
            }
            setUploadProgress([...progress]);
        }

        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const confirmUpload = async (staged) => {
        const token = await getToken();
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/notes/confirm-upload`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    storagePath: staged.storagePath,
                    fileUrl: staged.fileUrl,
                    fileName: staged.fileName,
                    fileSize: staged.fileSize,
                    sectionId: staged.sectionId,
                    field: staged.field,
                    title: staged.editTitle,
                    type: staged.editType,
                    price: staged.editPrice,
                    isDownloadable: staged.editDownloadable
                })
            });
            if (!res.ok) throw new Error('Confirm failed');
            setStagedUploads(prev => prev.filter(s => s.storagePath !== staged.storagePath));
            setUploadProgress(prev => prev.map(p => p.name === staged.fileName ? { ...p, status: 'done' } : p));
            fetchData();
        } catch (err) {
            alert('Error confirming upload: ' + err.message);
        }
    };

    const discardUpload = async (staged) => {
        const token = await getToken();
        if (!token) return;
        try {
            await fetch(`${API_BASE_URL}/api/notes/discard-upload`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ storagePath: staged.storagePath })
            });
        } catch (err) {
            console.error('Discard error:', err);
        }
        setStagedUploads(prev => prev.filter(s => s.storagePath !== staged.storagePath));
        setUploadProgress(prev => prev.map(p => p.name === staged.fileName ? { ...p, status: 'discarded' } : p));
    };

    // ===== NOTE CRUD =====
    const updateNote = async (noteId, updates) => {
        const token = await getToken();
        try {
            const res = await fetch(`${API_BASE_URL}/api/notes/${noteId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(updates)
            });
            if (!res.ok) throw new Error('Update failed');
            fetchData();
            setEditingNote(null);
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    const deleteNote = async (noteId) => {
        if (!confirm('Delete this note and its PDF file? This cannot be undone.')) return;
        const token = await getToken();
        try {
            const res = await fetch(`${API_BASE_URL}/api/notes/${noteId}`, {
                method: 'DELETE', headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Delete failed');
            fetchData();
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    // ===== HELPERS =====
    const fieldSections = sections.filter(s => s.field === activeField);
    const parentSections = fieldSections.filter(s => !s.parentId);
    const fieldNotes = notes.filter(n => n.field === activeField);
    const filteredNotes = searchQuery
        ? fieldNotes.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()))
        : fieldNotes;

    const formatSize = (bytes) => {
        if (!bytes) return '?';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const getSectionName = (sectionId) => {
        const s = sections.find(sec => sec.id === sectionId);
        return s ? s.title : 'Unknown';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-32">
                <div className="flex flex-col items-center gap-3 bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm">
                    <Loader2 className="text-indigo-600 animate-spin" size={40} />
                    <p className="text-slate-500 font-bold text-sm">Loading Notes Studio...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto pb-24">
            {/* Header Details */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/60 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 p-2">
                        <img src="/logo.png" alt="Apex Logo" className="h-full w-auto object-contain brightness-0 invert" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Notes & Syllabus Studio</h1>
                        <p className="text-sm font-medium text-slate-500 mt-0.5">Upload, categorize, and declare study assets dynamically.</p>
                    </div>
                </div>
                <button 
                    onClick={fetchData} 
                    className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl border border-slate-200 font-bold transition-all text-sm hover:-translate-y-0.5 shadow-sm flex items-center gap-2"
                >
                    <RefreshCw size={16} /> Refresh
                </button>
            </div>

            {/* Field Selector */}
            <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Exam Category</label>
                <div className="flex flex-wrap gap-2">
                    {FIELDS.map(field => (
                        <button
                            key={field}
                            onClick={() => setActiveField(field)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all ${activeField === field
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                                : 'bg-white text-gray-600 border-gray-300 hover:bg-slate-50'
                                }`}
                        >
                            {field}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sub-tabs switchers */}
            <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl max-w-fit border border-slate-200/40">
                {[
                    { key: 'sections', label: '📁 Sections', icon: FolderOpen },
                    { key: 'upload', label: '📤 Upload PDFs', icon: Upload },
                    { key: 'library', label: '📖 Library', icon: BookOpen },
                    { key: 'preview', label: '👁️ Student Preview', icon: Eye },
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveSubTab(tab.key)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${activeSubTab === tab.key
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        <tab.icon size={16} />
                        {tab.label.substring(2)}
                    </button>
                ))}
            </div>

            {/* ============ SECTIONS TAB ============ */}
            {activeSubTab === 'sections' && (
                <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col group transition-all hover:shadow-md">
                    <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-zinc-50/50">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-900 text-white p-2 rounded-xl shadow-md"><FolderOpen size={16} /></div>
                            <div>
                                <h3 className="text-base font-black text-slate-900 tracking-tight">Sections & Folders</h3>
                                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">Manage sub-categories</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => openSectionForm()} 
                            className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-2xl shadow-lg shadow-indigo-500/25 font-bold flex items-center gap-2 hover:shadow-indigo-500/40 transition-all text-sm hover:-translate-y-0.5 border border-indigo-400/50"
                        >
                            <FolderPlus size={16} /> New Section
                        </button>
                    </div>

                    <div className="p-8">
                        {parentSections.length === 0 ? (
                            <div className="text-center py-16 text-slate-400 bg-slate-50/40 rounded-2xl border-2 border-dashed border-slate-200">
                                <FolderOpen size={48} className="mx-auto mb-3 text-slate-300" />
                                <p className="font-bold">No sections for {activeField}</p>
                                <p className="text-sm">Create your first section to start organizing notes</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {parentSections.map(section => {
                                    const subs = fieldSections.filter(s => s.parentId === section.id);
                                    const noteCount = fieldNotes.filter(n => n.sectionId === section.id).length +
                                        subs.reduce((sum, sub) => sum + fieldNotes.filter(n => n.sectionId === sub.id).length, 0);

                                    return (
                                        <div key={section.id} className="border border-slate-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white">
                                            <div className="flex items-center gap-4 px-6 py-4 bg-slate-50 hover:bg-slate-100/70 transition-all">
                                                <span className="text-2xl w-10 h-10 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center shadow-sm">{section.icon}</span>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-slate-800 text-base truncate">{section.title}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${section.type === 'paid'
                                                            ? 'bg-amber-100 text-amber-700 border border-amber-200/55' : 'bg-emerald-100 text-emerald-700 border border-emerald-200/55'}`}>
                                                            {section.type} {section.type === 'paid' && `• ₹${section.price || 499}`}
                                                        </span>
                                                        <span className="text-xs text-slate-500 font-semibold">{noteCount} notes • {subs.length} subsections</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <button onClick={() => openSectionForm(section)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition" title="Edit">
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button onClick={() => { setSectionForm({ ...sectionForm, field: activeField, parentId: section.id }); setShowSectionForm(true); }}
                                                        className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition" title="Add Subsection">
                                                        <Plus size={16} />
                                                    </button>
                                                    <button onClick={() => deleteSection(section.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition" title="Delete">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Subsections */}
                                            {subs.length > 0 && (
                                                <div className="ml-8 border-l border-slate-200 bg-white/50 divide-y divide-slate-100">
                                                    {subs.map(sub => (
                                                        <div key={sub.id} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50 transition-all pl-8 relative before:absolute before:left-0 before:top-1/2 before:w-4 before:h-px before:bg-slate-200">
                                                            <span className="text-lg w-8 h-8 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center shadow-xs">{sub.icon}</span>
                                                            <div className="flex-1 min-w-0">
                                                                <span className="text-sm font-bold text-slate-700 truncate block">{sub.title}</span>
                                                                <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md ${sub.type === 'paid'
                                                                    ? 'bg-amber-50 text-amber-600 border border-amber-100/50' : 'bg-emerald-50 text-emerald-600 border border-emerald-100/50'}`}>
                                                                    {sub.type} {sub.type === 'paid' && `• ₹${sub.price || 499}`}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5 shrink-0">
                                                                <button onClick={() => openSectionForm(sub)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition"><Edit2 size={14} /></button>
                                                                <button onClick={() => deleteSection(sub.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"><Trash2 size={14} /></button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ============ UPLOAD TAB ============ */}
            {activeSubTab === 'upload' && (
                <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col group transition-all hover:shadow-md">
                    <div className="px-8 py-6 border-b border-slate-100 bg-zinc-50/50 flex items-center gap-3">
                        <div className="bg-slate-900 text-white p-2 rounded-xl shadow-md"><Upload size={16} /></div>
                        <div>
                            <h3 className="text-base font-black text-slate-900 tracking-tight">Upload PDFs to {activeField}</h3>
                            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">Drag-and-drop or select files</p>
                        </div>
                    </div>

                    <div className="p-8 space-y-6">
                        {/* Config */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Target Section *</label>
                                <select
                                    value={uploadSectionId}
                                    onChange={e => setUploadSectionId(e.target.value)}
                                    className="block w-full bg-slate-50 border border-slate-200/60 rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Select Section...</option>
                                    {fieldSections.map(s => (
                                        <option key={s.id} value={s.id}>
                                            {s.parentId ? '   ↳ ' : ''}{s.title} ({s.type})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Access Type</label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setUploadType('free')}
                                        className={`flex-1 py-3.5 rounded-2xl font-bold text-sm transition-all border ${uploadType === 'free' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
                                    >
                                        ✅ Free
                                    </button>
                                    <button
                                        onClick={() => setUploadType('paid')}
                                        className={`flex-1 py-3.5 rounded-2xl font-bold text-sm transition-all border ${uploadType === 'paid' ? 'bg-amber-50 text-amber-700 border-amber-300 shadow-sm' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
                                    >
                                        👑 Paid
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Allow PDF Download?</label>
                                <button
                                    onClick={() => setUploadDownloadable(!uploadDownloadable)}
                                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all border ${uploadDownloadable ? 'bg-indigo-50 text-indigo-700 border-indigo-300' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
                                >
                                    {uploadDownloadable ? <><ToggleRight size={18} /> Enabled</> : <><ToggleLeft size={18} /> Disabled</>}
                                </button>
                            </div>
                        </div>

                        {/* Drop Zone */}
                        <div className="border-2 border-dashed border-slate-300 rounded-3xl p-8 sm:p-12 text-center hover:border-indigo-400 hover:bg-indigo-50/20 transition-all group cursor-pointer"
                            onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('border-indigo-400', 'bg-indigo-50/30'); }}
                            onDragLeave={e => { e.currentTarget.classList.remove('border-indigo-400', 'bg-indigo-50/30'); }}
                            onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('border-indigo-400', 'bg-indigo-50/30'); const dt = e.dataTransfer; if (dt.files.length) handleFileUpload({ target: { files: dt.files } }); }}
                        >
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-all border border-indigo-100">
                                <Upload size={28} className="text-indigo-600" />
                            </div>
                            <p className="font-extrabold text-slate-800 text-lg mb-1">Drag & Drop notes PDF here</p>
                            <p className="text-sm font-medium text-slate-400 mb-6">or click to browse local files • Maximum file size 50MB</p>
                            <label className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm cursor-pointer transition-all shadow-md shadow-indigo-500/20 hover:-translate-y-0.5 border border-indigo-400/50">
                                <Upload size={16} /> Choose PDF Files
                                <input ref={fileInputRef} type="file" accept=".pdf" multiple onChange={handleFileUpload} className="hidden" />
                            </label>
                        </div>

                        {/* Upload Progress */}
                        {uploadProgress.length > 0 && (
                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-150 space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Upload Queue</p>
                                {uploadProgress.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 px-4 py-2.5 bg-white border border-slate-100 rounded-xl shadow-xs">
                                        <FileText size={16} className={
                                            item.status === 'error' ? 'text-red-500' :
                                            item.status === 'staged' ? 'text-indigo-500' :
                                            item.status === 'done' ? 'text-emerald-500' :
                                            item.status === 'discarded' ? 'text-gray-400' :
                                            'text-gray-400'
                                        } />
                                        <span className="text-sm font-bold text-slate-700 flex-1 truncate">{item.name}</span>
                                        {item.status === 'uploading' && <Loader2 size={16} className="text-indigo-600 animate-spin" />}
                                        {item.status === 'staged' && <span className="text-[10px] font-black text-indigo-600 uppercase bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100/50">⏳ Awaiting Confirmation</span>}
                                        {item.status === 'done' && <span className="text-[10px] font-black text-emerald-600 uppercase bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100/50">✓ Saved</span>}
                                        {item.status === 'discarded' && <span className="text-[10px] font-black text-gray-500 uppercase bg-gray-100 px-2.5 py-0.5 rounded-md">✕ Discarded</span>}
                                        {item.status === 'error' && <span className="text-[10px] font-black text-red-600 uppercase bg-red-50 px-2.5 py-0.5 rounded-md border border-red-100/50">✗ Error</span>}
                                        {item.status === 'pending' && <span className="text-[10px] text-gray-400">Waiting...</span>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ============ LIBRARY TAB ============ */}
            {activeSubTab === 'library' && (
                <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col group transition-all hover:shadow-md">
                    <div className="px-8 py-6 border-b border-slate-100 bg-zinc-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-900 text-white p-2 rounded-xl shadow-md"><BookOpen size={16} /></div>
                            <div>
                                <h3 className="text-base font-black text-slate-900 tracking-tight">{activeField} Library</h3>
                                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">{filteredNotes.length} resources uploaded</p>
                            </div>
                        </div>
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search library notes..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="block w-full bg-white border border-slate-200/80 rounded-2xl pl-11 pr-4 py-2.5 text-sm font-bold text-slate-800 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:font-medium placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    <div className="p-8">
                        {filteredNotes.length === 0 ? (
                            <div className="text-center py-16 text-slate-400 bg-slate-50/40 rounded-2xl border-2 border-dashed border-slate-200">
                                <FileText size={48} className="mx-auto mb-3 text-slate-300" />
                                <p className="font-bold">{searchQuery ? 'No matching notes' : 'No notes uploaded yet'}</p>
                                <p className="text-sm">{searchQuery ? 'Try different keywords' : 'Go to the Upload tab to add PDFs'}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-3">
                                {filteredNotes.map(note => (
                                    <div key={note.id} className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all group/item bg-white shadow-xs">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center shrink-0 shadow-md shadow-red-500/10">
                                            <FileText className="text-white" size={20} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            {editingNote === note.id ? (
                                                <div className="flex flex-col gap-2 w-full max-w-md bg-slate-50 p-3 rounded-xl border border-slate-150">
                                                    <input
                                                        type="text"
                                                        defaultValue={note.title}
                                                        onBlur={e => updateNote(note.id, { title: e.target.value })}
                                                        onKeyDown={e => { if (e.key === 'Enter') e.target.blur(); }}
                                                        autoFocus
                                                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm font-bold text-slate-800 outline-none focus:border-indigo-400"
                                                    />
                                                    {note.type === 'paid' && (
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-[10px] font-black text-slate-400 uppercase">Price: ₹</span>
                                                            <input
                                                                type="number"
                                                                defaultValue={note.price || 99}
                                                                onBlur={e => updateNote(note.id, { price: parseInt(e.target.value) || 0 })}
                                                                onKeyDown={e => { if (e.key === 'Enter') e.target.blur(); }}
                                                                className="w-24 bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-black text-amber-700 focus:border-amber-400"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">{note.title}</h4>
                                            )}
                                            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                                <span className="text-xs text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded">{getSectionName(note.sectionId)}</span>
                                                <span className="text-[10px] text-slate-300">•</span>
                                                <span className="text-xs text-slate-400 font-medium">{formatSize(note.fileSize)}</span>
                                                <span className="text-[10px] text-slate-300">•</span>
                                                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${note.type === 'paid' ? 'bg-amber-50 text-amber-600 border border-amber-100/50' : 'bg-emerald-50 text-emerald-600 border border-emerald-100/50'}`}>
                                                    {note.type} {note.type === 'paid' && `• ₹${note.price || 99}`}
                                                </span>
                                                {note.isDownloadable && <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100/40">📥 Download Enabled</span>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 shrink-0 transition-all opacity-80 md:opacity-0 md:group-hover/item:opacity-100">
                                            <button onClick={() => setEditingNote(note.id)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition" title="Edit Title">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => updateNote(note.id, { isDownloadable: !note.isDownloadable })}
                                                className={`p-2 transition-all rounded-lg ${note.isDownloadable ? 'text-indigo-600 hover:bg-indigo-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`} title="Toggle Download">
                                                <Download size={16} />
                                            </button>
                                            <button onClick={() => {
                                                if (note.type === 'free') {
                                                    const p = prompt("Enter Unlock Price (₹):", note.price || 99);
                                                    if (p !== null) updateNote(note.id, { type: 'paid', price: parseInt(p) || 99 });
                                                } else {
                                                    updateNote(note.id, { type: 'free' });
                                                }
                                            }}
                                                className="p-2 text-slate-400 hover:text-amber-600 hover:bg-slate-100 rounded-lg transition" title="Toggle Free/Paid">
                                                {note.type === 'paid' ? <Crown size={16} className="text-amber-500" /> : <Unlock size={16} />}
                                            </button>
                                            <a href={note.fileUrl} target="_blank" rel="noopener noreferrer"
                                                className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition flex items-center justify-center" title="Open PDF">
                                                <ExternalLink size={16} />
                                            </a>
                                            <button onClick={() => deleteNote(note.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ============ PREVIEW TAB ============ */}
            {activeSubTab === 'preview' && (
                <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col group transition-all hover:shadow-md">
                    <div className="px-8 py-6 border-b border-slate-100 bg-zinc-50/50 flex items-center gap-3">
                        <div className="bg-indigo-50 text-indigo-600 p-2 rounded-xl border border-indigo-100/50"><Eye size={16} /></div>
                        <div>
                            <h3 className="text-base font-black text-slate-900 tracking-tight">Student Dashboard Preview</h3>
                            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">How students under {activeField} view content</p>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 border-dashed">
                            {parentSections.length === 0 ? (
                                <div className="text-center py-12 text-gray-400">
                                    <BookOpen size={40} className="mx-auto mb-2 text-gray-300" />
                                    <p className="font-bold">No sections to preview</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {parentSections.map(section => {
                                        const subs = fieldSections.filter(s => s.parentId === section.id);
                                        const sectionNotes = fieldNotes.filter(n => n.sectionId === section.id);

                                        return (
                                            <div key={section.id} className="rounded-2xl border border-slate-200/60 bg-white overflow-hidden shadow-xs">
                                                <div className="flex items-center gap-3 px-6 py-4 bg-slate-50 border-b border-slate-100">
                                                    <span className="text-xl w-8 h-8 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center shadow-xs">{section.icon}</span>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-slate-800 text-sm sm:text-base">{section.title}</h4>
                                                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${section.type === 'paid' ? 'bg-amber-100 text-amber-700 border border-amber-200/50' : 'bg-emerald-100 text-emerald-700 border border-emerald-200/50'}`}>{section.type === 'paid' ? '👑 Premium' : '✅ Free'}</span>
                                                    </div>
                                                </div>
                                                <div className="p-4 space-y-2">
                                                    {sectionNotes.map(n => (
                                                        <div key={n.id} className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-50 hover:bg-slate-50/50 text-sm font-semibold text-slate-700 transition-all">
                                                            <FileText size={16} className="text-red-500" />
                                                            <span className="truncate flex-1">{n.title}</span>
                                                            <span className="text-xs text-slate-400 font-bold bg-slate-100/60 px-2 py-0.5 rounded ml-auto">{formatSize(n.fileSize)}</span>
                                                        </div>
                                                    ))}
                                                    {subs.map(sub => (
                                                        <div key={sub.id} className="ml-4 p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                                                            <div className="flex items-center gap-2 text-sm font-extrabold text-slate-700 mb-2">
                                                                <span className="w-6 h-6 rounded-md bg-white border flex items-center justify-center text-xs">{sub.icon}</span> 
                                                                <span className="flex-1">{sub.title}</span>
                                                                <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md ${sub.type === 'paid' ? 'bg-amber-50 text-amber-600 border border-amber-100/40' : 'bg-emerald-50 text-emerald-600 border border-emerald-100/40'}`}>{sub.type}</span>
                                                            </div>
                                                            <div className="space-y-1.5 pl-2">
                                                                {fieldNotes.filter(n => n.sectionId === sub.id).map(n => (
                                                                    <div key={n.id} className="flex items-center gap-2.5 py-2 px-3 rounded-lg bg-white border border-slate-100 text-xs font-semibold text-slate-600 shadow-2xs">
                                                                        <FileText size={14} className="text-red-400 shrink-0" />
                                                                        <span className="truncate flex-1">{n.title}</span>
                                                                        <span className="text-[10px] text-slate-400 font-bold ml-auto">{formatSize(n.fileSize)}</span>
                                                                    </div>
                                                                ))}
                                                                {fieldNotes.filter(n => n.sectionId === sub.id).length === 0 && (
                                                                    <p className="text-xs text-slate-400 italic pl-1">No notes in this subsection</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {sectionNotes.length === 0 && subs.length === 0 && (
                                                        <p className="text-xs text-slate-400 italic py-2 text-center">No notes in this section yet</p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ============ STAGED UPLOAD CONFIRMATION MODAL ============ */}
            {stagedUploads.length > 0 && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200 border border-slate-200/50">
                        {/* Header */}
                        <div className="flex items-center gap-4 px-8 py-6 bg-slate-900 text-white border-b border-slate-800">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <Save size={18} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black tracking-tight">Confirm PDF Upload{stagedUploads.length > 1 ? `s (${stagedUploads.length})` : ''}</h3>
                                <p className="text-slate-400 text-xs font-semibold mt-0.5">Review and authorize notes indexing</p>
                            </div>
                        </div>

                        {/* Files list */}
                        <div className="overflow-y-auto flex-1 divide-y divide-slate-100 p-6 space-y-6">
                            {stagedUploads.map((staged, idx) => (
                                <div key={staged.storagePath} className="bg-slate-50 border border-slate-150 p-5 rounded-2xl space-y-4">
                                    {/* File info row */}
                                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-xs">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center shrink-0 shadow-sm">
                                            <FileText className="text-white" size={20} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-slate-400 font-bold truncate">{staged.fileName}</p>
                                            <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">{staged.fileSize ? (staged.fileSize / (1024 * 1024)).toFixed(2) + ' MB' : ''}</p>
                                        </div>
                                        <a href={staged.fileUrl} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-xs font-extrabold text-indigo-600 hover:text-indigo-800 bg-indigo-50 border border-indigo-100/40 px-3.5 py-2 rounded-xl transition-all">
                                            <ExternalLink size={12} /> Preview
                                        </a>
                                    </div>

                                    {/* Editable title */}
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Note Title *</label>
                                        <input
                                            type="text"
                                            value={staged.editTitle}
                                            onChange={e => setStagedUploads(prev => prev.map((s, i) => i === idx ? { ...s, editTitle: e.target.value } : s))}
                                            className="block w-full bg-white border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                            placeholder="Enter note title..."
                                        />
                                    </div>

                                    {/* Type + Downloadable */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Access Type</label>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setStagedUploads(prev => prev.map((s, i) => i === idx ? { ...s, editType: 'free' } : s))}
                                                    className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all border ${staged.editType === 'free' ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm' : 'bg-white text-slate-400 border-slate-200'}`}
                                                >
                                                    ✅ Free
                                                </button>
                                                <button
                                                    onClick={() => setStagedUploads(prev => prev.map((s, i) => i === idx ? { ...s, editType: 'paid' } : s))}
                                                    className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all border ${staged.editType === 'paid' ? 'bg-amber-50 text-amber-700 border-amber-300 shadow-sm' : 'bg-white text-slate-400 border-slate-200'}`}
                                                >
                                                    👑 Paid
                                                </button>
                                            </div>
                                        </div>

                                        {staged.editType === 'paid' && (
                                            <div className="animate-in slide-in-from-top-2 duration-200">
                                                <label className="block text-[10px] font-black text-amber-700 uppercase tracking-widest mb-1.5 ml-1">Unlock Price (₹) *</label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 font-bold text-sm">₹</span>
                                                    <input
                                                        type="number"
                                                        value={staged.editPrice || 99}
                                                        onChange={e => setStagedUploads(prev => prev.map((s, i) => i === idx ? { ...s, editPrice: parseInt(e.target.value) || 0 } : s))}
                                                        className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-amber-350 focus:border-amber-500 outline-none font-bold text-amber-900 bg-white"
                                                        placeholder="99"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            onClick={() => confirmUpload(staged)}
                                            disabled={!staged.editTitle.trim()}
                                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-indigo-500/20 active:scale-95 disabled:opacity-40"
                                        >
                                            <Save size={16} /> Save to Library
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm('Discard this upload? The PDF will be deleted from storage permanently.')) {
                                                    discardUpload(staged);
                                                }
                                            }}
                                            className="flex items-center justify-center gap-2 px-5 py-3 bg-rose-50 text-rose-600 rounded-xl font-bold text-sm hover:bg-rose-100 border border-rose-200 transition-all active:scale-95"
                                        >
                                            <Trash2 size={16} /> Discard
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ============ SECTION FORM MODAL ============ */}
            {showSectionForm && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[60] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50 animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                            <h3 className="text-base sm:text-lg font-black text-slate-800">
                                {editingSection ? 'Edit Section Settings' : (sectionForm.parentId ? 'New Subsection Folder' : 'New Top-level Section')}
                            </h3>
                            <button 
                                onClick={() => setShowSectionForm(false)} 
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-150 rounded-xl transition"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-6 space-y-5">
                            {/* Emoji selector */}
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Icon / Avatar</label>
                                <div className="flex flex-wrap gap-1.5 bg-slate-50 p-2.5 rounded-2xl border border-slate-150 max-h-32 overflow-y-auto">
                                    {EMOJIS.map(emoji => (
                                        <button 
                                            key={emoji} 
                                            onClick={() => setSectionForm({ ...sectionForm, icon: emoji })}
                                            className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all ${sectionForm.icon === emoji ? 'bg-indigo-600 text-white shadow-md' : 'bg-white hover:bg-slate-100 border border-slate-200/60'}`}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Title *</label>
                                <input
                                    type="text" 
                                    value={sectionForm.title}
                                    onChange={e => setSectionForm({ ...sectionForm, title: e.target.value })}
                                    placeholder="e.g. Organic Chemistry" 
                                    className="block w-full bg-slate-50 border border-slate-200/60 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Description</label>
                                <textarea
                                    value={sectionForm.description}
                                    onChange={e => setSectionForm({ ...sectionForm, description: e.target.value })}
                                    placeholder="Optional description detailing contents..." 
                                    rows={2}
                                    className="block w-full bg-slate-50 border border-slate-200/60 rounded-2xl px-4 py-3 text-sm font-mono text-slate-700 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Access Type</label>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => setSectionForm({ ...sectionForm, type: 'free' })}
                                            className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${sectionForm.type === 'free' ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
                                        >
                                            Free
                                        </button>
                                        <button 
                                            onClick={() => setSectionForm({ ...sectionForm, type: 'paid' })}
                                            className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${sectionForm.type === 'paid' ? 'bg-amber-50 text-amber-700 border-amber-300 shadow-sm' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
                                        >
                                            Paid
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Sort Order</label>
                                    <input 
                                        type="number" 
                                        value={sectionForm.order}
                                        onChange={e => setSectionForm({ ...sectionForm, order: parseInt(e.target.value) || 0 })}
                                        className="block w-full bg-slate-50 border border-slate-200/60 rounded-2xl px-4 py-2 text-sm font-bold text-slate-800 focus:bg-white outline-none"
                                    />
                                </div>
                            </div>

                            {sectionForm.type === 'paid' && (
                                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 animate-in slide-in-from-top-2 duration-200">
                                    <label className="block text-[10px] font-black text-amber-700 uppercase tracking-widest mb-1.5 ml-1">Section Unlock Price (₹)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 font-bold">₹</span>
                                        <input
                                            type="number"
                                            value={sectionForm.price}
                                            onChange={e => setSectionForm({ ...sectionForm, price: parseInt(e.target.value) || 0 })}
                                            className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-amber-300 focus:border-amber-500 outline-none font-bold text-amber-900 bg-white"
                                            placeholder="499"
                                        />
                                    </div>
                                    <p className="text-[10px] text-amber-600 mt-2 font-medium">
                                        Students will unlock ALL notes in this section when purchasing.
                                    </p>
                                </div>
                            )}

                            {!editingSection && !sectionForm.parentId && (
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Parent Section (optional)</label>
                                    <select 
                                        value={sectionForm.parentId || ''}
                                        onChange={e => setSectionForm({ ...sectionForm, parentId: e.target.value })}
                                        className="block w-full bg-slate-50 border border-slate-200/60 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 focus:bg-white outline-none cursor-pointer"
                                    >
                                        <option value="">None (Top-level section)</option>
                                        {parentSections.map(s => <option key={s.id} value={s.id}>{s.icon} {s.title}</option>)}
                                    </select>
                                </div>
                            )}
                        </div>
                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                            <button 
                                onClick={() => setShowSectionForm(false)} 
                                className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all hover:-translate-y-0.5 shadow-sm"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={saveSection} 
                                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20 hover:-translate-y-0.5 border border-indigo-400/50"
                            >
                                {editingSection ? 'Update' : 'Create'} Section
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
