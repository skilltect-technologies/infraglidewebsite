import React, { useState, useRef, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { InteractiveGrid } from '../components/InteractiveGrid'
import { Mail, MapPin, Check, AlertCircle, Building2, ChevronDown, Clock } from 'lucide-react'
import { submitDemoRequest } from '../services/api'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact InfraGlide",
  "url": "https://infraglide.com/contact",
  "description": "Get in touch with InfraGlide. Reach our team for demos, enterprise inquiries, and support.",
  "mainEntity": {
    "@type": "Organization",
    "name": "InfraGlide",
    "email": "connect@infraglide.com",
    "url": "https://infraglide.com",
    "address": [
      { "@type": "PostalAddress", "addressLocality": "Delhi", "addressCountry": "IN" },
      { "@type": "PostalAddress", "addressLocality": "Jodhpur", "addressRegion": "Rajasthan", "addressCountry": "IN" },
      { "@type": "PostalAddress", "addressLocality": "Bangalore", "addressRegion": "Karnataka", "addressCountry": "IN" }
    ]
  }
};

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact InfraGlide — Get a Demo or Enterprise Quote" },
      { name: "description", content: "Contact InfraGlide to schedule a demo, request enterprise pricing, or get support. Offices in Delhi, Jodhpur, and Bangalore. Email: connect@infraglide.com" },
      { name: "keywords", content: "contact InfraGlide, InfraGlide demo, InfraGlide enterprise pricing, InfraGlide support, cloud infrastructure platform contact" },
      { property: "og:url", content: "https://infraglide.com/contact" },
      { property: "og:title", content: "Contact InfraGlide — Get a Demo or Enterprise Quote" },
      { property: "og:description", content: "Reach InfraGlide for demos, enterprise pricing, and support. Offices in Delhi, Jodhpur, and Bangalore." },
    ],
    links: [
      { rel: "canonical", href: "https://infraglide.com/contact" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(contactPageSchema) },
    ],
  }),
})

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    company: '',
    role: '',
    cloud: 'AWS',
    message: ''
  })
  
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cloudOpen, setCloudOpen] = useState(false)
  const cloudRef = useRef<HTMLDivElement>(null)
  const { executeRecaptcha } = useGoogleReCaptcha()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cloudRef.current && !cloudRef.current.contains(event.target as Node)) {
        setCloudOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isMobileValid = (m: string) => /^\+?[1-9]\d{6,14}$/.test(m.replace(/[\s\-()]/g, ''));
  const isFormValid =
    /^[A-Za-z\s]{2,50}$/.test(formData.name.trim()) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) &&
    isMobileValid(formData.mobile) &&
    formData.company.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.mobile || !formData.company) {
      setError('Please fill in all required fields (Name, Email, Mobile, and Company).')
      return
    }

    const nameRegex = /^[A-Za-z\s]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isMobileValid = (m: string) => /^\+?[1-9]\d{6,14}$/.test(m.replace(/[\s\-()]/g, ''));

    if (!nameRegex.test(formData.name)) {
      setError('Please enter a valid name (letters and spaces only, 2-50 characters).');
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!isMobileValid(formData.mobile)) {
      setError('Please enter a valid mobile number (7-15 digits with country code, e.g. +447911123456).');
      return;
    }
    if (!executeRecaptcha) {
      setError('reCAPTCHA has not loaded yet. Please try again in a moment.');
      return;
    }

    setSubmitting(true)
    setError(null)

    try {
      const token = await executeRecaptcha('submit_contact');
      if (import.meta.env.DEV) {
        console.log('reCAPTCHA token:', token);
      }
      
      // Extract UTM parameters from URL
      const utmParams: Record<string, string> = {};
      if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
          const val = searchParams.get(param);
          if (val) utmParams[param] = val;
        });
      }

      const submitData = { ...formData, ...utmParams, 'g-recaptcha-response': token }
      await submitDemoRequest(
        submitData, 
        `Contact Form Message:\n${formData.message || 'No message provided'}`,
        `[Contact Inquiry] ${formData.name || 'Visitor'} (${formData.company || 'Website Lead'})`
      )

      // LinkedIn Conversion Event Tracking
      if (typeof window !== 'undefined' && (window as any).lintrk) {
        (window as any).lintrk('track', { conversion_id: 19714810 });
      }

      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        mobile: '',
        company: '',
        role: '',
        cloud: 'AWS',
        message: ''
      })
    } catch (err: any) {
      console.error('Submission error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen ig-noise bg-[var(--ig-bg)] overflow-hidden pb-32">
      <InteractiveGrid color="#8A53D6" className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-10 dark:opacity-25" />
      
      {/* Background glow styling adjustments */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(138,83,214,0.08)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(138,83,214,0.18)_0%,transparent_60%)] pointer-events-none blur-[80px]" />
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(90,62,248,0.05)_0%,transparent_65%)] dark:bg-[radial-gradient(circle_at_center,rgba(90,62,248,0.1)_0%,transparent_65%)] pointer-events-none blur-[90px]" />

      <div className="relative z-10 pt-32 px-6 max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="font-display-family text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-[var(--ig-text)]">
            Get in <span className="ig-metallic">Touch.</span>
          </h1>
          <p className="text-[var(--ig-muted)] text-xl max-w-2xl mx-auto font-medium">
            Have questions about InfraGlide? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          {/* Left Side: Contact Info & Offices */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card */}
            <div className=" bg-white/ dark:bg-slate-900/0 dark:bg-[rgba(22,15,36,0.55)] border border-[var(--ig-border)] dark:border-[rgba(138,83,214,0.15)] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[rgba(138,83,214,0.06)] dark:bg-[rgba(138,83,214,0.10)] border border-[rgba(138,83,214,0.12)] dark:border-[rgba(138,83,214,0.2)] flex items-center justify-center text-[#8A53D6] dark:text-[#b07eff]">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ig-dim)] mb-1">Email</h4>
                  <a href="mailto:support@infraglide.com" className="text-sm font-semibold text-[#8A53D6] dark:text-[#b07eff] hover:underline">
                    support@infraglide.com
                  </a>
                </div>
              </div>
            </div>

            {/* Offices Container */}
            <div className=" bg-white/ dark:bg-slate-900/0 dark:bg-[rgba(22,15,36,0.55)] border border-[var(--ig-border)] dark:border-[rgba(138,83,214,0.15)] rounded-2xl p-8 shadow-sm space-y-8">
              <div className="flex items-center gap-2 border-b border-[var(--ig-border)] dark:border-[rgba(138,83,214,0.15)] pb-3">
                <MapPin className="w-5 h-5 text-[#8A53D6]" />
                <h3 className="text-lg font-bold text-[var(--ig-text)]">Our Offices</h3>
              </div>

              {/* Delhi Office */}
              <div className="space-y-2">
                <h4 className="font-bold text-[var(--ig-text)] text-sm flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#8A53D6]" /> Delhi Office
                </h4>
                <p className="text-sm text-[var(--ig-muted)] leading-relaxed pl-6">
                  First Floor,<br />
                  E-49/5, Okhla Industrial Area,<br />
                  Delhi - 110020
                </p>
              </div>

              {/* Jodhpur Office */}
              <div className="space-y-2">
                <h4 className="font-bold text-[var(--ig-text)] text-sm flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#8A53D6]" /> Jodhpur Office
                </h4>
                <p className="text-sm text-[var(--ig-muted)] leading-relaxed pl-6">
                  First Floor,<br />
                  CYB-5, Cyber Park, 102, H.I.A, Jodhpur<br />
                  Rajasthan - 342003
                </p>
              </div>

              {/* Bangalore Office */}
              <div className="space-y-2">
                <h4 className="font-bold text-[var(--ig-text)] text-sm flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#8A53D6]" /> Bangalore Office
                </h4>
                <p className="text-sm text-[var(--ig-muted)] leading-relaxed pl-6">
                  BLOCK-L,<br />
                  Embassy TechVillage, Outer Ring Rd, Devarabisanahalli, Bellandur, Bangalore<br />
                  Karnataka - 560103
                </p>
              </div>

            </div>

          </div>

          {/* Right Side: Message Form (Matching stepper fields but distinct UI) */}
          <div className="lg:col-span-7">
            <div className=" bg-white/ dark:bg-slate-900/0 dark:bg-[rgba(22,15,36,0.55)] border border-[var(--ig-border)] dark:border-[rgba(138,83,214,0.15)] rounded-[2rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#8A53D6] to-[#b07eff]" />
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[var(--ig-text)] mb-1.5">Send a message</h2>
                <p className="text-xs text-[var(--ig-muted)] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#8A53D6]" />
                  <span>We typically respond within 2–4 business hours.</span>
                </p>
              </div>
              
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto animate-bounce text-emerald-500">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--ig-text)]">Message Sent!</h3>
                  <p className="text-sm text-[var(--ig-muted)] max-w-sm mx-auto">
                    Thank you for reaching out. We have received your query and our team will get back to you within 2–4 business hours.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-xl border border-[var(--ig-border)] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm font-semibold transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-500 text-sm font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--ig-dim)]">Full Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full bg-white/ dark:bg-slate-900/0 dark:bg-[rgba(10,5,16,0.4)] border border-[var(--ig-border)] dark:border-[rgba(138,83,214,0.18)] rounded-xl px-4 py-3 text-[var(--ig-text)] focus:outline-none focus:border-[#8A53D6] focus:ring-2 focus:ring-[#8A53D6]/20 transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--ig-dim)]">Work Email <span className="text-red-500">*</span></label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full bg-white/ dark:bg-slate-900/0 dark:bg-[rgba(10,5,16,0.4)] border border-[var(--ig-border)] dark:border-[rgba(138,83,214,0.18)] rounded-xl px-4 py-3 text-[var(--ig-text)] focus:outline-none focus:border-[#8A53D6] focus:ring-2 focus:ring-[#8A53D6]/20 transition-all" 
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--ig-dim)]">Mobile No <span className="text-red-500">*</span></label>
                      <input 
                        type="tel" 
                        required
                        value={formData.mobile}
                        onChange={e => {
                          const val = e.target.value;
                          if (/^[\d+\s\-()]*$/.test(val) && val.length <= 20) {
                            setFormData({ ...formData, mobile: val });
                          }
                        }}
                        placeholder="+ [country code] phone number"
                        className="w-full bg-white/ dark:bg-slate-900/0 dark:bg-[rgba(10,5,16,0.4)] border border-[var(--ig-border)] dark:border-[rgba(138,83,214,0.18)] rounded-xl px-4 py-3 text-[var(--ig-text)] focus:outline-none focus:border-[#8A53D6] focus:ring-2 focus:ring-[#8A53D6]/20 transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--ig-dim)]">Company Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        required
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your company name"
                        className="w-full bg-white/ dark:bg-slate-900/0 dark:bg-[rgba(10,5,16,0.4)] border border-[var(--ig-border)] dark:border-[rgba(138,83,214,0.18)] rounded-xl px-4 py-3 text-[var(--ig-text)] focus:outline-none focus:border-[#8A53D6] focus:ring-2 focus:ring-[#8A53D6]/20 transition-all" 
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--ig-dim)]">Role / Title</label>
                      <input 
                        type="text" 
                        value={formData.role}
                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                        placeholder="e.g. DevOps / Cloud Architect"
                        className="w-full bg-white/ dark:bg-slate-900/0 dark:bg-[rgba(10,5,16,0.4)] border border-[var(--ig-border)] dark:border-[rgba(138,83,214,0.18)] rounded-xl px-4 py-3 text-[var(--ig-text)] focus:outline-none focus:border-[#8A53D6] focus:ring-2 focus:ring-[#8A53D6]/20 transition-all" 
                      />
                    </div>
                    <div className="space-y-2 relative" ref={cloudRef}>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--ig-dim)]">Primary Cloud</label>
                      <button
                        type="button"
                        onClick={() => setCloudOpen(!cloudOpen)}
                        className="w-full flex items-center justify-between bg-white dark:bg-[rgba(10,5,16,0.6)] border border-[var(--ig-border)] dark:border-[rgba(138,83,214,0.18)] rounded-xl px-4 py-3 text-[var(--ig-text)] focus:outline-none focus:border-[#8A53D6] focus:ring-2 focus:ring-[#8A53D6]/20 transition-all text-left"
                        aria-haspopup="listbox"
                        aria-expanded={cloudOpen}
                      >
                        <span className="font-medium text-sm">{formData.cloud}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${cloudOpen ? 'rotate-180 text-[#8A53D6]' : 'text-[var(--ig-dim)]'}`} />
                      </button>

                      {cloudOpen && (
                        <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white dark:bg-[#120a1f] border border-[var(--ig-border)] dark:border-[rgba(138,83,214,0.3)] rounded-xl shadow-2xl p-1.5 backdrop-blur-xl">
                          {['AWS', 'Azure', 'GCP', 'Multi-cloud'].map((c) => {
                            const isSelected = formData.cloud === c;
                            return (
                              <div
                                key={c}
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => {
                                  setFormData({ ...formData, cloud: c });
                                  setCloudOpen(false);
                                }}
                                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm cursor-pointer transition-all ${
                                  isSelected
                                    ? 'bg-[#8A53D6]/15 text-[#8A53D6] dark:text-[#b07eff] font-semibold'
                                    : 'text-[var(--ig-text)] hover:bg-[#8A53D6]/10 hover:text-[#8A53D6]'
                                }`}
                              >
                                <span>{c}</span>
                                {isSelected && <Check className="w-4 h-4 text-[#8A53D6] shrink-0" />}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--ig-dim)]">Message</label>
                    <textarea 
                      rows={4} 
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full bg-white/ dark:bg-slate-900/0 dark:bg-[rgba(10,5,16,0.4)] border border-[var(--ig-border)] dark:border-[rgba(138,83,214,0.18)] rounded-xl px-4 py-3 text-[var(--ig-text)] focus:outline-none focus:border-[#8A53D6] focus:ring-2 focus:ring-[#8A53D6]/20 transition-all resize-none"
                    />
                  </div>

                  

                  <button 
                    type="submit" 
                    disabled={submitting || !isFormValid}
                    style={{ opacity: !isFormValid || submitting ? 0.6 : 1, cursor: !isFormValid || submitting ? 'not-allowed' : 'pointer' }}
                    className="w-full py-4 rounded-xl ig-cta font-semibold flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
