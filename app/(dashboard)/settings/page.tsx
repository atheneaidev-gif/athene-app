"use client";

import {
    Settings,
    Building,
    CreditCard,
    Key,
    Trash2,
    ExternalLink,
    ShieldAlert
} from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">

            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2">
                    Workspace Settings
                    <Settings className="w-5 h-5 text-slate-500" />
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Manage your organization profile, billing, and developer keys.
                </p>
            </div>

            <div className="space-y-6">

                {/* Workspace Profile */}
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                        <div className="p-1.5 bg-blue-100 text-blue-700 rounded-md shrink-0">
                            <Building className="w-4 h-4" />
                        </div>
                        <h2 className="text-base font-semibold text-slate-900">Workspace Profile</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="max-w-md">
                            <label className="block text-sm font-medium text-slate-900 mb-1.5">Company Name</label>
                            <input
                                type="text"
                                defaultValue="Acme Corp"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                        <div className="max-w-md">
                            <label className="block text-sm font-medium text-slate-900 mb-1.5">Workspace URL</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm">
                                    athene.ai/
                                </span>
                                <input
                                    type="text"
                                    defaultValue="acme-corp"
                                    className="flex-1 bg-white border border-slate-200 rounded-none rounded-r-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                            Save Changes
                        </button>
                    </div>
                </section>

                {/* Subscription & Billing */}
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                        <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-md shrink-0">
                            <CreditCard className="w-4 h-4" />
                        </div>
                        <h2 className="text-base font-semibold text-slate-900">Subscription & Billing</h2>
                    </div>
                    <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-semibold text-slate-900">Enterprise Plan</h3>
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">Active</span>
                            </div>
                            <p className="text-sm text-slate-500">
                                You are currently billed $499/month. Next invoice on Oct 1, 2026.
                            </p>
                        </div>
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg transition-colors shadow-sm whitespace-nowrap">
                            Manage in Stripe <ExternalLink className="w-4 h-4" />
                        </button>
                    </div>
                </section>

                {/* Developer API Keys */}
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-purple-100 text-purple-700 rounded-md shrink-0">
                                <Key className="w-4 h-4" />
                            </div>
                            <h2 className="text-base font-semibold text-slate-900">Developer API Keys</h2>
                        </div>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Generate New Key</button>
                    </div>
                    <div className="p-6">
                        <p className="text-sm text-slate-500 mb-4">
                            Use these keys to authenticate API requests to your Athene AI workspace from your internal tools.
                        </p>
                        <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                            <div>
                                <p className="text-sm font-medium text-slate-900">Production Key</p>
                                <p className="text-xs text-slate-500 font-mono mt-0.5">ath_live_***************************</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-medium text-slate-600 hover:bg-slate-50">Revoke</button>
                                <button className="px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-medium text-slate-600 hover:bg-slate-50">Copy</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Danger Zone */}
                <section className="border border-red-200 rounded-xl overflow-hidden bg-white">
                    <div className="px-6 py-4 border-b border-red-100 bg-red-50/30 flex items-center gap-3">
                        <ShieldAlert className="w-4 h-4 text-red-600" />
                        <h2 className="text-base font-semibold text-red-900">Danger Zone</h2>
                    </div>
                    <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 mb-1">Delete Workspace</h3>
                            <p className="text-sm text-slate-500 max-w-xl">
                                Permanently delete this workspace, all associated vector data, and agent configurations. This action cannot be undone.
                            </p>
                        </div>
                        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-sm font-medium rounded-lg transition-colors whitespace-nowrap">
                            <Trash2 className="w-4 h-4" />
                            Delete Workspace
                        </button>
                    </div>
                </section>

            </div>
        </div>
    );
}