export const metadata = {
  title: "Status - InfraGlide",
  description: "Real-time status and uptime information for all InfraGlide services.",
};

import Image from "next/image";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";

const services = [
  { name: "API Gateway", status: "operational", uptime: "99.98%" },
  { name: "Deployment Engine", status: "operational", uptime: "99.95%" },
  { name: "Terraform Runner", status: "operational", uptime: "99.97%" },
  { name: "Web Application", status: "operational", uptime: "99.99%" },
  { name: "Remote Backend (State Storage)", status: "operational", uptime: "100%" },
  { name: "Authentication Service", status: "operational", uptime: "99.99%" },
  { name: "Monitoring & Logging", status: "operational", uptime: "99.94%" },
  { name: "Notification Service", status: "operational", uptime: "99.96%" },
];

const incidents = [
  {
    date: "March 18, 2026",
    title: "Elevated API latency — Resolved",
    severity: "Minor",
    description:
      "A misconfigured load balancer rule caused elevated p99 latency on API requests between 14:22–15:04 UTC. The issue was identified and resolved within 42 minutes. No data loss occurred.",
  },
  {
    date: "February 3, 2026",
    title: "Terraform Runner degraded performance — Resolved",
    severity: "Minor",
    description:
      "Increased queue wait times for Terraform plan/apply operations between 09:10–10:35 UTC due to a worker pool exhaustion. Autoscaling resolved the issue. All queued jobs completed successfully.",
  },
];

const statusStyle: Record<string, { dot: string; label: string; text: string }> = {
  operational: {
    dot: "bg-emerald-500",
    label: "Operational",
    text: "text-emerald-400",
  },
  degraded: {
    dot: "bg-amber-500",
    label: "Degraded",
    text: "text-amber-400",
  },
  outage: {
    dot: "bg-red-500",
    label: "Outage",
    text: "text-red-400",
  },
};

const severityStyle: Record<string, string> = {
  Minor: "bg-amber-500/15 text-amber-400",
  Major: "bg-red-500/15 text-red-400",
  Critical: "bg-red-700/20 text-red-300",
};

export default function Status() {
  const allOperational = services.every((s) => s.status === "operational");

  return (
    <section className="relative">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -mt-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image className="max-w-none" src={BlurredShapeGray} width={760} height={668} alt="" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Header */}
          <div className="pb-10 text-center">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                System Status
              </span>
            </div>
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              InfraGlide Status
            </h1>
          </div>

          {/* Overall status banner */}
          <div
            className={`mb-10 flex items-center justify-center gap-3 rounded-2xl px-6 py-4 ${
              allOperational
                ? "bg-emerald-500/10 ring-1 ring-inset ring-emerald-500/20"
                : "bg-amber-500/10 ring-1 ring-inset ring-amber-500/20"
            }`}
          >
            <span
              className={`h-3 w-3 animate-pulse rounded-full ${allOperational ? "bg-emerald-500" : "bg-amber-500"}`}
            />
            <span className={`font-medium ${allOperational ? "text-emerald-300" : "text-amber-300"}`}>
              {allOperational
                ? "All systems are fully operational"
                : "Some systems are experiencing issues"}
            </span>
          </div>

          {/* Services */}
          <div className="mb-14 overflow-hidden relative rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
            {services.map((svc, i) => (
              <div
                key={svc.name}
                className={`flex items-center justify-between px-6 py-4 ${
                  i < services.length - 1 ? "border-b border-gray-800/60" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${statusStyle[svc.status].dot}`}
                  />
                  <span className="text-sm text-gray-200">{svc.name}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs text-indigo-200/45">{svc.uptime} uptime</span>
                  <span className={`text-xs font-medium ${statusStyle[svc.status].text}`}>
                    {statusStyle[svc.status].label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Past incidents */}
          <h2 className="mb-6 font-nacelle text-xl font-semibold text-gray-200">
            Past Incidents
          </h2>
          <div className="space-y-4">
            {incidents.map((inc) => (
              <div
                key={inc.title}
                className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-6 backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="text-sm text-indigo-200/45">{inc.date}</span>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${severityStyle[inc.severity]}`}
                  >
                    {inc.severity}
                  </span>
                </div>
                <h3 className="mb-2 font-nacelle text-sm font-semibold text-gray-200">
                  {inc.title}
                </h3>
                <p className="text-sm text-indigo-200/65">{inc.description}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-indigo-200/45">
            Updated in real-time. To subscribe to incident notifications, contact{" "}
            <a href="mailto:support@infraglide.com" className="text-indigo-400 hover:text-indigo-300">
              support@infraglide.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
