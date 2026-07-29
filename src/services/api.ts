// ==========================================
// CLIENT-SIDE EXTERNAL API CALLS
// ==========================================

//const domain = "https://demo.infraglide.com";
const domain = "http://localhost:5000"; // Uncomment for local development

const apiBaseUrl = "/api/v1/public/";

const URLS = {
  demoUrl: "demo-request"
};

// Utility to construct the full API endpoint
const getUrl = (apiName: keyof typeof URLS) => {
  return `${domain}${apiBaseUrl}${URLS[apiName]}`;
};

// Generic Fetch Wrapper
const apiClient = async (apiName: keyof typeof URLS, method: string = 'GET', data: any = null) => {
  const url = getUrl(apiName);

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (data && method !== 'GET') {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to process request: ${errText || response.statusText}`);
  }

  return response.json();
};

// Specific API Services
/*
export const submitDemoRequest = async (formData: any, useCasesText: string) => {
  try {
    const payload = {
      ...formData,
      useCasesText
    };
    
    // Using the generic wrapper to make a POST request
    const data = await apiClient('demoUrl', 'POST', payload);
    return data;
  } catch (error) {
    console.error("Error submitting demo request to backend API:", error);
    throw error;
  }
};
*/

// ==========================================
// WEB3FORMS INTEGRATION
// ==========================================

// Ensure you add VITE_WEB3FORMS_ACCESS_KEY to your .env file
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export const submitDemoRequest = async (formData: any, useCasesText: string) => {
  try {
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "New Demo Request from InfraGlide",
      ...formData,
      use_cases: useCasesText
    };
    
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Something went wrong submitting the form.");
    }
    
    return data;
  } catch (error) {
    console.error("Error submitting demo request to Web3Forms:", error);
    throw error;
  }
};
