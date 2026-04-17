/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Box, 
  Layout, 
  Database, 
  Server, 
  Layers, 
  MessageSquare, 
  Activity, 
  ShieldCheck, 
  Package, 
  ShoppingCart, 
  Users, 
  ArrowRight, 
  Code,
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { ARCHITECTURE_SECTIONS, SDLC_PROMPT_FLOW } from './architecture-content';

// --- Types ---
type TabType = 'overview' | 'diagrams' | 'sdlc';

// --- SVG Diagram Components ---

const HighLevelModuleDiagram = () => (
  <svg viewBox="0 0 800 400" className="w-full h-auto bg-stone-900 rounded-lg p-8 border border-white/10 shadow-2xl">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#888" />
      </marker>
    </defs>
    
    {/* Module Container */}
    <rect x="50" y="50" width="700" height="300" rx="12" fill="none" stroke="#555" strokeWidth="2" strokeDasharray="5,5" />
    <text x="70" y="40" className="fill-stone-400 font-mono text-sm">MODULE BOUNDARY (e.g., Sales Module)</text>

    {/* Layers */}
    <rect x="100" y="80" width="600" height="60" rx="8" fill="#1c1c1c" stroke="#3b82f6" strokeWidth="2" />
    <text x="400" y="115" textAnchor="middle" className="fill-blue-400 font-bold">API / CONTRACT LAYER (REST, Messaging)</text>

    <rect x="100" y="160" width="600" height="80" rx="8" fill="#1c1c1c" stroke="#10b981" strokeWidth="2" />
    <text x="400" y="205" textAnchor="middle" className="fill-emerald-400 font-bold">APPLICATION LAYER (MediatR Handlers, Services)</text>

    <rect x="100" y="260" width="600" height="70" rx="8" fill="#1c1c1c" stroke="#f59e0b" strokeWidth="2" />
    <text x="400" y="300" textAnchor="middle" className="fill-amber-400 font-bold">INFRASTRUCTURE (EF Core, Repositories, External Clients)</text>
    
    {/* Flow Indicators */}
    <path d="M400 140 L400 160" stroke="#888" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <path d="M400 240 L400 260" stroke="#888" strokeWidth="2" markerEnd="url(#arrowhead)" />
  </svg>
);

const LowLevelModuleDiagram = () => (
  <svg viewBox="0 0 800 500" className="w-full h-auto bg-stone-900 rounded-lg p-8 border border-white/10 shadow-2xl">
    <text x="20" y="30" className="fill-stone-400 font-mono text-xs uppercase tracking-widest">Low-Level Component Design (DDD Pattern)</text>
    
    {/* Core Domain */}
    <circle cx="400" cy="250" r="80" fill="#312e81" stroke="#6366f1" strokeWidth="2" />
    <text x="400" y="245" textAnchor="middle" className="fill-indigo-100 font-bold text-sm">DOMAIN</text>
    <text x="400" y="265" textAnchor="middle" className="fill-indigo-300 text-xs italic">Entities, Value Objects</text>

    {/* Application Services */}
    <rect x="300" y="80" width="200" height="60" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
    <text x="400" y="115" textAnchor="middle" className="fill-indigo-200 text-xs">Command Handlers</text>

    <rect x="550" y="220" width="180" height="60" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
    <text x="640" y="255" textAnchor="middle" className="fill-indigo-200 text-xs">Query Handlers</text>

    {/* Infrastructure */}
    <rect x="100" y="380" width="180" height="60" rx="4" fill="#18181b" stroke="#52525b" strokeWidth="1" />
    <text x="190" y="415" textAnchor="middle" className="fill-stone-400 text-xs">DB Repository (EF)</text>

    <rect x="520" y="380" width="180" height="60" rx="4" fill="#18181b" stroke="#52525b" strokeWidth="1" />
    <text x="610" y="415" textAnchor="middle" className="fill-stone-400 text-xs">Payment Gateway</text>

    {/* Connections */}
    <line x1="400" y1="140" x2="400" y2="170" stroke="#444" strokeWidth="1" strokeDasharray="4" />
    <line x1="190" y1="380" x2="330" y2="280" stroke="#444" strokeWidth="1" strokeDasharray="4" />
    <line x1="610" y1="380" x2="470" y2="280" stroke="#444" strokeWidth="1" strokeDasharray="4" />
  </svg>
);

