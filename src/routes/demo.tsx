import { createFileRoute } from '@tanstack/react-router'
import { InteractiveGrid } from '../components/InteractiveGrid'
import { Calendar, Sparkles, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'

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
  const highlights = [
    "Visual drag-and-drop canvas for AWS, Azure & GCP",
    "Instant 1:1 Terraform code export with zero vendor lock-in",
    "Real-time cloud infrastructure drift detection",
    "Jane AI assistance for architecture reviews & optimization",
  ];

  return (
    <div className="relative min-h-screen ig-noise bg-[var(--ig-bg)] overflow-hidden pb-32">
      <InteractiveGrid color="#8A53D6" className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-10 dark:opacity-25" />
      
      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(138,83,214,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 pt-32 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(138,83,214,0.1)] border border-[rgba(138,83,214,0.25)] text-[#8A53D6] dark:text-[#b07eff] text-xs font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Guided Demos</span>
          </div>
          <h1 className="font-display-family text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-[var(--ig-text)]">
            See Infraglide in <span className="ig-metallic">Action.</span>
          </h1>
          <p className="text-[var(--ig-muted)] text-xl max-w-2xl mx-auto font-medium mb-8">
            Experience how InfraGlide turns complex multi-cloud architecture design into clean, deployment-ready Terraform code.
          </p>
        </div>

        {/* Demo Booking Card */}
        <div className="ig-card rounded-[2rem] p-8 md:p-12 shadow-[0_24px_80px_rgba(138,83,214,0.2)] relative max-w-3xl mx-auto mb-16 border border-[rgba(138,83,214,0.2)] bg-white/ dark:bg-[rgba(22,15,36,0.7)]">
          <div className="text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[rgba(138,83,214,0.1)] border border-[rgba(138,83,214,0.2)] flex items-center justify-center text-[#8A53D6] dark:text-[#b07eff] mx-auto mb-6">
              <Calendar className="w-8 h-8" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--ig-text)] mb-4">
              Book a Live 1-on-1 Walkthrough
            </h2>
            <p className="text-[var(--ig-muted)] text-base mb-8 leading-relaxed">
              Schedule a personalized 15-minute demo with our solutions engineering team. We'll show you around the canvas, review your current infrastructure topology, and answer technical questions.
            </p>

            <div className="space-y-3 text-left mb-10 max-w-lg mx-auto bg-[rgba(138,83,214,0.04)] dark:bg-[rgba(138,83,214,0.08)] p-5 rounded-xl border border-[rgba(138,83,214,0.15)]">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-[var(--ig-text)]">
                  <CheckCircle2 className="w-4 h-4 text-[#8A53D6] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/contact" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-gradient-to-r from-[#8A53D6] to-[#b07eff] text-white font-semibold text-lg hover:shadow-[0_12px_24px_rgba(138,83,214,0.3)] transition-all group"
              >
                <span>Book Live Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="/#get-started" 
                className="w-full sm:w-auto inline-flex items-center justify-center py-4 px-8 rounded-xl bg-white/ dark:bg-white/5 border border-[var(--ig-border)] text-[var(--ig-text)] font-semibold text-lg hover:border-[#8A53D6]/40 transition-all"
              >
                Try Free Canvas
              </a>
            </div>
          </div>
        </div>

        {/* Video Note */}
        <div className="text-center max-w-md mx-auto">
          <p className="text-xs text-[var(--ig-muted)] flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-[#8A53D6]" />
            <span>Recorded self-serve video tour coming soon!</span>
          </p>
        </div>

      </div>
    </div>
  )
}
