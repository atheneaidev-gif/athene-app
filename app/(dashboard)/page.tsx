"use client";

import { useUser } from "@clerk/nextjs";
import {
    Activity,
    Bot,
    Database,
    Zap,
    ArrowUpRight,
    FileText,
    Github,
    MessageSquare
} from "lucide-react";
import Link from "next/link";

export default function CommandCenterPage() {
    const { user, isLoaded } = useUser();

    // Placeholder data for the enterprise feel
    const stats = [
        { name: "Active Agents", value: "3", icon: Bot, trend: "+1 this week" },
        { name: "Synced Documents", value: "1,248", icon: Database, trend: "+124 today" },
        { name: "Automations Run", value: "842", icon: Zap, trend: "99.8% success" },
        { name: "System Health", value: "Healthy", icon: Activity, trend: "32ms avg latency" },
    ];

    const recentActivity = [
        { id: 1, title: "Ingested Q3 Financial Deck", type: "Document", source: "Google Drive", time: "12 mins ago", icon: FileText },
        { id: 2, title: "Resolved PR #442 via Auto-Review", type: "Agent Action", source: "GitHub", time: "2 hours ago", icon: Github },
        { id: 3, title: "Drafted response to Enterprise Ticket", type: "Draft", source: "Slack", time: "5 hours ago", icon: MessageSquare },
    ];

    if (!isLoaded) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
                    <div className="h-4 w-24 bg-slate-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">

            {/* Welcome Section */}
            <div>
                <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
                    Welcome back, {user?.firstName || "Commander"}
                </h1>
                <p className="text-slate-500 mt-2">
                    Here is what your Athene AI agents have been up to across your workspace.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="mt-auto">
                                <h3 className="text-3xl font-semibold text-slate-900">{stat.value}</h3>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                                    <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                                        {stat.trend}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Recent Activity Feed */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-900">Agent Activity Ledger</h2>
                        <button className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
                            View all <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {recentActivity.map((activity) => {
                            const Icon = activity.icon;
                            return (
                                <div key={activity.id} className="p-6 hover:bg-slate-50 transition-colors flex items-start gap-4">
                                    <div className="p-2 bg-slate-100 text-slate-600 rounded-md shrink-0">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-900 truncate">{activity.title}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-slate-500">{activity.type}</span>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                            <span className="text-xs text-slate-500">{activity.source}</span>
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-400 shrink-0">{activity.time}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Actions / Status */}
                <div className="space-y-4">
                    <div className="bg-slate-900 text-white rounded-xl p-6 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                        <h3 className="text-lg font-semibold mb-2 relative z-10">Deploy New Agent</h3>
                        <p className="text-slate-400 text-sm mb-6 relative z-10">
                            Configure a custom intelligence agent connected to your Nango data sources.
                        </p>
                        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors relative z-10">
                            Start Configuration
                        </button>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h3 className="text-sm font-semibold text-slate-900 mb-4">Data Sync Status</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Github className="w-4 h-4" /> GitHub
                                </div>
                                <span className="text-xs text-emerald-600 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Live</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Database className="w-4 h-4" /> PostgreSQL
                                </div>
                                <span className="text-xs text-emerald-600 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Live</span>
                            </div>
                        </div>
                        <Link href="/integrations" className="block mt-4 text-sm text-blue-600 font-medium text-center hover:text-blue-700">
                            Manage Connections
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}