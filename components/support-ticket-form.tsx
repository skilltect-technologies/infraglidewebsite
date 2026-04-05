"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  "Bug Report",
  "Feature Request",
  "Account & Billing",
  "Infrastructure / Deployment",
  "Security",
  "Integration / API",
  "Other",
];

const priorities = ["Low", "Medium", "High", "Critical"];

export default function SupportTicketForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    category: "",
    priority: "Medium",
    description: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [ticketId, setTicketId] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/support-ticket", {
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

      setTicketId(data.ticketId ?? "");
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
          Ticket Submitted!
        </h2>
        {ticketId && (
          <p className="mb-2 text-sm font-mono text-indigo-400">
            Reference: {ticketId}
          </p>
        )}
        <p className="mb-8 text-indigo-200/65">
          We&apos;ve received your support request and will respond to your email within one business day.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setStatus("idle");
              setForm({ fullName: "", email: "", subject: "", category: "", priority: "Medium", description: "" });
            }}
            className="btn-sm relative bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] py-[5px] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
          >
            Submit Another
          </button>
          <button
            onClick={() => router.push("/")}
            className="btn bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-transparent bg-gray-800/60 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition";

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-8 backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
      data-aos="fade-up"
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-5">
          {/* Name + Email */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-400">
                Full Name <span className="text-indigo-400">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder="Jane Smith"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-400">
                Email Address <span className="text-indigo-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="jane@company.com"
                className={inputClass}
              />
            </div>
          </div>

          {/* Category + Priority */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-400">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select a category…</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-400">
                Priority
              </label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className={inputClass}
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-400">
              Subject <span className="text-indigo-400">*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              placeholder="Brief summary of the issue"
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-400">
              Description <span className="text-indigo-400">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Describe your issue in detail — include steps to reproduce, error messages, or any relevant context."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Error */}
          {status === "error" && (
            <p className="rounded-lg bg-red-900/30 px-4 py-2.5 text-sm text-red-400">
              {errorMsg}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%] disabled:opacity-60"
          >
            {status === "loading" ? "Submitting…" : "Submit Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
}
