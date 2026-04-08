"use client";

import { Plus, Bot, Database, MoreVertical, Activity, Users } from "lucide-react";
import Link from "next/link";

export default function AgentsPage() {
    // Mock data for the enterprise MVP
    const agents = [
        {
            id: "1",
            name: "Engineering Lead",
            description: "Monitors PRs, sprint velocity, and backend codebase.",
            team: "Engineering",
            sources: ["GitHub", "Jira", "Slack"],
            status: "Active",
            calls: "1,240",
        },
        {
            id: "2",
            name: "Revenue Strategist",
            description: "Cross-references CRM pipeline with meeting notes.",
            team: "Sales",
            sources: ["Salesforce", "Google Drive"],
            status: "Active",
            calls: "892",
        },
        {
            id: "3",
            name: "Escalation Manager",
            description: "Drafts support replies based on internal wikis and SLA rules.",
            team: "Support",
            sources: ["Zendesk", "Notion"],
            status: "Training", // Showing a different state
            calls: "0",
        }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Agent Fleet</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage your specialized AI agents and their data access permissions.
                    </p>
                </div>
                <Link
                    href="/agents/new"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Create New Agent
                </Link>
            </div>

            {/* Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                    <div key={agent.id} className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow">

                        {/* Card Header */}
                        <div className="p-6 border-b border-slate-100">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <button className="text-slate-400 hover:text-slate-600 p-1">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">{agent.name}</h3>
                            <p className="text-sm text-slate-500 mt-1 line-clamp-2 min-h-[40px]">
                                {agent.description}
                            </p>
                        </div>

                        {/* Card Body (Metadata) */}
                        <div className="p-6 space-y-4 flex-1">
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2 text-slate-600">
                                    <Users className="w-4 h-4 text-slate-400" />
                                    Assigned Team
                                </span>
                                <span className="font-medium text-slate-900">{agent.team}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2 text-slate-600">
                                    <Database className="w-4 h-4 text-slate-400" />
                                    Data Sources
                                </span>
                                <div className="flex gap-1">
                                    {agent.sources.slice(0, 2).map((source, i) => (
                                        <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                                            {source}
                                        </span>
                                    ))}
                                    {agent.sources.length > 2 && (
                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                                            +{agent.sources.length - 2}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-xl flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${agent.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>
                                <span className="text-xs font-medium text-slate-700">{agent.status}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                <Activity className="w-3.5 h-3.5" />
                                {agent.calls} calls
                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}