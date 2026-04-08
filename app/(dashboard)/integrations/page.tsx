"use client";

import {
    Blocks,
    Github,
    HardDrive,
    FileText,
    MessageSquare,
    Briefcase,
    CheckCircle2,
    RefreshCw,
    MoreVertical,
    AlertCircle,
    Search
} from "lucide-react";

export default function IntegrationsPage() {
    // Mock data representing apps currently connected via Nango
    const connectedApps = [
        {
            id: "github-app",
            name: "GitHub",
            icon: Github,
            status: "Live",
            lastSync: "2 mins ago",
            workspace: "acme-corp-engineering",
            statusColor: "text-emerald-600 bg-emerald-50 border-emerald-200"
        },
        {
            id: "google-drive",
            name: "Google Drive",
            icon: HardDrive,
            status: "Syncing...",
            lastSync: "In progress",
            workspace: "admin@acme.corp",
            statusColor: "text-blue-600 bg-blue-50 border-blue-200"
        },
        {
            id: "slack",
            name: "Slack",
            icon: MessageSquare,
            status: "Needs Re-auth",
            lastSync: "3 days ago",
            workspace: "Acme Workspace",
            statusColor: "text-amber-600 bg-amber-50 border-amber-200"
        }
    ];

    // Mock data for apps available to connect
    const availableApps = [
        { id: "notion", name: "Notion", icon: FileText, desc: "Sync workspace pages and wikis" },
        { id: "salesforce", name: "Salesforce", icon: Briefcase, desc: "Sync CRM accounts and opportunities" },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2">
                        Integrations
                        <Blocks className="w-5 h-5 text-blue-600" />
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage secure data connections between Athene AI and your enterprise tools.
                    </p>
                </div>
            </div>

            {/* Active Connections Section */}
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Active Connections</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {connectedApps.map((app) => {
                        const Icon = app.icon;
                        return (
                            <div key={app.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col relative group hover:border-blue-300 transition-colors">

                                {/* Status Badge */}
                                <div className="absolute top-5 right-5 flex items-center gap-2">
                                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 ${app.statusColor}`}>
                                        {app.status === 'Live' && <CheckCircle2 className="w-3 h-3" />}
                                        {app.status === 'Syncing...' && <RefreshCw className="w-3 h-3 animate-spin" />}
                                        {app.status === 'Needs Re-auth' && <AlertCircle className="w-3 h-3" />}
                                        {app.status}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mb-4 mt-1">
                                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 shadow-sm">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-slate-900">{app.name}</h3>
                                        <p className="text-xs text-slate-500 truncate max-w-[150px]">{app.workspace}</p>
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                                    <span className="text-slate-500">
                                        Last sync: <span className="font-medium text-slate-700">{app.lastSync}</span>
                                    </span>
                                    <button className="text-slate-400 hover:text-slate-900 transition-colors">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <hr className="border-slate-100" />

            {/* App Directory Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">App Directory</h2>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search apps..."
                            className="pl-8 pr-4 py-1.5 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
                    {availableApps.map((app) => {
                        const Icon = app.icon;
                        return (
                            <div key={app.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-900">{app.name}</h3>
                                        <p className="text-xs text-slate-500">{app.desc}</p>
                                    </div>
                                </div>
                                <button
                                    // onClick={() => nango.auth(app.id, '<PROVIDER-CONFIG-KEY>')} -> How we will wire this up later
                                    className="px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg transition-colors shadow-sm"
                                >
                                    Connect
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}