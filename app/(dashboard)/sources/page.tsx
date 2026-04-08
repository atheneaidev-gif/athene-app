"use client";

import {
    Database,
    UploadCloud,
    FileText,
    CheckCircle2,
    Clock,
    Search,
    HardDrive,
    Github,
    Trash2,
    RefreshCw,
    AlertCircle
} from "lucide-react";
import { useState } from "react";

export default function DataSourcesPage() {
    const [isUploading, setIsUploading] = useState(false);

    // Mock data representing the PostgreSQL Vector DB contents
    const sources = [
        {
            id: "1",
            name: "Q3_Financial_Deck.pdf",
            type: "PDF",
            source: "Google Drive",
            sourceIcon: HardDrive,
            status: "Indexed",
            vectors: "842",
            date: "2 hrs ago"
        },
        {
            id: "2",
            name: "athene-backend-api (main)",
            type: "Repository",
            source: "GitHub",
            sourceIcon: Github,
            status: "Indexing...",
            vectors: "12,405",
            date: "Syncing now"
        },
        {
            id: "3",
            name: "Employee_Handbook_2026.pdf",
            type: "PDF",
            source: "Manual Upload",
            sourceIcon: UploadCloud,
            status: "Indexed",
            vectors: "315",
            date: "1 day ago"
        },
        {
            id: "4",
            name: "Q2_Sales_Scripts.docx",
            type: "Document",
            source: "Google Drive",
            sourceIcon: HardDrive,
            status: "Failed",
            vectors: "0",
            date: "3 days ago"
        },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2">
                        Knowledge Base
                        <Database className="w-5 h-5 text-indigo-600" />
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage your vector database, monitor sync status, and upload custom files.
                    </p>
                </div>
                <button
                    onClick={() => setIsUploading(true)}
                    className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                    <UploadCloud className="w-4 h-4" />
                    Upload Files
                </button>
            </div>

            {/* Storage Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                    <p className="text-sm font-medium text-slate-500 mb-1">Total Vector Storage</p>
                    <h3 className="text-2xl font-semibold text-slate-900">13,562 <span className="text-sm font-normal text-slate-500">embeddings</span></h3>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                    <p className="text-sm font-medium text-slate-500 mb-1">Indexed Documents</p>
                    <h3 className="text-2xl font-semibold text-slate-900">1,248 <span className="text-sm font-normal text-slate-500">files</span></h3>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center border-l-4 border-l-emerald-500">
                    <p className="text-sm font-medium text-slate-500 mb-1">Database Health</p>
                    <h3 className="text-xl font-semibold text-emerald-700 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" /> Optimal (12ms latency)
                    </h3>
                </div>
            </div>

            {/* Main Table Area */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">

                {/* Toolbar */}
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search embedded files..."
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <button className="px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm flex items-center gap-2">
                            <RefreshCw className="w-4 h-4" /> Sync Now
                        </button>
                    </div>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <div className="col-span-12 sm:col-span-5">Document Name</div>
                    <div className="hidden sm:block sm:col-span-2">Origin</div>
                    <div className="hidden sm:block sm:col-span-2">Vector Chunks</div>
                    <div className="col-span-12 sm:col-span-2">Status</div>
                    <div className="hidden sm:block sm:col-span-1 text-right">Action</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-slate-100">
                    {sources.map((source) => {
                        const Icon = source.sourceIcon;
                        return (
                            <div key={source.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50/50 transition-colors group">

                                {/* Document Info */}
                                <div className="col-span-12 sm:col-span-5 flex items-center gap-3">
                                    <div className="p-2 bg-slate-100 text-slate-600 rounded-lg shrink-0">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-semibold text-slate-900 truncate pr-4">{source.name}</h3>
                                        <p className="text-xs text-slate-500 mt-0.5">{source.type} • Added {source.date}</p>
                                    </div>
                                </div>

                                {/* Origin */}
                                <div className="hidden sm:flex col-span-2 items-center gap-2 text-sm text-slate-600">
                                    <Icon className="w-4 h-4 text-slate-400" />
                                    <span className="truncate">{source.source}</span>
                                </div>

                                {/* Vectors */}
                                <div className="hidden sm:block col-span-2 text-sm text-slate-600 font-medium">
                                    {source.vectors}
                                </div>

                                {/* Status */}
                                <div className="col-span-12 sm:col-span-2">
                                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${source.status === 'Indexed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                            source.status === 'Indexing...' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                'bg-red-50 text-red-700 border-red-200'
                                        }`}>
                                        {source.status === 'Indexed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                                        {source.status === 'Indexing...' && <Clock className="w-3.5 h-3.5 animate-pulse" />}
                                        {source.status === 'Failed' && <AlertCircle className="w-3.5 h-3.5" />}
                                        {source.status}
                                    </div>
                                </div>

                                {/* Action */}
                                <div className="hidden sm:flex col-span-1 justify-end">
                                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}