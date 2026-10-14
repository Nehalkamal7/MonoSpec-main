'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Zap,
  ArrowRight,
  Shield,
  FileCode,
  Gauge,
  GitBranch,
  Paperclip,
  FileText,
  HardDrive,
  X,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { FigmaIcon } from '@/components/ui/FigmaIcon';
import { useMonoSpecStore } from '@/store/useMonoSpecStore';
import { STAGES } from '@/lib/constants';
import { CodeBlock } from './CodeBlock';
import { ChatMessage } from '@/types';

export function ChatWorkspace() {
  const {
    activeProjectId,
    activeStageId,
    chatMessages,
    isGeneratingSpec,
    sendChatMessage,
    quickGenerateForActiveStage,
    getActiveProject,
    customStages,
  } = useMonoSpecStore();

  const [input, setInput] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [activeAttachment, setActiveAttachment] = useState<ChatMessage['attachment'] | null>(null);
  const [customDriveInput, setCustomDriveInput] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeProject = getActiveProject();
  const chatKey = `${activeProjectId}-${activeStageId}`;
  const messages = chatMessages[chatKey] || [];
  const currentStage =
    customStages.find((s) => s.id === activeStageId) ||
    STAGES.find((s) => s.id === activeStageId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGeneratingSpec]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !activeAttachment) || isGeneratingSpec) return;

    const messageContent = input.trim() || `Analyze and integrate attached ${activeAttachment?.type.toUpperCase()} into this stage specification.`;
    sendChatMessage(messageContent, activeAttachment || undefined);

    setInput('');
    setActiveAttachment(null);
    setShowAttachMenu(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleAttachMockPdf = (fileName: string) => {
    setActiveAttachment({
      name: fileName,
      type: 'pdf',
      analysisSummary: 'PDF Document parsed with 42 enterprise schema rules and compliance flags.',
    });
    setShowAttachMenu(false);
  };

  const handleAttachDriveLink = () => {
    if (!customDriveInput.trim()) return;
    setActiveAttachment({
      name: 'Google Drive Repository / Architecture-Sync',
      type: 'drive',
      url: customDriveInput.trim(),
      analysisSummary: 'Drive folder connected: 14 documents analyzed and indexed into active model context.',
    });
    setCustomDriveInput('');
    setShowAttachMenu(false);
  };

  const handleLocalFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setActiveAttachment({
        name: file.name,
        type: 'pdf',
        analysisSummary: `File ${file.name} ready for deep neural analysis and specification embedding.`,
      });
      setShowAttachMenu(false);
    }
  };

  const isLogoStage = activeStageId === 'logo';

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-canvas)] overflow-hidden transition-colors">
      {/* Chat Stage Header */}
      <div className="h-12 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-[var(--text-muted)]" />
          <span className="text-xs font-semibold text-[var(--text-primary)]">
            Architect Assistant
          </span>
          <span className="text-[10px] text-[var(--text-muted)]">/</span>
          <span className="text-xs text-[var(--text-secondary)] font-medium">
            {currentStage?.labelEn}
          </span>
          <span className="text-[10px] text-[var(--text-muted)] font-sans">
            ({currentStage?.labelAr})
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Stage Feed Active</span>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-muted)] shadow-2xs">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xs font-semibold text-[var(--text-primary)]">
                {currentStage?.labelEn} Workspace Feed
              </h2>
              <p className="text-[11px] text-[var(--text-muted)] max-w-xs mt-1">
                Collaborate with MonoSpec to formulate, verify, and validate precision architectural specifications. You can attach PDF files or Google Drive links for instant deep analysis.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs leading-relaxed ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender !== 'user' && (
                <div className="w-7 h-7 rounded-lg bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] flex items-center justify-center font-mono font-bold text-[10px] shrink-0 shadow-xs">
                  M
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-xl p-3.5 space-y-2 border ${
                  msg.sender === 'user'
                    ? 'bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] border-transparent'
                    : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-primary)] shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between gap-4 select-none opacity-70 text-[10px] font-mono">
                  <span>{msg.sender === 'user' ? 'Architect' : 'MonoSpec Core'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Attached Document Pill if user provided one */}
                {msg.attachment && (
                  <div
                    className={`flex items-center gap-2 p-2 rounded-lg text-xs font-mono border ${
                      msg.sender === 'user'
                        ? 'bg-black/20 border-white/20 text-white'
                        : 'bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] text-emerald-400'
                    }`}
                  >
                    {msg.attachment.type === 'pdf' ? (
                      <FileText className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    ) : (
                      <HardDrive className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    )}
                    <span className="font-semibold truncate">{msg.attachment.name}</span>
                    <span className="text-[10px] opacity-80 uppercase ml-auto">
                      {msg.attachment.type} INGESTED
                    </span>
                  </div>
                )}

                <div className="markdown-prose text-xs">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        const codeString = String(children).replace(/\n$/, '');

                        if (match) {
                          return (
                            <CodeBlock
                              language={match[1]}
                              code={codeString}
                            />
                          );
                        }

                        return (
                          <code
                            className="px-1 py-0.5 rounded text-[10px] font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>

                {/* Suggested prompt actions */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5 border-t border-[var(--border-subtle)] select-none">
                    {msg.suggestedActions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => sendChatMessage(`Execute action: ${action.label}`)}
                        className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <Zap className="w-2.5 h-2.5 text-[var(--text-muted)]" />
                        <span>{action.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                  <User className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                </div>
              )}
            </div>
          ))
        )}

        {isGeneratingSpec && (
          <div className="flex gap-3 text-xs justify-start">
            <div className="w-7 h-7 rounded-lg bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] flex items-center justify-center font-mono font-bold text-[10px] shrink-0 animate-pulse">
              M
            </div>
            <div className="rounded-xl p-3 border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] font-mono ml-1">Formulating precision spec...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Stage Quick Suggestions Bar (Dynamic per stage, with special logo stage shortcuts!) */}
      <div className="px-4 py-2 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center gap-1.5 overflow-x-auto no-scrollbar select-none">
        <span className="text-[10px] font-mono text-[var(--text-muted)] shrink-0 flex items-center gap-1 mr-1">
          <Zap className="w-3 h-3" /> Quick:
        </span>

        {isLogoStage ? (
          <>
            <button
              onClick={() => sendChatMessage('Generate mathematical vector SVG logomark with 45-degree angle chevrons.')}
              className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-medium border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-900/30 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>SVG Vector Logomark</span>
            </button>
            <button
              onClick={() => sendChatMessage('Define high-contrast enterprise color tokens matrix (Onyx, Optical White, Signal Accent).')}
              className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-medium border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <span>Color Tokens Palette</span>
            </button>
            <button
              onClick={() => sendChatMessage('Establish typography hierarchy pairing IBM Plex Sans Arabic with JetBrains Mono.')}
              className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-medium border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <span>Typography Pairing</span>
            </button>
            <button
              onClick={() => sendChatMessage('Export Favicon and app manifest icon dimensions (16px, 32px, 192px, 512px).')}
              className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-medium border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <span>Favicon Icons Pack</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => quickGenerateForActiveStage('schema')}
              className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-medium border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <FileCode className="w-3 h-3 text-[var(--text-muted)]" />
              <span>OpenAPI Schema</span>
            </button>
            <button
              onClick={() => quickGenerateForActiveStage('security')}
              className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-medium border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Shield className="w-3 h-3 text-[var(--text-muted)]" />
              <span>Security Threat Matrix</span>
            </button>
            <button
              onClick={() => quickGenerateForActiveStage('perf')}
              className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-medium border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Gauge className="w-3 h-3 text-[var(--text-muted)]" />
              <span>k6 Load Test</span>
            </button>
            <button
              onClick={() => quickGenerateForActiveStage('figma')}
              className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-medium border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <FigmaIcon className="w-3 h-3 text-[var(--text-muted)]" />
              <span>Tokens JSON</span>
            </button>
          </>
        )}
      </div>

      {/* Attachment Popover Modal / Menu */}
      {showAttachMenu && (
        <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-xs space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>إرفاق مستند PDF أو مجلد Google Drive لتحليله بالـ AI</span>
            </span>
            <button
              type="button"
              onClick={() => setShowAttachMenu(false)}
              className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* PDF Picker */}
            <label className="p-3 rounded-xl border border-dashed border-[var(--border-subtle)] hover:border-[var(--border-strong)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] cursor-pointer flex items-center gap-2.5 transition-colors">
              <input
                type="file"
                accept=".pdf,.docx,.txt,.json,.md"
                onChange={handleLocalFileSelect}
                className="hidden"
              />
              <FileText className="w-4 h-4 text-red-400 shrink-0" />
              <div>
                <span className="font-bold text-[11px] text-[var(--text-primary)] block">
                  رفع ملف PDF / كراسة شروط
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">
                  استخراج المتطلبات والجداول فوراً
                </span>
              </div>
            </label>

            {/* Quick Presets */}
            <button
              type="button"
              onClick={() => handleAttachMockPdf('Enterprise-Architecture-Guidelines.pdf')}
              className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-left flex items-center gap-2.5 transition-colors"
            >
              <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-[11px] text-[var(--text-primary)] block">
                  Architecture-Guidelines.pdf
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">نموذج معتمد لمواصفات الأنظمة</span>
              </div>
            </button>
          </div>

          {/* Google Drive Link input */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex-1 relative">
              <HardDrive className="w-3.5 h-3.5 text-blue-400 absolute left-2.5 top-2.5" />
              <input
                type="url"
                placeholder="Google Drive folder link (e.g. https://drive.google.com/...)"
                value={customDriveInput}
                onChange={(e) => setCustomDriveInput(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-hidden"
              />
            </div>
            <button
              type="button"
              onClick={handleAttachDriveLink}
              disabled={!customDriveInput.trim()}
              className="px-3 py-1.5 rounded-lg bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] text-xs font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity shrink-0"
            >
              ربط درايف
            </button>
          </div>
        </div>
      )}

      {/* Input Message Area */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
        {/* Active Attachment Pill */}
        {activeAttachment && (
          <div className="mb-2 p-1.5 px-3 rounded-lg border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 truncate">
              {activeAttachment.type === 'pdf' ? (
                <FileText className="w-3.5 h-3.5 text-red-400 shrink-0" />
              ) : (
                <HardDrive className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              )}
              <span className="font-bold truncate">{activeAttachment.name}</span>
              <span className="text-[10px] text-zinc-400 font-sans hidden sm:inline">
                (سيتم تحليله وتدريبه مع الرسالة)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveAttachment(null)}
              className="p-1 rounded text-zinc-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <div className="relative rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] focus-within:border-[var(--border-strong)] transition-colors p-2 shadow-2xs">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Instruct MonoSpec on ${currentStage?.labelEn}... (Enter to send, Shift+Enter for newline)`}
            rows={2}
            className="w-full bg-transparent resize-none text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden leading-relaxed"
          />
          <div className="flex items-center justify-between pt-1 select-none">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAttachMenu((prev) => !prev)}
                title="Attach PDF or Google Drive Link"
                className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
                  showAttachMenu || activeAttachment
                    ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-400'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Paperclip className="w-3 h-3" />
                <span>إرفاق PDF / درايف</span>
              </button>

              <span className="text-[10px] font-mono text-[var(--text-muted)] hidden sm:inline">
                Shift+Enter for newline
              </span>
            </div>

            <button
              type="submit"
              disabled={(!input.trim() && !activeAttachment) || isGeneratingSpec}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] text-xs font-semibold hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xs"
            >
              <span>Send</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
