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
    name: 'HealthTech & Biotech',
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
  } = useMonoSpecStore();

  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0]);
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleStartOnboarding = () => {
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
        setErrorMessage('Please fill in both name and email to proceed.');
        return;
      }
      setUserSession({
        id: `usr-${Date.now().toString(36)}`,
        name: nameInput.trim(),
        email: emailInput.trim(),
        role: 'Team Lead / Architect',
        workspaceId: '',
        isAuthenticated: true,
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
          setErrorMessage('Invalid team room code.');
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
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] selection:bg-[var(--selection-bg)] selection:text-[var(--selection-text)] overflow-x-hidden font-sans">
      {/* Top Universal Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]/80 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] flex items-center justify-center font-mono font-black text-base shadow-sm">
            M
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight">MonoSpec</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)] font-semibold">
                UNIVERSAL B2B
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] hidden sm:block">
              Enterprise Architecture & Specification OS for Any Company
            </p>
          </div>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-6 text-xs text-[var(--text-secondary)] font-medium">
          <a href="#pipeline" className="hover:text-[var(--text-primary)] transition-colors">
            Pipeline Stages
          </a>
          <a href="#industries" className="hover:text-[var(--text-primary)] transition-colors">
            Industries
          </a>
          <a href="#ingestion" className="hover:text-[var(--text-primary)] transition-colors">
            PDF & Drive Ingestion
          </a>
          <a href="#auth-portal" className="hover:text-[var(--text-primary)] transition-colors">
            Workspace Access
          </a>
        </div>

        {/* Right Nav Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleDirectDemoAccess}
            className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Live Demo
          </button>
          <a
            href="#auth-portal"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] text-xs font-semibold hover:opacity-90 transition-opacity shadow-xs"
          >
            <span>Start Free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-20 max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Glow backdrop subtle effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-zinc-500/10 via-zinc-400/5 to-transparent blur-3xl pointer-events-none rounded-full" />

        {/* Industry Agnostic Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xs mb-6 animate-in fade-in duration-300">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-medium text-[var(--text-secondary)]">
            مصممة لخدمة كافة القطاعات والشركات الناشئة والمؤسسية
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] font-bold">
            ANY INDUSTRY
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl text-[var(--text-primary)] leading-[1.12]">
          المنظومة الذكية لهندسة وتوثيق المشاريع البرمجية لأي شركة.
        </h1>

        <p className="mt-6 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          قم بصياغة المعمارية التقنية، تصميم الشعار والهوية، واجهات Figma، أكواد البرمجة، اختبارات الجودة، وخطط التشغيل — مع تدريب النموذج الذكي على ملفات الـ PDF ولينكات Google Drive ومشاركتها مع فريقك بكود غرفة مميز.
        </p>

        {/* Hero CTA buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleStartOnboarding}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-contrast)] text-[var(--accent-contrast-text)] text-sm font-semibold hover:opacity-95 transition-all shadow-md group"
          >
            <Users className="w-4 h-4" />
            <span>إنشاء مساحة عمل للتيم (Workspace)</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="#auth-portal"
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-sm font-medium text-[var(--text-primary)] transition-colors shadow-xs"
          >
            <KeyRound className="w-4 h-4 text-emerald-400" />
            <span>تسجيل دخول بكود الروم</span>
          </a>

          <button
            onClick={handleDirectDemoAccess}
            className="flex items-center gap-1.5 px-4 py-3 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)] text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <span>استعراض تجريبي مباشر</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* High-Level Feature Badges */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-4xl text-left">
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xs">
            <div className="text-xl font-bold font-mono text-[var(--text-primary)]">7 مراحل</div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              من التحليل الفني واللوجو حتى الدعم والـ DevOps
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xs">
            <div className="text-xl font-bold font-mono text-[var(--text-primary)]">PDF & Drive</div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              تحليل وفهم ملفات ومجلدات درايف واستخراج المتطلبات
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xs">
            <div className="text-xl font-bold font-mono text-[var(--text-primary)]">Room Codes</div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              كود غرفة مميز لكل مساحة عمل لدعوة الفريق فوراً
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xs">
            <div className="text-xl font-bold font-mono text-[var(--text-primary)]">Multi-Company</div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              إدارة أكثر من شركة وعميل في نفس مساحة العمل
            </p>
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
              مراحل المشروع الشاملة (مع مرحلة تصميم اللوجو والهوية)
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              كل مرحلة مدعومة بنماذج ذكاء اصطناعي تفهم المعمارية الفنية والتصميم الهندسي
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
                      ? 'border-emerald-500/40 bg-radial from-emerald-950/20 to-[var(--bg-surface)] shadow-md ring-1 ring-emerald-500/30'
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
                          جديد New
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[var(--text-primary)]">
                        {stg.labelEn}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] font-medium mt-0.5">
                        {stg.labelAr}
                      </p>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {stg.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                    <span>Stage 0{stg.index}</span>
                    <span className="text-emerald-500 flex items-center gap-1 font-sans">
                      <CheckCircle2 className="w-3 h-3" /> جاهز
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
            كيف يتكيف MonoSpec مع أي شركة وأي مجال؟
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            اختر قطاع عملك وشاهد كيف يولد النظام متطلبات المعمارية والامتثال بدقة فائقة
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
                <span>{ind.name}</span>
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
                  {selectedIndustry.name}
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  {selectedIndustry.nameAr}
                </p>
              </div>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {selectedIndustry.summary}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider font-mono">
                معايير الامتثال المدمجة:
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
  timestamp: ${Date.now()};
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
              رفع ملفات PDF ولينكات Google Drive وتحليلها بعمق
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              يتعرف النموذج على المتطلبات الوظيفية، جداول البيانات، وتفاصيل الأمان من أي مستند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-950/40 text-red-400 border border-red-500/20 flex items-center justify-center font-mono font-bold text-sm">
                PDF
              </div>
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                ملفات PDF والمواصفات الفنية
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                ارفع كراسات الشروط، عقود البرمجة، والـ SRS بصيغة PDF ليتم تفكيكها وتحليل جداولها ومتطلباتها فوراً.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950/40 text-blue-400 border border-blue-500/20 flex items-center justify-center font-mono font-bold text-sm">
                DRIVE
              </div>
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                لينكات ومجلدات Google Drive
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                الصق لينك أي فولدر أو مستند من Google Drive ليقوم النظام بقراءة المحتويات ومزامنتها مع نموذج الذكاء الاصطناعي.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-mono font-bold text-sm">
                AI
              </div>
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                تحليل وفهم عميق للبيانات
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                استخراج الكيانات (Entities)، قيود الأمان، متطلبات الامتثال، وتوليد مواصفات مطابقة 100% لمعايير شركتك.
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
              {authMode === 'signup' ? 'إنشاء حساب ومساحة عمل جديدة' : 'تسجيل الدخول إلى مساحة العمل'}
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              {authMode === 'signup'
                ? 'ابدأ بإعداد مساحة عمل فريقك بكود غرفة مميز وإضافة شركتك'
                : 'أدخل كود الغرفة (Room Code) أو بريدك الإلكتروني للوصول إلى مشاريعك'}
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
              <span>تسجيل جديد (Sign Up)</span>
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
              <span>تسجيل دخول (Sign In)</span>
            </button>
          </div>

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
                  الاسم الكامل / Name
                </label>
                <input
                  type="text"
                  placeholder="مثال: م. نهال كمال / Nehal Kamal"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-hidden focus:border-[var(--border-strong)]"
                  required
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="font-semibold text-[var(--text-secondary)]">
                البريد الإلكتروني / Work Email
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
                    كود الغرفة / Team Room Code (اختياري)
                  </label>
                  <span className="text-[10px] font-mono text-emerald-400">مثال: MONO-8842-PRO</span>
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
                  ? 'متابعة لإعداد مساحة العمل والشركات ←'
                  : 'دخول مساحة العمل ←'}
              </span>
            </button>

            <div className="pt-2 text-center border-t border-[var(--border-subtle)]">
              <button
                type="button"
                onClick={handleDirectDemoAccess}
                className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors underline underline-offset-2"
              >
                أو الدخول مباشرة كزائر لاستكشاف المشاريع الحالية
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
          مهيأة لجميع القطاعات والشركات مع دعم كامل للغة العربية والإنجليزية.
        </p>
      </footer>
    </div>
  );
}
