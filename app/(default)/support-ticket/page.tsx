export const metadata = {
  title: "Open a Support Ticket - InfraGlide",
  description:
    "Report a bug, request help, or ask a question. Our support team will get back to you within one business day.",
};

import Image from "next/image";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import BlurredShape from "@/public/images/blurred-shape.svg";
import SupportTicketForm from "@/components/support-ticket-form";

const responseInfo = [
  {
    icon: (
      <svg className="h-5 w-5 fill-indigo-400" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
      </svg>
    ),
    label: "Initial Response",
    value: "Within 1 business day",
  },
  {
    icon: (
      <svg className="h-5 w-5 fill-indigo-400" viewBox="0 0 24 24">
        <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
      </svg>
    ),
    label: "Critical Issues",
    value: "Same business day",
  },
  {
    icon: (
      <svg className="h-5 w-5 fill-indigo-400" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
      </svg>
    ),
    label: "Support Email",
    value: "support@infraglide.com",
  },
];

export default function SupportTicketPage() {
  return (
    <section className="relative">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -mt-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image className="max-w-none" src={BlurredShapeGray} width={760} height={668} alt="" />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-80 -translate-x-[120%] opacity-50"
        aria-hidden="true"
      >
        <Image className="max-w-none" src={BlurredShape} width={760} height={668} alt="" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Header */}
          <div className="mx-auto max-w-3xl pb-12 text-center">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Support
              </span>
            </div>
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Open a Support Ticket
            </h1>
            <p className="text-lg text-indigo-200/65">
              Describe your issue and our engineering team will get back to you as quickly as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Form — takes 2 cols */}
            <div className="lg:col-span-2">
              <SupportTicketForm />
            </div>

            {/* Sidebar info */}
            <div className="space-y-6">
              {/* Response times */}
              <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-6 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
                <h3 className="mb-5 font-nacelle text-sm font-semibold text-gray-200">
                  Response Times
                </h3>
                <ul className="space-y-4">
                  {responseInfo.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0">{item.icon}</span>
                      <div>
                        <p className="text-xs font-medium text-gray-300">{item.label}</p>
                        <p className="text-xs text-indigo-200/65">{item.value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips */}
              <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-6 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
                <h3 className="mb-4 font-nacelle text-sm font-semibold text-gray-200">
                  Tips for a Faster Resolution
                </h3>
                <ul className="space-y-2.5">
                  {[
                    "Include steps to reproduce the issue",
                    "Attach any relevant error messages or logs",
                    "Mention which cloud provider is affected",
                    "Specify the pipeline or module name if applicable",
                    "Set the correct priority level",
                  ].map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-xs text-indigo-200/65">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Docs link */}
              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5 text-center">
                <p className="mb-3 text-sm text-indigo-200/80">
                  Looking for self-serve help?
                </p>
                <a
                  href="/docs"
                  className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Browse the Documentation →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
