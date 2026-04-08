"use client";

import {
    ShieldCheck,
    Users,
    Plus,
    MoreVertical,
    Bot,
    Search,
    Lock
} from "lucide-react";
import Link from "next/link"; // NEW: Imported Link

export default function TeamsPage() {
    // Mock data for the enterprise MVP
    const teams = [
        {
            id: "1",
            name: "Engineering",
            description: "Product development, QA, and DevOps.",
            memberCount: 14,
            agents: ["Engineering Lead", "Docs Search"],
            color: "bg-blue-50 text-blue-700 border-blue-200",
        },
        {
            id: "2",
            name: "Sales & GTM",
            description: "Account executives and outbound sales.",
            memberCount: 8,
            agents: ["Revenue Strategist", "Meeting Summarizer"],
            color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        },
        {
            id: "3",
            name: "Customer Support",
            description: "Frontline support and success managers.",
            memberCount: 12,
            agents: ["Escalation Manager", "Docs Search"],
            color: "bg-purple-50 text-purple-700 border-purple-200",
        },
        {
            id: "4",
            name: "Leadership",
            description: "C-Suite and VP-level executives.",
            memberCount: 5,
            agents: ["Engineering Lead", "Revenue Strategist", "Financial Analyst"],
            color: "bg-amber-50 text-amber-700 border-amber-200",
        }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2">
                        Teams & Access
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage departments, user seating, and AI agent permissions.
                    </p>
                </div>

                {/* FIXED: Changed button to Link and added href */}
                <Link
                    href="/teams/new"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Create New Team
                </Link>
            </div>

            {/* Toolbar (Search & Filter) */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search teams or members..."
                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>
            </div>

            {/* Teams List (Enterprise Table-Style Layout) */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <div className="col-span-12 sm:col-span-4">Team Department</div>
                    <div className="col-span-12 sm:col-span-2">Members</div>
                    <div className="col-span-12 sm:col-span-5">Allowed Agents (Access)</div>
                    <div className="hidden sm:block sm:col-span-1 text-right">Actions</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-slate-100">
                    {teams.map((team) => (
                        <div key={team.id} className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-slate-50/50 transition-colors group">

                            {/* Team Info */}
                            <div className="col-span-12 sm:col-span-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center font-bold text-lg shrink-0 ${team.color}`}>
                                        {team.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-900">{team.name}</h3>
                                        <p className="text-xs text-slate-500 mt-0.5">{team.description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Members */}
                            <div className="col-span-12 sm:col-span-2 flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white"></div>
                                    <div className="w-7 h-7 rounded-full bg-slate-300 border-2 border-white"></div>
                                    <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-white flex items-center justify-center text-[10px] text-white font-medium">
                                        +{team.memberCount - 2}
                                    </div>
                                </div>
                                <span className="text-xs text-slate-500 hidden lg:inline-block">users</span>
                            </div>

                            {/* Allowed Agents */}
                            <div className="col-span-12 sm:col-span-5 flex flex-wrap gap-2">
                                {team.agents.map((agent, i) => (
                                    <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-700 shadow-sm">
                                        <Bot className="w-3 h-3 text-blue-600" />
                                        {agent}
                                    </div>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="hidden sm:flex col-span-1 justify-end">
                                <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors opacity-0 group-hover:opacity-100">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            {/* Global Security Settings Hint */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex gap-4 items-start">
                <div className="p-2 bg-white rounded-lg shadow-sm shrink-0 border border-slate-100">
                    <Lock className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-slate-900">Enterprise Security Default</h4>
                    <p className="text-sm text-slate-500 mt-1">
                        By default, new users invited to your workspace via Clerk are placed in the <span className="font-medium text-slate-700">"Unassigned"</span> team and have zero access to Athene AI agents until explicitly granted permission here.
                    </p>
                </div>
            </div>

        </div>
    );
}