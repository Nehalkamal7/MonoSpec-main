'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Users,
  KeyRound,
  FileText,
  Palette,
  Terminal,
  CheckSquare,
  Server,
  Database,
  ExternalLink,
  Layers,
  ChevronRight,
  Copy,
  Check,
  Zap,
  Globe,
  Lock,
  Cpu,
  LogIn,
  UserPlus,
  Briefcase,
  TrendingUp,
  Workflow,
  Clock,
  CheckCheck,
  AlertCircle,
  Code2,
  FolderOpen,
} from 'lucide-react';
import { useMonoSpecStore } from '@/store/useMonoSpecStore';
import { STAGES } from '@/lib/constants';

const INDUSTRIES = [
  {
    id: 'fintech',
    name: 'FinTech & Banking',
    nameAr: 'التكنولوجيا المالية والمدفوعات',
    icon: '💳',
    summary: 'Sub-second POS transactions, EMV Level 2 contactless kernels, and SAMA/PCI-CPoC compliance.',
    badge: 'PCI-DSS & DUKPT',
    sampleOutput: 'ISO 8583 SoftPOS Handshake + DUKPT Key Derivation Engine',
  },
  {
    id: 'logistics',
    name: 'Logistics & Supply Chain',
    nameAr: 'اللوجستيات وسلاسل الإمداد',
    icon: '🚚',
    summary: 'Autonomous freight brokerage, GPS fleet telemetry, and automated ZATCA customs clearance.',
    badge: 'ZATCA Phase-2 Validated',
    sampleOutput: 'Kafka Event Bus: freight.telemetry.ingest (Sub-120ms P99)',
  },
  {
    id: 'healthtech',
    name: 'HealthTech & Medical',
    nameAr: 'الرعاية الصحية والتقنية الطبية',
    icon: '🏥',
    summary: 'HL7/FHIR health record interoperability, HIPAA encrypted medical data, and clinician workflows.',
    badge: 'HIPAA & HL7 FHIR',
    sampleOutput: 'EHR Encryption Boundary with Zero-Knowledge Patient Identifiers',
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce & Retail',
    nameAr: 'التجارة الإلكترونية والتجزئة',
    icon: '🛒',
    summary: 'Headless commerce graph, edge-cached carts, omnichannel POS synchronization, and 1-click checkout.',
    badge: 'Next.js 16 Edge Graph',
    sampleOutput: 'GraphQL Federation for Cart Mutation with Zero Layout Shift',
  },
  {
    id: 'govtech',
    name: 'GovTech & Sovereign Cloud',
    nameAr: 'القطاع الحكومي والسيادي',
    icon: '🏛️',
    summary: 'KSA sovereign cloud data localization, CITC regulations, and NCA Essential Cybersecurity Controls.',
    badge: 'NCA ECC-1:2018 Standard',
    sampleOutput: 'Multi-AZ Sovereign Cloud Deployment with Hardware Security Modules',
  },
  {
    id: 'ai_saas',
    name: 'AI & Big Data SaaS',
    nameAr: 'الذكاء الاصطناعي ومنصات السحاب',
    icon: '⚡',
    summary: 'Vector embeddings, autonomous RAG pipelines, microservices, and distributed streaming telemetries.',
    badge: 'Real-time Vector RAG',
    sampleOutput: 'Multi-Tenant Agentic Pipeline with OpenTelemetry Tracing',
  },
];

