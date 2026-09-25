import React, { useState, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { InteractiveGrid } from '../components/InteractiveGrid'
import { 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Shield, 
  Lock, 
  Users, 
  ChevronDown, 
  Play, 
  Pause, 
  ArrowRight, 
  Layers, 
  Activity, 
  FileCode2, 
  Zap,
  HelpCircle,
  Check
} from 'lucide-react'
import { OneStepDemoForm } from '../components/OneStepDemoForm'

// High-resolution real demo assets
import archImg from "@/assets/about-page/architecture-about.webp"
import complianceImg from "@/assets/about-page/complaince-about.webp"
import janeImg from "@/assets/about-page/jane-about.webp"
import deployVideoUrl from "@/assets/VIDEOS/deploy-3.webm"

const demoSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "InfraGlide Live Product Demo",
  "description": "Schedule a live guided demo of InfraGlide — the AI-powered visual cloud infrastructure platform for AWS, Azure, and GCP with Terraform-native IaC and Jane AI.",
  "url": "https://infraglide.com/demo",
  "organizer": { "@type": "Organization", "name": "InfraGlide", "url": "https://infraglide.com" },
  "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled"
};

export const Route = createFileRoute('/demo')({
  component: DemoPage,
  head: () => ({
    meta: [
      { title: "Schedule a Guided Demo — See InfraGlide in Action | AWS, Azure & GCP" },
      { name: "description", content: "Schedule a live, personalized InfraGlide demo. See how to design multi-cloud infrastructure visually, generate Terraform, detect drift, and automate pipelines." },
      { name: "keywords", content: "InfraGlide demo, cloud infrastructure demo, Terraform visual demo, AWS infrastructure demo, Azure GCP demo, multi-cloud platform demo, request InfraGlide demo" },
      { property: "og:url", content: "https://infraglide.com/demo" },
      { property: "og:title", content: "Schedule a Guided Demo — See InfraGlide in Action" },
      { property: "og:description", content: "Book a live 1-on-1 demo with InfraGlide engineers. Visual architecture design, Terraform IaC, and Jane AI." },
    ],
    links: [
      { rel: "canonical", href: "https://infraglide.com/demo" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(demoSchema) },
    ],
  }),
})

