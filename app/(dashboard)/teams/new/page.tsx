"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Users,
    Bot,
    Check,
    UserPlus,
    ShieldAlert
} from "lucide-react";

export default function NewTeamPage() {
    // State for the builder form
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    // Mock data for the available Agents (from your DB) and Users (from Clerk Org)
    const availableAgents = [
        { id: "agent-1", name: "Engineering Lead", role: "Code & Sprint Analysis" },
        { id: "agent-2", name: "Revenue Strategist", role: "CRM & Pipeline Data" },
        { id: "agent-3", name: "Escalation Manager", role: "Support & SLA Rules" },
        { id: "agent-4", name: "Docs Search", role: "General Wiki & Drive Search" },
    ];

    const availableMembers = [
        { id: "usr-1", name: "Alice Chen", email: "alice@acme.corp", role: "Admin" },
        { id: "usr-2", name: "Bob Smith", email: "bob@acme.corp", role: "Member" },
        { id: "usr-3", name: "Charlie Davis", email: "charlie@acme.corp", role: "Member" },
    ];

    // Toggle helpers
    const toggleAgent = (id: string) => {
        setSelectedAgents(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
    };

    const toggleMember = (id: string) => {
        setSelectedMembers(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/teams" className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Create New Team</h1>
                        <p className="text-sm text-slate-500">Define department details and assign agent access.</p>
                    </div>
                </div>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!name}
                >
                    Save Team
                </button>
            </div>

            <div className="space-y-6">

                {/* Step 1: Team Details */}
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                        <div className="p-1.5 bg-blue-100 text-blue-700 rounded-md shrink-0">
                            <Users className="w-4 h-4" />
                        </div>
                        <h2 className="text-base font-semibold text-slate-900">1. Department Profile</h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-900 mb-1.5">Team Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., Enterprise Sales"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-900 mb-1.5">Description (Optional)</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Briefly describe the purpose of this team..."
                                rows={2}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                            />
                        </div>
                    </div>
                </section>

                {/* Step 2: Agent Access (The Matrix) */}
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-purple-100 text-purple-700 rounded-md shrink-0">
                                <Bot className="w-4 h-4" />
                            </div>
                            <h2 className="text-base font-semibold text-slate-900">2. Authorized Agents</h2>
                        </div>
                        <Link href="/agents/new" className="text-xs font-medium text-blue-600 hover:text-blue-700">Create New Agent</Link>
                    </div>
                    <div className="p-6">
                        <p className="text-sm text-slate-500 mb-4">Select which specialized AI agents this team is allowed to query.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {availableAgents.map((agent) => {
                                const isSelected = selectedAgents.includes(agent.id);
                                return (
                                    <button
                                        key={agent.id}
                                        onClick={() => toggleAgent(agent.id)}
                                        className={`relative flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all ${isSelected ? "border-purple-600 bg-purple-50/30" : "border-slate-100 hover:border-slate-200 bg-white"
                                            }`}
                                    >
                                        {isSelected && (
                                            <div className="absolute top-4 right-4 w-5 h-5 bg-purple-600 text-white rounded-full flex items-center justify-center">
                                                <Check className="w-3 h-3" />
                                            </div>
                                        )}
                                        <span className="font-semibold text-slate-900 text-sm pr-6">{agent.name}</span>
                                        <span className="text-xs text-slate-500 mt-1">{agent.role}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Security Warning */}
                        {selectedAgents.length === 0 && (
                            <div className="mt-4 flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-3 rounded-lg text-sm border border-amber-200">
                                <ShieldAlert className="w-4 h-4 shrink-0" />
                                This team currently has no agent access. They will only be able to use standard chat.
                            </div>
                        )}
                    </div>
                </section>

                {/* Step 3: Add Members */}
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                        <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-md shrink-0">
                            <UserPlus className="w-4 h-4" />
                        </div>
                        <h2 className="text-base font-semibold text-slate-900">3. Assign Members</h2>
                    </div>
                    <div className="p-0">
                        <div className="px-6 py-4 border-b border-slate-100">
                            <input
                                type="text"
                                placeholder="Search organization members..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                        </div>
                        <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                            {availableMembers.map((member) => {
                                const isSelected = selectedMembers.includes(member.id);
                                return (
                                    <div
                                        key={member.id}
                                        onClick={() => toggleMember(member.id)}
                                        className="flex items-center justify-between px-6 py-3 hover:bg-slate-50 cursor-pointer transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">{member.name}</p>
                                                <p className="text-xs text-slate-500">{member.email}</p>
                                            </div>
                                        </div>
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 bg-white"
                                            }`}>
                                            {isSelected && <Check className="w-3 h-3" />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}