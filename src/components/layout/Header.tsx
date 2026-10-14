'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  Play,
  Share2,
  Copy,
  Check,
  Columns,
  Maximize2,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Building2,
  Users,
  KeyRound,
  Home,
} from 'lucide-react';
import { FigmaIcon } from '@/components/ui/FigmaIcon';
import { useMonoSpecStore } from '@/store/useMonoSpecStore';
import { STAGES } from '@/lib/constants';

export function Header() {
  const {
    getActiveProject,
    activeStageId,
    canvasViewMode,
    setCanvasViewMode,
    setFigmaModalOpen,
    setDemoModalOpen,
    getCompanyById,
    workspace,
    setActiveView,
  } = useMonoSpecStore();

  const [copied, setCopied] = useState(false);
  const [copiedRoomCode, setCopiedRoomCode] = useState(false);
  const activeProject = getActiveProject();

  if (!activeProject) return null;

  const company =
    getCompanyById(activeProject.companyId) || {
      id: activeProject.companyId,
      name: activeProject.companyId === 'awamer' ? 'Awamer Alshabaka' : activeProject.companyId === 'creative' ? 'Creative System' : activeProject.companyId,
      code: activeProject.companyId.slice(0, 3).toUpperCase(),
    };

  const activeStage = STAGES.find((s) => s.id === activeStageId);
  const deliverable = activeProject.stages[activeStageId];

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyRoomCode = () => {
    if (typeof window !== 'undefined' && workspace?.roomCode) {
      navigator.clipboard.writeText(workspace.roomCode);
      setCopiedRoomCode(true);
      setTimeout(() => setCopiedRoomCode(false), 2000);
    }
  };

  return (
    <header className="h-16 border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-6 flex items-center justify-between shrink-0 select-none transition-colors">
      {/* Left: Active Project Info & Workspace Room Code */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2">
          {/* Company Tag */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[11px] font-mono text-[var(--text-secondary)]">
            <Building2 className="w-3 h-3 text-[var(--text-muted)]" />
            <span className="font-semibold text-[var(--text-primary)]">{company.name}</span>
            <span className="text-[var(--text-muted)]">({company.code})</span>
          </div>

          <span className="text-[var(--text-muted)]">/</span>

          {/* Project Title */}
          <h1 className="font-semibold text-sm tracking-tight text-[var(--text-primary)] truncate max-w-xs md:max-w-md">
            {activeProject.title}
          </h1>
        </div>

        {/* Workspace Room Code Badge */}
        {workspace && (
          <button
            onClick={handleCopyRoomCode}
            title={`Workspace: ${workspace.name} • Click to copy team room code: ${workspace.roomCode}`}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-900/30 text-emerald-400 text-[11px] font-mono transition-colors shadow-2xs group"
          >
            <KeyRound className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="font-medium text-[10px] text-zinc-300">Room:</span>
            <span className="font-bold tracking-wider">{workspace.roomCode}</span>
            {copiedRoomCode ? (
              <Check className="w-3 h-3 text-emerald-300 ml-0.5" />
            ) : (
              <Copy className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 transition-opacity ml-0.5" />
            )}
          </button>
        )}

        {/* Active Stage Pill */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] text-xs text-[var(--text-primary)] shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-contrast)] animate-pulse" />
          <span className="font-mono text-[10px] text-[var(--text-muted)] font-bold">{activeStage?.badge}</span>
          <span className="font-medium text-[11px]">{activeStage?.labelEn}</span>
          <span className="text-[10px] text-[var(--text-muted)] font-sans">({activeStage?.labelAr})</span>
        </div>

        {/* Native Figma Project File Link */}
        {activeProject.figmaUrl && (
          <a
            href={activeProject.figmaUrl}
            target="_blank"
            rel="noreferrer"
            title={`Open native Figma file: ${activeProject.figmaUrl}`}
            className="hidden 2xl:flex items-center gap-1.5 px-2 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-[11px] font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <FigmaIcon className="w-3 h-3" />
            <span className="truncate max-w-[120px]">Figma File</span>
            <ExternalLink className="w-2.5 h-2.5 text-[var(--text-muted)]" />
          </a>
        )}
      </div>

      {/* Right: Actions, Figma Shortcut, Demo Preview, Viewport Controls */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Landing Page Home Shortcut */}
        <button
          onClick={() => setActiveView('landing')}
          title="Return to Universal Project Overview & Landing Page"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <Home className="w-3.5 h-3.5 text-[var(--text-muted)]" />
          <span className="hidden md:inline">Landing Page</span>
        </button>

        {/* View Mode Segmented Controls */}
        <div className="hidden lg:flex items-center p-0.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
          <button
            onClick={() => setCanvasViewMode('split')}
            title="Split Workspace View"
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
              canvasViewMode === 'split'
                ? 'bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] font-medium shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split</span>
          </button>
          <button
            onClick={() => setCanvasViewMode('canvas-only')}
            title="Spec Canvas Focus"
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
              canvasViewMode === 'canvas-only'
                ? 'bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] font-medium shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Canvas</span>
          </button>
          <button
            onClick={() => setCanvasViewMode('chat-only')}
            title="Architect Chat Focus"
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
              canvasViewMode === 'chat-only'
                ? 'bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] font-medium shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>
        </div>

        <div className="hidden sm:block w-px h-5 bg-[var(--border-subtle)]" />

        {/* Export to Figma Shortcut */}
        <button
          onClick={() => setFigmaModalOpen(true)}
          title="Export Design Tokens & Frames to Figma"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)] text-xs font-medium transition-all group shadow-2xs"
        >
          <FigmaIcon className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
          <span className="hidden md:inline">Export to Figma</span>
          <span className="md:hidden">Figma</span>
        </button>

        {/* Demo Preview Button */}
        <button
          onClick={() => setDemoModalOpen(true)}
          title="Launch Live Architectural Simulation"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] text-xs font-semibold hover:opacity-90 transition-all shadow-xs"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Demo Preview</span>
        </button>

        {/* Copy / Share Quick Shortcut */}
        <button
          onClick={handleCopyLink}
          title="Copy Spec Link"
          className="p-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
