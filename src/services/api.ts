// ==========================================
// CLIENT-SIDE EXTERNAL API CALLS
// ==========================================

// Calls /api on this site. Nginx forwards that to the API container.
// The Vite dev server proxies the same path. Set VITE_API_URL only to use another origin.
const configuredApi = import.meta.env.VITE_API_URL;
const API_BASE = configuredApi ? String(configuredApi).replace(/\/$/, '') : '';
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export interface LeadSubmissionResponse {
  success: boolean;
  message?: string;
  leadId?: number;
  error?: string;
  [key: string]: any;
}

export interface BookedSlot {
  preferred_date: string;
  preferred_time: string;
}

/**
 * Fetches already booked appointment slots from the live backend
 */
export const fetchBookedSlots = async (date?: string): Promise<BookedSlot[]> => {
  try {
    const url = date
      ? `${API_BASE}/api/infraglide/booked-slots?date=${encodeURIComponent(date)}`
      : `${API_BASE}/api/infraglide/booked-slots`;
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.bookedSlots || [];
  } catch (err) {
    console.warn('[API] Could not fetch booked slots:', err);
    return [];
  }
};

/**
 * Submits demo bookings or contact inquiries to the live InfraGlide backend server.
 * Automatically falls back to Web3Forms if the primary backend is unreachable.
 */
export const submitDemoRequest = async (
  formData: any,
  useCasesText: string,
  customSubject?: string
): Promise<LeadSubmissionResponse> => {
  const token = formData?.['g-recaptcha-response'] || formData?.recaptchaToken || '';
  const isContactInquiry = Boolean(
    customSubject?.toLowerCase().includes('contact') ||
    formData?.form_type === 'contact' ||
    formData?.formType === 'contact'
  );

  const endpoint = isContactInquiry
    ? `${API_BASE}/api/infraglide/contact`
    : `${API_BASE}/api/infraglide/demo`;

  // 1. Primary: Centralized Common Backend Server (Hostinger VM + SQLite + AWS SES)
  try {
    const { 'g-recaptcha-response': _recaptcha, ...cleanFormData } = formData || {};

    const payload: Record<string, any> = {
      name: formData.name || 'Anonymous Visitor',
      email: formData.email,
      phone: formData.mobile || formData.phone || '',
      company: formData.company || '',
      company_size: formData.company_size || formData.companySize || '',
      preferred_date: formData.preferred_date || formData.preferredDate || '',
      preferred_time: formData.preferred_time || formData.preferredTime || '',
      use_cases: useCasesText || formData.message || '',
      subject: customSubject || formData.subject || (isContactInquiry ? 'Contact Inquiry from InfraGlide' : 'Demo Request from InfraGlide'),
      message: formData.message || useCasesText || '',
      metadata: cleanFormData,
      recaptchaToken: token
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }

    console.warn(`[API] ${endpoint} returned status: ${res.status}. Attempting fallback...`);
  } catch (backendErr) {
    console.warn('[API] InfraGlide backend unreachable, attempting fallback...', backendErr);
  }

  // 2. Secondary Fallback: Web3Forms (if configured)
  if (WEB3FORMS_ACCESS_KEY) {
    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: customSubject || formData.subject || 'New Submission from InfraGlide Web Form',
        from_name: 'InfraGlide Web Form',
        ...formData,
        use_cases: useCasesText
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Something went wrong submitting the form.');
      }
      return data;
    } catch (web3Error) {
      console.error('[Web3Forms Fallback Error]', web3Error);
      throw web3Error;
    }
  }

  throw new Error('Unable to submit your request. Please try again later.');
};
