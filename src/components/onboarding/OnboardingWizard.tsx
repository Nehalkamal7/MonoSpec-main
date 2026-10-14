'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  KeyRound,
  Building2,
  Check,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Layers,
  Copy,
  CheckCircle2,
  HelpCircle,
  FileCode2,
  Palette,
  Terminal,
  CheckSquare,
  FileText,
  Server,
  ShieldCheck,
  Rocket,
} from 'lucide-react';
import { useMonoSpecStore } from '@/store/useMonoSpecStore';
import { RECOMMENDED_STAGES } from '@/lib/constants';
import { Company, StageDefinition } from '@/types';

const STAGE_ICON_MAP: Record<string, typeof FileCode2> = {
  tech_analysis: FileCode2,
  logo: Sparkles,
  ui_ux: Palette,
  engineering: Terminal,
  qa_testing: CheckSquare,
  content: FileText,
  devops: Server,
  security_compliance: ShieldCheck,
  gtm_marketing: Rocket,
};

export function OnboardingWizard() {
  const {
    onboardingStep,
    setOnboardingStep,
    setActiveView,
    createWorkspaceWithRoomCode,
    addCompany,
    companies,
    setSelectedStageIds,
    selectedStageIds,
    customStages,
    addCustomStage,
  } = useMonoSpecStore();

  // Step 1: Workspace State
  const [workspaceName, setWorkspaceName] = useState('Apex Innovations Team');
  const [roomCode, setRoomCode] = useState('MONO-8842-KSA');
  const [copiedCode, setCopiedCode] = useState(false);

  // Step 2: Company Setup State
  const [companyList, setCompanyList] = useState<Omit<Company, 'id'>[]>([
    {
      name: 'Awamer Alshabaka',
      nameAr: 'أوامر الشبكة',
      code: 'AWM',
      industry: 'Enterprise Software & Cloud Systems',
      tagline: 'Enterprise Digital Transformation',
    },
    {
      name: 'Creative System',
      nameAr: 'النظام الإبداعي',
      code: 'CRT',
      industry: 'FinTech & SaaS Engineering',
      tagline: 'High-Performance FinTech Products',
    },
  ]);
  const [newCompName, setNewCompName] = useState('');
  const [newCompNameAr, setNewCompNameAr] = useState('');
  const [newCompCode, setNewCompCode] = useState('');
  const [newCompIndustry, setNewCompIndustry] = useState('');

  // Step 3: Stages State
  const [chosenStageIds, setChosenStageIds] = useState<string[]>(
    RECOMMENDED_STAGES.filter((s) => s.isRecommended).map((s) => s.id)
  );
  const [customStageLabel, setCustomStageLabel] = useState('');
  const [customStageLabelAr, setCustomStageLabelAr] = useState('');

  const handleCopyCode = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(roomCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompName.trim()) return;

    const code = (newCompCode.trim() || newCompName.slice(0, 3)).toUpperCase();
    setCompanyList((prev) => [
      ...prev,
      {
        name: newCompName.trim(),
        nameAr: newCompNameAr.trim() || newCompName.trim(),
        code,
        industry: newCompIndustry.trim() || 'Software & Technology',
        tagline: `Enterprise Architecture for ${newCompName.trim()}`,
      },
    ]);

    setNewCompName('');
    setNewCompNameAr('');
    setNewCompCode('');
    setNewCompIndustry('');
  };

  const handleRemoveCompany = (index: number) => {
    if (companyList.length <= 1) return;
    setCompanyList((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleToggleStage = (stageId: string) => {
    setChosenStageIds((prev) =>
      prev.includes(stageId)
        ? prev.length > 1
          ? prev.filter((id) => id !== stageId)
          : prev
        : [...prev, stageId]
    );
  };

  const handleSelectAllRecommended = () => {
    setChosenStageIds(RECOMMENDED_STAGES.filter((s) => s.isRecommended).map((s) => s.id));
  };

  const handleAddCustomStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customStageLabel.trim()) return;

    const newId = `custom_${customStageLabel.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    const newStage: StageDefinition = {
      id: newId,
      index: customStages.length + 1,
      labelEn: customStageLabel.trim(),
      labelAr: customStageLabelAr.trim() || customStageLabel.trim(),
      shortDesc: 'Custom enterprise pipeline stage configured during onboarding',
      badge: `CUST-0${customStages.length + 1}`,
      isRecommended: false,
    };

    addCustomStage(newStage);
    setChosenStageIds((prev) => [...prev, newId]);
    setCustomStageLabel('');
    setCustomStageLabelAr('');
  };

  const handleFinishOnboarding = () => {
    // 1. Create Workspace
    createWorkspaceWithRoomCode(workspaceName, roomCode);

    // 2. Add Companies
    companyList.forEach((comp) => {
      // Check if already in store
      const exists = companies.some((c) => c.code.toLowerCase() === comp.code.toLowerCase());
      if (!exists) {
        addCompany(comp);
      }
    });

    // 3. Set Selected Stages
    setSelectedStageIds(chosenStageIds);

    // 4. Launch into workspace
    setActiveView('workspace');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col justify-between selection:bg-[var(--selection-bg)] selection:text-[var(--selection-text)] font-sans">
      {/* Top Bar */}
      <header className="h-16 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('landing')}
            className="w-9 h-9 rounded-xl bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] flex items-center justify-center font-mono font-black text-base shadow-xs"
          >
            M
          </button>
          <div>
            <h1 className="text-sm font-bold tracking-tight">إعداد مساحة عمل MonoSpec</h1>
            <p className="text-[11px] text-[var(--text-muted)]">
              تهيئة النظام لشركتك وفريقك في 3 خطوات بسيطة
            </p>
          </div>
        </div>

        {/* Step Indicator Pills */}
        <div className="flex items-center gap-2">
          {[
            { num: 1, title: 'مساحة العمل والروم' },
            { num: 2, title: 'الشركات والعملاء' },
            { num: 3, title: 'مراحل المشروع' },
          ].map((s) => (
            <div
              key={s.num}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                onboardingStep === s.num
                  ? 'bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] shadow-xs'
                  : onboardingStep > s.num
                  ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-400'
                  : 'border border-[var(--border-subtle)] text-[var(--text-muted)]'
              }`}
            >
              <span>0{s.num}.</span>
              <span className="font-sans text-[11px]">{s.title}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Main Wizard Step Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-6 sm:p-10 flex flex-col justify-center">
        {/* STEP 1: Workspace & Room Code */}
        {onboardingStep === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                STEP 01 OF 03 • TEAM WORKSPACE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                أنشئ مساحة عمل (Workspace) خاصة بفريقك بكود غرفة مميز
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                مساحة العمل تجمع كل مشاريعك ومواصفاتك الفنية. يمكنك مشاركة كود الروم مع أي عضو في الفريق للدخول الفوري.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-md space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  اسم مساحة العمل / Workspace Name
                </label>
                <input
                  type="text"
                  placeholder="مثال: Apex Engineering Team / تيم التطوير والأنظمة"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] focus:outline-hidden focus:border-[var(--border-strong)]"
                  required
                />
              </div>

              {/* Unique Room Code Box */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                    <span>الكود المميز للروم (Unique Team Room Code)</span>
                  </label>
                  <span className="text-[11px] text-[var(--text-muted)]">
                    يمكنك تعديله أو استخدام الكود المولد تلقائياً
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    className="flex-1 px-3.5 py-2.5 text-sm font-mono font-bold uppercase rounded-xl border border-emerald-500/40 bg-emerald-950/20 text-emerald-400 focus:outline-hidden focus:border-emerald-400 tracking-wider shadow-inner"
                    placeholder="e.g. MONO-8842-PRO"
                  />
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                        <span>نسخ الكود</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">
                  💡 يستطيع أي مهندس أو مصمم الانضمام للروم عبر إدخال الكود <strong className="text-[var(--text-primary)] font-mono">{roomCode}</strong> في صفحة الدخول.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setOnboardingStep(2)}
                disabled={!workspaceName.trim() || !roomCode.trim()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] text-xs font-bold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
              >
                <span>المتابعة لإضافة الشركات (Step 2)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Company Setup & Multi-Company Addition */}
        {onboardingStep === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                STEP 02 OF 03 • COMPANY SETUP
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                ما اسم شركتك؟ (ويمكنك إضافة أكثر من شركة وعميل)
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                يتيح لك MonoSpec إدارة مواصفات عدة شركات ومؤسسات في نفس مساحة العمل مع عزل البيانات وسياق الذكاء الاصطناعي لكل شركة.
              </p>
            </div>

            {/* List of Configured Companies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--text-secondary)]">
                  الشركات المضافة حالياً ({companyList.length})
                </span>
                <span className="text-[11px] text-[var(--text-muted)]">
                  يمكن التبديل بينهم في أي وقت
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {companyList.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between shadow-2xs group hover:border-[var(--border-strong)] transition-colors"
                  >
                    <div className="space-y-0.5 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[var(--text-primary)] truncate">
                          {comp.name}
                        </span>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)]">
                          {comp.code}
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] truncate">
                        {comp.nameAr || comp.industry}
                      </p>
                    </div>

                    {companyList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCompany(idx)}
                        title="حذف الشركة"
                        className="p-1 rounded-md text-[var(--text-muted)] hover:text-red-400 hover:bg-red-950/20 transition-colors shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form to Add Another Company */}
            <form
              onSubmit={handleAddCompany}
              className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] space-y-4"
            >
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-[var(--text-primary)]">
                  إضافة شركة جديدة (Add Another Company)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[var(--text-secondary)]">
                    اسم الشركة (English) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex FinTech Solutions"
                    value={newCompName}
                    onChange={(e) => setNewCompName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[var(--text-secondary)]">
                    اسم الشركة (بالعربية)
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: شركة حلول التقنية المالية"
                    value={newCompNameAr}
                    onChange={(e) => setNewCompNameAr(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[var(--text-secondary)]">
                    كود الشركة المميز (Code)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. APX (أقصى 5 أحرف)"
                    maxLength={5}
                    value={newCompCode}
                    onChange={(e) => setNewCompCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] font-mono uppercase focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[var(--text-secondary)]">
                    المجال أو القطاع (Industry)
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: مدفوعات، لوجستيات، تجارة"
                    value={newCompIndustry}
                    onChange={(e) => setNewCompIndustry(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newCompName.trim()}
                  className="px-4 py-2 rounded-lg bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] text-xs font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity"
                >
                  + حفظ وإضافة الشركة للقائمة
                </button>
              </div>
            </form>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setOnboardingStep(1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>الرجوع للخطوة 1</span>
              </button>

              <button
                type="button"
                onClick={() => setOnboardingStep(3)}
                disabled={companyList.length === 0}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] text-xs font-bold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
              >
                <span>المتابعة لمراحل المشروع (Step 3)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Project Stages & Recommendations */}
        {onboardingStep === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                STEP 03 OF 03 • PIPELINE STAGES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                إيه مراحل مشروعك؟
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                حدد المراحل التي يمر بها مشروعك البرمجي، مع إمكانية استخدام المراحل الموصى بها مسبقاً بما فيها تصميم اللوجو والهوية.
              </p>
            </div>

            {/* Recommended Stages Container */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[var(--text-primary)]">
                    المراحل المقترحة والموصى بها (Recommended Stages)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">
                    7 مراحل أساسية
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleSelectAllRecommended}
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] underline transition-colors"
                >
                  اختيار الكل (Select All)
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {RECOMMENDED_STAGES.map((stage) => {
                  const isChecked = chosenStageIds.includes(stage.id);
                  const isLogo = stage.id === 'logo';
                  const Icon = STAGE_ICON_MAP[stage.id] || Layers;

                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => handleToggleStage(stage.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isChecked
                          ? isLogo
                            ? 'border-emerald-500/60 bg-emerald-950/20 shadow-xs ring-1 ring-emerald-500/30'
                            : 'border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] shadow-xs'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                            isChecked
                              ? 'bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)]'
                              : 'bg-[var(--bg-surface)] text-[var(--text-muted)]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-[var(--text-primary)] truncate">
                              {stage.labelEn}
                            </span>
                            {isLogo && (
                              <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-1.5 py-0.2 rounded">
                                لوجو جديد
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[var(--text-muted)] truncate">
                            {stage.labelAr}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? 'bg-[var(--accent-contrast)] border-transparent text-[var(--accent-contrast-text)]'
                            : 'border-[var(--border-subtle)] bg-[var(--bg-surface)]'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add Custom Stage Form */}
            <form
              onSubmit={handleAddCustomStage}
              className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-wrap sm:flex-nowrap items-center gap-2"
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] shrink-0">
                <Plus className="w-4 h-4 text-[var(--text-muted)]" />
                <span>مرحلة إضافية:</span>
              </div>
              <input
                type="text"
                placeholder="Stage Name (e.g. Security Audit)"
                value={customStageLabel}
                onChange={(e) => setCustomStageLabel(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] focus:outline-hidden"
              />
              <input
                type="text"
                placeholder="بالعربية (اختياري)"
                value={customStageLabelAr}
                onChange={(e) => setCustomStageLabelAr(e.target.value)}
                className="w-36 px-3 py-1.5 text-xs rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] focus:outline-hidden"
              />
              <button
                type="submit"
                disabled={!customStageLabel.trim()}
                className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-xs font-medium text-[var(--text-primary)] disabled:opacity-40 transition-colors shrink-0"
              >
                + إضافة
              </button>
            </form>

            {/* Final Actions */}
            <div className="flex items-center justify-between pt-3">
              <button
                type="button"
                onClick={() => setOnboardingStep(2)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>الرجوع للخطوة 2</span>
              </button>

              <button
                type="button"
                onClick={handleFinishOnboarding}
                disabled={chosenStageIds.length === 0}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black tracking-wide uppercase transition-all shadow-lg shadow-emerald-500/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>إتمام الإعداد وإطلاق مساحة العمل (Launch Workspace)</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="h-12 border-t border-[var(--border-subtle)] px-6 flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
        <span>MonoSpec Onboarding Engine v2.4</span>
        <span>Secure Room Code Protection Enabled</span>
      </footer>
    </div>
  );
}
