import React, { useState, useMemo, useRef, useEffect } from 'react';
import "./OneStepDemoForm.css";
import { CalendarCheck, Calendar, Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { submitDemoRequest } from '../services/api';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TIME_SLOTS = [
  "09:30 AM",
  "11:00 AM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
];

function formatDateLabel(d: Date): string {
  const dayName = DAY_NAMES[d.getDay()];
  const monthName = MONTH_NAMES[d.getMonth()].slice(0, 3);
  return `${dayName}, ${monthName} ${d.getDate()}`;
}

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function OneStepDemoForm() {
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Selected date and time slot
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1); // default to tomorrow
    if (d.getDay() === 6) d.setDate(d.getDate() + 2); // if Saturday, jump to Monday
    if (d.getDay() === 0) d.setDate(d.getDate() + 1); // if Sunday, jump to Monday
    return d;
  });
  const [selectedTime, setSelectedTime] = useState<string>("02:00 PM");

  // Calendar popover & month navigation
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState<number>(() => (new Date()).getMonth());
  const [viewYear, setViewYear] = useState<number>(() => (new Date()).getFullYear());
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setCalendarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  });

  const formattedSlot = useMemo(() => {
    return `${formatDateLabel(selectedDate)} at ${selectedTime}`;
  }, [selectedDate, selectedTime]);

  const nameRegex = /^[A-Za-z\s]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isFormValid = useMemo(() => {
    return !!(
      formData.name.trim() &&
      formData.email.trim() &&
      formData.company.trim() &&
      selectedDate &&
      selectedTime &&
      nameRegex.test(formData.name.trim()) &&
      emailRegex.test(formData.email.trim())
    );
  }, [formData.name, formData.email, formData.company, selectedDate, selectedTime]);

  // Quick select days: 4 distinct choices
  const quickDays = useMemo(() => {
    const list: { label: string; date: Date }[] = [];
    const today = new Date();
    
    list.push({ label: 'Today', date: new Date(today) });
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    list.push({ label: 'Tomorrow', date: tomorrow });
    
    for (let i = 2; i <= 3; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const label = `${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
      list.push({ label, date: d });
    }
    return list;
  }, []);

  // Calendar days grid
  const calendarGrid = useMemo(() => {
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
    const today = new Date();
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const cells: { day: number | null; date: Date | null; isPast: boolean }[] = [];

    for (let i = 0; i < firstDayIndex; i++) {
      cells.push({ day: null, date: null, isPast: true });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(viewYear, viewMonth, day);
      const isPast = d < todayOnly;
      cells.push({ day, date: d, isPast });
    }

    return cells;
  }, [viewYear, viewMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  const isPrevDisabled = useMemo(() => {
    const today = new Date();
    return viewYear === today.getFullYear() && viewMonth <= today.getMonth();
  }, [viewYear, viewMonth]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!nameRegex.test(formData.name.trim())) {
      setError('Please enter a valid name (letters and spaces only, 2-50 characters).');
      return;
    }
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!executeRecaptcha) {
      setError('reCAPTCHA has not loaded yet. Please try again in a moment.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const token = await executeRecaptcha('submit_demo');
      if (import.meta.env.DEV) {
        console.log('reCAPTCHA token:', token);
      }

      // Extract UTM parameters from URL to preserve through submission
      const utmParams: Record<string, string> = {};
      if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
          const val = searchParams.get(param);
          if (val) utmParams[param] = val;
        });
      }

      const submitData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        role: `Preferred Slot: ${formattedSlot}`,
        ...utmParams,
        'g-recaptcha-response': token
      };

      await submitDemoRequest(
        submitData, 
        `Preferred Appointment: ${formattedSlot}`,
        `[Live Demo Booking] ${formData.name} (${formData.company}) - ${formattedSlot}`
      );

      // LinkedIn Conversion Event Tracking
      if (typeof window !== 'undefined' && (window as any).lintrk) {
        (window as any).lintrk('track', { conversion_id: 19714810 });
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Demo submission error:', err);
      setError(err.message || 'An error occurred while submitting your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="demo-form" className="demo-stepper-wrapper w-full max-w-[600px] text-left scroll-mt-28">
      {/* ERROR BAR */}
      {error && (
        <div className="ds-err-bar mb-4">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M8 5v3M8 9.8v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="ds-card">
        {/* Signature Purple Header Banner */}
        <div className="ds-stepper-header">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0 shadow-inner">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="ds-stepper-header-title">Schedule a Live Demo</div>
              <div className="ds-stepper-header-sub">Interactive 1-on-1 architecture walkthrough</div>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-semibold tracking-wide inline-flex items-center gap-1.5 backdrop-blur-sm border border-white/15 shadow-sm whitespace-nowrap shrink-0">
            <Sparkles className="w-3 h-3 text-purple-200" />
            Live Product Tour
          </span>
        </div>

        <div className="ds-card-body">
          {submitted ? (
            <div className="text-center py-10 px-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Check className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-[var(--ig-text)] mb-2">Thank you, {formData.name}!</h3>
              <p className="text-sm text-[var(--ig-muted)] mb-2 max-w-sm mx-auto leading-relaxed">
                Your demo has been scheduled for <strong className="text-[#8A53D6] dark:text-[#b07eff]">{formattedSlot}</strong>.
              </p>
              <p className="text-xs text-[var(--ig-dim)] mb-6 max-w-xs mx-auto">
                We've sent confirmation details to <strong className="text-[var(--ig-text)]">{formData.email}</strong>.
              </p>
              <button
                type="button"
                className="ds-btn primary py-2.5 px-6 font-semibold"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', company: '' });
                }}
              >
                Book Another Demo
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="ds-form">
              {/* SECTION 1: CONTACT DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="ds-field mb-0">
                  <label className="ds-field-label">Full Name <span className="ds-req-star">*</span></label>
                  <input 
                    type="text" 
                    placeholder="Your full name" 
                    value={formData.name} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })} 
                    style={formData.name && !nameRegex.test(formData.name.trim()) ? { borderColor: '#ef4444' } : {}}
                  />
                </div>

                <div className="ds-field mb-0">
                  <label className="ds-field-label">Work Email <span className="ds-req-star">*</span></label>
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    value={formData.email} 
                    onChange={e => setFormData({ ...formData, email: e.target.value })} 
                    style={formData.email && !emailRegex.test(formData.email.trim()) ? { borderColor: '#ef4444' } : {}}
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="ds-field mb-5">
                <label className="ds-field-label">Company Name <span className="ds-req-star">*</span></label>
                <input 
                  type="text" 
                  placeholder="Your company name" 
                  value={formData.company} 
                  onChange={e => setFormData({ ...formData, company: e.target.value })} 
                />
              </div>

              {/* SECTION SEPARATOR */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--border)]" />
                </div>
                <div className="relative flex justify-center text-[11px] uppercase tracking-wider font-semibold">
                  <span className="bg-[var(--surface)] px-3 text-[var(--t3)] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#8A53D6]" />
                    Select Demo Slot
                  </span>
                </div>
              </div>

              {/* SECTION 2: DATE & TIME SELECTION */}
              <div className="space-y-4 mb-5" ref={calendarRef}>
                {/* Date Picker Header */}
                <div>
                  <div className="ds-field-label flex items-center justify-between mb-2">
                    <span>Choose Date <span className="ds-req-star">*</span></span>
                    <button
                      type="button"
                      onClick={() => setCalendarOpen(!calendarOpen)}
                      className="text-[11.5px] font-semibold text-[#8A53D6] dark:text-[#b07eff] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{calendarOpen ? 'Hide Calendar' : 'Browse Calendar'}</span>
                    </button>
                  </div>

                  {/* 4 Quick Date Buttons Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {quickDays.map((qd) => {
                      const isSelected = isSameDay(qd.date, selectedDate);
                      return (
                        <button
                          key={qd.label}
                          type="button"
                          onClick={() => {
                            setSelectedDate(qd.date);
                            setViewMonth(qd.date.getMonth());
                            setViewYear(qd.date.getFullYear());
                          }}
                          className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all text-center cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#8A53D6] to-[#7942c2] text-white shadow-md shadow-purple-500/25 scale-[1.02]'
                              : 'bg-[var(--surface2)] text-[var(--t1)] border border-[var(--border)] hover:border-[#8A53D6] hover:text-[#8A53D6]'
                          }`}
                        >
                          {qd.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Interactive Monthly Calendar Popover */}
                {calendarOpen && (
                  <div className="p-4 rounded-xl bg-[var(--surface2)] border border-[var(--border)] shadow-xl animation-panelIn">
                    {/* Month Header */}
                    <div className="flex items-center justify-between mb-3 px-1">
                      <span className="text-xs font-bold text-[var(--t1)] tracking-wide flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#8A53D6]" />
                        {MONTH_NAMES[viewMonth]} {viewYear}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={prevMonth}
                          disabled={isPrevDisabled}
                          className="w-7 h-7 rounded-md flex items-center justify-center text-[var(--t2)] hover:text-[#8A53D6] hover:bg-[var(--p-light)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Previous Month"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={nextMonth}
                          className="w-7 h-7 rounded-md flex items-center justify-center text-[var(--t2)] hover:text-[#8A53D6] hover:bg-[var(--p-light)] transition-colors"
                          title="Next Month"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Weekday labels */}
                    <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(dw => (
                        <div key={dw} className="text-[10px] font-bold text-[var(--t3)] uppercase py-0.5">
                          {dw}
                        </div>
                      ))}
                    </div>

                    {/* Day Cells */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {calendarGrid.map((cell, idx) => {
                        if (!cell.day || !cell.date) {
                          return <div key={`empty-${idx}`} className="h-7 w-7" />;
                        }
                        const isSelected = isSameDay(cell.date, selectedDate);
                        const isToday = isSameDay(cell.date, new Date());
                        const disabled = cell.isPast;

                        return (
                          <button
                            key={cell.day}
                            type="button"
                            disabled={disabled}
                            onClick={() => {
                              setSelectedDate(cell.date!);
                              setCalendarOpen(false);
                            }}
                            className={`h-7 w-7 rounded-lg text-xs font-medium flex items-center justify-center mx-auto transition-all ${
                              isSelected
                                ? 'bg-[#8A53D6] text-white font-bold shadow-md shadow-purple-500/30 scale-105'
                                : isToday
                                ? 'border border-[#8A53D6] text-[#8A53D6] font-bold'
                                : disabled
                                ? 'text-[var(--t3)] opacity-25 cursor-not-allowed'
                                : 'text-[var(--t1)] hover:bg-[var(--p-light)] hover:text-[#8A53D6] cursor-pointer'
                            }`}
                          >
                            {cell.day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Time Slots Grid */}
                <div>
                  <label className="ds-field-label mb-2">Available Time Slots</label>
                  <div className="grid grid-cols-5 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 px-1 rounded-lg text-xs font-semibold transition-all text-center cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#8A53D6] to-[#7942c2] text-white shadow-md shadow-purple-500/25 scale-[1.02]'
                              : 'bg-[var(--surface2)] text-[var(--t1)] border border-[var(--border)] hover:border-[#8A53D6] hover:text-[#8A53D6]'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Appointment Summary Badge */}
                <div className="px-4 py-3 rounded-xl bg-[rgba(138,83,214,0.06)] dark:bg-[rgba(138,83,214,0.12)] border border-[rgba(138,83,214,0.22)] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 text-[var(--t1)] font-medium">
                    <CalendarCheck className="w-4 h-4 text-[#8A53D6] shrink-0" />
                    <span>Selected Slot: <strong className="text-[#8A53D6] dark:text-[#b07eff]">{formattedSlot}</strong></span>
                  </div>
                  <span className="text-[11px] text-emerald-500 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Instant Booking
                  </span>
                </div>
              </div>

              {/* FULL-WIDTH CTA ACTION */}
              <div className="pt-2">
                <button 
                  type="submit"
                  className="ds-btn primary w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-purple-500/25" 
                  disabled={submitting || !isFormValid}
                  style={{ opacity: isFormValid && !submitting ? 1 : 0.5, cursor: isFormValid && !submitting ? 'pointer' : 'not-allowed' }}
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                      Confirming Demo...
                    </>
                  ) : (
                    'Confirm & Schedule Demo ✓'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
