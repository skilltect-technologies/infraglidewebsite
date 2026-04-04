"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const included = [
  {
    title: "7 Days Free",
    description: "Full access to all features",
  },
  {
    title: "No Credit Card",
    description: "Sign up without payment information",
  },
  {
    title: "All Features Unlocked",
    description: "Access premium features during trial",
  },
  {
    title: "Multi-Cloud Support",
    description: "Deploy across AWS, Azure, and GCP",
  },
];

export default function FreeTrialForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/free-trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-900/20 px-8 py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/20">
          <svg className="h-8 w-8 fill-indigo-400" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        </div>
        <h2 className="mb-2 font-nacelle text-2xl font-semibold text-gray-100">
          You&apos;re all set!
        </h2>
        <p className="mb-8 text-indigo-200/65">
          Thanks for signing up. We&apos;ll be in touch shortly to get you started.
        </p>
        <button
          onClick={() => router.push("/")}
          className="btn bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Left — Form */}
      <div
        className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-8 backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
        data-aos="fade-right"
      >
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-5">
            <div>
              <label
                className="mb-1 block text-sm font-medium text-indigo-200/65"
                htmlFor="fullName"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="form-input w-full"
                placeholder="Your full name"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-medium text-indigo-200/65"
                htmlFor="email"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input w-full"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-medium text-indigo-200/65"
                htmlFor="company"
              >
                Company <span className="text-red-500">*</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="form-input w-full"
                placeholder="Your company name"
                value={form.company}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-medium text-indigo-200/65"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="form-input w-full"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {errorMsg && (
            <p className="mt-4 rounded-lg bg-red-900/30 px-4 py-3 text-sm text-red-400">
              {errorMsg}
            </p>
          )}

          <div className="mt-6">
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Submitting…" : "Start Free Trial"}
            </button>
          </div>
        </form>
      </div>

      {/* Right — What's Included */}
      <div className="flex flex-col justify-center" data-aos="fade-left" data-aos-delay="100">
        <h3 className="mb-8 font-nacelle text-xl font-semibold text-gray-200">
          What&apos;s Included
        </h3>
        <ul className="space-y-6">
          {included.map((item) => (
            <li key={item.title} className="flex items-start gap-4">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20">
                <svg
                  className="h-3.5 w-3.5 fill-indigo-400"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 11.5L2.5 7.5L3.91 6.09L6.5 8.67L12.09 3.09L13.5 4.5L6.5 11.5Z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-200">{item.title}</p>
                <p className="text-sm text-indigo-200/65">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
