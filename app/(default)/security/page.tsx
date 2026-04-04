export const metadata = {
  title: "Security - InfraGlide",
  description: "How InfraGlide protects your infrastructure data with enterprise-grade security.",
};

import Image from "next/image";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import Link from "next/link";

const pillars = [
  {
    emoji: "🔐",
    title: "Encryption at Rest & In Transit",
    description:
      "All data is encrypted at rest using AES-256 and in transit using TLS 1.2+. Infrastructure state files, secrets, and access tokens are stored in encrypted vaults.",
  },
  {
    emoji: "🛡️",
    title: "SOC 2 Type II Certified",
    description:
      "InfraGlide is independently audited and SOC 2 Type II compliant across Security, Availability, and Confidentiality trust service criteria.",
  },
  {
    emoji: "👥",
    title: "Role-Based Access Control",
    description:
      "Granular RBAC lets you assign the minimum permissions required for each team member. Enforce least-privilege across workspaces, projects, and deployments.",
  },
  {
    emoji: "🔎",
    title: "Audit Logging",
    description:
      "Every action — from deployments to permission changes — is immutably logged with user, timestamp, and IP. Logs are exportable and retention is configurable.",
  },
  {
    emoji: "🏠",
    title: "SSO & LDAP/AD Integration",
    description:
      "Enterprise plans support SAML 2.0, OIDC, and LDAP/AD integration, enabling centralised identity management through your existing identity provider.",
  },
  {
    emoji: "🌐",
    title: "Network Isolation",
    description:
      "Enterprise self-hosted deployments support private VPC deployment with no inbound internet access, VPN-only access controls, and custom egress policies.",
  },
  {
    emoji: "🔄",
    title: "Drift Detection & Compliance",
    description:
      "Automatically detect when live infrastructure diverges from the desired state and receive real-time alerts before compliance is breached.",
  },
  {
    emoji: "🧪",
    title: "Penetration Testing",
    description:
      "We conduct annual third-party penetration tests and maintain a responsible disclosure programme. Security issues are triaged within 24 hours.",
  },
];

export default function Security() {
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
                Enterprise Security
              </span>
            </div>
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Security you can trust
            </h1>
            <p className="text-lg text-indigo-200/65">
              InfraGlide is built with security at its core — not as an add-on. Every layer of the platform is designed to protect your infrastructure data.
            </p>
          </div>

          {/* Pillars */}
          <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-6 backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
              >
                <div className="mb-3 text-2xl">{p.emoji}</div>
                <h3 className="mb-2 font-nacelle text-sm font-semibold text-gray-200">{p.title}</h3>
                <p className="text-xs text-indigo-200/65">{p.description}</p>
              </div>
            ))}
          </div>

          {/* Responsible disclosure */}
          <div className="mx-auto max-w-3xl overflow-hidden relative rounded-2xl bg-linear-to-br from-indigo-900/40 via-indigo-800/20 to-gray-900/50 p-8 text-center before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-indigo-800),var(--color-indigo-600),var(--color-indigo-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
            <h2 className="mb-2 font-nacelle text-xl font-semibold text-gray-100">
              Found a security issue?
            </h2>
            <p className="mb-6 text-indigo-200/65">
              We operate a responsible disclosure programme. If you discover a vulnerability, please report it privately and we will acknowledge within 24 hours.
            </p>
            <Link
              href="mailto:security@infraglide.com"
              className="btn bg-indigo-500 text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-indigo-400"
            >
              Report a Vulnerability
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
