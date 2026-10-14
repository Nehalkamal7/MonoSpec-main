'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  Building2,
  CheckCircle2,
  CircleDot,
  Database,
  KeyRound,
  Users,
  Copy,
  Check,
  Home,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { useMonoSpecStore } from '@/store/useMonoSpecStore';
import { STAGES } from '@/lib/constants';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Sidebar() {
  const {
    activeProjectId,
    sidebarCollapsed,
    searchQuery,
    selectedCompanyFilter,
    setActiveProject,
    toggleSidebar,
    setSearchQuery,
    setSelectedCompanyFilter,
    setNewProjectModalOpen,
    setTrainingModalOpen,
    getFilteredProjects,
    companies,
    workspace,
    setActiveView,
    addCompany,
    accountType,
  } = useMonoSpecStore();

  const isFreelancer = accountType === 'freelancer';

  const [expandedCompanies, setExpandedCompanies] = useState<Record<string, boolean>>({
    awamer: true,
    creative: true,
  });

  const [copiedRoomCode, setCopiedRoomCode] = useState(false);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyCode, setNewCompanyCode] = useState('');
  const [newCompanyUrl, setNewCompanyUrl] = useState('');
  const [newCompanyIndustry, setNewCompanyIndustry] = useState('');

  const toggleCompanyExpand = (companyId: string) => {
    setExpandedCompanies((prev) => ({
      ...prev,
      [companyId]: prev[companyId] !== undefined ? !prev[companyId] : false,
    }));
  };

  const handleCopyRoomCode = () => {
    if (typeof window !== 'undefined' && workspace?.roomCode) {
      navigator.clipboard.writeText(workspace.roomCode);
      setCopiedRoomCode(true);
      setTimeout(() => setCopiedRoomCode(false), 2000);
    }
  };

  const handleCreateCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName.trim()) return;

    const code = (newCompanyCode.trim() || newCompanyName.slice(0, 3)).toUpperCase();
    addCompany({
      name: newCompanyName.trim(),
      code,
      websiteUrl: newCompanyUrl.trim() || undefined,
      industry: newCompanyIndustry.trim() || (isFreelancer ? 'منصة وتطبيق ويب' : 'Enterprise Tech'),
      tagline: `${isFreelancer ? 'مواصفات وتصميم موقع' : 'Digital Systems & Architecture for'} ${newCompanyName.trim()}`,
      type: isFreelancer ? 'freelancer_site' : 'enterprise',
    });

    setNewCompanyName('');
    setNewCompanyCode('');
    setNewCompanyUrl('');
    setNewCompanyIndustry('');
    setShowAddCompanyModal(false);
  };

  const filteredProjects = getFilteredProjects();

  if (sidebarCollapsed) {
    return (
      <aside className="w-16 h-screen border-r border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col items-center justify-between py-4 select-none transition-all duration-200 shrink-0">
        <div className="flex flex-col items-center gap-3 w-full">
          {/* Collapsed Brand Monogram */}
          <button
            onClick={() => setActiveView('landing')}
            title="MonoSpec Home & Landing Page"
            className="w-10 h-10 rounded-lg bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] flex items-center justify-center font-mono font-black text-lg tracking-tighter hover:opacity-90 transition-opacity"
          >
            M
          </button>

          <button
            onClick={() => setNewProjectModalOpen(true)}
            title="New Project (⌘N)"
            className="w-10 h-10 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] flex items-center justify-center text-[var(--text-primary)] transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            onClick={() => setTrainingModalOpen(true)}
            title="AI Training & PDF/Drive Datasets"
            className="w-10 h-10 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Database className="w-4 h-4" />
          </button>

          <div className="w-8 h-px bg-[var(--border-subtle)] my-1" />

          {/* Dynamic company shortcuts */}
          <div className="flex flex-col items-center gap-1.5 overflow-y-auto max-h-[40vh] no-scrollbar">
            {companies.map((comp) => {
              const isSelected = selectedCompanyFilter === comp.id;
              const isCompFreelance = comp.type === 'freelancer_site' || isFreelancer;
              return (
                <button
                  key={comp.id}
                  onClick={() => setSelectedCompanyFilter(isSelected ? 'all' : comp.id)}
                  title={`${isCompFreelance ? 'Website' : 'Company'}: ${comp.name} (${comp.code})`}
                  className={`w-9 h-9 rounded-md text-[10px] font-mono font-bold flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] border-transparent'
                      : 'border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {comp.code.slice(0, 3)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 w-full px-2">
          <ThemeToggle compact />
          <button
            onClick={toggleSidebar}
            title="Expand Sidebar"
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-72 h-screen border-r border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between select-none transition-all duration-200 shrink-0">
      {/* Top Header / Branding & Workspace Info */}
      <div className="p-4 border-b border-[var(--border-subtle)] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveView('landing')}
              title="Return to Landing Page"
              className="w-8 h-8 rounded-lg bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] flex items-center justify-center font-mono font-black text-sm tracking-tighter shadow-xs hover:opacity-90 transition-opacity"
            >
              M
            </button>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm tracking-tight text-[var(--text-primary)]">MonoSpec</span>
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded border border-[var(--border-subtle)] text-[var(--text-muted)]">
                  v2.4
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-none mt-0.5">
                Precision for Any Enterprise
              </p>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            title="Collapse Sidebar"
            className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Active Team Workspace Badge with Room Code */}
        {workspace && (
          <div className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex flex-col gap-1.5 shadow-2xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--text-primary)] truncate max-w-[170px]">
                {workspace.name}
              </span>
              <span className="text-[10px] font-mono text-[var(--text-muted)] flex items-center gap-1">
                <Users className="w-3 h-3" />
                {workspace.membersCount}
              </span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-[var(--border-subtle)]">
              <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                <KeyRound className="w-3 h-3" />
                <span className="font-bold">{workspace.roomCode}</span>
              </div>
              <button
                onClick={handleCopyRoomCode}
                title="Copy Team Room Code"
                className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                {copiedRoomCode ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Action: New Project & AI Training */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setNewProjectModalOpen(true)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] text-xs font-semibold hover:opacity-95 transition-all shadow-xs group"
          >
            <Plus className="w-3.5 h-3.5 transition-transform group-hover:rotate-90 duration-200" />
            <span>New Spec</span>
          </button>
          <button
            onClick={() => setTrainingModalOpen(true)}
            title="Upload PDF, Drive links & Train Model"
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-xs text-[var(--text-primary)] font-medium transition-all shadow-2xs"
          >
            <Database className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span>AI Datasets</span>
          </button>
        </div>

        {/* Search filter input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Filter projects & specs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:border-[var(--border-strong)] transition-colors"
          />
        </div>
      </div>

      {/* Projects List Grouped Dynamically by Company */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {/* Dynamic Companies Loop */}
        {companies.map((company) => {
          const compProjects = filteredProjects.filter((p) => p.companyId === company.id);
          const isExpanded = expandedCompanies[company.id] ?? true;

          return (
            <div key={company.id} className="space-y-1">
              <button
                onClick={() => toggleCompanyExpand(company.id)}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors group"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                  )}
                  {isFreelancer || company.type === 'freelancer_site' ? (
                    <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <Building2 className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                  )}
                  <div className="text-left truncate">
                    <span className="tracking-tight">{company.name}</span>
                    {company.nameAr && company.nameAr !== company.name && (
                      <span className="text-[10px] text-[var(--text-muted)] font-normal ml-1.5 font-sans">
                        ({company.nameAr})
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {company.websiteUrl && (
                    <a
                      href={company.websiteUrl.startsWith('http') ? company.websiteUrl : `https://${company.websiteUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title={`Visit ${company.websiteUrl}`}
                      className="text-emerald-400 hover:text-emerald-300 p-0.5"
                    >
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
                    {company.code}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
                    {compProjects.length}
                  </span>
                </div>
              </button>

              {isExpanded && (
                <div className="space-y-0.5 pl-3 border-l border-[var(--border-subtle)] ml-3">
                  {compProjects.length === 0 ? (
                    <div className="py-2 px-2 text-[11px] text-[var(--text-muted)] italic">
                      No active projects. Click + to add one.
                    </div>
                  ) : (
                    compProjects.map((project) => {
                      const isActive = project.id === activeProjectId;
                      const activeStage = STAGES.find((s) => s.id === project.activeStageId);
                      const deliverable = project.stages[project.activeStageId];

                      return (
                        <button
                          key={project.id}
                          onClick={() => setActiveProject(project.id)}
                          className={`w-full text-left p-2 rounded-lg text-xs transition-all flex flex-col gap-1 border ${
                            isActive
                              ? 'bg-[var(--bg-surface-elevated)] border-[var(--border-strong)] text-[var(--text-primary)] shadow-xs'
                              : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-medium truncate">{project.title}</span>
                            {deliverable?.progress === 100 ? (
                              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                            ) : (
                              <CircleDot className="w-3 h-3 text-[var(--text-muted)] shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                            <span className="truncate">{activeStage?.labelEn || project.activeStageId}</span>
                            <span className="font-mono">{deliverable?.progress ?? 0}%</span>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Add Another Company / Website Button */}
        <div className="pt-2">
          {showAddCompanyModal ? (
            <form
              onSubmit={handleCreateCompanySubmit}
              className="p-3 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] space-y-2.5 animate-in fade-in duration-150"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  {isFreelancer ? 'Add New Website / Platform' : 'Add New Company'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddCompanyModal(false)}
                  className="text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  Cancel
                </button>
              </div>
              <input
                type="text"
                placeholder={isFreelancer ? 'Website Name (e.g. MyPortfolio)' : 'Company Name (e.g. Apex FinTech)'}
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-primary)] focus:outline-hidden"
                autoFocus
                required
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder={isFreelancer ? 'Site Code (e.g. PORT)' : 'Code (e.g. APX)'}
                  value={newCompanyCode}
                  maxLength={5}
                  onChange={(e) => setNewCompanyCode(e.target.value)}
                  className="w-full px-2 py-1 text-xs rounded border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-primary)] font-mono uppercase focus:outline-hidden"
                />
                <input
                  type="text"
                  placeholder={isFreelancer ? 'Platform Type (e.g. SaaS)' : 'Sector / Industry'}
                  value={newCompanyIndustry}
                  onChange={(e) => setNewCompanyIndustry(e.target.value)}
                  className="w-full px-2 py-1 text-xs rounded border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-primary)] focus:outline-hidden"
                />
              </div>
              {isFreelancer && (
                <input
                  type="text"
                  placeholder="Website URL (e.g. https://mywebsite.com)"
                  value={newCompanyUrl}
                  onChange={(e) => setNewCompanyUrl(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-primary)] focus:outline-hidden font-mono text-[11px]"
                />
              )}
              <button
                type="submit"
                className="w-full py-1.5 rounded-lg bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                {isFreelancer ? 'Save Website' : 'Save Company'}
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowAddCompanyModal(true)}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-dashed border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isFreelancer ? 'Add Another Website' : 'Add Another Company'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Footer with Portal Link & Theme */}
      <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between">
        <button
          onClick={() => setActiveView('landing')}
          className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <Home className="w-3.5 h-3.5 text-[var(--text-muted)]" />
          <span>Product Overview</span>
        </button>
        <ThemeToggle />
      </div>
    </aside>
  );
}