function DemoPage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById('demo-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const firstInput = el.querySelector('input') as HTMLInputElement | null;
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 600);
      }
    }
  };

  const highlights = [
    "Visual drag-and-drop canvas for AWS, Azure & GCP",
    "Instant 1:1 Terraform code export with zero vendor lock-in",
    "1-Click on-demand cloud infrastructure drift detection",
    "Jane AI assistance for architecture reviews & cost optimization",
  ];

  const securityBadges = [
    {
      icon: ShieldCheck,
      title: "SOC 2 Type II Prepared",
      desc: "Architected around strict operational controls, least-privilege access, and continuous monitoring."
    },
    {
      icon: Lock,
      title: "AES-256 & TLS 1.3",
      desc: "All session data and workspace models are encrypted in transit and at rest with zero plaintext exposure."
    },
    {
      icon: Users,
      title: "Enterprise RBAC & Audit Logs",
      desc: "Enforce strict least-privilege within your team. Control who can edit, review drift, or export Terraform with audit trails."
    },
    {
      icon: Shield,
      title: "Continuous Security Audits",
      desc: "Regular third-party penetration testing and continuous vulnerability scanning across all service layers."
    }
  ];

  const faqs = [
    {
      q: "What cloud permissions does InfraGlide require?",
      a: "InfraGlide operates on strict least-privilege principles. For discovery and on-demand drift checks, only read-only IAM roles are required. We never ask for or store permanent administrative or root cloud credentials."
    },
    {
      q: "Does InfraGlide store our cloud credentials or secrets?",
      a: "No. Your sensitive cloud credentials, private keys, and API secrets remain securely in your existing cloud vaults (such as AWS Secrets Manager, Azure Key Vault, or HashiCorp Vault). InfraGlide never accesses plaintext secrets."
    },
    {
      q: "What happens during the live demo?",
      a: "A senior cloud solutions engineer conducts a tailored 1-on-1 walkthrough focused on your specific cloud stack (AWS, Azure, or GCP). We'll model a real architecture on the visual canvas, review live Terraform generation, demonstrate 1-click on-demand drift checks, and answer all technical questions."
    },
    {
      q: "Can we explore our own architecture patterns or Terraform modules?",
      a: "Yes. During the session, we can explore your specific cloud topology, review how your resources map to the visual canvas, and demonstrate live Terraform synchronization tailored to your stack."
    }
  ];

  return (
    <div className="relative min-h-screen ig-noise bg-[var(--ig-bg)] overflow-hidden pb-24">
      <InteractiveGrid color="#8A53D6" className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-10 dark:opacity-25" />
      
      {/* Ambient Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-[radial-gradient(ellipse_at_center,rgba(138,83,214,0.18)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-[800px] right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(138,83,214,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* ===================== HERO SECTION WITH ONE-STEP FORM ===================== */}
      <div className="relative z-10 pt-28 md:pt-36 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-20">
          
          {/* Left Column: Headline matching Ad & Value Proposition */}
          <div className="lg:col-span-6 xl:col-span-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(138,83,214,0.1)] border border-[rgba(138,83,214,0.25)] text-[#8A53D6] dark:text-[#b07eff] text-xs font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Live 1-on-1 Architecture Walkthrough</span>
            </div>
            
            <h1 className="font-display-family text-4xl sm:text-5xl md:text-5xl lg:text-[3.4rem] font-extrabold mb-5 tracking-tight text-[var(--ig-text)] leading-[1.1]">
              Design Cloud Visually. <br />
              <span className="ig-metallic">Deploy Production Terraform in Minutes.</span>
            </h1>
            
            <p className="text-[var(--ig-muted)] text-base sm:text-lg font-medium mb-8 leading-relaxed max-w-xl">
              <strong>Built for DevOps, Platform & Cloud Engineers:</strong> Turn complex AWS, Azure & GCP architectures into clean, drift-free Terraform with Jane AI reviews.
            </p>

            <div className="space-y-3 mb-8 bg-[rgba(138,83,214,0.04)] dark:bg-[rgba(138,83,214,0.08)] p-6 rounded-2xl border border-[rgba(138,83,214,0.15)] shadow-sm">
              <h2 className="text-xs font-bold text-[var(--ig-text)] uppercase tracking-wider mb-2">
                What you'll experience in the demo:
              </h2>
              {highlights.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-[var(--ig-text)]">
                  <CheckCircle2 className="w-4 h-4 text-[#8A53D6] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 1-Step Demo Booking Form Above The Fold */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end w-full">
            <OneStepDemoForm />
          </div>

        </div>
      </div>

      {/* ===================== TRUST & SECURITY BADGES (DIRECTLY UNDER THE FOLD) ===================== */}
      <div className="relative z-10 px-6 max-w-6xl mx-auto mb-28">
        <div className="border-t border-[var(--ig-border)] pt-12 pb-6 text-center">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--ig-dim)] mb-6">
            Supported Cloud Ecosystem & Enterprise Security Standards
          </div>

          {/* Cloud Platform Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-12 opacity-85">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 dark:bg-[rgba(15,10,25,0.6)] border border-[var(--ig-border)] text-sm font-semibold text-[var(--ig-text)] shadow-sm">
              <span className="text-[#FF9900] font-bold">AWS</span> Multi-Account
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 dark:bg-[rgba(15,10,25,0.6)] border border-[var(--ig-border)] text-sm font-semibold text-[var(--ig-text)] shadow-sm">
              <span className="text-[#0089D6] font-bold">Microsoft Azure</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 dark:bg-[rgba(15,10,25,0.6)] border border-[var(--ig-border)] text-sm font-semibold text-[var(--ig-text)] shadow-sm">
              <span className="text-[#4285F4] font-bold">Google Cloud</span> (GCP)
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 dark:bg-[rgba(15,10,25,0.6)] border border-[var(--ig-border)] text-sm font-semibold text-[var(--ig-text)] shadow-sm">
              <span className="text-[#7B42BC] font-bold">Terraform</span> 1.0+ HCL
            </div>
          </div>

          {/* Security Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {securityBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div key={idx} className="p-5 rounded-2xl bg-white/40 dark:bg-[rgba(15,10,25,0.4)] border border-[var(--ig-border)] hover:border-[#8A53D6]/40 transition-all shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(138,83,214,0.1)] flex items-center justify-center text-[#8A53D6] dark:text-[#b07eff] mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-[var(--ig-text)] mb-1">{badge.title}</h3>
                  <p className="text-xs text-[var(--ig-muted)] leading-relaxed">{badge.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===================== 60–90s PRODUCT VIDEO DEMO ===================== */}
      <div className="relative z-10 px-6 max-w-5xl mx-auto mb-32">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(138,83,214,0.1)] border border-[rgba(138,83,214,0.2)] text-[#8A53D6] dark:text-[#b07eff] text-xs font-semibold mb-3">
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Interactive Product Tour</span>
          </div>
          <h2 className="font-display-family text-3xl sm:text-4xl font-extrabold text-[var(--ig-text)] mb-3">
            See the Canvas in Action: Visual to Code
          </h2>
          <p className="text-[var(--ig-muted)] text-sm sm:text-base leading-relaxed">
            Watch how a platform engineer designs a multi-tier VPC, configures security groups, and outputs clean Terraform in under 90 seconds.
          </p>
        </div>

        {/* Mac-Style Window Frame */}
        <div className="rounded-2xl border border-[var(--ig-border)] bg-white/70 dark:bg-[rgba(15,10,25,0.85)] shadow-2xl overflow-hidden backdrop-blur-xl relative group">
          {/* Top Window Bar */}
          <div className="px-4 py-3 border-b border-[var(--ig-border)] bg-slate-100/80 dark:bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/80 block" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80 block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80 block" />
            </div>
            <button 
              onClick={toggleVideoPlay}
              className="text-xs font-semibold text-[#8A53D6] dark:text-[#b07eff] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
          </div>

          {/* Embedded Product Video */}
          <div className="relative aspect-video w-full bg-black/90 overflow-hidden cursor-pointer" onClick={toggleVideoPlay}>
            <video
              ref={videoRef}
              src={deployVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#8A53D6]/90 flex items-center justify-center text-white shadow-xl transform scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===================== PLATFORM CAPABILITIES & DEMO SHOWCASE ===================== */}
      <div className="relative z-10 px-6 max-w-6xl mx-auto mb-32 space-y-28">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(138,83,214,0.1)] border border-[rgba(138,83,214,0.2)] text-[#8A53D6] dark:text-[#b07eff] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full-Lifecycle Cloud Platform</span>
          </div>
          <h2 className="font-display-family text-3xl sm:text-4xl font-extrabold text-[var(--ig-text)] mb-3">
            Engineered for Modern DevOps & Cloud Teams
          </h2>
          <p className="text-[var(--ig-muted)] text-sm sm:text-base leading-relaxed">
            From visual architecture modeling and native Terraform synthesis to on-demand drift governance and AI policy reviews—explore how InfraGlide accelerates your entire cloud delivery pipeline.
          </p>
        </div>

        {/* Capability 1: Visual Design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Visual Infrastructure Design</span>
            </div>
            <h3 className="font-display-family text-2xl sm:text-3xl font-extrabold text-[var(--ig-text)] leading-snug">
              Model Multi-Cloud Architectures Without Syntax Overhead
            </h3>
            <p className="text-sm text-[var(--ig-muted)] leading-relaxed">
              Eliminate brittle whiteboard sketches and stale architecture diagrams. InfraGlide lets you compose 200+ AWS, Azure, and GCP resources on a high-speed collaborative canvas.
            </p>
            <ul className="space-y-2.5 text-sm text-[var(--ig-text)] pt-2">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#8A53D6] shrink-0 mt-0.5" />
                <span>Pre-wired VPCs, subnets, Kubernetes clusters, and security groups</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#8A53D6] shrink-0 mt-0.5" />
                <span>True bidirectional synchronization: canvas updates emit clean HCL</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#8A53D6] shrink-0 mt-0.5" />
                <span>Zero proprietary runtime lock-in — export standard Terraform files</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[var(--ig-border)] overflow-hidden shadow-xl bg-white/50 dark:bg-[rgba(15,10,25,0.5)] p-2">
              <img src={archImg} alt="Visual Cloud Architecture Canvas" className="w-full rounded-xl block object-cover" />
            </div>
          </div>
        </div>

        {/* Capability 2: Automated Security & Compliance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="rounded-2xl border border-[var(--ig-border)] overflow-hidden shadow-xl bg-white/50 dark:bg-[rgba(15,10,25,0.5)] p-2">
              <img src={complianceImg} alt="Automated Cloud Security & Compliance Guardrails" className="w-full rounded-xl block object-cover" />
            </div>
          </div>
          <div className="lg:col-span-5 text-left space-y-4 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Automated Security & Compliance</span>
            </div>
            <h3 className="font-display-family text-2xl sm:text-3xl font-extrabold text-[var(--ig-text)] leading-snug">
              Continuous Policy Guardrails Before Production Apply
            </h3>
            <p className="text-sm text-[var(--ig-muted)] leading-relaxed">
              Eliminate costly misconfigurations and compliance violations early. InfraGlide automatically validates proposed architectures against CIS Benchmarks, security baselines, and organizational policies directly on the visual canvas.
            </p>
            <ul className="space-y-2.5 text-sm text-[var(--ig-text)] pt-2">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#8A53D6] shrink-0 mt-0.5" />
                <span>Pre-apply policy enforcement to prevent exposed ports and unencrypted storage</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#8A53D6] shrink-0 mt-0.5" />
                <span>Continuous audit readiness with verifiable CIS and SOC 2 rule checks</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#8A53D6] shrink-0 mt-0.5" />
                <span>Actionable remediation guidance directly linked to your Terraform code</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Capability 3: AI Intelligence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#8A53D6] dark:text-[#b07eff] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Architecture Intelligence</span>
            </div>
            <h3 className="font-display-family text-2xl sm:text-3xl font-extrabold text-[var(--ig-text)] leading-snug">
              Jane AI Architecture Reviews & Cost Optimization
            </h3>
            <p className="text-sm text-[var(--ig-muted)] leading-relaxed">
              Jane acts as your 24/7 senior infrastructure reviewer. She inspects resource sizing, checks CIS benchmarks, and flags security misconfigurations before any code applies to production.
            </p>
            <ul className="space-y-2.5 text-sm text-[var(--ig-text)] pt-2">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#8A53D6] shrink-0 mt-0.5" />
                <span>Automated monthly cost forecast before provisioning resources</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#8A53D6] shrink-0 mt-0.5" />
                <span>Least-privilege IAM and compliance policy checks out of the box</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#8A53D6] shrink-0 mt-0.5" />
                <span>Human-in-the-loop: Jane suggests fixes, but you approve execution</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[var(--ig-border)] overflow-hidden shadow-xl bg-white/50 dark:bg-[rgba(15,10,25,0.5)] p-2">
              <img src={janeImg} alt="Jane AI Architecture Reviews" className="w-full rounded-xl block object-cover" />
            </div>
          </div>
        </div>

        {/* Comprehensive Platform Capabilities Grid */}
        <div className="pt-10 border-t border-[var(--ig-border)]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-display-family text-2xl font-bold text-[var(--ig-text)] mb-2">
              Everything Your Infrastructure Stack Needs
            </h3>
            <p className="text-xs sm:text-sm text-[var(--ig-muted)]">
              Built from day one to replace fragmented cloud consoles with a unified visual engineering standard.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
            <div className="p-5 rounded-2xl bg-white/40 dark:bg-[rgba(15,10,25,0.4)] border border-[var(--ig-border)] hover:border-[#8A53D6]/40 transition-all shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[var(--ig-text)] mb-1">Multi-Cloud Consistency</h4>
              <p className="text-xs text-[var(--ig-muted)] leading-relaxed">
                Design and manage AWS, Azure, and GCP resources on a single unified canvas with shared architecture standards.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/40 dark:bg-[rgba(15,10,25,0.4)] border border-[var(--ig-border)] hover:border-[#8A53D6]/40 transition-all shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-[#8A53D6] flex items-center justify-center mb-3">
                <FileCode2 className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[var(--ig-text)] mb-1">Zero Proprietary Lock-In</h4>
              <p className="text-xs text-[var(--ig-muted)] leading-relaxed">
                Export 100% standard open-source HashiCorp Terraform HCL. Your infrastructure code remains fully yours.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/40 dark:bg-[rgba(15,10,25,0.4)] border border-[var(--ig-border)] hover:border-[#8A53D6]/40 transition-all shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[var(--ig-text)] mb-1">Pre-Apply Security Benchmarks</h4>
              <p className="text-xs text-[var(--ig-muted)] leading-relaxed">
                Automatically catch open security groups, unencrypted volumes, and CIS policy violations prior to deployment.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/40 dark:bg-[rgba(15,10,25,0.4)] border border-[var(--ig-border)] hover:border-[#8A53D6]/40 transition-all shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[var(--ig-text)] mb-1">Cloud Cost Intelligence</h4>
              <p className="text-xs text-[var(--ig-muted)] leading-relaxed">
                Forecast monthly instance, bandwidth, and database costs right on the canvas before applying changes to production.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/40 dark:bg-[rgba(15,10,25,0.4)] border border-[var(--ig-border)] hover:border-[#8A53D6]/40 transition-all shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-3">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[var(--ig-text)] mb-1">Enterprise RBAC & Sandboxes</h4>
              <p className="text-xs text-[var(--ig-muted)] leading-relaxed">
                Safely isolate development, staging, and production workspaces with granular team role permissions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/40 dark:bg-[rgba(15,10,25,0.4)] border border-[var(--ig-border)] hover:border-[#8A53D6]/40 transition-all shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-3">
                <Activity className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[var(--ig-text)] mb-1">GitOps & Pipeline Integration</h4>
              <p className="text-xs text-[var(--ig-muted)] leading-relaxed">
                Directly push generated Terraform modules into GitHub, GitLab, or Bitbucket with automated pull requests.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ===================== PLATFORM HIGHLIGHT STATS ===================== */}
      <div className="relative z-10 px-6 max-w-5xl mx-auto mb-32">
        <div className="p-8 sm:p-10 rounded-3xl bg-[rgba(138,83,214,0.04)] dark:bg-[rgba(138,83,214,0.08)] border border-[rgba(138,83,214,0.2)] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(ellipse_at_center,rgba(138,83,214,0.12)_0%,transparent_70%)] pointer-events-none" />

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="font-display-family text-4xl sm:text-5xl font-black text-[#8A53D6] dark:text-[#b07eff] mb-1">
                200+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[var(--ig-text)] mb-0.5">Cloud Resources Supported</div>
              <div className="text-[11px] text-[var(--ig-dim)]">Native support across AWS, Azure & GCP</div>
            </div>
            <div>
              <div className="font-display-family text-4xl sm:text-5xl font-black text-[#8A53D6] dark:text-[#b07eff] mb-1">
                100%
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[var(--ig-text)] mb-0.5">Native Terraform Output</div>
              <div className="text-[11px] text-[var(--ig-dim)]">Zero proprietary runtime dependencies</div>
            </div>
            <div>
              <div className="font-display-family text-4xl sm:text-5xl font-black text-[#8A53D6] dark:text-[#b07eff] mb-1">
                1-Click
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[var(--ig-text)] mb-0.5">On-Demand Drift Checks</div>
              <div className="text-[11px] text-[var(--ig-dim)]">Instant visual cloud vs code reconciliation</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== OBJECTION-BUSTING FAQ ===================== */}
      <div className="relative z-10 px-6 max-w-4xl mx-auto mb-28">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(138,83,214,0.1)] border border-[rgba(138,83,214,0.2)] text-[#8A53D6] dark:text-[#b07eff] text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-display-family text-3xl font-extrabold text-[var(--ig-text)]">
            Everything You Need to Know Before Booking
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="rounded-2xl border border-[var(--ig-border)] bg-white/50 dark:bg-[rgba(15,10,25,0.4)] overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full px-6 py-4.5 flex items-center justify-between text-left font-semibold text-sm sm:text-base text-[var(--ig-text)] hover:text-[#8A53D6] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#8A53D6] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[var(--ig-muted)] leading-relaxed border-t border-[var(--ig-border-soft)]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================== BOTTOM CTA BANNER ===================== */}
      <div className="relative z-10 px-6 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#8A53D6]/15 via-[rgba(138,83,214,0.06)] to-transparent border border-[#8A53D6]/30 text-center relative overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-display-family text-3xl sm:text-4xl font-extrabold text-[var(--ig-text)] tracking-tight">
              Ready to see InfraGlide on your cloud architecture?
            </h2>

            <p className="text-sm sm:text-base text-[var(--ig-muted)] leading-relaxed">
              Schedule your personalized demo walkthrough today. We'll map your existing multi-cloud topology, demonstrate drift reconciliation, and export clean Terraform code.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex ig-cta px-8 py-4 rounded-xl text-base font-bold items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Schedule Your Demo Walkthrough</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
