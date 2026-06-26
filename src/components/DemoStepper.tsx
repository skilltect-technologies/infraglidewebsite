import React, { useState, useMemo } from 'react';
import "./DemoStepper.css";
import { Mail, Briefcase, Server, CalendarCheck, Check } from 'lucide-react';
import { submitDemoRequest } from '../services/api';

const TOTAL_STEPS = 4;
const STEP_NAMES = ['Contact Info', 'Company Info', 'Use Case', 'Book Demo'];

export function DemoStepper() {
  const [curStep, setCurStep] = useState(0);
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    company: '',
    role: '',
    cloud: 'AWS',
  });

  const nameRegex = /^[A-Za-z\s]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[0-9]{10}$/;

  const pct = Math.round(((curStep + 1) / TOTAL_STEPS) * 100);

  const isStep0Valid = useMemo(() => {
    return !!(
      formData.name &&
      formData.email &&
      formData.mobile &&
      nameRegex.test(formData.name) &&
      emailRegex.test(formData.email) &&
      mobileRegex.test(formData.mobile)
    );
  }, [formData.name, formData.email, formData.mobile, nameRegex, emailRegex, mobileRegex]);

  const isStep1Valid = useMemo(() => {
    return !!formData.company;
  }, [formData.company]);

  const isCurrentStepValid = useMemo(() => {
    if (curStep === 0) return isStep0Valid;
    if (curStep === 1) return isStep1Valid;
    return true;
  }, [curStep, isStep0Valid, isStep1Valid]);

  const isNextDisabled = useMemo(() => {
    return curStep < 2 ? !isCurrentStepValid : false;
  }, [curStep, isCurrentStepValid]);

  const goStep = (n: number) => {
    if (n < 0 || n >= TOTAL_STEPS) return;
    setCurStep(n);
    setError(null);
  };

  const nextStep = async () => {
    if (curStep === 0) {
      if (!formData.name || !formData.email || !formData.mobile) {
        setError('Name, Email and Mobile No are required.');
        return;
      }
      if (!nameRegex.test(formData.name)) {
        setError('Please enter a valid name (letters and spaces only, 2-50 characters).');
        return;
      }
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address.');
        return;
      }
      if (!mobileRegex.test(formData.mobile)) {
        setError('Please enter a valid mobile number (7-15 digits, optional + prefix).');
        return;
      }
    }
    if (curStep === 1) {
      if (!formData.company) {
        setError('Company name is required.');
        return;
      }
    }
    if (curStep < TOTAL_STEPS - 1) {
      goStep(curStep + 1);
    } else {
      setSubmitting(true);
      setError(null);
      
      try {
        const useCasesText = Object.keys(checks)
          .filter(k => checks[k])
          .map(k => {
            if (k === 'iac') return 'Visual Infrastructure as Code';
            if (k === 'drift') return 'Drift Detection & Remediation';
            if (k === 'security') return 'Security & Compliance Scanning';
            return k;
          })
          .join(', ') || 'No specific goals specified';

        // Pure abstraction: just hand the form data to our backend and let it do everything securely
        await submitDemoRequest(formData, useCasesText);

        setSubmitted(true);
      } catch (err: any) {
        console.error('EmailJS submission error:', err);
        setError(err.message || 'An error occurred while submitting your request. Please try again.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const toggleCheck = (k: string) => {
    setChecks(prev => ({ ...prev, [k]: !prev[k] }));
  };

  return (
    <div className="demo-stepper-wrapper w-full max-w-[600px] text-left">
      {/* STEPPER HEADER */}
      <div className="ds-stepper-card">
        <div className="ds-stepper-header">
          <span className="ds-stepper-header-title">Let's Connect</span>
          <span className="ds-stepper-header-sub">Step {curStep + 1} of {TOTAL_STEPS} — {STEP_NAMES[curStep]}</span>
        </div>
        
        <div className="ds-stepper">
          {[...Array(TOTAL_STEPS)].map((_, i) => {
            const isDone = i < curStep;
            const isActive = i === curStep;
            return (
              <React.Fragment key={i}>
                <div className={`ds-step ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}>
                  <div 
                    className="ds-step-inner" 
                    onClick={isNextDisabled ? undefined : () => goStep(i)}>
                    <div className="ds-step-circle">
                      {isDone ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <div className="ds-step-label">{STEP_NAMES[i]}</div>
                  </div>
                </div>
                {i < TOTAL_STEPS - 1 && <div className={`ds-step-line ${isDone ? 'done' : ''}`} />}
              </React.Fragment>
            );
          })}
        </div>

        <div className="ds-prog-row">
          <div className="ds-prog-bar"><div className="ds-prog-fill" style={{ width: `${pct}%` }}></div></div>
          <span className="ds-prog-label">{pct}%</span>
        </div>
      </div>

      {/* ERROR BAR */}
      {error && (
        <div className="ds-err-bar">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 5v3M8 9.8v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
          <span>{error}</span>
        </div>
      )}

      {/* STEP 0: Contact Info */}
      {curStep === 0 && (
        <div className="ds-step-panel">
          <div className="ds-card">
            <div className="ds-card-title-bar">
              <div className="ds-card-icon" style={{ background: 'var(--p-light)' }}>
                <Mail className="w-4 h-4 text-[#b07eff]" />
              </div>
              <span className="ds-card-title-text">Contact Information</span>
            </div>
            <div className="ds-card-body">
              <div className="ds-field">
                <div className="ds-field-label">Full Name <span className="ds-req-star">*</span></div>
                <input 
                  type="text" 
                  placeholder="e.g. Jane Doe" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  style={formData.name && !nameRegex.test(formData.name) ? { borderColor: '#ef4444' } : {}}
                />
              </div>
              <div className="ds-field">
                <div className="ds-field-label">Work Email <span className="ds-req-star">*</span></div>
                <input 
                  type="email" 
                  placeholder="e.g. jane@company.com" 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  style={formData.email && !emailRegex.test(formData.email) ? { borderColor: '#ef4444' } : {}}
                />
              </div>
              <div className="ds-field">
                <div className="ds-field-label">Mobile No <span className="ds-req-star">*</span></div>
                <input 
                  type="tel" 
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="e.g. 9876543210" 
                  value={formData.mobile} 
                  onChange={e => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setFormData({ ...formData, mobile: value });
                  }}
                  style={formData.mobile && !mobileRegex.test(formData.mobile) ? { borderColor: '#ef4444' } : {}}
                />
                <div className="ds-hint">Enter exactly 10 digits. We may contact you to confirm your demo slot.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 1: Company Info */}
      {curStep === 1 && (
        <div className="ds-step-panel">
          <div className="ds-card">
            <div className="ds-card-title-bar">
              <div className="ds-card-icon" style={{ background: 'rgba(59, 130, 246, 0.15)' }}>
                <Briefcase className="w-4 h-4 text-blue-400" />
              </div>
              <span className="ds-card-title-text">Company Details</span>
            </div>
            <div className="ds-card-body">
              <div className="ds-field">
                <div className="ds-field-label">Company Name <span className="ds-req-star">*</span></div>
                <input 
                  type="text" 
                  placeholder="e.g. Acme Corp" 
                  value={formData.company} 
                  onChange={e => setFormData({...formData, company: e.target.value})} 
                />
              </div>
              <div className="flex gap-4">
                <div className="ds-field flex-1">
                  <div className="ds-field-label">Role / Title</div>
                  <input type="text" placeholder="e.g. Cloud Architect" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                </div>
                <div className="ds-field flex-1">
                  <div className="ds-field-label">Primary Cloud</div>
                  <select value={formData.cloud} onChange={e => setFormData({...formData, cloud: e.target.value})}>
                    <option>AWS</option>
                    <option>Azure</option>
                    <option>GCP</option>
                    <option>Multi-cloud</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Use Case */}
      {curStep === 2 && (
        <div className="ds-step-panel">
          <div className="ds-card">
            <div className="ds-card-title-bar">
              <div className="ds-card-icon" style={{ background: 'rgba(245, 158, 11, 0.15)' }}>
                <Server className="w-4 h-4 text-amber-500" />
              </div>
              <span className="ds-card-title-text">What are you looking to achieve?</span>
            </div>
            <div className="ds-card-body">
              <div className={`ds-toggle-row ${checks['iac'] ? 'checked' : ''}`} onClick={() => toggleCheck('iac')}>
                <div className="ds-chk-box">{checks['iac'] && <Check className="w-3 h-3 text-white" strokeWidth={3} />}</div>
                <div className="ds-chk-label">
                  <div className="ds-chk-name">Visual Infrastructure as Code</div>
                  <div className="ds-chk-desc">Design architectures and generate Terraform code automatically</div>
                </div>
              </div>
              <div className={`ds-toggle-row ${checks['drift'] ? 'checked' : ''}`} onClick={() => toggleCheck('drift')}>
                <div className="ds-chk-box">{checks['drift'] && <Check className="w-3 h-3 text-white" strokeWidth={3} />}</div>
                <div className="ds-chk-label">
                  <div className="ds-chk-name">Drift Detection & Remediation</div>
                  <div className="ds-chk-desc">Detect differences between live cloud resources and infrastructure code</div>
                </div>
              </div>
              <div className={`ds-toggle-row ${checks['security'] ? 'checked' : ''}`} onClick={() => toggleCheck('security')}>
                <div className="ds-chk-box">{checks['security'] && <Check className="w-3 h-3 text-white" strokeWidth={3} />}</div>
                <div className="ds-chk-label">
                  <div className="ds-chk-name">Security & Compliance Scanning</div>
                  <div className="ds-chk-desc">Enforce least-privilege IAM and ensure resources meet compliance before deployment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Book Demo */}
      {curStep === 3 && (
        <div className="ds-step-panel">
          <div className="ds-card">
            <div className="ds-card-title-bar">
              <div className="ds-card-icon" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
                <CalendarCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="ds-card-title-text">
                {submitted ? 'Request Submitted' : 'Schedule your session'}
              </span>
            </div>
            <div className="ds-card-body text-center py-8">
              {submitted ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <Check className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--ig-text)] mb-2">Thank you, {formData.name}!</h3>
                  <p className="text-sm text-[var(--ig-muted)] mb-2 max-w-sm mx-auto">
                    Your request has been successfully sent. We have sent a confirmation email to <strong className="text-[#8A53D6]">{formData.email}</strong>.
                  </p>
                  <p className="text-xs text-[var(--ig-dim)] max-w-xs mx-auto">
                    Our team will reach out to you within 24 hours to schedule your session.
                  </p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                    <CalendarCheck className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--ig-text)] mb-2">Ready to see InfraGlide in action?</h3>
                  <p className="text-sm text-[var(--ig-muted)] mb-6 max-w-sm mx-auto">
                    Submit your request and our team will prepare a personalized live demo environment for {formData.company || 'your organization'}.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* NAV BUTTONS */}
      <div className="ds-nav-btns">
        <div className="flex gap-2">
          {curStep > 0 && !submitted && (
            <button className="ds-btn" onClick={() => goStep(curStep - 1)} disabled={submitting}>
              ← Back
            </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          {!submitted && (
            <span className="text-[12.5px] text-[var(--ig-muted)] font-medium hidden sm:inline">
              Step {curStep + 1} of {TOTAL_STEPS}
            </span>
          )}
          {submitted ? (
            <button 
              className="ds-btn primary" 
              onClick={() => {
                setSubmitted(false);
                setCurStep(0);
                setFormData({
                  name: '',
                  email: '',
                  mobile: '',
                  company: '',
                  role: '',
                  cloud: 'AWS',
                });
                setChecks({});
              }}
            >
              Book Another Demo
            </button>
          ) : (
            <button 
              className="ds-btn primary flex items-center gap-2" 
              onClick={nextStep} 
              disabled={isNextDisabled}
              style={{ opacity: isNextDisabled ? 0.5 : 1, cursor: isNextDisabled ? 'not-allowed' : 'pointer' }}
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                  Sending...
                </>
              ) : curStep === TOTAL_STEPS - 1 ? (
                'Submit Request ✓'
              ) : (
                'Continue →'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
