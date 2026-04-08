"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
    Send,
    Bot,
    User as UserIcon,
    Paperclip,
    Sparkles,
    Search
} from "lucide-react";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    metadata?: string; // To show which agent was used behind the scenes
};

export default function ChatInterface() {
    const { user } = useUser();
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    // Suggested enterprise prompts for the empty state
    const suggestedPrompts = [
        "Why is the Wayne Enterprises deal delayed?",
        "Summarize the Q3 financial deck in my Drive.",
        "Which GitHub PRs are blocking the current sprint?",
        "Draft a reply to Zendesk ticket #8842."
    ];

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // 1. Add user message
        const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: input };
        setMessages(prev => [...prev, newUserMsg]);
        setInput("");
        setIsTyping(true);

        // 2. Simulate the "Supervisor Agent" routing and replying
        setTimeout(() => {
            const responseMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "I checked Salesforce and Jira. The Wayne deal is delayed because they are waiting on the SSO feature, which is currently blocked in Sprint 42 due to backend bugs.",
                metadata: "Searched: Salesforce, Jira" // Exposing the invisible routing
            };
            setMessages(prev => [...prev, responseMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">

            {/* Header */}
            <div className="h-16 border-b border-slate-100 flex items-center px-6 shrink-0 bg-slate-50/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg text-white shadow-sm">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-slate-900">Athene Intelligence</h2>
                        <p className="text-xs text-slate-500">Your enterprise orchestrator</p>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                {messages.length === 0 ? (
                    // Empty State
                    <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto text-center space-y-8">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-blue-100">
                            <Sparkles className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-semibold text-slate-900">
                            Good afternoon, {user?.firstName || "there"}.
                        </h1>
                        <p className="text-slate-500">
                            Ask me anything. I securely search across your company's apps, documents, and code to find the exact answer you need.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-8">
                            {suggestedPrompts.map((prompt, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInput(prompt)}
                                    className="text-left p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-sm text-slate-600 hover:text-blue-700"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Message Feed
                    <div className="space-y-6 pb-6">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-4 max-w-3xl ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>

                                {/* Avatar */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === "user" ? "bg-slate-900 text-white" : "bg-blue-600 text-white"
                                    }`}>
                                    {msg.role === "user" ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                </div>

                                {/* Message Bubble */}
                                <div className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                                    <div className={`px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.role === "user"
                                            ? "bg-slate-900 text-white rounded-tr-sm"
                                            : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm"
                                        }`}>
                                        {msg.content}
                                    </div>

                                    {/* Metadata (Showing the user what tools Athene used) */}
                                    {msg.metadata && (
                                        <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400 ml-1">
                                            <Search className="w-3 h-3" />
                                            {msg.metadata}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Loading State */}
                        {isTyping && (
                            <div className="flex gap-4 max-w-3xl">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1">
                                    <Bot className="w-4 h-4" />
                                </div>
                                <div className="px-5 py-4 bg-white border border-slate-200 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Input Box */}
            <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                <form
                    onSubmit={handleSend}
                    className="max-w-4xl mx-auto relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all shadow-sm pl-4 pr-2 py-2"
                >
                    <button type="button" className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <Paperclip className="w-5 h-5" />
                    </button>

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask Athene to search, summarize, or orchestrate..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-[15px] text-slate-900 px-3 placeholder:text-slate-400 outline-none"
                    />

                    <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl transition-colors"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
                <p className="text-center text-[11px] text-slate-400 mt-3 font-medium">
                    Athene AI can make mistakes. Verify important information from source documents.
                </p>
            </div>

        </div>
    );
}