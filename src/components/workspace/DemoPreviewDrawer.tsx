'use client';

import React, { useState } from 'react';
import {
  X,
  Globe,
  ExternalLink,
  RefreshCw,
  Save,
  Activity,
  Layers,
  ChevronRight,
  Maximize2,
} from 'lucide-react';
import { useMonoSpecStore } from '@/store/useMonoSpecStore';
import { COMPANIES } from '@/lib/constants';

export function DemoPreviewDrawer() {
  const {
    isDemoDrawerOpen,
    setDemoDrawerOpen,
    getActiveProject,
    updateProjectUrls,
    setDemoModalOpen,
  } = useMonoSpecStore();

  const activeProject = getActiveProject();
  const [demoUrlInput, setDemoUrlInput] = useState(activeProject?.demoUrl || '');
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  if (!isDemoDrawerOpen || !activeProject) return null;

  const company = COMPANIES[activeProject.companyId];

  const handleSaveDemoUrl = () => {
    updateProjectUrls(activeProject.id, { demoUrl: demoUrlInput.trim() });
    setIsEditingUrl(false);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full sm:w-[480px] lg:w-[540px] bg-[var(--bg-canvas)] border-l border-[var(--border-subtle)] shadow-2xl flex flex-col antialiased transition-all duration-200">
      {/* Drawer Header */}
      <div className="h-16 px-5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] flex items-center justify-center shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-semibold text-[var(--text-primary)] truncate">
                Demo Preview & Sandbox
              </h3>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[var(--text-muted)]">
                DRAWER
              </span>
            </div>
            <p className="text-[10px] text-[var(--text-muted)] font-mono truncate">
              {activeProject.title} ({company.name})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setDemoDrawerOpen(false);
              setDemoModalOpen(true);
            }}
            title="Expand to Full Modal"
            className="p-1.5 rounded-md border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDemoDrawerOpen(false)}
            title="Close Drawer"
            className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Persistence Bar for dynamic demo_preview_url */}
      <div className="p-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-xs">
        <div className="flex items-center justify-between mb-1.5 font-mono text-[11px] text-[var(--text-muted)]">
          <span>demo_preview_url</span>
          {activeProject.demoUrl && !isEditingUrl && (
            <a
              href={activeProject.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[var(--text-primary)] hover:underline"
            >
              <span>Direct Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {isEditingUrl ? (
          <div className="flex items-center gap-1.5">
            <input
              type="url"
              value={demoUrlInput}
              onChange={(e) => setDemoUrlInput(e.target.value)}
              placeholder="https://preview.vercel.app..."
              className="flex-1 px-2.5 py-1 text-xs rounded-md border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)] font-mono focus:outline-hidden"
            />
            <button
              onClick={handleSaveDemoUrl}
              className="px-2.5 py-1 rounded bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] text-xs font-semibold flex items-center gap-1"
            >
              <Save className="w-3 h-3" />
              <span>Save</span>
            </button>
            <button
              onClick={() => setIsEditingUrl(false)}
              className="px-2 py-1 rounded border border-[var(--border-subtle)] text-xs text-[var(--text-muted)]"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-2 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <span className="font-mono text-[11px] text-[var(--text-primary)] truncate max-w-[340px]">
              {activeProject.demoUrl || 'No preview URL configured'}
            </span>
            <button
              onClick={() => {
                setDemoUrlInput(activeProject.demoUrl || '');
                setIsEditingUrl(true);
              }}
              className="text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] underline ml-2 shrink-0"
            >
              {activeProject.demoUrl ? 'Edit URL' : '+ Add URL'}
            </button>
          </div>
        )}
      </div>

      {/* Live Iframe Sandbox Viewport */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[var(--bg-canvas)] p-3">
        <div className="flex items-center justify-between pb-2 text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sandbox Viewport</span>
          </div>
          <button
            onClick={() => setIframeKey((prev) => prev + 1)}
            title="Reload sandbox"
            className="flex items-center gap-1 text-[11px] hover:text-[var(--text-primary)]"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reload</span>
          </button>
        </div>

        <div className="flex-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden flex flex-col">
          {activeProject.demoUrl ? (
            <iframe
              key={iframeKey}
              src={activeProject.demoUrl}
              title="Dynamic Demo Sandbox"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-2.5">
              <div className="w-10 h-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-center text-[var(--text-muted)]">
                <Globe className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-[var(--text-primary)]">
                No Preview Sandbox Configured
              </p>
              <p className="text-[11px] text-[var(--text-muted)] max-w-xs">
                Add your staging deployment or local tunnel URL above to view the live dynamic sandbox directly in this drawer.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Drawer Footer */}
      <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between text-xs text-[var(--text-muted)] shrink-0">
        <span className="font-mono text-[10px]">Changes auto-persisted</span>
        <button
          onClick={() => setDemoDrawerOpen(false)}
          className="px-3 py-1 rounded-md bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] font-semibold text-xs"
        >
          Close Drawer
        </button>
      </div>
    </div>
  );
}