const CommunicationDiagram = ({ type }: { type: 'in' | 'out' }) => (
  <svg viewBox="0 0 800 400" className="w-full h-auto bg-stone-900 rounded-lg p-8 border border-white/10 shadow-2xl">
    <text x="20" y="30" className="fill-stone-400 font-mono text-xs uppercase tracking-widest">
      {type === 'in' ? 'In-Process (Internal) Communication' : 'Out-of-Process (Async) Communication'}
    </text>

    {/* Modules */}
    <rect x="50" y="150" width="180" height="100" rx="8" fill="#1c1c1b" stroke="#444" strokeWidth="2" />
    <text x="140" y="205" textAnchor="middle" className="fill-white font-bold">Sales Module</text>

    <rect x="570" y="150" width="180" height="100" rx="8" fill="#1c1c1b" stroke="#444" strokeWidth="2" />
    <text x="660" y="205" textAnchor="middle" className="fill-white font-bold">Inventory Module</text>

    {/* Bridge */}
    {type === 'in' ? (
      <>
        <rect x="300" y="170" width="200" height="60" rx="12" fill="#312e81" />
        <text x="400" y="205" textAnchor="middle" className="fill-indigo-100 font-mono text-xs">MediatR (Shared Process)</text>
        <path d="M230 200 L300 200" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <path d="M500 200 L570 200" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead)" />
      </>
    ) : (
      <>
        <ellipse cx="400" cy="200" rx="100" ry="40" fill="#14532d" />
        <text x="400" y="205" textAnchor="middle" className="fill-emerald-100 font-mono text-xs">MassTransit / RabbitMQ</text>
        <path d="M230 200 Q400 100 570 200" stroke="#10b981" strokeWidth="2" strokeDasharray="5" markerEnd="url(#arrowhead)" />
        <text x="400" y="120" textAnchor="middle" className="fill-emerald-400 text-[10px] italic">Async Event: OrderPlaced</text>
      </>
    )}
  </svg>
);

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  return (
    <div className="min-h-screen bg-pos-bg text-pos-text-primary font-sans selection:bg-pos-accent selection:text-white">
      {/* Header (New for High Density) */}
      <header className="h-[60px] border-b border-pos-line bg-pos-surface flex items-center justify-between px-8 sticky top-0 z-[60]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-pos-accent" />
            <h1 className="font-bold text-sm tracking-tight uppercase">MODULAR MONOLITH .NET RETAIL POS</h1>
          </div>
          <div className="h-4 w-[1px] bg-pos-line" />
          <p className="text-[10px] font-mono text-pos-text-secondary uppercase tracking-widest">Architecture & Blueprint</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-pos-accent/10 border border-pos-accent text-pos-accent px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
            Cloud Agnostic v1.0
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Navigation Rail */}
        <nav className="w-64 border-r border-pos-line bg-pos-bg h-[calc(100vh-60px)] sticky top-[60px] flex flex-col p-4 print:hidden">
          <div className="mb-8 p-4">
            <span className="text-[10px] font-bold text-pos-text-secondary uppercase tracking-[0.2em]">Navigation</span>
          </div>

          <div className="flex flex-col gap-1 flex-1">
          <TabButton 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
            icon={<Layout size={18} />}
            label="ARCHITECTURAL OVERVIEW"
          />
          <TabButton 
            active={activeTab === 'diagrams'} 
            onClick={() => setActiveTab('diagrams')}
            icon={<Activity size={18} />}
            label="DIAGRAMS & FLOWS"
          />
          <TabButton 
            active={activeTab === 'sdlc'} 
            onClick={() => setActiveTab('sdlc')}
            icon={<Code size={18} />}
            label="SDLC PROMPT FLOW"
          />
        </div>

        <div className="mt-auto pt-8 border-t border-pos-line">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-mono text-pos-text-secondary">SYSTEM ACTIVE_</span>
          </div>
          <p className="text-[10px] leading-relaxed text-pos-text-secondary opacity-60">
            System focus: .NET Modular Monolith. Highly dense architectural data.
          </p>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-8 max-w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-pos-line border border-pos-line">
                {ARCHITECTURE_SECTIONS.map((section) => (
                  <div key={section.id} className="bg-pos-bg p-6 space-y-4 hover:bg-pos-surface transition-colors cursor-default">
                    <span className="text-[9px] font-bold text-pos-accent uppercase tracking-[0.2em]">{section.title}</span>
                    <div className="markdown-body">
                      <ReactMarkdown>{section.content}</ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>

              <section className="bg-pos-surface p-8 border border-pos-line grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <h2 className="text-2xl font-bold text-pos-accent uppercase tracking-tight">Multi-tenancy Deep Dive.</h2>
                  <p className="text-pos-text-secondary text-xs leading-relaxed max-w-2xl">
                    Isolation is handled at the data access layer. Every request contains a <span className="text-pos-accent font-mono uppercase">TenantId</span>. 
                    Our custom middleware ensures zero data leakage.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <ListItem icon={<CheckCircle2 className="w-3.5 h-3.5 text-pos-accent" />} text="Row-level security (EF Global Filters)" />
                    <ListItem icon={<CheckCircle2 className="w-3.5 h-3.5 text-pos-accent" />} text="Isolated storage prefixes" />
                  </div>
                </div>
                <div className="lg:col-span-4 flex justify-center">
                  <div className="w-40 h-40 border border-pos-line rounded-full flex items-center justify-center relative">
                     <ShieldCheck size={64} className="text-pos-accent opacity-80" />
                     <div className="absolute inset-0 border border-pos-accent/20 rounded-full animate-[ping_3s_linear_infinite] scale-125" />
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'diagrams' && (
            <motion.div
              key="diagrams"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-pos-line border border-pos-line">
                <div className="bg-pos-bg p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-pos-line pb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-[10px] font-mono text-pos-accent">01</div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-pos-text-secondary">HLD: MODULE INTERNAL</h3>
                    </div>
                  </div>
                  <HighLevelModuleDiagram />
                </div>

                <div className="bg-pos-bg p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-pos-line pb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-[10px] font-mono text-pos-accent">02</div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-pos-text-secondary">LLD: COMPONENT DDD</h3>
                    </div>
                  </div>
                  <LowLevelModuleDiagram />
                </div>

                <div className="bg-pos-bg p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-pos-line pb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-[10px] font-mono text-pos-accent">03</div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-pos-text-secondary">IN-PROCESS COMM.</h3>
                    </div>
                  </div>
                  <CommunicationDiagram type="in" />
                </div>

                <div className="bg-pos-bg p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-pos-line pb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-[10px] font-mono text-pos-accent">04</div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-pos-text-secondary">OUT-PROCESS COMM. (ASYNC)</h3>
                    </div>
                  </div>
                  <CommunicationDiagram type="out" />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'sdlc' && (
            <motion.div
              key="sdlc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-px bg-pos-line border border-pos-line"
            >
              <div className="bg-pos-surface p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
                   <Code size={160} />
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3 text-pos-accent">
                    <CheckCircle2 size={20} />
                    <span className="font-bold text-xs uppercase tracking-[0.3em]">Verified SDLC Pipeline</span>
                  </div>
                  <div className="markdown-body">
                    <ReactMarkdown>{SDLC_PROMPT_FLOW}</ReactMarkdown>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-pos-line">
                <PromptCard 
                  step="01" 
                  title="Bootstrap" 
                  desc="Base solution setup with Shared Kernel."
                />
                <PromptCard 
                  step="02" 
                  title="Vertical Slices" 
                  desc="API to DB per-module development."
                />
                <PromptCard 
                  step="03" 
                  title="Integration" 
                  desc="Cross-module async event verification."
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      </div>

      {/* Footer (New for High Density) */}
      <footer className="h-[40px] border-t border-pos-line bg-pos-surface flex items-center justify-between px-8 text-[10px] text-pos-text-secondary fixed bottom-0 left-0 right-0 z-[60]">
        <span>© 2024 Architectural Design Systems</span>
        <div className="flex gap-6 uppercase font-mono tracking-tighter">
          <span>Format: High-Density (Fixed)</span>
          <span className="text-pos-accent">Status: Architecture_Sync_OK</span>
          <span>Buffer: 1024x768_Ref</span>
        </div>
      </footer>
    </div>
  );
}

// --- Sub-components ---

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center gap-3 p-3 text-[10px] font-bold tracking-wider uppercase transition-all duration-150 group border-l-2
        ${active ? 'bg-pos-surface border-pos-accent text-pos-text-primary' : 'border-transparent hover:bg-pos-surface/50 text-pos-text-secondary opacity-60 hover:opacity-100'}
      `}
    >
      <span className={active ? 'text-pos-accent' : 'text-pos-text-secondary group-hover:text-pos-accent'}>
        {icon}
      </span>
      {label}
    </button>
  );
}

function ListItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-3 text-[11px] text-pos-text-secondary">
      {icon}
      <span>{text}</span>
    </div>
  );
}

function PromptCard({ step, title, desc }: { step: string, title: string, desc: string }) {
  return (
    <div className="bg-pos-bg p-6 border-l-2 border-pos-accent hover:bg-pos-surface transition-colors">
      <div className="mb-2 text-[9px] font-mono font-bold text-pos-accent tracking-widest uppercase">Phase {step}</div>
      <h4 className="text-sm font-bold mb-1 text-pos-text-primary uppercase tracking-tight">{title}</h4>
      <p className="text-[10px] text-pos-text-secondary opacity-60 leading-relaxed">{desc}</p>
    </div>
  );
}

