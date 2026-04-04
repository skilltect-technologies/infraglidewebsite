export const metadata = {
  title: "Changelog - InfraGlide",
  description: "See what's new in InfraGlide — release notes, improvements, and bug fixes.",
};

import Image from "next/image";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";

const releases = [
  {
    version: "v2.4.0",
    date: "March 2026",
    badge: "Latest",
    badgeColor: "bg-indigo-500/20 text-indigo-300 ring-indigo-500/30",
    changes: [
      { type: "New", text: "Drift Detection — automatically detect and alert on infrastructure drift." },
      { type: "New", text: "Cost Optimization Recommendations with per-resource cost breakdown." },
      { type: "New", text: "LDAP/AD Integration for enterprise identity management." },
      { type: "Improved", text: "Faster Terraform plan execution with parallel resource evaluation." },
      { type: "Improved", text: "HLD/LLD/Architecture Diagram export now supports PNG, SVG, and PDF." },
      { type: "Fixed", text: "Remote backend state locking issue when multiple users deploy simultaneously." },
    ],
  },
  {
    version: "v2.3.0",
    date: "February 2026",
    badge: null,
    badgeColor: "",
    changes: [
      { type: "New", text: "Centralized Monitoring & Logging with Topology View." },
      { type: "New", text: "AI Provisioning — describe your infrastructure in plain English and auto-generate resources." },
      { type: "New", text: "Private onboarding sessions for Enterprise customers." },
      { type: "Improved", text: "Multi-Cloud Support now includes GCP Artifact Registry and Azure Container Apps." },
      { type: "Fixed", text: "Audit log entries missing for module deletions." },
      { type: "Fixed", text: "RBAC permissions not propagating to nested project folders." },
    ],
  },
  {
    version: "v2.2.0",
    date: "January 2026",
    badge: null,
    badgeColor: "",
    changes: [
      { type: "New", text: "SSO support (SAML 2.0, OIDC) for Enterprise plans." },
      { type: "New", text: "Import Templates from external repositories." },
      { type: "New", text: "Private Registry for internal Terraform modules." },
      { type: "Improved", text: "Real-time deployment logs now stream with sub-second latency." },
      { type: "Improved", text: "Team Collaboration — comments and approvals on deployment plans." },
      { type: "Fixed", text: "Architecture diagram rendering issue on Safari 17." },
    ],
  },
  {
    version: "v2.1.0",
    date: "December 2025",
    badge: null,
    badgeColor: "",
    changes: [
      { type: "New", text: "Native architecture versioning with full diff viewer." },
      { type: "New", text: "Remote Git integration — connect GitHub, GitLab, and Bitbucket." },
      { type: "Improved", text: "Terraform code generation now follows HashiCorp style guide." },
      { type: "Fixed", text: "Variable masking inconsistency for sensitive inputs." },
    ],
  },
];

const typeBadge: Record<string, string> = {
  New: "bg-emerald-500/15 text-emerald-400",
  Improved: "bg-blue-500/15 text-blue-400",
  Fixed: "bg-amber-500/15 text-amber-400",
};

export default function Changelog() {
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
          <div className="pb-12 text-center">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                What&apos;s New
              </span>
            </div>
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Changelog
            </h1>
            <p className="text-lg text-indigo-200/65">
              New features, improvements, and fixes — updated with every release.
            </p>
          </div>

          {/* Releases */}
          <div className="space-y-12">
            {releases.map((release) => (
              <div
                key={release.version}
                className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-8 backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="font-nacelle text-xl font-semibold text-gray-100">
                    {release.version}
                  </span>
                  {release.badge && (
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${release.badgeColor}`}>
                      {release.badge}
                    </span>
                  )}
                  <span className="ml-auto text-sm text-indigo-200/45">{release.date}</span>
                </div>
                <ul className="space-y-3">
                  {release.changes.map((change, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-indigo-200/65">
                      <span className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-xs font-semibold ${typeBadge[change.type]}`}>
                        {change.type}
                      </span>
                      {change.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