export function UniversalLandingPage() {
  const {
    setActiveView,
    setOnboardingStep,
    joinWorkspaceByRoomCode,
    setUserSession,
    locale,
    toggleLocale,
    accountType,
    setAccountType,
  } = useMonoSpecStore();

  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0]);
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');
  const [targetAccountType, setTargetAccountType] = useState<'enterprise' | 'freelancer'>('enterprise');
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isArabic = locale === 'ar';

  const handleStartOnboarding = (type: 'enterprise' | 'freelancer' = 'enterprise') => {
    setAccountType(type);
    setOnboardingStep(1);
    setActiveView('onboarding');
  };

  const handleDirectDemoAccess = () => {
    setActiveView('workspace');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (authMode === 'signup') {
      if (!nameInput.trim() || !emailInput.trim()) {
        setErrorMessage(isArabic ? 'يرجى كتابة الاسم والبريد الإلكتروني للمتابعة.' : 'Please enter your name and email.');
        return;
      }
      setAccountType(targetAccountType);
      setUserSession({
        id: `usr-${Date.now().toString(36)}`,
        name: nameInput.trim(),
        email: emailInput.trim(),
        role: targetAccountType === 'freelancer' ? 'Independent Consultant' : 'Enterprise Architect',
        workspaceId: '',
        isAuthenticated: true,
        accountType: targetAccountType,
      });
      // Route to step 1 of onboarding wizard
      setOnboardingStep(1);
      setActiveView('onboarding');
    } else {
      // Sign in via Room code or email
      if (roomCodeInput.trim()) {
        const success = joinWorkspaceByRoomCode(roomCodeInput.trim());
        if (success) {
          setUserSession({
            id: `usr-${Date.now().toString(36)}`,
            name: nameInput.trim() || 'Team Member',
            email: emailInput.trim() || 'member@enterprise.internal',
            role: 'Collaborator',
            workspaceId: roomCodeInput.trim(),
            isAuthenticated: true,
          });
          setActiveView('workspace');
        } else {
          setErrorMessage(isArabic ? 'كود الغرفة غير صحيح.' : 'Invalid team room code.');
        }
      } else {
        // Direct login
        setUserSession({
          id: `usr-${Date.now().toString(36)}`,
          name: nameInput.trim() || 'Enterprise Architect',
          email: emailInput.trim() || 'architect@enterprise.internal',
          role: 'Architect',
          workspaceId: 'ws-default',
          isAuthenticated: true,
        });
        setActiveView('workspace');
      }
    }
  };

  return (
    <div className={`min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] selection:bg-[var(--selection-bg)] selection:text-[var(--selection-text)] overflow-x-hidden font-sans ${isArabic ? 'rtl' : 'ltr'}`}>
      {/* Top Universal Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]/85 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] flex items-center justify-center font-mono font-black text-base shadow-sm">
            M
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight">MonoSpec</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 font-bold">
                ENTERPRISE & FREELANCERS
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] hidden sm:block">
              {isArabic
                ? 'منظومة المعمارية والمواصفات لأي شركة وفريلانسر'
                : 'Architecture & Specifications OS for Any Enterprise & Freelancer'}
            </p>
          </div>
        </div>

        {/* Center Links */}
        <div className="hidden lg:flex items-center gap-6 text-xs text-[var(--text-secondary)] font-medium">
          <a href="#how-it-works" className="hover:text-[var(--text-primary)] transition-colors">
            {isArabic ? 'كيف يسهل عملك؟' : 'How It Simplifies Work'}
          </a>
          <a href="#freelancers" className="hover:text-[var(--text-primary)] transition-colors text-emerald-400 font-semibold">
            {isArabic ? 'للفريلانسرز والمستقلين' : 'For Freelancers'}
          </a>
          <a href="#pipeline" className="hover:text-[var(--text-primary)] transition-colors">
            {isArabic ? 'المراحل (شاملاً اللوجو)' : '7-Stage Pipeline'}
          </a>
          <a href="#industries" className="hover:text-[var(--text-primary)] transition-colors">
            {isArabic ? 'القطاعات والشركات' : 'Industries'}
          </a>
          <a href="#ingestion" className="hover:text-[var(--text-primary)] transition-colors">
            {isArabic ? 'رفع PDF و درايف' : 'PDF & Drive'}
          </a>
        </div>

        {/* Right Nav Actions (with prominent E / ع button!) */}
        <div className="flex items-center gap-2">
          {/* Prominent Language Switcher Button (E / ع) */}
          <button
            onClick={toggleLocale}
            title={isArabic ? 'Switch to English' : 'التحويل للغة العربية'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-900/30 text-emerald-400 text-xs font-bold transition-all shadow-xs group"
          >
            <Globe className="w-3.5 h-3.5" />
            <div className="flex items-center font-mono font-black text-sm">
              <span className={isArabic ? 'text-white' : 'opacity-40'}>ع</span>
              <span className="opacity-30 mx-0.5">/</span>
              <span className={!isArabic ? 'text-white' : 'opacity-40'}>E</span>
            </div>
          </button>

          <button
            onClick={handleDirectDemoAccess}
            className="hidden sm:inline-flex px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            {isArabic ? 'معاينة مباشرة' : 'Live Demo'}
          </button>

          <a
            href="#auth-portal"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] text-xs font-semibold hover:opacity-90 transition-opacity shadow-xs"
          >
            <span>{isArabic ? 'ابدأ مجاناً' : 'Get Started'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>

      {/* Hero Section with Dual Personas (Companies & Freelancers) */}
      <section className="relative px-6 pt-16 pb-20 max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Glow backdrop subtle effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[320px] bg-gradient-to-tr from-emerald-500/10 via-zinc-400/5 to-transparent blur-3xl pointer-events-none rounded-full" />

        {/* Dual Persona Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xs mb-6 animate-in fade-in duration-300">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-medium text-[var(--text-secondary)]">
            {isArabic
              ? 'سواء كنت شركة ناشئة، مؤسسة كبرى، أو فريلانسر مستقل يدير عملاءه'
              : 'Built for enterprise teams, high-growth startups, and solo freelancers'}
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-bold">
            FOR ALL SIZES
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl text-[var(--text-primary)] leading-[1.14]">
          {isArabic ? (
            <>
              حوّل فكرة مشروعك إلى <span className="underline decoration-emerald-500/50 underline-offset-8">مواصفات معمارية متكاملة</span> وشعار وهوية في دقائق.
            </>
          ) : (
            <>
              Turn complex projects into <span className="underline decoration-emerald-500/50 underline-offset-8">precision architecture specs</span> & brand identity in minutes.
            </>
          )}
        </h1>

        <p className="mt-6 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          {isArabic
            ? 'من التحليل الفني، تصميم الشعار، واجهات Figma، أكواد البرمجة، وحتى اختبارات الجودة والدعم. مع تدريب المودل على ملفات PDF ولينكات Google Drive ومشاركة كود الروم للعملاء والتيم.'
            : 'Automate SRS, logo vectors, Figma tokens, backend APIs, BDD test suites, and SRE runbooks. Conditioned on your custom PDFs & Google Drive files with shareable room codes.'}
        </p>

        {/* Hero CTA buttons (Enterprise Team + Freelancer Studio) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => handleStartOnboarding('enterprise')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] text-xs sm:text-sm font-bold hover:opacity-95 transition-all shadow-md group"
          >
            <Building2 className="w-4 h-4" />
            <span>{isArabic ? 'إنشاء مساحة عمل للشركات والتيم' : 'Create Enterprise Workspace'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => handleStartOnboarding('freelancer')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-emerald-500/50 bg-emerald-950/20 hover:bg-emerald-900/30 text-emerald-400 text-xs sm:text-sm font-bold transition-all shadow-xs group"
          >
            <Briefcase className="w-4 h-4" />
            <span>{isArabic ? 'تسجيل حساب كـ فريلانسر / مستقل' : 'Sign Up as Freelancer'}</span>
          </button>

          <a
            href="#auth-portal"
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-xs sm:text-sm font-medium text-[var(--text-primary)] transition-colors shadow-xs"
          >
            <KeyRound className="w-4 h-4 text-emerald-400" />
            <span>{isArabic ? 'دخول بكود الروم' : 'Join via Room Code'}</span>
          </a>
        </div>

        {/* Visual Metric Highlights */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-4xl text-left">
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xs">
            <div className="text-xl font-bold font-mono text-[var(--text-primary)]">10x Faster</div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              {isArabic ? 'تسليم متطلبات ومواصفات المشاريع للعملاء' : 'Speed in client spec delivery'}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xs">
            <div className="text-xl font-bold font-mono text-emerald-400">7 مراحل</div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              {isArabic ? 'بما فيها مرحلة اللوجو والهوية البصرية' : 'Complete with Logo & Brand stage'}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xs">
            <div className="text-xl font-bold font-mono text-[var(--text-primary)]">PDF & Drive</div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              {isArabic ? 'فهم عميق للجداول والكيانات والامتثال' : 'Deep parsing of documents & links'}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xs">
            <div className="text-xl font-bold font-mono text-[var(--text-primary)]">Room Codes</div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              {isArabic ? 'غرف خاصة لكل تيم أو لكل عميل' : 'Unique codes per client / team'}
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT SIMPLIFIES YOUR WORK (ازاي دا هيسهل شغلك - رسومات ومقارنة بصرية) */}
      <section id="how-it-works" className="px-6 py-16 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/40">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
              WORKFLOW TRANSFORMATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isArabic ? 'ازاي MonoSpec هيسهل شغلك ويوفر 80% من وقتك؟' : 'How MonoSpec Simplifies Your Entire Workflow'}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              {isArabic
                ? 'مقارنة بين الطريقة التقليدية المرهقة في توثيق المشاريع وبناء الهوية وبين منظومة MonoSpec الذكية'
                : 'See the difference between tedious traditional manual specs and the automated MonoSpec pipeline'}
            </p>
          </div>

          {/* Before vs After Visual Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old Way (قبل) */}
            <div className="p-6 rounded-2xl border border-red-500/20 bg-red-950/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-red-500/20">
                <span className="font-bold text-sm text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{isArabic ? 'الطريقة التقليدية القديمة (تستغرق أسابيع)' : 'Traditional Workflow (Weeks of Chaos)'}</span>
                </span>
                <span className="text-[10px] font-mono text-red-400 bg-red-950/40 px-2 py-0.5 rounded">بطيئة ومكلفة</span>
              </div>
              <ul className="space-y-3 text-xs text-[var(--text-secondary)]">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 shrink-0 mt-0.5">✕</span>
                  <span><strong>تشتت الملفات:</strong> كراسات الشروط في ملفات Word و PDF مبعثرة لا يفهمها المطورون.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 shrink-0 mt-0.5">✕</span>
                  <span><strong>تصميم اللوجو منفصل:</strong> مصمم الهوية يعمل بمعزل عن واجهات الـ UI وبدون باليتة ألوان دقيقة للشاشات.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 shrink-0 mt-0.5">✕</span>
                  <span><strong>أخطاء الـ APIs والمعمارية:</strong> غياب مخططات الـ ERD والتدفقات، مما يسبب إعادة كتابة الكود لاحقاً.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 shrink-0 mt-0.5">✕</span>
                  <span><strong>صعوبة مشاركة العميل:</strong> إرسال ملفات ضخمة بالإيميل بدون روم كود موحد ولا متابعة حية.</span>
                </li>
              </ul>
            </div>

            {/* The MonoSpec Way (مع MonoSpec) */}
            <div className="p-6 rounded-2xl border border-emerald-500/40 bg-radial from-emerald-950/20 to-[var(--bg-surface)] space-y-4 shadow-lg ring-1 ring-emerald-500/30">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
                <span className="font-bold text-sm text-emerald-400 flex items-center gap-2">
                  <CheckCheck className="w-4 h-4" />
                  <span>{isArabic ? 'مع منظومة MonoSpec (في دقائق معدودة)' : 'The MonoSpec Platform (Instant & Precision)'}</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">دقة 100%</span>
              </div>
              <ul className="space-y-3 text-xs text-[var(--text-primary)]">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                  <span><strong>سحب الـ PDF ولينكات درايف:</strong> يحلل النظام المستند تلقائياً ويستخرج الجداول والـ APIs فوراً.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                  <span><strong>مرحلة الشعار والهوية المدمجة:</strong> توليد شعار هندسي SVG فوري مع باليتة الألوان للشاشات الداكنة.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                  <span><strong>تصدير لـ Figma وكود جاهز:</strong> توكنز التصميم ومخططات Mermaid وأكواد Next.js بنقرة واحدة.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                  <span><strong>كود روم مميز لكل تيم وعميل:</strong> يدخل العميل أو التيم برمز الروم ليرى كل مراحل مشروعه تفاعلياً.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 3-Step Visual Workflow Illustration */}
          <div className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-md">
            <h3 className="font-bold text-base text-center mb-6 text-[var(--text-primary)]">
              {isArabic ? 'رحلة المشروع بثلاث خطوات سهلة' : 'Simple 3-Step Execution Journey'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 text-center p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] flex items-center justify-center font-mono font-bold mx-auto text-sm">
                  1
                </div>
                <h4 className="font-bold text-xs text-[var(--text-primary)]">
                  {isArabic ? 'ارفع كراسة الشروط أو لينك درايف' : 'Upload PDF or Drive Link'}
                </h4>
                <p className="text-[11px] text-[var(--text-muted)]">
                  {isArabic ? 'يقوم المودل بتفكيك المتطلبات والقوانين واستخراج نماذج البيانات' : 'AI parses tables, entities, and compliance boundaries'}
                </p>
              </div>

              <div className="space-y-2 text-center p-4 rounded-xl bg-[var(--bg-canvas)] border border-emerald-500/30">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-black flex items-center justify-center font-mono font-bold mx-auto text-sm">
                  2
                </div>
                <h4 className="font-bold text-xs text-emerald-400">
                  {isArabic ? 'توليد الشعار وجميع المراحل السبع' : 'Generate Logo & 7 Stages'}
                </h4>
                <p className="text-[11px] text-[var(--text-muted)]">
                  {isArabic ? 'تصميم اللوجو، هندسة الـ APIs، تصاميم Figma، واختبارات الـ QA' : 'Instant SVG brand mark, API routes, tokens, and test suites'}
                </p>
              </div>

              <div className="space-y-2 text-center p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] flex items-center justify-center font-mono font-bold mx-auto text-sm">
                  3
                </div>
                <h4 className="font-bold text-xs text-[var(--text-primary)]">
                  {isArabic ? 'شارك الروم كود مع العميل أو التيم' : 'Share Room Code With Client'}
                </h4>
                <p className="text-[11px] text-[var(--text-muted)]">
                  {isArabic ? 'دخول فوري بكود الغرفة لمراجعة المشروع وتصدير كافة المخرجات' : 'Instant collaboration with live preview & export'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEDICATED FREELANCER SECTION (لو فري لانسر يقدر يعمل حساب عندنا) */}
      <section id="freelancers" className="px-6 py-16 border-t border-[var(--border-subtle)] max-w-6xl mx-auto space-y-8">
        <div className="p-8 sm:p-10 rounded-3xl border border-emerald-500/30 bg-radial from-emerald-950/30 via-zinc-950 to-black shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 text-xs font-semibold">
                <Briefcase className="w-3.5 h-3.5" />
                <span>{isArabic ? 'حل مخصص للمستقلين والفريلانسرز' : 'Dedicated for Freelancers & Consultants'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {isArabic ? 'فريلانسر؟ سلّم عملاءك مشاريع بمستوى استشاري في ساعات.' : 'Freelancing? Deliver Fortune-500 Specs to Your Clients.'}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {isArabic
                  ? 'بصفتك مستقلاً، يتيح لك MonoSpec إنشاء مساحة عمل خاصة بك وإضافة كل عميل كـ شركة منفصلة بكود روم خاص به. يمكنك توليد الشعار، كراسة الشروط الفنية، وهندسة قاعدة البيانات، وتقديم رابط تفاعلي يبهر العميل ويضمن موافقته السريعة.'
                  : 'As an independent architect or developer, create isolated workspaces per client with branded room codes. Deliver professional specs, SVG logo concepts, and schemas that win high-ticket contracts.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-200 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>إدارة مشاريع عدة عملاء في شاشة واحدة</span>
                </div>
                <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-200 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>تسليم كود روم للعميل لمراجعة المشروع</span>
                </div>
                <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-200 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>توليد اللوجو والهوية وكود الـ APIs معاً</span>
                </div>
                <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-200 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>توفير تكلفة ومجهود 5 استشاريين</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleStartOnboarding('freelancer')}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs sm:text-sm font-extrabold tracking-wide uppercase transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>{isArabic ? 'سجل حسابك كـ فريلانسر الآن (مجاناً)' : 'Start as a Freelancer Free'}</span>
                </button>
              </div>
            </div>

            {/* Freelancer Visual Preview Card */}
            <div className="lg:col-span-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 font-mono text-xs space-y-3 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  FREELANCER STUDIO
                </span>
                <span>ROOM: CLIENT-7749</span>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                  <span className="text-white font-bold">Client: Al-Riyadh Logistics</span>
                  <span className="text-emerald-400">7/7 Stages Done</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                  <span className="text-white font-bold">Client: Dubai HealthTech Core</span>
                  <span className="text-zinc-400">In Review</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                  <span className="text-white font-bold">Client: Fintech SoftPOS Wallet</span>
                  <span className="text-emerald-400">Logo & Spec Approved</span>
                </div>
              </div>
              <p className="text-[10px] text-zinc-500 text-center pt-1">
                كل عميل له كود غرفة مخصص يرى فيه شعاره ومواصفاته الفنية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 7 Stages Pipeline Section */}
      <section id="pipeline" className="px-6 py-16 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/50">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] font-bold">
              PIPELINE WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {isArabic ? 'مراحل خط الإنتاج الشاملة (7 مراحل متكاملة)' : 'Full 7-Stage Architectural Pipeline'}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              {isArabic
                ? 'متضمنة مرحلة تصميم الشعار والهوية البصرية الجديدة مع المعاينة الحية'
                : 'Including the new Logo & Brand Identity stage with live SVG vector preview'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {STAGES.map((stg) => {
              const isLogo = stg.id === 'logo';
              return (
                <div
                  key={stg.id}
                  className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                    isLogo
                      ? 'border-emerald-500/50 bg-radial from-emerald-950/20 to-[var(--bg-surface)] shadow-md ring-1 ring-emerald-500/30'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xs'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[var(--text-muted)]">
                        {stg.badge}
                      </span>
                      {isLogo && (
                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                          {isArabic ? 'مرحلة اللوجو الجديدة' : 'New Logo Stage'}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[var(--text-primary)]">
                        {isArabic ? stg.labelAr : stg.labelEn}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] font-medium mt-0.5">
                        {isArabic ? stg.labelEn : stg.labelAr}
                      </p>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {stg.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                    <span>Stage 0{stg.index}</span>
                    <span className="text-emerald-500 flex items-center gap-1 font-sans">
                      <CheckCircle2 className="w-3 h-3" /> {isArabic ? 'جاهز' : 'Active'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic Industry Switcher Section */}
      <section id="industries" className="px-6 py-16 border-t border-[var(--border-subtle)] max-w-6xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] font-bold">
            UNIVERSAL DOMAIN ADAPTABILITY
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {isArabic ? 'كيف يتكيف MonoSpec مع أي شركة وأي مجال؟' : 'How MonoSpec Adapts to Any Company & Industry'}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            {isArabic ? 'اختر قطاع عملك وشاهد كيف يولد النظام متطلبات المعمارية والامتثال بدقة' : 'Select your domain to see customized architecture outputs'}
          </p>
        </div>

        {/* Industry Pill Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {INDUSTRIES.map((ind) => {
            const isSelected = selectedIndustry.id === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(ind)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] border-transparent shadow-sm'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
                }`}
              >
                <span>{ind.icon}</span>
                <span>{isArabic ? ind.nameAr : ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Card */}
        <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">{selectedIndustry.icon}</span>
              <div>
                <h3 className="font-bold text-lg text-[var(--text-primary)]">
                  {isArabic ? selectedIndustry.nameAr : selectedIndustry.name}
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  {isArabic ? selectedIndustry.name : selectedIndustry.nameAr}
                </p>
              </div>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {selectedIndustry.summary}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider font-mono">
                {isArabic ? 'معايير الامتثال المدمجة:' : 'Embedded Compliance Standards:'}
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] text-[var(--text-primary)]">
                  {selectedIndustry.badge}
                </span>
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" /> Zero-Trust Verified
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--code-bg)] p-4 text-xs font-mono space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)] text-[10px] text-[var(--text-muted)]">
              <span>GENERATED SPEC ARCHITECTURE PREVIEW</span>
              <span className="text-emerald-400">READY</span>
            </div>
            <pre className="text-xs text-[var(--text-primary)] leading-relaxed overflow-x-auto whitespace-pre-wrap">
              {`// Architecture Invariant Contract
export interface DomainSpecification {
  domain: "${selectedIndustry.id}";
  specModel: "${selectedIndustry.sampleOutput}";
  latencyP99: "< 85ms";
  complianceGate: "${selectedIndustry.badge}";
  timestamp: 1728950400000;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* PDF & Google Drive Ingestion Feature Section */}
      <section id="ingestion" className="px-6 py-16 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/30">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] font-bold">
              AI INGESTION & TRAINING
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {isArabic ? 'رفع ملفات PDF ولينكات Google Drive وتحليلها وفهمها بعمق' : 'PDF & Google Drive Deep AI Ingestion Engine'}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              {isArabic ? 'يتعرف النموذج على المتطلبات الوظيفية، جداول البيانات، وتفاصيل الأمان من أي مستند' : 'Extract schemas, business rules, and security gates from any uploaded spec'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-950/40 text-red-400 border border-red-500/20 flex items-center justify-center font-mono font-bold text-sm">
                PDF
              </div>
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                {isArabic ? 'ملفات PDF والمواصفات الفنية' : 'PDF Technical Specs & RFPs'}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {isArabic
                  ? 'ارفع كراسات الشروط، عقود البرمجة، والـ SRS بصيغة PDF ليتم تفكيكها وتحليل جداولها ومتطلباتها فوراً.'
                  : 'Upload RFPs, contracts, and SRS PDFs to extract schemas and requirement matrices.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950/40 text-blue-400 border border-blue-500/20 flex items-center justify-center font-mono font-bold text-sm">
                DRIVE
              </div>
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                {isArabic ? 'لينكات ومجلدات Google Drive' : 'Google Drive Folders & Links'}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {isArabic
                  ? 'الصق لينك أي مجلد أو مستند من Google Drive ليقوم النظام بقراءة المحتويات ومزامنتها مع نموذج الذكاء الاصطناعي.'
                  : 'Paste any shared Drive folder link to scan documents and synchronize architecture context.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-mono font-bold text-sm">
                AI
              </div>
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                {isArabic ? 'تحليل وفهم عميق للبيانات' : 'Deep Semantic Reasoning'}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {isArabic
                  ? 'استخراج الكيانات (Entities)، قيود الأمان، متطلبات الامتثال، وتوليد مواصفات مطابقة 100% لمعايير شركتك.'
                  : 'Extract data entities, security invariant rules, and generate code blueprints.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Portal & Workspace Access (Sign In / Sign Up) */}
      <section id="auth-portal" className="px-6 py-20 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/80">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] flex items-center justify-center font-mono font-black text-xl mx-auto shadow-md">
              M
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {authMode === 'signup'
                ? (isArabic ? 'إنشاء حساب ومساحة عمل جديدة' : 'Create New Account & Workspace')
                : (isArabic ? 'تسجيل الدخول إلى مساحة العمل' : 'Sign In to Workspace')}
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              {authMode === 'signup'
                ? (isArabic ? 'ابدأ بإعداد مساحة عمل فريقك أو حسابك كفريلانسر بكود غرفة مميز' : 'Setup your team room or freelancer studio with a room code')
                : (isArabic ? 'أدخل كود الغرفة (Room Code) أو بريدك الإلكتروني للوصول إلى مشاريعك' : 'Enter your room code or email to access your projects')}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex p-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]">
            <button
              onClick={() => {
                setAuthMode('signup');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'signup'
                  ? 'bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{isArabic ? 'تسجيل جديد (Sign Up)' : 'Sign Up'}</span>
            </button>
            <button
              onClick={() => {
                setAuthMode('signin');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'signin'
                  ? 'bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isArabic ? 'تسجيل دخول (Sign In)' : 'Sign In'}</span>
            </button>
          </div>

          {/* Persona selector on signup */}
          {authMode === 'signup' && (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setTargetAccountType('enterprise')}
                className={`py-2 px-3 rounded-xl border text-center font-medium transition-all ${
                  targetAccountType === 'enterprise'
                    ? 'border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] ring-1 ring-[var(--border-strong)] font-bold'
                    : 'border-[var(--border-subtle)] text-[var(--text-muted)]'
                }`}
              >
                {isArabic ? '🏢 شركة / فريق عمل' : '🏢 Enterprise Team'}
              </button>
              <button
                type="button"
                onClick={() => setTargetAccountType('freelancer')}
                className={`py-2 px-3 rounded-xl border text-center font-medium transition-all ${
                  targetAccountType === 'freelancer'
                    ? 'border-emerald-500/60 bg-emerald-950/30 text-emerald-400 ring-1 ring-emerald-500/30 font-bold'
                    : 'border-[var(--border-subtle)] text-[var(--text-muted)]'
                }`}
              >
                {isArabic ? '💼 مستقل / فريلانسر' : '💼 Solo Freelancer'}
              </button>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleAuthSubmit}
            className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] shadow-xl space-y-4 text-xs"
          >
            {errorMessage && (
              <div className="p-3 rounded-lg border border-red-500/30 bg-red-950/30 text-red-300 text-xs">
                {errorMessage}
              </div>
            )}

            {authMode === 'signup' && (
              <div className="space-y-1">
                <label className="font-semibold text-[var(--text-secondary)]">
                  {isArabic ? 'الاسم الكامل / Name' : 'Full Name'}
                </label>
                <input
                  type="text"
                  placeholder={isArabic ? 'مثال: م. نهال كمال / Nehal Kamal' : 'e.g. Alex Morgan'}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-hidden focus:border-[var(--border-strong)]"
                  required
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="font-semibold text-[var(--text-secondary)]">
                {isArabic ? 'البريد الإلكتروني / Work Email' : 'Email Address'}
              </label>
              <input
                type="email"
                placeholder="architect@yourcompany.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-hidden focus:border-[var(--border-strong)]"
                required
              />
            </div>

            {authMode === 'signin' && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-[var(--text-secondary)]">
                    {isArabic ? 'كود الغرفة / Team Room Code (اختياري)' : 'Team Room Code (Optional)'}
                  </label>
                  <span className="text-[10px] font-mono text-emerald-400">e.g. MONO-8842-PRO</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. MONO-8842-PRO"
                  value={roomCodeInput}
                  onChange={(e) => setRoomCodeInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] font-mono uppercase focus:outline-hidden focus:border-[var(--border-strong)]"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-xs"
            >
              <span>
                {authMode === 'signup'
                  ? (isArabic ? 'متابعة لإعداد مساحة العمل والشركات ←' : 'Continue to Workspace Setup →')
                  : (isArabic ? 'دخول مساحة العمل ←' : 'Enter Workspace →')}
              </span>
            </button>

            <div className="pt-2 text-center border-t border-[var(--border-subtle)]">
              <button
                type="button"
                onClick={handleDirectDemoAccess}
                className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors underline underline-offset-2"
              >
                {isArabic
                  ? 'أو الدخول مباشرة كزائر لاستكشاف المشاريع الحالية'
                  : 'Or enter directly as guest to explore active projects'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-center text-xs text-[var(--text-muted)] space-y-2">
        <p className="font-mono text-[11px]">
          MonoSpec Universal Architecture Engine • Precision in Every Spec
        </p>
        <p className="text-[11px]">
          {isArabic
            ? 'مهيأة لجميع الشركات والفريلانسرز مع دعم كامل للغتين العربية والإنجليزية.'
            : 'Engineered for enterprises and independent freelancers with full bilingual Arabic & English support.'}
        </p>
      </footer>
    </div>
  );
}
