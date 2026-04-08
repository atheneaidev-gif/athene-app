"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Bot,
    Database,
    ShieldCheck,
    Check,
    Github,
    HardDrive,
    FileText,
    MessageSquare,
    Briefcase
} from "lucide-react";

export default function NewAgentPage() {
    // State for the builder form
    const [name, setName] = useState("");
    const [prompt, setPrompt] = useState("");
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

    // Mock data for the available integrations (from Nango) and Teams (from your DB)
    const availableTools = [
        { id: "github", name: "GitHub", icon: Github, desc: "Read repositories & PRs" },
        { id: "drive", name: "Google Drive", icon: HardDrive, desc: "Search docs, sheets, slides" },
        { id: "notion", name: "Notion", icon: FileText, desc: "Read workspace pages & wikis" },
        { id: "slack", name: "Slack", icon: MessageSquare, desc: "Search channel history" },
        { id: "salesforce", name: "Salesforce", icon: Briefcase, desc: "Access CRM records" },
    ];

    const availableTeams = ["Engineering", "Sales", "Support", "Marketing", "Leadership", "HR"];

    // Toggle helpers
    const toggleTool = (id: string) => {
        setSelectedTools(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
    };

    const toggleTeam = (team: string) => {
        setSelectedTeams(prev => prev.includes(team) ? prev.filter(t => t !== team) : [...prev, team]);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/agents" className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Deploy New Agent</h1>
                        <p className="text-sm text-slate-500">Configure identity, data access, and team permissions.</p>
                    </div>
                </div>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!name || selectedTools.length === 0 || selectedTeams.length === 0}
                >
                    Deploy to Workspace
                </button>
            </div>

            <div className="space-y-6">

                {/* Step 1: Identity */}
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                        <div className="p-1.5 bg-blue-100 text-blue-700 rounded-md shrink-0">
                            <Bot className="w-4 h-4" />
                        </div>
                        <h2 className="text-base font-semibold text-slate-900">1. Agent Identity</h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-900 mb-1.5">Agent Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., Revenue Strategist"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-900 mb-1.5">System Prompt (Instructions)</label>
                            <p className="text-xs text-slate-500 mb-3">Define how this agent should behave and process data.</p>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="You are a senior analyst. Your job is to read CRM data and cross-reference it with pitch decks..."
                                rows={4}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                            />
                        </div>
                    </div>
                </section>

                {/* Step 2: Data Sources */}
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                        <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-md shrink-0">
                            <Database className="w-4 h-4" />
                        </div>
                        <h2 className="text-base font-semibold text-slate-900">2. Knowledge Access (Nango Integrations)</h2>
                    </div>
                    <div className="p-6">
                        <p className="text-sm text-slate-500 mb-4">Select which connected apps this agent is allowed to search.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {availableTools.map((tool) => {
                                const isSelected = selectedTools.includes(tool.id);
                                const Icon = tool.icon;
                                return (
                                    <button
                                        key={tool.id}
                                        onClick={() => toggleTool(tool.id)}
                                        className={`relative flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all ${isSelected ? "border-blue-600 bg-blue-50/30" : "border-slate-100 hover:border-slate-200 bg-white"
                                            }`}
                                    >
                                        {isSelected && (
                                            <div className="absolute top-3 right-3 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center">
                                                <Check className="w-3 h-3" />
                                            </div>
                                        )}
                                        <Icon className={`w-6 h-6 mb-3 ${isSelected ? "text-blue-600" : "text-slate-400"}`} />
                                        <span className="font-semibold text-slate-900 text-sm">{tool.name}</span>
                                        <span className="text-xs text-slate-500 mt-1">{tool.desc}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Step 3: Access Control (RBAC) */}
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                        <div className="p-1.5 bg-purple-100 text-purple-700 rounded-md shrink-0">
                            <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div className="flex-1 flex justify-between items-center">
                            <h2 className="text-base font-semibold text-slate-900">3. Team Permissions (RBAC)</h2>
                            <Link href="/teams" className="text-xs font-medium text-blue-600 hover:text-blue-700">Manage Teams</Link>
                        </div>
                    </div>
                    <div className="p-6">
                        <p className="text-sm text-slate-500 mb-4">Which departments can interact with this agent?</p>
                        <div className="flex flex-wrap gap-3">
                            {availableTeams.map((team) => {
                                const isSelected = selectedTeams.includes(team);
                                return (
                                    <button
                                        key={team}
                                        onClick={() => toggleTeam(team)}
                                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all flex items-center gap-2 ${isSelected
                                                ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                                            }`}
                                    >
                                        {isSelected && <Check className="w-4 h-4" />}
                                        {team}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}