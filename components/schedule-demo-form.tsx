"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const whatYoullLearn = [
  {
    title: "Infrastructure Automation",
    description:
      "See how to automate your entire infrastructure deployment process",
  },
  {
    title: "Cost Optimization",
    description:
      "Discover how to reduce your cloud spending by up to 40%",
  },
  {
    title: "Real-time Monitoring",
    description:
      "Get insights into your infrastructure health and performance metrics",
  },
  {
    title: "Team Collaboration",
    description:
      "Learn how teams can work together more efficiently",
  },
  {
    title: "Security & Compliance",
    description: "Understand our enterprise-grade security features",
  },
  {
    title: "Advanced Features",
    description:
      "Explore the full suite of capabilities built for large-scale operations",
  },
];

export default function ScheduleDemoForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/schedule-demo", {
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
          Demo Requested!
        </h2>
        <p className="mb-8 text-indigo-200/65">
          Thanks for reaching out. Our team will contact you shortly to confirm
          your demo session.
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
            {/* Full Name */}
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

            {/* Email */}
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

            {/* Company */}
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

            {/* Phone */}
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

            {/* Preferred Date & Time row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="preferredDate"
                >
                  Preferred Date
                </label>
                <input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  className="form-input w-full"
                  value={form.preferredDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="preferredTime"
                >
                  Preferred Time
                </label>
                <input
                  id="preferredTime"
                  name="preferredTime"
                  type="time"
                  className="form-input w-full"
                  value={form.preferredTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                className="mb-1 block text-sm font-medium text-indigo-200/65"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="form-input w-full resize-none"
                placeholder="Tell us about your infrastructure needs…"
                value={form.message}
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
              className="btn w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Submitting…" : "Request Demo"}
            </button>
          </div>
        </form>
      </div>

      {/* Right — What You'll Learn */}
      <div
        className="flex flex-col justify-center"
        data-aos="fade-left"
        data-aos-delay="100"
      >
        <h3 className="mb-8 font-nacelle text-xl font-semibold text-gray-200">
          What You&apos;ll Learn
        </h3>
        <ul className="space-y-6">
          {whatYoullLearn.map((item) => (
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
