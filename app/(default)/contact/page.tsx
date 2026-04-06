export const metadata = {
  title: "Contact - InfraGlide",
  description: "Get in touch with the InfraGlide team for sales, support, or partnership inquiries.",
};

import Image from "next/image";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import Link from "next/link";

const channels = [
  {
    emoji: "📧",
    title: "Email Us",
    description: "For general inquiries and support",
    action: "support@infraglide.com",
    href: "mailto:support@infraglide.com",
  },
  {
    emoji: "💼",
    title: "Sales",
    description: "Talk to our team about Enterprise plans",
    action: "Schedule a call",
    href: "/schedule-demo",
  },
  {
    emoji: "🐛",
    title: "Support",
    description: "Report a bug or get technical help",
    action: "Open a ticket",
    href: "/support-ticket",
  },
];

export default function Contact() {
  return (
    <section className="relative">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -mt-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image className="max-w-none" src={BlurredShapeGray} width={760} height={668} alt="" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Header */}
          <div className="mx-auto max-w-3xl pb-12 text-center">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Contact Us
              </span>
            </div>
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              We&apos;d love to hear from you
            </h1>
            <p className="text-lg text-indigo-200/65">
              Have a question, feedback, or want to explore how InfraGlide can help your team? Reach out — we respond within one business day.
            </p>
          </div>

          {/* Contact channels */}
          <div className="mx-auto mb-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
            {channels.map((c) => (
              <div
                key={c.title}
                className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-6 text-center backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
              >
                <div className="mb-3 text-3xl">{c.emoji}</div>
                <h3 className="mb-1 font-nacelle text-sm font-semibold text-gray-200">{c.title}</h3>
                <p className="mb-3 text-xs text-indigo-200/65">{c.description}</p>
                <Link
                  href={c.href}
                  className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  {c.action}
                </Link>
              </div>
            ))}
          </div>

          {/* Schedule demo CTA */}
          <div className="mx-auto max-w-3xl overflow-hidden relative rounded-2xl bg-linear-to-br from-indigo-900/40 via-indigo-800/20 to-gray-900/50 p-8 text-center before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-indigo-800),var(--color-indigo-600),var(--color-indigo-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
            <h2 className="mb-2 font-nacelle text-xl font-semibold text-gray-100">
              Want a live walkthrough?
            </h2>
            <p className="mb-6 text-indigo-200/65">
              Book a 30-minute personalised demo with our team and see InfraGlide in action.
            </p>
            <Link
              href="/schedule-demo"
              className="btn bg-indigo-500 text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-indigo-400"
            >
              Schedule a Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
